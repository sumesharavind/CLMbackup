import express from "express";
import db from "../../config/Database.js";
import { BOOLEAN, Sequelize, QueryTypes } from "sequelize";
const agreement_api = express.Router();

agreement_api.post("/create", async (req, res, next) => {
  const agr = req.body;

  res.status(200).json({ agr });
});

agreement_api.get("/read", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM details", {
      type: QueryTypes.SELECT,
    });
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

agreement_api.get("/read/:contractid", async (req, res) => {
  try {
    const contractid = req.params.contractid;
    const agr = req.body;

    const results = await db.query("SELECT * FROM details WHERE contractid=?", {
      type: QueryTypes.SELECT,
      replacements: [contractid],
    });
    console.log(results);
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

agreement_api.delete("/delete/:contractid", (req, res, next) => {
  const contractid = req.params.contractid;
  var query = "DELETE FROM details WHERE contractid=?";
  db.query(
    query,
    {
      type: QueryTypes.DELETE,
      replacements: [contractid],
    },
    (err, results) => {
      if (!err) {
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "contractid not found" });
        }
        console.log("contractid Deleted successfully");
        return res
          .status(200)
          .json({ message: "contractid Deleted successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

agreement_api.put("/update/:contractid", (req, res, next) => {
  const contractid = req.params.contractid;
  const agr = req.body;

  const query = `
    UPDATE details
    SET
    ContractTypeName = :ContractTypeName,
    Description = :Description,
    Category = :Category,
    AllowThirdPartyPaper = :AllowThirdPartyPaper,
    AllowClauseAssembly = :AllowClauseAssembly,
    QRCode = :QRCode,
    AllowCopywithAssociations = :AllowCopywithAssociations,
    TwoColumnAttributeLayout = :TwoColumnAttributeLayout,
    EnableCollabration = :EnableCollabration,
    EnableAutoSupersede = :EnableAutoSupersede,
    ExpandDropdownonMouseHover = :ExpandDropdownonMouseHover,
    ContractTypeid = :ContractTypeid
    WHERE contractid = :contractid`;

  db.query(query, {
    replacements: {
      ContractTypeName: agr.ContractTypeName,

      Description: agr.Description,
      Category: agr.Category,
      AllowThirdPartyPaper: agr.AllowThirdPartyPaper,
      AllowClauseAssembly: agr.AllowClauseAssembly,
      QRCode: agr.QRCode,
      AllowCopywithAssociations: agr.AllowCopywithAssociations,
      TwoColumnAttributeLayout: agr.TwoColumnAttributeLayout,
      EnableCollabration: agr.EnableCollabration,
      EnableAutoSupersede: agr.EnableAutoSupersede,
      ExpandDropdownonMouseHover: agr.ExpandDropdownonMouseHover,
      ContractTypeid: agr.ContractTypeid,
      contractid: contractid,
    },
    type: QueryTypes.UPDATE,
  })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Agreement updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(err);
    });
});

export default agreement_api;
