import express from "express";
import db from "../../../config/Database.js";
import { BOOLEAN, Sequelize, QueryTypes} from "sequelize";
const AssocDocAttr_api = express.Router();




AssocDocAttr_api.post('/create', async (req, res, next) => {
    const agr = req.body;
  
   //  res.json(agr);
        // Fields are present, proceed with the insertion
     const sqlquery = `
          INSERT INTO assocdocattr (
            DisplayName, 
            DataType, 
            HelpMessage, 
            DefaultValue, 
            IsDefault, 
            IsEditable, 
            IsMandatory, 
            TrackingAttribute, 
            IsUnique, 
            DefinedbyRule, 
            IsInherit, 
            IsSearchable, 
            IsConditional, 
            IsLookup,
            IsGlobal, 
            HtmlPrompt,
            ContractTypeCode
           
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`;
     
        const values = [
            agr.DisplayName, 
            agr.DataType, 
            agr.HelpMessage, 
            agr.DefaultValue, 
            agr.IsDefault, 
            agr.IsEditable, 
            agr.IsMandatory , 
            agr.TrackingAttribute, 
            agr.IsUnique , 
            agr.DefinedbyRule, 
            agr.IsInherit , 
            agr.IsSearchable , 
            agr.IsConditional , 
            agr.IsLookup ,
            agr.IsGlobal , 
            agr.HtmlPrompt,
            agr.ContractTypeCode,
          
         
        ];
     
        // Execute the database query
        db.query(sqlquery, {
          replacements: values,
          type: QueryTypes.INSERT
        })
          .then((result) => {
            const insertedData = result[0];
            return res.status(200).json({ message: 'Agreement created successfully', data: insertedData });
          })
          .catch((err) => {
            console.error("Hi"+err);
            return res.status(500).json("Hello"+err);
          });


     
    });




AssocDocAttr_api.get('/read', async (req, res) => {
        try {
          const results = await db.query("SELECT * FROM assocdocattr", { type: QueryTypes.SELECT });
          res.json(results);
        } catch (err) {
          res.status(500).json(err);
        }
      }); 
      
      


AssocDocAttr_api.get('/read/:DisplayName', async (req, res) => {
    
        
        try {
          
              const DisplayName = req.params.DisplayName;
              const agr = req.body;
                
              const results = await db.query("SELECT * FROM assocdocattr WHERE DisplayName=?", 
              { 
                type: QueryTypes.SELECT,
                replacements: [DisplayName],
          
             });
              console.log(results); 
              res.json(results);
            } 
            catch (err) {
              res.status(500).json(err);
            }
          });
          
       
AssocDocAttr_api.delete('/delete/:DisplayName', (req, res, next) => {
            const DisplayName = req.params.DisplayName;
            var query = "DELETE FROM assocdocattr WHERE DisplayName=?";
            db.query(query, {
                type:QueryTypes.DELETE,
                replacements: [DisplayName],
            }, (err, results) => {
                if (!err) {
                    if (results.affectedRows === 0) {
                        return res.status(404).json({ message: "DisplayName not found" });
                    }
                    console.log("DisplayName Deleted successfully");
                    return res.status(200).json({ message: "DisplayName Deleted successfully" });
                } else {
                    return res.status(500).json(err);
                }
            });
          });
                



AssocDocAttr_api.put('/update/:DisplayName', (req, res, next) => {
            const DisplayName = req.params.DisplayName;
            const agr = req.body;
          
            const query = `
              UPDATE assocdocattr 
              SET
              DataType = :DataType,
              HelpMessage = :HelpMessage,
              DefaultValue = :DefaultValue,
              IsDefault = :IsDefault,
              IsEditable = :IsEditable,
              IsMandatory = :IsMandatory,
              TrackingAttribute = :TrackingAttribute,
              IsUnique = :IsUnique,
              DefinedbyRule = :DefinedbyRule,
              IsInherit = :IsInherit,
              IsSearchable = :IsSearchable,
              IsConditional = :IsConditional,
              IsLookup = :IsLookup,
              IsGlobal = :IsGlobal,
              HtmlPrompt = :HtmlPrompt,
              ContractTypeCode = :ContractTypeCode
              WHERE DisplayName = :DisplayName`;
              
            db.query(query, {
                replacements: {
                  DataType:agr.DataType,
                  HelpMessage:agr.HelpMessage,
                  DefaultValue:agr.DefaultValue,
                  IsDefault :agr.IsDefault,
                  IsEditable :agr.IsEditable,
                  IsMandatory:agr.IsMandatory,
                  TrackingAttribute :agr.TrackingAttribute,
                  IsUnique :agr.IsUnique,
                  DefinedbyRule :agr.DefinedbyRule,
                  IsInherit :agr.IsInherit,
                  IsSearchable :agr.IsSearchable,
                  IsConditional:agr.IsConditional,
                  IsLookup:agr.IsLookup,
                  IsGlobal:agr.IsGlobal,
                  HtmlPrompt:agr.HtmlPrompt,
                  ContractTypeCode :agr.ContractTypeCode,
                  DisplayName:DisplayName
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
export default AssocDocAttr_api;