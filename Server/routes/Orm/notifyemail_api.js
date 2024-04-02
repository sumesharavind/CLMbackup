import express from "express";
const Notifyemail_api = express.Router();
import Notifyemail from "../../models/notifyemail_model.js";
import sendEmail from "../../EmailNotification.js";

Notifyemail_api.post("/create", async (req, res) => {
  try {
    const emailData = req.body;
    const emailNotification = await sendEmail(emailData);
    console.log("Server ABC = ", JSON.stringify(emailNotification));
    if (emailNotification.messageId) {
      const notifyemail = await Notifyemail.create(req.body);
      res
        .status(201)
        .json({
          message: "Notifyemail created successfully",
          data: notifyemail,
        });
    }
  } catch (error) {
    console.error("Error:", error);
    // Determine the type of error and handle accordingly
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({
          error: "Validation Error",
          details: error.message || "Unknown validation error",
        });
    } else if (error.code === "SMTPError") {
      res
        .status(500)
        .json({
          error: "SMTP Server Error",
          details: error.message || "Unknown SMTP error",
        });
    } else if (error.code === "InvalidRecipient") {
      res
        .status(400)
        .json({
          error: "Invalid Recipient",
          details: error.message || "Invalid email address",
        });
    } else {
      res
        .status(500)
        .json({
          error: "Internal Server Error",
          details: error.message || "Unknown error",
        });
    }
  }
});
Notifyemail_api.get("/read", async (req, res) => {
  try {
    const notifyemail = await Notifyemail.findAll();
    res.json({
      message: "Notifyemail retrieved successfully",
      data: notifyemail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
Notifyemail_api.get("/read/:UserId_email", async (req, res) => {
  try {
    const userId_email = req.params.UserId_email;
    const notifyemail = await Notifyemail.findOne({
      where: { UserId_email: userId_email },
    });
    if (notifyemail) {
      res.json({
        message: "Notifyemail retrieved successfully",
        data: notifyemail,
      });
    } else {
      res.status(404).json({ error: "UserId_email not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
Notifyemail_api.put("/update/:UserId_email", async (req, res) => {
  try {
    const userId_email = req.params.UserId_email;
    const updatedNotifyemail = req.body;
    const existingNotifyemail = await Notifyemail.findOne({
      where: { UserId_email: userId_email },
    });
    if (existingNotifyemail) {
      await existingNotifyemail.update(updatedNotifyemail);
      res.json({
        message: "Notifyemail updated successfully",
        data: existingNotifyemail,
      });
    } else {
      res.status(404).json({ error: "UserId_email not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
Notifyemail_api.delete("/delete/:UserId_email", async (req, res) => {
  try {
    const userId_email = req.params.UserId_email;
    const deletedNotifyemail = await Notifyemail.findOne({
      where: { UserId_email: userId_email },
    });
    if (deletedNotifyemail) {
      await deletedNotifyemail.destroy();
      res.json({ message: "Notifyemail deleted successfully" });
    } else {
      res.status(404).json({ error: "UserId_email not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default Notifyemail_api;
