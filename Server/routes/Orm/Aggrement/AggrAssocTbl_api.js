import express from "express";
const AggrAssocTbl_api = express.Router();
import Aggrassoctbl from "../../../models/Aggrement/AggrAssocTbl_model.js";

AggrAssocTbl_api.post("/create", async (req, res) => {
  try {
    const aggrassoctbl = await Aggrassoctbl.create(req.body);
    res.status(201).json({ message: "Aggrementassociation created successfully", data: aggrassoctbl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AggrAssocTbl_api.get("/read", async (req, res) => {
  try {
    const aggrassoctbl = await Aggrassoctbl.findAll();
    res.json({ message: "Aggrementassociation retrieved successfully", data: aggrassoctbl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AggrAssocTbl_api.get("/read/:AssociationName", async (req, res) => {
  try {
    const associationName = req.params.AssociationName;
    const aggrassoctbl = await Aggrassoctbl.findOne({
        where: { AssociationName: associationName },
    });

    if (aggrassoctbl) {
      res.json({ message: "Aggrementassociation retrieved successfully", data: aggrassoctbl });
    } else {
      res.status(404).json({ error: "AssociationName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AggrAssocTbl_api.put("/update/:AssociationName", async (req, res) => {
  try {
    const associationName = req.params.AssociationName;
    const updatedAggrementassociation = req.body;

    const existingAggrementassociation = await Aggrassoctbl.findOne({
        where: { AssociationName: associationName },
    });

    if (existingAggrementassociation) {
      await existingAggrementassociation.update(updatedAggrementassociation);
      res.json({ message: "Aggrementassociation updated successfully", data: existingAggrementassociation });
    } else {
      res.status(404).json({ error: "AssociationName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AggrAssocTbl_api.delete("/delete/:AssociationName", async (req, res) => {
  try {
    const associationName = req.params.AssociationName;
    const deletedAggrementassociation = await Aggrassoctbl.findOne({
        where: { AssociationName: associationName },
    });

    if (deletedAggrementassociation) {
      await deletedAggrementassociation.destroy();
      res.json({ message: "Aggrementassociation deleted successfully" });
    } else {
      res.status(404).json({ error: "AssociationName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default AggrAssocTbl_api;