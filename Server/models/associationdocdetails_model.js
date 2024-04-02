//given bu CA 28-12/2023
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Assocdocdtl = db.define(
  "assocdocdtl",
  {
    ContractTypeName: {
      type: DataTypes.STRING,
    },

    ContractTypeCode: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    Description: {
      type: DataTypes.STRING,
    },

    AllowDocumentAssembly: {
      type: DataTypes.STRING,
    },

    AllowDocumentUpload: {
      type: DataTypes.STRING,
    },

    AggrConstraint: {
      type: DataTypes.STRING,
    },

    EnableApprovalWorkflow: {
      type: DataTypes.STRING,
    },

    ShowFileDropZone: {
      type: DataTypes.STRING,
    },

    TwoColumnAttributeLayout: {
      type: DataTypes.STRING,
    },

    EnableBulkProcessing: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Assocdocdtl;
