import express from "express";
const Users_api = express.Router();
import Users from "../../models/UserModel.js";

Users_api.post("/create", async (req, res) => {
    try {
      const users = await Users.create(req.body);
      res.status(201).json({ message: "Users Info created successfully", data: users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
Users_api.get("/read", async (req, res) => {
    try {
      const users = await Users.findAll();
      res.json({ message: "Users Info retrieved successfully", data: users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
Users_api.get("/read/:email", async (req, res) => {
    try {
      const Email = req.params.email;
      const users = await Users.findOne({
        where: { email: Email },
      });
  
      if (users) {
        res.json({ message: "Users Info retrieved successfully", data: users });
      } else {
        res.status(404).json({ error: "email not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
Users_api.put("/update/:email", async (req, res) => {
    try {
        const Email = req.params.email;
        const updatedUsers = req.body;
        const existingUsers = await Users.findOne({
            where: { email: Email },
      });
  
      if (existingUsers) {
        await existingUsers.update(updatedUsers);
        res.json({ message: "Users Info updated successfully", data: existingUsers });
      } else {
        res.status(404).json({ error: "email not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
Users_api.delete("/delete/:email", async (req, res) => {
    try {
        const Email = req.params.email;
        const deletedUsers = await Users.findOne({
        where: { email: Email },
      });
  
      if (deletedUsers) {
        await deletedUsers.destroy();
        res.json({ message: "Users Info deleted successfully" });
      } else {
        res.status(404).json({ error: "email not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
export default Users_api;