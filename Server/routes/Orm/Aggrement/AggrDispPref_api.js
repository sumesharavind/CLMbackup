import express from "express";
const AggrDispPref_api = express.Router();
import Aggrdisppref from "../../../models/Aggrement/AggrDispPref_model.js";

AggrDispPref_api.post("/create", async (req, res) => {
    try {
      const aggrdisppref = await Aggrdisppref.create(req.body);
      res.status(201).json({ message: "AgreementDisplayPreference created successfully", data: aggrdisppref });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
AggrDispPref_api.get("/read", async (req, res) => {
    try {
      const aggrdisppref = await Aggrdisppref.findAll();
      res.json({ message: "AgreementDisplayPreference retrieved successfully", data: aggrdisppref });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
AggrDispPref_api.get("/read/:AttributeName", async (req, res) => {
    try {
      const attributeName = req.params.AttributeName;
      const aggrdisppref = await Aggrdisppref.findOne({
        where: { AttributeName: attributeName },
      });
  
      if (aggrdisppref) {
        res.json({ message: "AgreementDisplayPreference retrieved successfully", data: aggrdisppref });
      } else {
        res.status(404).json({ error: "AttributeName not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
AggrDispPref_api.put("/update/:AttributeName", async (req, res) => {
    try {
      const attributeName = req.params.AttributeName;
      const updatedAgreementDisplayPreference = req.body;
  
      const existingAgreementDisplayPreference = await Aggrdisppref.findOne({
        where: { AttributeName: attributeName },
      });
  
      if (existingAgreementDisplayPreference) {
        await existingAgreementDisplayPreference.update(updatedAgreementDisplayPreference);
        res.json({ message: "AgreementDisplayPreference updated successfully", data: existingAgreementDisplayPreference });
      } else {
        res.status(404).json({ error: "AttributeName not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
AggrDispPref_api.delete("/delete/:AttributeName", async (req, res) => {
    try {
      const attributeName = req.params.AttributeName;
      const deletedAgreementDisplayPreference = await Aggrdisppref.findOne({
        where: { AttributeName: attributeName },
      });
  
      if (deletedAgreementDisplayPreference) {
        await deletedAgreementDisplayPreference.destroy();
        res.json({ message: "AgreementDisplayPreference deleted successfully" });
      } else {
        res.status(404).json({ error: "AttributeName not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
export default AggrDispPref_api;