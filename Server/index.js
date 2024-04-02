import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Users_api from "./routes/Orm/users_api.js";
import associationdoc_api from "./routes/Raw/associationdoc_api.js"; //--given by gowtham 28/11/2023
import associationdocdetails_api from "./routes/Orm/associationdocdetails_api.js"; // --given by CA 28/11/2023

//import attribute_api from "./routes/Raw/attribute_api.js"; // using split pane: in client side add[0] is important
//import agreement_api from "./routes/Raw/agreement_api.js"; // { attributeDataRef.current = response.data[0];}

import attribute_api from "./routes/Orm/attribute_api.js"; // using split pane: in client side Remove [0] is important
import agreement_api from "./routes/Orm/agreement_api.js"; // { attributeDataRef.current = response.data;}
import { Association } from "sequelize"; //--given by gowtham 28/11/2023
import AssocDocDtl_api from "./routes/Orm/Association/AssocDocDtl_api.js";
import AssocDocAttr_api from "./routes/Orm/Association/AssocDocAttr_api.js";
import AssocDocDispPref_api from "./routes/Orm/Association/AssocDocDispPref_api.js";
import AssocDocTeam_api from "./routes/Orm/Association/AssocDocTeam_api.js";
import Notifications_api from "./routes/Orm/notifications_api.js"; //-----23/12/2023
import Notifyemail_api from "./routes/Orm/notifyemail_api.js";
import AggrDtlTbl_api from "./routes/Orm/Aggrement/AggrDtlTbl_api.js"; // import API for Aggrement Details
import AggrAttrTbl_api from "./routes/Orm/Aggrement/AggrAttrTbl_api.js"; // import API for Aggrement attribute 
import AggrAssocTbl_api from "./routes/Orm/Aggrement/AggrAssocTbl_api.js"; // import API for Aggrement association
import AggrDispPref_api from "./routes/Orm/Aggrement/AggrDispPref_api.js";
import AggrTeamTbl_api from "./routes/Orm/Aggrement/AggrTeamTbl_api.js"; // import API for Aggrement Team 
/* import AssocDocDtl_api from "./routes/Raw/Association/AssocDocDtl_api.js";
import AssocDocAttr_api from "./routes/Raw/Association/AssocDocAttr_api.js";
import AssocDocDispPref_api from "./routes/Raw/Association/AssocDocDispPref_api.js";
import AssocDocTeam_api from "./routes/Raw/Association/AssocDocTeam_api.js"; */

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.use("/attribute", attribute_api); //Give by Server Team & Changes by Jawahar - 19/10/2023
app.use("/agreement", agreement_api);
app.use("/associationdoc", associationdoc_api);
app.use("/associationdocdetails", associationdocdetails_api); // --given by CA 28/11/2023
app.use("/AssocDocDtl", AssocDocDtl_api); // --given by CA 01/12/2023
app.use("/AssocDocAttr", AssocDocAttr_api); // --given by CA 01/12/2023
app.use("/AssocDocDispPref", AssocDocDispPref_api); // --given by CA 01/12/2023
app.use("/AssocDocTeam", AssocDocTeam_api); // --given by CA 01/12/2023
app.use("/Notifications", Notifications_api); //-----23/12/2023
app.use("/Notifyemail", Notifyemail_api); // use the Notifyemail API
app.use("/Users", Users_api);
app.use("/AggrDtlTbl", AggrDtlTbl_api); // use the  Aggrement Detail Table API
app.use("/AggrAttrTbl", AggrAttrTbl_api); // use the Aggrement Attribute Component API 
app.use("/AggrAssocTbl", AggrAssocTbl_api); // use the Aggrement Association Component API
app.use("/AggrDispPref",AggrDispPref_api);
app.use("/AggrTeamTbl", AggrTeamTbl_api); // use the Aggrement Team Component API 
//Give by Server Team & Changes by Jawahar - 19/10/2023
db.sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default app;
