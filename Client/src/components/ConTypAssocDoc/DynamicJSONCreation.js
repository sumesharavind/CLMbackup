import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../GlobalContext";

const DynamicJSONCreation = (data, userid, enttype, entid) => {
  const { state } = useGlobalContext();
  // Access the updated state values

  const originalJSONData = {
    step0Data: {
      ContractTypeName: "Arun",
      Description: "agcjh",
      Constraint: "option2",
      AllowDocumentAssembly: true,
      AllowDocumentUpload: true,
      EnableApprovalWorkflow: false,
      ShowFileDropZone: false,
      TwoColumnAttributeLayout: false,
      EnableBulkProcessing: false,
    },
    step1Data: {
      AvailAttr: [
        "AnnaPoorni",
        "Selvamatha",
        "Murali",
        "ChinnaAlagu",
        "Gowtham",
        "Jeyalakshmi",
        "MuthuSankari",
        "John",
        "Arun",
        "Example",
        "Rohit",
        "Sumesh ",
        "vignesh",
        "Virat",
        "Stephen",
        "sachin",
        "siva",
        "marsh",
        "mohan",
        "Abu",
        "prabha",
        "Rani",
        "raja",
        "agent",
        "agent",
        "Das",
        "Miniu",
      ],
      SelAttr: ["Jawahar", "Ranjith", "Dharama"],
      AttrForm: {
        Jawahar: {
          DisplayName: "jawahar",
          DataType: "qwertyuiop",
          HelpMessage: "Clear",
          DefaultValue: "qsds",
          IsGlobal: "Contract Type",
          HtmlPrompt: "ABC",
          IsDefault: "Yes",
          IsEditable: "No",
          IsMandatory: "No",
          TrackingAttribute: "No",
          IsUnique: "No",
          DefinedByRule: "No",
          IsInherit: "No",
          IsSearchable: "No",
          IsConditional: "No",
          IsLookup: "No",
        },
      },
    },
    step2Data: {
      AvailAttr: [
        "Selvamatha",
        "Murali",
        "ChinnaAlagu",
        "Gowtham",
        "Jeyalakshmi",
        "MuthuSankari",
        "John",
        "Arun",
        "Example",
        "Rohit",
        "Sumesh ",
        "vignesh",
        "Virat",
        "Stephen",
        "sachin",
        "siva",
        "marsh",
        "mohan",
        "Abu",
        "prabha",
        "Rani",
        "raja",
        "agent",
        "agent",
        "Das",
        "Miniu",
      ],
      SelAttr: ["Jawahar", "Ranjith", "Dharama", "AnnaPoorni"],
    },
    step3Data: {
      UserDtl: [
        {
          name: "jawahar",
          role: "integrate",
          email: "jnehru902@gmail.com",
        },
        { name: "Dharama", role: "option2", email: "hashni2312@gmail.com" },
        {
          name: "Selvamatha",
          role: "option2",
          email: "jawaharlal.nehru@savictech.com",
        },
      ],
    },
    step4Data: [],
  };

  /*   const initialJSONData = {
       
        EtyID: "",
        EtyApprovarID: "",
        EtyName: "",
        EtyType: "",
        EtyCreatedBy: "",
        EtyCreatedOn: "",
        EtyApprovalStatus: "draft",
        Data:
            {
                ContractTypeName: "",
                Description: "",
                Constraint: "",
                AllowDocumentAssembly: "No",
                AllowDocumentUpload: "No",
                EnableApprovalWorkflow: "No",
                ShowFileDropZone: "No",
                TwoColumnAttributeLayout: "No",
                EnableBulkProcessing: "No",
                SelectedAttributes: [],
                TeamMembers: [],
            },
        SenderName: "",
        SenderEmail: "",
        RecipientName: "",
        RecipientEmail: "",
        Subject: "",
        Message: "",
        IsRead: "",
        SentAt: "",
        ReadAt: "",
        Status: ""
       
    }; 
    */

  const [dynamicJSON, setDynamicJSON] = useState([]);

  // Function to update the dynamic JSON object
  const addPropertyToJSON = () => {
    const updatedCollection = [];
    for (let i = 0; i < originalJSONData.step3Data.UserDtl.length; i++) {
      let objJSONData = {};
      objJSONData["EtyName"] = originalJSONData.step0Data.ContractTypeName;
      objJSONData["EtyType"] = "Associated Document";
      objJSONData.Data = {};
      objJSONData.Data["ContractTypeName"] =
        originalJSONData.step0Data.ContractTypeName;
      objJSONData.Data["Description"] = originalJSONData.step0Data.Description;
      objJSONData.Data["Constraint"] = originalJSONData.step0Data.Constraint;
      objJSONData.Data["AllowDocumentAssembl"] =
        originalJSONData.step0Data.AllowDocumentAssembly;
      objJSONData.Data["AllowDocumentUpload"] =
        originalJSONData.step0Data.AllowDocumentUpload;
      objJSONData.Data["EnableApprovalWorkflow"] =
        originalJSONData.step0Data.EnableApprovalWorkflow;
      objJSONData.Data["ShowFileDropZone"] =
        originalJSONData.step0Data.ShowFileDropZone;
      objJSONData.Data["TwoColumnAttributeLayout"] =
        originalJSONData.step0Data.TwoColumnAttributeLayout;
      objJSONData.Data["EnableBulkProcessing"] =
        originalJSONData.step0Data.EnableBulkProcessing;

      objJSONData.Data["TeamMembers"] = originalJSONData.step3Data.UserDtl;
      objJSONData["SenderName"] = state.userName;

      //alert(localStorage.getItem("UserName"));
      objJSONData[" SenderEmail"] = state.userEmail;
      objJSONData["RecipientName"] = originalJSONData.step3Data.UserDtl[i].name;
      objJSONData["RecipientEmail"] =
        originalJSONData.step3Data.UserDtl[i].email;
      objJSONData["Subject"] =
        "Reg: Contract Type Associated Document Approval";
      objJSONData["Message"] =
        "Please Kindly Approve the Associated Document Namely " +
        objJSONData["EtyName"];
      objJSONData["IsRead"] = "";
      objJSONData["SentAt"] = "";
      objJSONData["ReadAt"] = "";
      objJSONData["Status"] = "";
      updatedCollection.push(objJSONData);
    }

    setDynamicJSON(updatedCollection);
  };

  return (
    <div>
      <button onClick={addPropertyToJSON}>Add Property</button>
      <pre>{JSON.stringify(dynamicJSON, null, 2)}</pre>
    </div>
  );
};

export default DynamicJSONCreation;
