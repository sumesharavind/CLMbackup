// given by CA 01/12/2023
import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Assocdocdtl from "./AssocDocDtl_model.js";

const { DataTypes } = Sequelize;

const Assocdocteam = db.define(
  "assocdocteam",
  {
    TeamMembName: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    CTC: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  }
);

Assocdocteam.belongsTo(Assocdocdtl, {
  foreignKey: "CTC", // This should match the column name in assocdocteam table
  targetKey: "ContractTypeCode", // This should match the column name in assocdocdtl table
});

export default Assocdocteam;
