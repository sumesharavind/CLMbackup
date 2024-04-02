import express from "express";
import db from "../../../config/Database.js";
import { BOOLEAN, Sequelize, QueryTypes} from "sequelize";
const AssocDocDispPref_api = express.Router();



AssocDocDispPref_api.post('/create', async (req, res, next) => {
    const agr = req.body;
    {
        // res.json(agr);
        // Fields are present, proceed with the insertion
        const sqlquery = `
          INSERT INTO assocdocdisppref (
            AttributeName, 
            CTCode, 
            Sequence
           
          ) VALUES (?, ?, ?)`;
     
        const values = [
            agr.AttributeName, 
            agr.CTCode, 
            agr.Sequence, 
            
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
 

      } 
    });



AssocDocDispPref_api.get('/read', async (req, res) => {
        try {
          const results = await db.query("SELECT * FROM assocdocdisppref", { type: QueryTypes.SELECT });
          res.json(results);
        } catch (err) {
          res.status(500).json(err);
        }
      }); 




AssocDocDispPref_api.get('/read/:AttributeName', async (req, res) => {
    
        
        try {
          
              const AttributeName = req.params.AttributeName;
              const agr = req.body;
                
              const results = await db.query("SELECT * FROM assocdocdisppref WHERE AttributeName=?", 
              { 
                type: QueryTypes.SELECT,
                replacements: [AttributeName],
          
             });
              console.log(results); 
              res.json(results);
            } 
            catch (err) {
              res.status(500).json(err);
            }
          });
          



AssocDocDispPref_api.delete('/delete/:AttributeName', (req, res, next) => {
            const AttributeName = req.params.AttributeName;
            var query = "DELETE FROM assocdocdisppref  WHERE AttributeName=?";
            db.query(query, {
                type:QueryTypes.DELETE,
                replacements: [AttributeName],
            }, (err, results) => {
                if (!err) {
                    if (results.affectedRows === 0) {
                        return res.status(404).json({ message: "AttributeName not found" });
                    }
                    console.log("AttributeName Deleted successfully");
                    return res.status(200).json({ message: "AttributeName Deleted successfully" });
                } else {
                    return res.status(500).json(err);
                }
            });
          });




AssocDocDispPref_api.put('/update/:AttributeName', (req, res, next) => {
            const AttributeName = req.params.AttributeName; // Corrected variable name
            const agr = req.body;
        
            const query = `
                UPDATE assocdocdisppref 
                SET
                CTCode = :CTCode,
                Sequence = :Sequence 
                WHERE AttributeName = :AttributeName`;
        
            db.query(query, {
                replacements: {
                    CTCode: agr.CTCode,
                    Sequence: agr.Sequence,
                    AttributeName: AttributeName // Corrected variable name
                },
                type: QueryTypes.UPDATE
            })
            .then(() => {
                return res.status(200).json({ message: 'Updated successfully' });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json(err);
            });
        });
        







export default AssocDocDispPref_api;
