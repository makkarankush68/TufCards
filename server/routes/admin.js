const express = require("express");
const { adminLogin, adminSignup } = require("../controllers/admin");

const adminRouter = express.Router();

// Admin signup
adminRouter.post("/signup", adminSignup);

// Admin login
adminRouter.post("/login", adminLogin);

module.exports = adminRouter;
