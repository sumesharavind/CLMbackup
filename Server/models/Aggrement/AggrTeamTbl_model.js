import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Aggrdtltbl from "./AggrDtlTbl_model.js";

const { DataTypes } = Sequelize;

const Aggrteamtbl = db.define("aggrteamtbl",
{
    TeamMembName: {
      type: DataTypes.STRING,
      primaryKey: true
    },

    CTCteam: {
      type: DataTypes.INTEGER,
    },

    Role: {
      type: DataTypes.STRING,
    },

    Email: {
        type: DataTypes.STRING,
    },

    Status: {
        type: DataTypes.STRING,
    },
},
{
    freezeTableName: true,
    timestamps: false,
});

Aggrteamtbl.belongsTo(Aggrdtltbl, {
    foreignKey: "CTCteam", // This should match the column name in aggrteamtbl table
    targetKey: "ContractTypeCode", // This should match the column name in aggrdtltbl table
  });
  
  export default Aggrteamtbl;