import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Aggrdtltbl from "./AggrDtlTbl_model.js";

const { DataTypes } = Sequelize;

const Aggrassoctbl = db.define("aggrassoctbl",
{
    AssociationName: {
      type: DataTypes.STRING,
      primaryKey: true
    },

    AssociatedContractType:{
      type: DataTypes.STRING,
    },

    AllowInheritance:{
      type: DataTypes.STRING,
    },

    AllowMultipleInstance:{
      type: DataTypes.STRING,
    },

    IsMandatory:{
      type: DataTypes.STRING,
    },

    DefinedByRule:{
      type: DataTypes.STRING
    },

    AllowTwoWayLinkage:{
      type: DataTypes.STRING,
    },

    AllowPeerCreationWizard:{
      type: DataTypes.STRING,
    },

    InlineAssociation:{
      type: DataTypes.STRING,
    },

    CopyAssociationDuringAmendment:{
      type: DataTypes.STRING,
    },

    UseCustomNomenclature:{
        type: DataTypes.STRING,
    },

    ConTCode:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, 
{
    freezeTableName: true,
    timestamps: false,
});

Aggrassoctbl.belongsTo(Aggrdtltbl, {
    foreignKey: "ConTCode", // This should match the column name in aggrattrtbl table
    targetKey: "ContractTypeCode", // This should match the column name in aggrdtltbl table
  });

export default Aggrassoctbl;