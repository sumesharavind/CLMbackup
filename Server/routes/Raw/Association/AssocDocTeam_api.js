import express from "express";
import db from "../../../config/Database.js";
import { BOOLEAN, Sequelize, QueryTypes} from "sequelize";
const AssocDocTeam_api = express.Router();


AssocDocTeam_api.post('/create', async (req, res, next) => {
    const agr = req.body;
    {
        // res.json(agr);
        // Fields are present, proceed with the insertion
        const sqlquery = `
          INSERT INTO assocdocteam(
            TeamMembName,
            CTC, 
            Role, 
            Email,
            Status
           
          ) VALUES (?, ?, ?, ?, ?)`;
     
        const values = [
            agr.TeamMembName, 
            agr.CTC, 
            agr.Role, 
            agr.Email,
            agr.Status,
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
            console.error(err);
            return res.status(500).json(err);
          });
 

      } 
    });




AssocDocTeam_api.get('/read/:TeamMembName', async (req, res) => {
    
        
      try {
        
            const TeamMembName = req.params.TeamMembName;
            const agr = req.body;
              
            const results = await db.query("SELECT * FROM assocdocteam WHERE TeamMembName=?", 
            { 
              type: QueryTypes.SELECT,
              replacements: [TeamMembName],
        
           });
            console.log(results); 
            res.json(results);
          } 
          catch (err) {
            res.status(500).json(err);
          }
        });

AssocDocTeam_api.get('/read', async (req, res) => {
      try {
        const results = await db.query("SELECT * FROM assocdocteam", { type: QueryTypes.SELECT });
        res.json(results);
      } catch (err) {
        res.status(500).json(err);
      }
    });     



AssocDocTeam_api.put('/update/:TeamMembName', (req, res, next) => {
      const TeamMembName= req.params.TeamMembName; // Corrected variable name
      const agr = req.body;
  
      const query = `
          UPDATE assocdocteam
          SET
          CTC = :CTC,
          Role = :Role,
          Email= :Email,
          Status = :Status 
          WHERE TeamMembName = :TeamMembName`;
  
      db.query(query, {
          replacements: {
            CTC:agr.CTC,
            Role:agr.Role,
            Email:agr.Email,
            Status:agr.Status,
            TeamMembName: TeamMembName // Corrected variable name
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


AssocDocTeam_api.delete('/delete/:TeamMembName', (req, res, next) => {
    const TeamMembName = req.params.TeamMembName;
    var query = "DELETE FROM assocdocteam  WHERE TeamMembName=?";
    db.query(query, {
        type:QueryTypes.DELETE,
        replacements: [TeamMembName],
    }, (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "TeamMembName not found" });
            }
            console.log("TeamMembName Deleted successfully");
            return res.status(200).json({ message: "TeamMembName Deleted successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
  });

export default AssocDocTeam_api;
