// given by 01/12/2023
import express from "express";
const AssocDocAttr_api = express.Router();
import Assocdocattr from "../../../models/Association/AssocDocAttr_model.js";

AssocDocAttr_api.post("/create", async (req, res) => {
  try {
    // res.json("Attrserver = " + JSON.stringify(req.body));
    const assocdocattr = await Assocdocattr.create(req.body);
    res.status(201).json({
      message: "AssociationDocAttribute created successfully",
      data: assocdocattr,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocAttr_api.get("/read", async (req, res) => {
  try {
    const assocdocattr = await Assocdocattr.findAll();
    res.json({
      message: "AssociationDocAttribute retrieved successfully",
      data: assocdocattr,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocAttr_api.get("/read/:DisplayName", async (req, res) => {
  try {
    const displayName = req.params.DisplayName;
    const assocdocattr = await Assocdocattr.findOne({
      where: { DisplayName: displayName },
    });

    if (assocdocattr) {
      res.json({
        message: "AssociationDocAttribute retrieved successfully",
        data: assocdocattr,
      });
    } else {
      res.status(404).json({ error: "DisplayName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocAttr_api.put("/update/:DisplayName", async (req, res) => {
  try {
    const displayName = req.params.DisplayName;
    const updatedAssociationDocAttribute = req.body;

    const existingAssociationDocAttribute = await Assocdocattr.findOne({
      where: { DisplayName: displayName },
    });

    if (existingAssociationDocAttribute) {
      await existingAssociationDocAttribute.update(
        updatedAssociationDocAttribute
      );
      res.json({
        message: "AssociationDocAttribute updated successfully",
        data: existingAssociationDocAttribute,
      });
    } else {
      res.status(404).json({ error: "DisplayName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AssocDocAttr_api.delete("/delete/:DisplayName", async (req, res) => {
  try {
    const displayName = req.params.DisplayName;
    const deletedAssociationDocAttribute = await Assocdocattr.findOne({
      where: { DisplayName: displayName },
    });

    if (deletedAssociationDocAttribute) {
      await deletedAssociationDocAttribute.destroy();
      res.json({ message: "AssociationDocAttribute deleted successfully" });
    } else {
      res.status(404).json({ error: "DisplayName not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default AssocDocAttr_api;
