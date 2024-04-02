import { Sequelize } from "sequelize";

const db = new Sequelize("clm_db", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
  port: 3306, //Give by Server Team & Changes by Jawahar - 19/10/2023
});

// const db = new Sequelize("clm", "admins", "savic12$", {
//   host: "savictech.mysql.database.azure.com",
//   dialect: "mysql",
//   port: 3306, //Give by Server Team & Changes by Jawahar - 19/10/2023
//   dialectOptions: {

//     ssl: {

//     // Enable SSL/TLS

//     require: true,

//     }}
// });

export default db;
