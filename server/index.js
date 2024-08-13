const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRouter = require("./controllers/admin");
const flashcardRouter = require("./controllers/flashcards");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));


// Admin Routes
app.use("/admin", adminRouter);
// Flashcard Routes
app.use("/flashcards", flashcardRouter);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    msg: "Something went wrong. Please try again later.",
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
