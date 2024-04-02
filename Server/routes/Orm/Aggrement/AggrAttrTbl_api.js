import express from "express";
const AggrAttrTbl_api = express.Router();
import Aggrattrtbl from "../../../models/Aggrement/AggrAttrTbl_model.js";;
 
AggrAttrTbl_api.post("/create", async (req, res) => {
  try {
    const aggrattrtbl = await Aggrattrtbl.create(req.body);
    res.status(201).json({ message: "aggrementattribute created successfully", data: aggrattrtbl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
AggrAttrTbl_api.get("/read", async (req, res) => {
  try {
    const aggrattrtbl = await Aggrattrtbl.findAll();
    res.json({ message: "aggrementattribute retrieved successfully", data: aggrattrtbl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
AggrAttrTbl_api.get("/read/:Name", async (req, res) => {
  try {
    const name = req.params.Name;
    const aggrattrtbl = await Aggrattrtbl.findOne({
        where: { Name: name },
    });
 
    if (aggrattrtbl) {
      res.json({ message: "aggrementattribute retrieved successfully", data: aggrattrtbl });
    } else {
      res.status(404).json({ error: "Name not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
AggrAttrTbl_api.put("/update/:Name", async (req, res) => {
  try {
    const name = req.params.Name;
    const updatedAggrementattribute = req.body;
 
    const existingAggrementattribute = await Aggrattrtbl.findOne({
        where: { Name: name },
    });
 
    if (existingAggrementattribute) {
      await existingAggrementattribute.update(updatedAggrementattribute);
      res.json({ message: "aggrementattribute updated successfully", data: existingAggrementattribute });
    } else {
      res.status(404).json({ error: "Name not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
AggrAttrTbl_api.delete("/delete/:Name", async (req, res) => {
  try {
    const name = req.params.Name;
    const deletedAggrementattribute = await Aggrattrtbl.findOne({
        where: { Name: name },
    });
 
    if (deletedAggrementattribute) {
      await deletedAggrementattribute.destroy();
      res.json({ message: "aggrementattribute deleted successfully" });
    } else {
      res.status(404).json({ error: "Name not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
export default AggrAttrTbl_api;