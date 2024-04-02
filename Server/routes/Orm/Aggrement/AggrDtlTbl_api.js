import express from "express";
const AggrDtlTbl_api = express.Router();
import Aggrdtltbl from "../../../models/Aggrement/AggrDtlTbl_model.js";

AggrDtlTbl_api.post("/create", async (req, res) => {
  try {
    const aggrdtltbl = await Aggrdtltbl.create(req.body);
    res.status(201).json({ message: "aggrementdetails created successfully", data: aggrdtltbl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AggrDtlTbl_api.get("/read", async (req, res) => {
  try {
    const aggrdtltbl = await Aggrdtltbl.findAll();
    res.json({ message: "aggrementdetails retrieved successfully", data: aggrdtltbl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AggrDtlTbl_api.get("/read/:ContractTypeCode", async (req, res) => {
  try {
    const contractTypeCode = req.params.ContractTypeCode;
    const aggrdtltbl = await Aggrdtltbl.findOne({
      where: { ContractTypeCode: contractTypeCode },
    });

    if (aggrdtltbl) {
      res.json({ message: "aggrementdetails retrieved successfully", data: aggrdtltbl });
    } else {
      res.status(404).json({ error: "ContractTypeCode not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AggrDtlTbl_api.put("/update/:ContractTypeCode", async (req, res) => {
  try {
    const contractTypeCode = req.params.ContractTypeCode;
    const updatedAggrementdetails = req.body;

    const existingAggrementdetails = await Aggrdtltbl.findOne({
      where: { ContractTypeCode: contractTypeCode },
    });

    if (existingAggrementdetails) {
      await existingAggrementdetails.update(updatedAggrementdetails);
      res.json({ message: "aggrementdetails updated successfully", data: existingAggrementdetails });
    } else {
      res.status(404).json({ error: "ContractTypeCode not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AggrDtlTbl_api.delete("/delete/:ContractTypeCode", async (req, res) => {
  try {
    const contractTypeCode = req.params.ContractTypeCode;

    const deletedAggrementdetails = await Aggrdtltbl.findOne({
      where: { ContractTypeCode: contractTypeCode },
    });

    if (deletedAggrementdetails) {
      await deletedAggrementdetails.destroy();
      res.json({ message: "aggrementdetails deleted successfully" });
    } else {
      res.status(404).json({ error: "ContractTypeCode not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default AggrDtlTbl_api;