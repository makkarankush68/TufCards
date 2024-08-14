const express = require("express");
const prisma = require("../prisma/client");
const authenticateJWT = require("../middleware/auth.middleware");

const flashcardRouter = express.Router();

// Get all flashcards with options and answers
flashcardRouter.get("/", async (req, res) => {
  try {
    const flashcards = await prisma.flashcard.findMany({
      include: {
        options: true,
        answer: true,
      },
    });
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to protect below routes
flashcardRouter.use(authenticateJWT);

// Add a new flashcard with admin info
flashcardRouter.post("/", async (req, res) => {
  const { question, options, heading, paragraph } = req.body;
  if (
    !question ||
    !heading ||
    question.trim().length === 0 ||
    heading.trim().length === 0 ||
    options.length > 4 ||
    (options.length > 0 && !options.some((option) => option.isCorrect))
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields" });
  }
  try {
    const flashcard = await prisma.flashcard.create({
      data: {
        question,
        options: {
          create: options.map((option) => ({
            text: option.text,
            isCorrect: option.isCorrect || false,
          })),
        },
        answer: {
          create: { heading, paragraph },
        },
        createdById: req.user.id,
        updatedById: req.user.id,
      },
    });
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a flashcard
flashcardRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { question, options, heading, paragraph } = req.body;
  if (
    !question ||
    !heading ||
    question.trim().length === 0 ||
    heading.trim().length === 0 ||
    options.length > 4 ||
    (options.length > 0 && !options.some((option) => option.isCorrect))
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields" });
  }

  try {
    const flashcard = await prisma.flashcard.findUnique({
      where: { id: Number(id) },
      include: {
        options: true,
        answer: true,
      },
    });

    if (!flashcard) {
      return res.status(404).json({ error: "Flashcard not found" });
    }

    // Get the IDs of the options before and after the update
    const prevOptionIds = flashcard.options.map((option) => option.id);
    const newOptionIds = options
      .filter((option) => option.id)
      .map((option) => option.id);

    // Determine which options need to be added, updated, or removed
    const optionsToAdd = options.filter((option) => !option.id);
    const optionsToUpdate = options.filter((option) => option.id);
    const optionsToRemove = prevOptionIds.filter(
      (id) => !newOptionIds.includes(id)
    );

    await prisma.$transaction(async (prisma) => {
      // Add new options
      if (optionsToAdd.length > 0) {
        await prisma.option.createMany({
          data: optionsToAdd.map((option) => ({
            text: option.text,
            isCorrect: option.isCorrect || false,
            flashcardId: Number(id),
          })),
        });
      }

      // Update existing options
      for (const option of optionsToUpdate) {
        await prisma.option.update({
          where: { id: option.id },
          data: { text: option.text, isCorrect: option.isCorrect || false },
        });
      }

      // Remove old options
      if (optionsToRemove.length > 0) {
        await prisma.option.deleteMany({
          where: {
            id: { in: optionsToRemove },
          },
        });
      }

      // Update the flashcard itself
      await prisma.flashcard.update({
        where: { id: Number(id) },
        data: {
          question,
          updatedById: req.user.id,
        },
      });

      // Update or create answer
      const existingAnswer = flashcard.answer[0];
      if (existingAnswer) {
        await prisma.answer.update({
          where: { id: existingAnswer.id },
          data: { heading, paragraph },
        });
      } else {
        await prisma.answer.create({
          data: { heading, paragraph, flashcardId: Number(id) },
        });
      }
    });

    res.status(200).json({ message: "Flashcard updated successfully" });
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a flashcard
flashcardRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const flashcard = await prisma.flashcard.findUnique({
      where: { id: Number(id) },
    });

    if (!flashcard) {
      return res.status(404).json({ error: "Flashcard not found" });
    }

    await prisma.option.deleteMany({
      where: { flashcardId: Number(id) },
    });

    await prisma.answer.deleteMany({
      where: { flashcardId: Number(id) },
    });

    const deletedFlashcard = await prisma.flashcard.delete({
      where: { id: Number(id) },
    });

    res.json(deletedFlashcard);
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = flashcardRouter;
