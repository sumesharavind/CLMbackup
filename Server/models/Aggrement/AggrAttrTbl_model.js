import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Aggrdtltbl from "./AggrDtlTbl_model.js";

const { DataTypes } = Sequelize;

const Aggrattrtbl = db.define("aggrattrtbl",
{
    Name: {
      type: DataTypes.STRING,
      primaryKey: true
    },

    DisplayName:{
      type: DataTypes.STRING,
    },

    PageName:{
      type: DataTypes.STRING,
    },

    HTMLPrompt:{
      type: DataTypes.STRING,
    },

    DataType:{
      type: DataTypes.STRING,
    },

    Group:{
      type: DataTypes.STRING
    },

    HelpMessage:{
      type: DataTypes.STRING,
    },

    Description:{
      type: DataTypes.STRING,
    },

    Source:{
      type: DataTypes.STRING,
    },

    DefaultValue:{
      type: DataTypes.STRING,
    },

    IsDefault:{
        type: DataTypes.STRING,
    },

    IsEditable:{
        type: DataTypes.STRING,
    },

    IsMandatory:{
        type: DataTypes.STRING,
    },

    TrackingAttribute:{
        type: DataTypes.STRING,
    },

    IsUnique:{
        type: DataTypes.STRING,
    },

    DefinedByRule:{
        type: DataTypes.STRING,
    },

    IsInherit:{
        type: DataTypes.STRING,
    },

    IsSearchable:{
        type: DataTypes.STRING,
    },

    IsConditional:{
        type: DataTypes.STRING,
    },

    IsLookup:{
        type: DataTypes.STRING,
    },

    ContractTCode:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, 
{
    freezeTableName: true,
    timestamps: false,
});

Aggrattrtbl.belongsTo(Aggrdtltbl, {
    foreignKey: "ContractTCode", // This should match the column name in aggrattrtbl table
    targetKey: "ContractTypeCode", // This should match the column name in aggrdtltbl table
  });

export default Aggrattrtbl;