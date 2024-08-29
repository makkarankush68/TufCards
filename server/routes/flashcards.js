const express = require("express");
const authenticateJWT = require("../middleware/auth.middleware");
const {
  getFlashcards,
  addNewFlashcard,
  updateFlashcard,
  deleteFlashcard,
} = require("../controllers/flashcards");

const flashcardRouter = express.Router();

// Get all flashcards with options and answers
flashcardRouter.get("/", getFlashcards);

// Middleware to protect below routes
flashcardRouter.use(authenticateJWT);

// Add a new flashcard 
flashcardRouter.post("/", addNewFlashcard);

// Update a flashcard
flashcardRouter.put("/:id", updateFlashcard);

// Delete a flashcard
flashcardRouter.delete("/:id", deleteFlashcard);

module.exports = flashcardRouter;
