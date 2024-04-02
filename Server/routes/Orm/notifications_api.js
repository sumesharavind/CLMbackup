import express from "express";
const Notifications_api = express.Router();
import Notifications from "../../models/notifications_model.js";

Notifications_api.post("/create", async (req, res) => {
  //res.json("server get notify " + JSON.stringify(req.body));
  try {
    const notifications = await Notifications.create(req.body);
    res.status(201).json({
      message: "Notifications created successfully",
      data: notifications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Notifications_api.get("/read", async (req, res) => {
  try {
    const notifications = await Notifications.findAll();
    res.json({
      message: "Notifications retrieved successfully",
      data: notifications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Notifications_api.get("/read/:UserId", async (req, res) => {
  try {
    const userId = req.params.UserId;
    const notifications = await Notifications.findOne({
      where: { UserId: userId },
    });

    if (notifications) {
      res.json({
        message: "Notifications retrieved successfully",
        data: notifications,
      });
    } else {
      res.status(404).json({ error: "UserId not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Notifications_api.get("/read/:UserId/:entityState", async (req, res) => {
  try {
    const userId = req.params.UserId;
    const entityState = req.params.entityState;
    // res.json("Userid = " + userId + "entityState ="+ entityState);
    const notifications = await Notifications.findAll({
      where: { UserId: userId, EntityStatus: entityState },
    });

    if (notifications) {
      res.json({
        message: "Notifications retrieved successfully",
        data: notifications,
      });
    } else {
      res.status(404).json({ error: "UserId  not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Notifications_api.put("/update/:UserId/:NotificationId", async (req, res) => {
  try {
    const userId = req.params.UserId;
    const NotificationId = req.params.NotificationId;
    const updatedNotifications = req.body;

    const existingNotifications = await Notifications.findOne({
      where: { UserId: userId, NotificationId: NotificationId },
    });

    if (existingNotifications) {
      await existingNotifications.update(updatedNotifications);
      res.json({
        message: "Notifications updated successfully",
        data: existingNotifications,
      });
    } else {
      res.status(404).json({ error: "UserId not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Notifications_api.put("/update/:UserId", async (req, res) => {
  try {
    const userId = req.params.UserId;
    const updatedNotifications = req.body;

    const existingNotifications = await Notifications.findOne({
      where: { UserId: userId },
    });

    if (existingNotifications) {
      await existingNotifications.update(updatedNotifications);
      res.json({
        message: "Notifications updated successfully",
        data: existingNotifications,
      });
    } else {
      res.status(404).json({ error: "UserId not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Notifications_api.delete("/delete/:UserId", async (req, res) => {
  try {
    const userId = req.params.UserId;
    const deletedNotifications = await Notifications.findOne({
      where: { UserId: userId },
    });

    if (deletedNotifications) {
      await deletedNotifications.destroy();
      res.json({ message: "Notifications deleted successfully" });
    } else {
      res.status(404).json({ error: "UserId not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default Notifications_api;
