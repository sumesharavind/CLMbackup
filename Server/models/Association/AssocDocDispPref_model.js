// given by CA 01/12/2023
import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Assocdocdtl from "./AssocDocDtl_model.js";

const { DataTypes } = Sequelize;

const Assocdocdisppref = db.define(
  "assocdocdisppref",
  {
    AttributeName: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    CTCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    Sequence: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Assocdocdisppref.belongsTo(Assocdocdtl, {
  foreignKey: "CTCode", // This should match the column name in assocdocdisppref table
  targetKey: "ContractTypeCode", // This should match the column name in assocdocdtl table
});

export default Assocdocdisppref;
