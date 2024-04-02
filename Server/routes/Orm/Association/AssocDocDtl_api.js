 import express from "express";
const AssocDocDtl_api = express.Router();
import Assocdocdtl from "../../../models/Association/AssocDocDtl_model.js";
 
AssocDocDtl_api.post("/create", async (req, res) => {
  try {
    const assocdocdtl = await Assocdocdtl.create(req.body);
    res.status(201).json({ message: "associationdocdetails created successfully", data: assocdocdtl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
AssocDocDtl_api.get("/read", async (req, res) => {
  try {
    const assocdocdtl = await Assocdocdtl.findAll();
    res.json({ message: "associationdocdetails retrieved successfully", data: assocdocdtl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
AssocDocDtl_api.get("/read/:ContractTypeCode", async (req, res) => {
  try {
    const contractTypeCode = req.params.ContractTypeCode;
    const assocdocdtl = await Assocdocdtl.findOne({
      where: { ContractTypeName: contractTypeCode },
    });
 
    if (assocdocdtl) {
      res.json({ message: "associationdocdetails retrieved successfully", data: assocdocdtl });
    } else {
      res.status(404).json({ error: "ContractTypeCode not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
AssocDocDtl_api.put("/update/:ContractTypeCode", async (req, res) => {
  try {
    const contractTypeCode = req.params.ContractTypeCode;
    const updatedAssociationdocdetails = req.body;
 
    const existingAssociationdocdetails = await Assocdocdtl.findOne({
      where: { ContractTypeName: contractTypeCode },
    });
 
    if (existingAssociationdocdetails) {
      await existingAssociationdocdetails.update(updatedAssociationdocdetails);
      res.json({ message: "associationdocdetails updated successfully", data: existingAssociationdocdetails });
    } else {
      res.status(404).json({ error: "ContractTypeCode not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
AssocDocDtl_api.delete("/delete/:ContractTypeCode", async (req, res) => {
  try {
    const contractTypeCode = req.params.ContractTypeCode;
 
    const deletedAssociationdocdetails = await Assocdocdtl.findOne({
      where: { ContractTypeName: contractTypeCode },
    });
 
    if (deletedAssociationdocdetails) {
      await deletedAssociationdocdetails.destroy();
      res.json({ message: "associationdocdetails deleted successfully" });
    } else {
      res.status(404).json({ error: "ContractTypeCode not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
export default AssocDocDtl_api;