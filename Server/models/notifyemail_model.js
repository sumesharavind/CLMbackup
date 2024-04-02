import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Notifications from "./notifications_model.js";

const { DataTypes } = Sequelize;

const Notifyemail = db.define("notifyemail",
{   
    EmailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

    NotificationId: {
        type: DataTypes.INTEGER,
    },

    SenderName: {
        type: DataTypes.STRING,
    },
  
    SenderEmail: {
        type: DataTypes.STRING,
    },
  
    RecipientName: {
        type: DataTypes.STRING,
    },
  
    RecipientEmail: {
        type: DataTypes.STRING,
    },
  
    Subject: {
        type: DataTypes.STRING,
    },
  
    Message: {
        type: DataTypes.STRING,
    },
  
    Is_Read: {
        type: DataTypes.STRING,
    },
  
    Send_At: {
          type: DataTypes.DATE,
    },
  
    Read_At: {
          type: DataTypes.DATE,
    },
      
    UserId_email: {
          type: DataTypes.INTEGER
    }
}, 
{
    freezeTableName: true,
    timestamps: false,
});

Notifyemail.belongsTo(Notifications, {
  foreignKey: "NotificationId", // This should match the column name in notifyemail table
  targetKey: "NotificationId", // This should match the column name in notifications table
});

Notifyemail.belongsTo(Users, {
    foreignKey: "UserId_email", // This should match the column name in notifyemail table
    targetKey: "id", // This should match the column name in users table
  });

export default Notifyemail;