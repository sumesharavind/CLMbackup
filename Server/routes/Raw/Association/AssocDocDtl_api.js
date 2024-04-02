import express from "express";
import db from "../../../config/Database.js";
import { BOOLEAN, Sequelize, QueryTypes} from "sequelize";
const AssocDocDtl_api = express.Router();
 
AssocDocDtl_api.get('/read', async (req, res) => {
    try {
      const results = await db.query("SELECT * FROM assocdocdtl", { type: QueryTypes.SELECT });
      res.json(results);
    } catch (err) {
      res.status(500).json(err);
    }
  });
 
 
 
 
  AssocDocDtl_api.post('/create', async (req, res, next) => {
    const agr = req.body;
    {
       // res.json(agr);
        // Fields are present, proceed with the insertion
        const sqlquery = `
          INSERT INTO assocdocdtl (
            ContractTypeName,
             Description,
            AllowDocumentAssembly,
            AllowDocumentUpload,
            AggrConstraint,
            EnableApprovalWorkflow,
            ShowFileDropZone,
            TwoColumnAttributeLayout,
            EnableBulkProcessing,
            IsPublished
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`;
     
        const values = [
          agr.ContractTypeName,
          agr.Description,
          agr.AllowDocumentAssembly,
          agr.AllowDocumentUpload ,
          agr.AggrConstraint,
          agr.EnableApprovalWorkflow ,
          agr.ShowFileDropZone ,
          agr.TwoColumnAttributeLayout ,
          agr.EnableBulkProcessing ,
          "No",
         
        ];
     
        // Execute the database query
        db.query(sqlquery, {
          replacements: values,
          type: QueryTypes.INSERT
        })
          .then((result) => {
            const insertedData = result[0];
            return res.status(200).json({ message: 'Agreement created successfully', data: insertedData});
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
          });
      } /*else {
        // Required fields are missing
        return res.status(400).json({ error: "Missing required fields" });
      }*/
    });
 
 
 
   
 
 
AssocDocDtl_api.get('/read/:ContractTypeCode', async (req, res) => {
   
       
    try {
     
             const ContractTypeCode = req.params.ContractTypeCode;
             const agr = req.body;
           
          const results = await db.query("SELECT * FROM assocdocdtl WHERE ContractTypeCode=?",
          {
            type: QueryTypes.SELECT,
            replacements: [ContractTypeCode],
     
         });
          console.log(results);
          res.json(results);
        }
        catch (err) {
          res.status(500).json(err);
        }
      });
     
 
 
 
 
 
AssocDocDtl_api.delete('/delete/:ContractTypeCode', (req, res, next) => {
        const ContractTypeCode = req.params.ContractTypeCode;
        var query = "DELETE FROM assocdocdtl WHERE ContractTypeCode=?";
        db.query(query, {
            type:QueryTypes.DELETE,
            replacements: [ContractTypeCode],
        }, (err, results) => {
            if (!err) {
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: "ContractTypeCode not found" });
                }
                console.log("ContractTypeCode Deleted successfully");
                return res.status(200).json({ message: "ContractTypeCode Deleted successfully" });
            } else {
                return res.status(500).json(err);
            }
        });
      });
           
 
 
 
 
 
AssocDocDtl_api.put('/update/:ContractTypeCode', (req, res, next) => {
        const ContractTypeCode = req.params.ContractTypeCode;
        const agr = req.body;
     
        const query = `
          UPDATE assocdocdtl
          SET
          ContractTypeName = :ContractTypeName,
          Description = :Description,
          AllowDocumentAssembly = :AllowDocumentAssembly,
          AllowDocumentUpload= :AllowDocumentUpload,
          AggrConstraint = :AggrConstraint,
          EnableApprovalWorkflow = :EnableApprovalWorkflow,
          ShowFileDropZone = :ShowFileDropZone,
          TwoColumnAttributeLayout = :TwoColumnAttributeLayout,
          EnableBulkProcessing = :EnableBulkProcessing,
          IsPublished = :IsPublished
          WHERE ContractTypeCode = :ContractTypeCode`;
         
        db.query(query, {
            replacements: {
                ContractTypeName: agr.ContractTypeName,
                Description: agr.Description,
                AllowDocumentAssembly:agr. AllowDocumentAssembly,
                AllowDocumentUpload:agr. AllowDocumentUpload,
                AggrConstraint:agr.AggrConstraint,
                EnableApprovalWorkflow:agr.EnableApprovalWorkflow,
                ShowFileDropZone:agr. ShowFileDropZone,
                TwoColumnAttributeLayout:agr.TwoColumnAttributeLayout,
                EnableBulkProcessing :agr.EnableBulkProcessing,
                IsPublished:agr.IsPublished,
                ContractTypeCode: ContractTypeCode
            },
            type: QueryTypes.UPDATE
        })
        .then(() => {
            return res.status(200).json({ message: ' updated successfully' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json(err);
        });
      });
             
export default AssocDocDtl_api;