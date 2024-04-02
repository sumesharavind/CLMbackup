import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Aggrdtltbl from "./AggrDtlTbl_model.js";

const { DataTypes } = Sequelize;

const Aggrdisppref = db.define(
  "aggrdisppref",
  {
    AttributeName: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    CTCodeDis: {
      type: DataTypes.INTEGER,
    },

    Sequence: {
      type: DataTypes.INTEGER,
    },

    Field: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Field2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Aggrdisppref.belongsTo(Aggrdtltbl, {
  foreignKey: "CTCodeDis", // This should match the column name in aggrdisppref table
  targetKey: "ContractTypeCode", // This should match the column name in aggrdtltbl table
});

export default Aggrdisppref;
