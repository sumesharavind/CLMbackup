import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Agreement = db.define('details', {
    ContractTypeName:{
        type: DataTypes.STRING
    },
    
    ContractTypeid: {
        type: DataTypes.STRING
    },
    
    Description:{
        type: DataTypes.STRING
    },
    
    Category:{
        type: DataTypes.STRING
    },
    
    AllowThirdPartyPaper:{
        type: DataTypes.BOOLEAN
    },
    
    AllowClauseAssembly:{
        type: DataTypes.BOOLEAN
    },
    
    QRCode:{
        type: DataTypes.BOOLEAN
    },
    
    AllowCopywithAssociations:{
        type: DataTypes.BOOLEAN
    },
    
    TwoColumnAttributeLayout:{
        type: DataTypes.BOOLEAN
    },

    EnableCollabration:{
        type: DataTypes.BOOLEAN
    },

    EnableAutoSupersede:{
        type: DataTypes.BOOLEAN
    },

    ExpandDropdownonMouseHover:{
        type: DataTypes.BOOLEAN
    },

    contractid:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false,
});
/*
(async () => {                         // modified on 25.10.2023 by chinnazhaguraja
    await db.sync();                   // modified on 25.10.2023 by chinnazhaguraja
})();                                  // modified on 25.10.2023 by chinnazhaguraja
*/
export default Agreement;