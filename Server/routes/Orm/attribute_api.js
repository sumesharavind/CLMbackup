import express, { response } from "express";
const attribute_api = express.Router();
import Attribute from "../../models/attribute_model.js";

attribute_api.post("/create", async (req, res) => {
  try {
    let attr = req.body;
    //  res.json(JSON.stringify(attr));
    const attribute = await Attribute.create(req.body);
    res.status(201).json(attribute); // HTTP status 201 indicates resource creation success
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

attribute_api.get("/read", async (req, res) => {
  try {
    const attributes = await Attribute.findAll();
    res.json(attributes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

attribute_api.get("/read/:AttributeCode", async (req, res) => {
  try {
    const attributeCode = req.params.AttributeCode;
    const attribute = await Attribute.findOne({
      where: { DisplayName: attributeCode },
    });

    if (attribute) {
      res.json(attribute);
    } else {
      res.status(404).json({ error: "AttributeCode not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

attribute_api.put("/update/:AttributeCode", async (req, res) => {
  try {
    const attributeCode = req.params.AttributeCode;
    const updatedAttribute = req.body; // Updated attribute data from the request body

    const existingAttribute = await Attribute.findOne({
      where: { DisplayName: attributeCode },
    });

    if (existingAttribute) {
      await existingAttribute.update(updatedAttribute); // Update the existing attribute with new data
      res.json(existingAttribute); // Respond with the updated attribute
    } else {
      res.status(404).json({ error: "AttributeCode not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

attribute_api.delete("/delete/:AttributeCode", async (req, res) => {
  try {
    const attributeCode = req.params.AttributeCode;

    const deletedAttribute = await Attribute.findOne({
      where: { DisplayName: attributeCode },
    });

    if (deletedAttribute) {
      await deletedAttribute.destroy(); // Delete the attribute from the database
      res.json({ message: "Attribute deleted successfully" });
    } else {
      res.status(404).json({ error: "AttributeCode not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default attribute_api;
