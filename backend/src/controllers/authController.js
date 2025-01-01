import User from "../models/user.js";
import { totp } from "otplib";
import { authenticator } from "otplib"; // For generating OTP
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

// Setup MFA (2FA)
export const setup2FA = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate MFA secret
    const secret = authenticator.generateSecret();
    user.twoFactorSecret = secret;
    user.isMfaActive = true;
    await user.save();

    // Generate an OTPAuth URL
    const otpauthUrl = speakeasy.otpauthURL({
      secret,
      label: user.username,
      issuer: "www.tcgopal.com",
      encoding: "base32",
    });

    // Generate a QR code from the OTPAuth URL
    const qrImage = await qrCode.toDataURL(otpauthUrl);
    // Respond with the QR code and OTPAuth URL
    res.status(200).json({
      message: "MFA setup complete",
      qrCode: qrImage,
      otpauthUrl,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error setting up 2FA", details: err.message });
  }
};

// Verify MFA
export const verify2FA = async (req, res) => {
  const { token } = req.body;
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });
    if (isValid) {
      // MFA verified, generate JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "2FA verified successfully", token });
    } else {
      res.status(401).json({ error: "Token is not valid" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error verifying 2FA", details: err.message });
  }
};

export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();
    res.status(200).json({ message: "MFA has been reset" });
  } catch (e) {
    res.status(500).json({ error: "Error reseting 2FA", message: e });
  }
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
};

export const logout = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized user" });
  }

  req.logout((err) => {
    if (err) return res.status(400).json({ message: "User not logged out" });
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout Successfull" });
    });
  });
};
