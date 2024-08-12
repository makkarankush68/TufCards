const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

// Admin login
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        JWT_SECRET,
        { expiresIn: "3h" }
      );
      const user = { id: admin.id, username: admin.username };
      res.json({ token, user });
    } else {
      res.status(403).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin signup
app.post("/admin/signup", async (req, res) => {
  // const { username, password } = req.body;
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const admin = await prisma.admin.create({
    //   data: {
    //     username,
    //     password: hashedPassword,
    //   },
    // });
    // res.status(201).json(admin);
    res.status(201).json({
      msg: "Admin signup is disabled for now. Please use the default admin credentials to login.",
      credentials: {
        username: "admin",
        password: "admin",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Flashcard Routes

// Get all flashcards with options and answers
app.get("/flashcards", async (req, res) => {
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

// Add a new flashcard with admin info
app.post("/flashcards", authenticateJWT, async (req, res) => {
  const { question, options, heading, paragraph } = req.body;
  if (
    !question ||
    !heading ||
    question.trim().length === 0 ||
    heading.trim().length === 0
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
          create: options,
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
app.put("/flashcards/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { question, options, heading, paragraph } = req.body;

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

    const existingOptionIds = flashcard.options.map((option) => option.id);
    const providedOptionIds = options
      .filter((option) => option.id)
      .map((option) => option.id);

    // Determine which options need to be added and which to remove
    const optionsToAdd = options.filter((option) => !option.id);
    const optionsToUpdate = options.filter((option) => option.id);
    const optionsToRemove = existingOptionIds.filter(
      (id) => !providedOptionIds.includes(id)
    );

    await prisma.$transaction(async (prisma) => {
      // Add new options
      if (optionsToAdd.length > 0) {
        await prisma.option.createMany({
          data: optionsToAdd.map((option) => ({
            text: option.text,
            flashcardId: Number(id),
          })),
        });
      }

      // Update existing options
      for (const option of optionsToUpdate) {
        await prisma.option.update({
          where: { id: option.id },
          data: { text: option.text },
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
app.delete("/flashcards/:id", authenticateJWT, async (req, res) => {
  console.log("Delete flashcard");
  const { id } = req.params;
  console.log("Delete flashcard", id);
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

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
