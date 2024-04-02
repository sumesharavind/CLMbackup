import express from "express";
const AggrTeamTbl_api = express.Router();
import Aggrteamtbl from "../../../models/Aggrement/AggrTeamTbl_model.js";

AggrTeamTbl_api.post("/create", async (req, res) => {
    try {
      const aggrteamtbl = await Aggrteamtbl.create(req.body);
      res.status(201).json({ message: "Aggrement Team created successfully", data: aggrteamtbl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
AggrTeamTbl_api.get("/read", async (req, res) => {
    try {
      const aggrteamtbl = await Aggrteamtbl.findAll();
      res.json({ message: "Aggrement Team retrieved successfully", data: aggrteamtbl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
AggrTeamTbl_api.get("/read/:TeamMembName", async (req, res) => {
    try {
      const teamMembName = req.params.TeamMembName;
      const aggrteamtbl = await Aggrteamtbl.findOne({
        where: { TeamMembName: teamMembName },
      });
  
      if (aggrteamtbl) {
        res.json({ message: "Aggrement Team retrieved successfully", data: aggrteamtbl });
      } else {
        res.status(404).json({ error: "TeamMembName not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
AggrTeamTbl_api.put("/update/:TeamMembName", async (req, res) => {
    try {
        const teamMembName = req.params.TeamMembName;
    const updatedAggrementTeam = req.body;
  
      const existingAggrementTeam = await Aggrteamtbl.findOne({
        where: { TeamMembName: teamMembName },
      });
  
      if (existingAggrementTeam) {
        await existingAggrementTeam.update(updatedAggrementTeam);
        res.json({ message: "Aggrement Team updated successfully", data: existingAggrementTeam });
      } else {
        res.status(404).json({ error: "TeamMembName not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
AggrTeamTbl_api.delete("/delete/:TeamMembName", async (req, res) => {
    try {
        const teamMembName = req.params.TeamMembName;
      const deletedAggrementTeam = await Aggrteamtbl.findOne({
        where: { TeamMembName: teamMembName },
      });
  
      if (deletedAggrementTeam) {
        await deletedAggrementTeam.destroy();
        res.json({ message: "Aggrement Team deleted successfully" });
      } else {
        res.status(404).json({ error: "TeamMembName not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  export default AggrTeamTbl_api;