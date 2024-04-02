//given by CA 01/12/2023
import express from "express";
const AssocDocDispPref_api = express.Router();
import Assocdocdisppref from "../../../models/Association/AssocDocDispPref_model.js";

AssocDocDispPref_api.post("/create", async (req, res) => {
  try {
    const assocdocdisppref = await Assocdocdisppref.create(req.body);
    res
      .status(201)
      .json({
        message: "AssociationDocDisplayPreference created successfully",
        data: assocdocdisppref,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocDispPref_api.get("/read", async (req, res) => {
  try {
    const assocdocdisppref = await Assocdocdisppref.findAll();
    res.json({
      message: "AssociationDocDisplayPreference retrieved successfully",
      data: assocdocdisppref,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocDispPref_api.get("/read/:AttributeName", async (req, res) => {
  try {
    const attributeName = req.params.AttributeName;
    const assocdocdisppref = await Assocdocdisppref.findOne({
      where: { AttributeName: attributeName },
    });

    if (assocdocdisppref) {
      res.json({
        message: "AssociationDocDisplayPreference retrieved successfully",
        data: assocdocdisppref,
      });
    } else {
      res.status(404).json({ error: "AttributeName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocDispPref_api.put("/update/:AttributeName", async (req, res) => {
  try {
    const attributeName = req.params.AttributeName;
    const updatedAssociationDocDisplayPreference = req.body;

    const existingAssociationDocDisplayPreference =
      await Assocdocdisppref.findOne({
        where: { AttributeName: attributeName },
      });

    if (existingAssociationDocDisplayPreference) {
      await existingAssociationDocDisplayPreference.update(
        updatedAssociationDocDisplayPreference
      );
      res.json({
        message: "AssociationDocDisplayPreference updated successfully",
        data: existingAssociationDocDisplayPreference,
      });
    } else {
      res.status(404).json({ error: "AttributeName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocDispPref_api.delete("/delete/:AttributeName", async (req, res) => {
  try {
    const attributeName = req.params.AttributeName;
    const deletedAssociationDocDisplayPreference =
      await Assocdocdisppref.findOne({
        where: { AttributeName: attributeName },
      });

    if (deletedAssociationDocDisplayPreference) {
      await deletedAssociationDocDisplayPreference.destroy();
      res.json({
        message: "AssociationDocDisplayPreference deleted successfully",
      });
    } else {
      res.status(404).json({ error: "AttributeName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default AssocDocDispPref_api;
