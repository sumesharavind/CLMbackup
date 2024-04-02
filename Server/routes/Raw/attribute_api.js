import express from "express";
import db from "../../config/Database.js";
import { BOOLEAN, Sequelize, QueryTypes } from "sequelize";
const productrouter = express.Router();
productrouter.post("/createX", async (req, res) => {
  res.json("Hi");
});

productrouter.post("/create", async (req, res) => {
  let attr = req.body;
  //res.json("Server:"+ JSON.stringify(attr));
  /*if (
    attr.DisplayName &&
    attr.HtmlPrompt &&
    attr.DataType &&
    attr.HelpMessage &&
    attr.Description &&
    attr.Source &&
    attr.DefaultValue &&
    attr.IsDefault &&
    attr.IsEditable &&
    attr.IsMandatory &&
    attr.TrackingAttribute &&
    attr.IsUnique &&
    attr.DefinedByRule &&
    attr.IsInherit &&
    attr.IsSearchable &&
    attr.IsConditional &&
    attr.IsSupersedableByAmmendments &&
    attr.IsSupersedableByAssignments &&
    attr.IsSupersedableByTermination
  ) {*/
  // res.json("Hi");

  let sqlquery = `INSERT INTO attribute (
 
         DisplayName,
         HtmlPrompt,
         DataType,
         HelpMessage,
         Description,
         Source,
         DefaultValue,
         IsDefault,
         IsEditable,
         IsMandatory,
         TrackingAttribute,
         IsUnique,
         DefinedByRule,
         IsInherit,
         IsSearchable,
         IsConditional,
         IsSupersedableByAmmendments,
         IsSupersedableByAssignments,
         IsSupersedableByTermination,
         IsLookup,
         IsMultiSelect,
         HasLookupFilter,
         IsCascade,
         JustificationRequired,
         IsInheriteonAmendment,
         IsDependonvaluebyReference,
         EnableExpressions
     ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  const values = [
    attr.DisplayName,
    attr.HtmlPrompt,
    attr.DataType,
    attr.HelpMessage,
    attr.Description,
    attr.Source,
    attr.DefaultValue,
    attr.IsDefault,
    attr.IsEditable,
    attr.IsMandatory,
    attr.TrackingAttribute,
    attr.IsUnique,
    attr.DefinedByRule,
    attr.IsInherit,
    attr.IsSearchable,
    attr.IsConditional,
    attr.IsSupersedableByAmmendments,
    attr.IsSupersedableByAssignments,
    attr.IsSupersedableByTermination,
    attr.IsLookup,
    attr.IsMultiSelect,
    attr.HasLookupFilter,
    attr.IsCascade,
    attr.JustificationRequired,
    attr.IsInheriteonAmendment,
    attr.IsDependonvaluebyReference,
    attr.EnableExpressions,
  ];
  //res.json(values);
  await db.query(
    sqlquery,
    {
      type: QueryTypes.INSERT,
      replacements: values,
    },
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Data Added Successfully" });
      } else {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );
  /*} else {
    return res.json({ error: "Missing required fields" });
  }*/
});

productrouter.get("/read", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM attribute", {
      type: QueryTypes.SELECT,
    });
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

productrouter.get("/read/:AttributeCode", async (req, res) => {
  try {
    const AttributeCode = req.params.AttributeCode;
    const attr = req.body;

    const results = await db.query(
      "SELECT * FROM attribute WHERE DisplayName=?",
      {
        type: QueryTypes.SELECT,
        replacements: [AttributeCode],
      }
    );
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

productrouter.delete("/delete/:AttributeCode", (req, res, next) => {
  const AttributeCode = req.params.AttributeCode;
  var query = "DELETE FROM attribute WHERE AttributeCode=?";
  db.query(
    query,
    {
      type: QueryTypes.DELETE,
      replacements: [AttributeCode],
    },
    (err, results) => {
      if (!err) {
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Attribute Code not found" });
        }
        return res
          .status(200)
          .json({ message: "Attribute Deleted successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

productrouter.put("/update/:AttributeCode", (req, res, next) => {
  const AttributeCode = req.params.AttributeCode;
  const attr = req.body;

  const query = `
      UPDATE attribute
      SET
      DisplayName = :DisplayName,
      HtmlPrompt = :HtmlPrompt,
      DataType = :DataType,
      HelpMessage = :HelpMessage,
      Description = :Description,
      Source = :Source,
      DefaultValue = :DefaultValue,
      IsDefault = :IsDefault,
      IsEditable = :IsEditable,
      IsMandatory = :IsMandatory,
      TrackingAttribute = :TrackingAttribute,
      IsUnique = :IsUnique,
      DefinedByRule = :DefinedByRule,
      IsInherit = :IsInherit,
      IsSearchable = :IsSearchable,
      IsConditional = :IsConditional,
      IsSupersedableByAmmendments = :IsSupersedableByAmmendments,
      IsSupersedableByAssignments = :IsSupersedableByAssignments,
      IsSupersedableByTermination = :IsSupersedableByTermination,
      IsLookup = :IsLookup,
      IsMultiSelect = :IsMultiSelect,
      HasLookupFilter = :HasLookupFilter,
      IsCascade = :IsCascade,
      JustificationRequired = :JustificationRequired,
      IsInheriteonAmendment = :IsInheriteonAmendment,
      IsDependonvaluebyReference = :IsDependonvaluebyReference,
      EnableExpressions = :EnableExpressions
      WHERE DisplayName = :AttributeCode`;

  db.query(query, {
    replacements: {
      DisplayName: attr.DisplayName,
      HtmlPrompt: attr.HtmlPrompt,
      DataType: attr.DataType,
      HelpMessage: attr.HelpMessage,
      Description: attr.Description,
      Source: attr.Source,
      DefaultValue: attr.DefaultValue,
      IsDefault: attr.IsDefault,
      IsEditable: attr.IsEditable,
      IsMandatory: attr.IsMandatory,
      TrackingAttribute: attr.TrackingAttribute,
      IsUnique: attr.IsUnique,
      DefinedByRule: attr.DefinedByRule,
      IsInherit: attr.IsInherit,
      IsSearchable: attr.IsSearchable,
      IsConditional: attr.IsConditional,
      IsSupersedableByAmmendments: attr.IsSupersedableByAmmendments,
      IsSupersedableByAssignments: attr.IsSupersedableByAssignments,
      IsSupersedableByTermination: attr.IsSupersedableByTermination,
      IsLookup: attr.IsLookup,
      IsMultiSelect: attr.IsMultiSelect,
      HasLookupFilter: attr.HasLookupFilter,
      IsCascade: attr.IsCascade,
      JustificationRequired: attr.JustificationRequired,
      IsInheriteonAmendment: attr.IsInheriteonAmendment,
      IsDependonvaluebyReference: attr.IsDependonvaluebyReference,
      EnableExpressions: attr.EnableExpressions,
      AttributeCode: AttributeCode,
    },
    type: QueryTypes.UPDATE,
  })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Attribute updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(err);
    });
});

export default productrouter;
