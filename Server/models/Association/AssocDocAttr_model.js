// given by CA 01/12/2023
import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Assocdocdtl from "./AssocDocDtl_model.js";

const { DataTypes } = Sequelize;

const Assocdocattr = db.define(
  "assocdocattr",
  {
    DisplayName: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },

    ContractTypeCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    DataType: {
      type: DataTypes.STRING,
    },

    HelpMessage: {
      type: DataTypes.STRING,
    },

    DefaultValue: {
      type: DataTypes.STRING,
    },

    HtmlPrompt: {
      type: DataTypes.STRING,
    },

    IsGlobal: {
      type: DataTypes.STRING,
    },

    IsDefault: {
      type: DataTypes.STRING,
    },

    IsEditable: {
      type: DataTypes.STRING,
    },

    IsMandatory: {
      type: DataTypes.STRING,
    },

    TrackingAttribute: {
      type: DataTypes.STRING,
    },

    IsUnique: {
      type: DataTypes.STRING,
    },

    DefinedbyRule: {
      type: DataTypes.STRING,
    },

    IsInherit: {
      type: DataTypes.STRING,
    },

    IsSearchable: {
      type: DataTypes.STRING,
    },

    IsConditional: {
      type: DataTypes.STRING,
    },

    IsLookup: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Assocdocattr.belongsTo(Assocdocdtl, {
  foreignKey: "ContractTypeCode", // This should match the column name in assocdocattr table
  targetKey: "ContractTypeCode", // This should match the column name in assocdocdtl table
});

export default Assocdocattr;
