// given by 01/12/2023
import express from "express";
const AssocDocTeam_api = express.Router();
import Assocdocteam from "../../../models/Association/AssocDocTeam_model.js";

AssocDocTeam_api.post("/create", async (req, res) => {
  try {
    const assocdocteam = await Assocdocteam.create(req.body);
    res
      .status(201)
      .json({
        message: "AssociationDocTeam created successfully",
        data: assocdocteam,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocTeam_api.get("/read", async (req, res) => {
  try {
    const assocdocteam = await Assocdocteam.findAll();
    res.json({
      message: "AssociationDocTeam retrieved successfully",
      data: assocdocteam,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocTeam_api.get("/read/:TeamMembName", async (req, res) => {
  try {
    const teamMembName = req.params.TeamMembName;
    const assocdocteam = await Assocdocteam.findOne({
      where: { TeamMembName: teamMembName },
    });

    if (assocdocteam) {
      res.json({
        message: "AssociationDocTeam retrieved successfully",
        data: assocdocteam,
      });
    } else {
      res.status(404).json({ error: "TeamMembName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocTeam_api.put("/update/:TeamMembName", async (req, res) => {
  try {
    const teamMembName = req.params.TeamMembName;
    const updatedAssociationDocTeam = req.body;

    const existingAssociationDocTeam = await Assocdocteam.findOne({
      where: { TeamMembName: teamMembName },
    });

    if (existingAssociationDocTeam) {
      await existingAssociationDocTeam.update(updatedAssociationDocTeam);
      res.json({
        message: "AssociationDocTeam updated successfully",
        data: existingAssociationDocTeam,
      });
    } else {
      res.status(404).json({ error: "TeamMembName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocTeam_api.delete("/delete/:TeamMembName", async (req, res) => {
  try {
    const teamMembName = req.params.TeamMembName;
    const deletedAssociationDocTeam = await Assocdocteam.findOne({
      where: { TeamMembName: teamMembName },
    });

    if (deletedAssociationDocTeam) {
      await deletedAssociationDocTeam.destroy();
      res.json({ message: "AssociationDocTeam deleted successfully" });
    } else {
      res.status(404).json({ error: "TeamMembName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default AssocDocTeam_api;
