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
      res.json({ token , user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
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
  const token = req.headers["authorization"]?.split(" ")[1];
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
    const flashcard = await prisma.flashcard.update({
      where: { id: Number(id) },
      data: {
        question,
        options: {
          upsert: options.map((option) => ({
            where: { id: option.id || -1 },
            update: { text: option.text },
            create: { text: option.text },
          })),
        },
        answer: {
          update: { heading, paragraph },
        },
        updatedById: req.user.id,
      },
    });
    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a flashcard
app.delete("/flashcards/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const flashcard = await prisma.flashcard.delete({
      where: { id: Number(id) },
    });
    res.json(flashcard);
  } catch (error) {
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
