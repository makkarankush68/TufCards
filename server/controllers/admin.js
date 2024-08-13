const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const JWT_SECRET = process.env.JWT_SECRET;

const adminRouter = express.Router();

// Admin login
adminRouter.post("/login", async (req, res) => {
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
adminRouter.post("/signup", async (req, res) => {
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

module.exports = adminRouter;

/*
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
*/
