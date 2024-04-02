import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Aggrdtltbl = db.define("aggrdtltbl",
{
    ContractTypeName: {
      type: DataTypes.STRING,
    },

    Description:{
      type: DataTypes.STRING,
    },

    Category:{
      type: DataTypes.STRING,
    },

    AllowThirdPartyPaper:{
      type: DataTypes.STRING,
    },

    AllowClauseAssembly:{
      type: DataTypes.STRING,
    },

    QRCode:{
      type: DataTypes.STRING
    },

    AllowCopywithAssociation:{
      type: DataTypes.STRING,
    },

    TwoColumnAttributeLayout:{
      type: DataTypes.STRING,
    },

    EnableCollaboration:{
      type: DataTypes.STRING,
    },

    EnableAutoSupersede:{
      type: DataTypes.STRING,
    },

    ExpandDropDownonMouseHover:{
        type: DataTypes.STRING,
    },

    ContractTypeCode:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
}, 
{
    freezeTableName: true,
    timestamps: false,
});

export default Aggrdtltbl;