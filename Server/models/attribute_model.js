import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Attribute = db.define(
  "attribute",
  {
    AttributeCode: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    DisplayName: {
      type: DataTypes.STRING,
    },

    Name: {
      type: DataTypes.STRING,
    },

    HtmlPrompt: {
      type: DataTypes.STRING,
    },

    DataType: {
      type: DataTypes.STRING,
    },

    HelpMessage: {
      type: DataTypes.STRING,
    },

    Description: {
      type: DataTypes.STRING,
    },

    Source: {
      type: DataTypes.STRING,
    },

    DefaultValue: {
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

    DefinedByRule: {
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

    IsSupersedableByAmmendments: {
      type: DataTypes.STRING,
    },

    IsSupersedableByAssignments: {
      type: DataTypes.STRING,
    },

    IsSupersedableByTermination: {
      type: DataTypes.STRING,
    },

    IsLookup: {
      type: DataTypes.STRING,
    },

    IsMultiSelect: {
      type: DataTypes.STRING,
    },

    HasLookupFilter: {
      type: DataTypes.STRING,
    },

    IsCascade: {
      type: DataTypes.STRING,
    },

    JustificationRequired: {
      type: DataTypes.STRING,
    },

    IsInheriteonAmendment: {
      type: DataTypes.STRING,
    },

    IsDependonvaluebyReference: {
      type: DataTypes.STRING,
    },

    EnableExpressions: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
/*
(async () => {
    await db.sync();
})();
*/
export default Attribute;
