import express from "express";
const agreement_api = express.Router();
import Agreement from "../../models/agreement_model.js";

agreement_api.post("/create", async (req, res) => {
  try {
    const agreement = await Agreement.create(req.body);
    res
      .status(201)
      .json({ message: "Agreement created successfully", agreement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

agreement_api.get("/read/:contractid", async (req, res) => {
  try {
    const contractid = req.params.contractid;
    const agreement = await Agreement.findOne({
      where: { contractid: contractid },
    });

    if (agreement) {
      res.json(agreement);
    } else {
      res.status(404).json({ error: "contractid not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

agreement_api.put("/update/:contractid", async (req, res) => {
  try {
    const contractid = req.params.contractid;
    const updatedAgreement = req.body; // Updated agreement data from the request body

    const existingAgreement = await Agreement.findOne({
      where: { contractid: contractid },
    });

    if (existingAgreement) {
      await existingAgreement.update(updatedAgreement); // Update the existing attribute with new data
      res
        .status(201)
        .json({ message: "Agreement updated successfully", existingAgreement });
    } else {
      res.status(404).json({ error: "contractid not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

agreement_api.delete("/delete/:contractid", async (req, res) => {
  try {
    const contractid = req.params.contractid;
    const deletedAgreement = await Agreement.findOne({
      where: { contractid: contractid },
    });

    if (deletedAgreement) {
      await deletedAgreement.destroy(); // Delete the attribute from the database
      res.json({ message: "Agreement deleted successfully" });
    } else {
      res.status(404).json({ error: "contractid not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default agreement_api;
