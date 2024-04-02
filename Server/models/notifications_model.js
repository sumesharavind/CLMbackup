import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Notifications = db.define(
  "notifications",
  {
    EntityID: {
      type: DataTypes.INTEGER,
    },

    EntityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    EntityCreatedBy: {
      type: DataTypes.STRING,
    },

    CreatedOn: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    EntityStatus: {
      type: DataTypes.STRING,
    },

    Data: {
      type: DataTypes.STRING,
    },

    NotificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    EntityType: {
      type: DataTypes.STRING,
    },

    UserId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    hooks: {
      beforeCreate: (notification, options) => {
        notification.CreatedOn = new Date(); // This line can be omitted
      },
    },
  }
);

Notifications.belongsTo(Users, {
  foreignKey: "UserId", // This should match the column name in notifications table
  targetKey: "id", // This should match the column name in users table
});

export default Notifications;
