import express from "express";
import passport from "passport";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import {
  authStatus,
  logout,
  setup2FA,
  verify2FA,
  reset2FA,
} from "../controllers/authController.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    // Create and save the user
    const user = new User({ username, password, isMfaActive: false });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error registering user", details: err.message });
  }
});

// Login
router.post("/login", passport.authenticate("local"), async (req, res) => {
  const user = req.user; // user is automatically attached to req after successful auth
  try {
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      username: user.username,
      isMfaActive: user.isMfaActive, // Include MFA status if needed
    };

    // const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", payload });
  } catch (err) {
    res.status(500).json({ error: "Error logging in", details: err });
  }
});

router.get("/status", authStatus);

router.post(
  "/logout",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  logout
);

router.post(
  "/2fa/setup",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  setup2FA
);

router.post(
  "/2fa/verify",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  verify2FA
);

router.post(
  "/2fa/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  },
  reset2FA
);

export default router;
