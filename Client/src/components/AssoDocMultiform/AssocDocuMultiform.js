import React, { useState, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import AssocdocMultistepformCSS from "./AssodocMultistepform.module.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import AssocDocTeam from "../ConTypAssocDoc/AssocDocTeam";
import AssocDocDtl from "../ConTypAssocDoc/AssocDocDtl";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import DualList from "../DualBox/DualList";
import { createValidationSchema } from "../ValidationSchema.js"; //******** */
import * as yup from "yup"; //****   */
import AssocDocAttr from "../ConTypAssocDoc/AssocDocAttr.js";
import axios from "axios";
import { useGlobalContext } from "../GlobalContext.js";
import AssocDocVerify from "../ConTypAssocDoc/AssocDocVerify.js";
 
const AssocDocuMultiform = () => {
  const [currentStep, setCurrentStep] = useState(0);
  //***********/
  const [isValidated, setIsValidated] = useState(false);
  const { state } = useGlobalContext();
  const [assocDocVerify, setAssocDocVerify] = useState({});
  //******************/
  const AssocDocDtlFormRef = useRef(null);
 
  const [formData, setFormData] = useState({
    step0Data: {
      ContractTypeName: "",
      Description: "",
      AggrConstraint: "",
      AllowDocumentAssembly: "No",
      AllowDocumentUpload: "No",
      EnableApprovalWorkflow: "No",
      ShowFileDropZone: "No",
      TwoColumnAttributeLayout: "No",
      EnableBulkProcessing: "No",
    },
    step1Data: {
      AvailAttr: [],
      SelAttr: [],
      AttrForm: [],
    },
    step2Data: {
      AvailAttr: [],
      SelAttr: [],
    },
    step3Data: {
      UserDtl: [],
    },
    step4Data: [],
  });
 
  //**************** */
  const validationSchema = yup.object().shape({
    ContractTypeName: createValidationSchema("text", "ContractTypeName"),
    Description: createValidationSchema("textarea", "Description"),
    AggrConstraint: createValidationSchema("dropdown", "AggrConstraint"),
    // Add validation for other fields as needed
  });
 
  //**************** */
  const validateForm = (formValues, schema) => {
    schema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        setIsValidated(true);
        // console.log('Form submitted successfully');
      })
      .catch((validationErrors) => {
        setIsValidated(false);
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        AssocDocDtlFormRef.current.setErrors(errors);
      });
  };
 
  function handleMSFormChange(stepId, name, value) {
    setFormData((prevData) => ({
      ...prevData,
      [`step${stepId}Data`]: {
        ...prevData[`step${stepId}Data`],
        [name]: value,
      },
    }));
  }
 
  const handleNext = () => {
    /*  if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } */
    try {
      AssocDocDtlFormRef.current.handleFormSubmit();
    } catch (errors) {
      /* alert(errors) */
    }
    if (currentStep < 5) {
      if (currentStep === 0) {
        if (isValidated) {
          setCurrentStep(currentStep + 1);
        }
      } else if (currentStep === 3) {
        let verifyJSON = {};
        let unames = [];
        setAssocDocVerify({
          ...assocDocVerify,
          ContractTypeName: formData.step0Data.ContractTypeName,
        });
        verifyJSON.ContractTypeName = formData.step0Data.ContractTypeName;
        verifyJSON.Description = formData.step0Data.Description;
        verifyJSON.Constraint = formData.step0Data.AggrConstraint;
        verifyJSON.AllowDocumentAssembly =
          formData.step0Data.AllowDocumentAssembly;
        verifyJSON.AllowDocumentUpload = formData.step0Data.AllowDocumentUpload;
        verifyJSON.EnableApprovalWorkflow =
          formData.step0Data.EnableApprovalWorkflow;
        verifyJSON.ShowFileDropZone = formData.step0Data.ShowFileDropZone;
        verifyJSON.TwoColumnAttributeLayout =
          formData.step0Data.TwoColumnAttributeLayout;
        verifyJSON.EnableBulkProcessing =
          formData.step0Data.EnableBulkProcessing;
        verifyJSON.SelectedAttributes = formData.step1Data.SelAttr;
        formData.step3Data.UserDtl.forEach((user) => {
          unames.push(
            user.name +
              " [ Role = " +
              user.role +
              " ; Email = " +
              user.email +
              " ]  "
          );
        });
        verifyJSON.TeamMembers = unames;
        setAssocDocVerify({ ...assocDocVerify, ...verifyJSON });
 
        console.log("verifyJSON = " + JSON.stringify(verifyJSON));
        console.log("Updated verifyJSON:" + JSON.stringify(assocDocVerify));
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(currentStep + 1);
      }
      setIsValidated(false);
    }
  };
 
  const handlePrevious = () => {
    setIsValidated(false); //**** */
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
 
  const handleSubmit = async () => {
    console.log(JSON.stringify(formData));
    try {
      let [
        response0,
        response1,
        response2,
        response3,
        response4,
        response5,
        resUID,
      ] = [null, null, null, null, null, null, null];
      // Step 0
      response0 = await axios.post(
        "http://localhost:5000/AssocDocDtl/create",
        formData.step0Data
      );
      console.log(response0.data);
 
      let contractTypeCode = response0.data.data.ContractTypeCode; // orm
 
      // let contractTypeCode = response0.data.data; // for raw query
 
      console.log("ContractTypeCode" + contractTypeCode);
 
      //if (response0.status === 201 || response0.status === 200) {
      // Raw
      if (response0.status === 201) {
        //ORM
        let attrFormValues = Object.values(formData.step1Data.AttrForm);
        console.log("attrformvalues " + JSON.stringify(attrFormValues));
        // Use Promise.all to wait for all async operations to complete
        await Promise.all(
          attrFormValues.map(async (assocDocAttrJSON) => {
            assocDocAttrJSON.ContractTypeCode = contractTypeCode;
 
            console.log("input Attribute " + JSON.stringify(assocDocAttrJSON));
            // Step 1
            response1 = await axios.post(
              "http://localhost:5000/AssocDocAttr/create",
              assocDocAttrJSON
            );
            console.log("Attribute = " + JSON.stringify(response1.data));
          })
        );
      }
      console.log(response1.status);
 
      //if (response1.status === 201 || response1.status === 200) {
      //Raw
      if (response1.status === 201) {
        //ORM
        let attrFormValues = Object.values(formData.step2Data.SelAttr);
        console.log("DP : " + attrFormValues);
 
        await Promise.all(
          attrFormValues.map(async (strSelAttr, index) => {
            let dispPrefJson = {};
            dispPrefJson.AttributeName = strSelAttr;
            dispPrefJson.CTCode = contractTypeCode;
            dispPrefJson.Sequence = index + 1;
            console.log("DP : " + JSON.stringify(dispPrefJson));
 
            // Step 2
            response2 = await axios.post(
              "http://localhost:5000/AssocDocDispPref/create",
              dispPrefJson
            );
            console.log(response2.data);
          })
        );
      }
      console.log(response2.status);
 
      //if (response2.status === 201 || response2.status === 200) {
      // Raw
      if (response2.status === 201) {
        //ORM
        let attrFormValues = Object.values(formData.step3Data.UserDtl);
        console.log(attrFormValues);
        // Use Promise.all to wait for all async operations to complete
        await Promise.all(
          attrFormValues.map(async (assocDocAttrJSON) => {
            let teamMembersJson = {};
            teamMembersJson.TeamMembName = assocDocAttrJSON.name;
            teamMembersJson.CTC = contractTypeCode;
            teamMembersJson.Role = assocDocAttrJSON.role;
            teamMembersJson.Email = assocDocAttrJSON.email;
            teamMembersJson.Status = "Draft";
            console.log(JSON.stringify(teamMembersJson));
            // Step 3
            response3 = await axios.post(
              "http://localhost:5000/AssocDocTeam/create",
              teamMembersJson
            );
            console.log(response3.data);
          })
        );
      }
      console.log(response3.status);
      if (response3.status === 201) {
        formData.step3Data.UserDtl.forEach(async (userDetail) => {
          let objJSONData = {};
          resUID = await axios.get(
            `http://localhost:5000/Users/read/${userDetail.email}`
          );
          console.log("User Details = " + JSON.stringify(resUID.data.data.id));
          objJSONData["EntityID"] = contractTypeCode;
          objJSONData["EntityName"] = "Associated Document";
          objJSONData["EntityCreatedBy"] = state.userName;
          objJSONData["CreatedOn"] = "";
          objJSONData["EntityStatus"] = "Pending";
          objJSONData.Data = JSON.stringify({
            ContractTypeName: formData.step0Data.ContractTypeName,
            Description: formData.step0Data.Description,
            Constraint: formData.step0Data.Constraint,
            AllowDocumentAssembly: formData.step0Data.AllowDocumentAssembly,
            AllowDocumentUpload: formData.step0Data.AllowDocumentUpload,
            EnableApprovalWorkflow: formData.step0Data.EnableApprovalWorkflow,
            ShowFileDropZone: formData.step0Data.ShowFileDropZone,
            TwoColumnAttributeLayout:
              formData.step0Data.TwoColumnAttributeLayout,
            EnableBulkProcessing: formData.step0Data.EnableBulkProcessing,
            TeamMembers: formData.step3Data.UserDtl,
          });
          objJSONData["NotificationId"] = null;
          objJSONData["EntityType"] = "AssociationDocument";
          objJSONData["UserId"] = resUID.data.data.id; //state.userID;
          console.log("Notification = " + JSON.stringify(objJSONData));
          response4 = await axios.post(
            "http://localhost:5000/Notifications/create",
            objJSONData
          );
          console.log("server Notify = " + JSON.stringify(response4.data));
          let notificationId = response4.data.data.NotificationId;
          console.log("Notificatin ID = " + notificationId);
          console.log("server notify status :" + response4.status);
          if (response4.status === 201) {
            let emailJSONData = {};
            emailJSONData["EmailId"] = null;
            emailJSONData["NotificationId"] = notificationId;
            /*  resUID = await axios.get(`http://localhost:5000/Users/read/${userDetail.email}`);
                console.log("User Details = " + JSON.stringify(resUID.data.data.id)); */
            emailJSONData["UserId_email"] = JSON.stringify(resUID.data.data.id); //state.userID;
            emailJSONData["SenderName"] = state.userName;
            emailJSONData["SenderEmail"] = state.userEmail;
            emailJSONData["RecipientName"] = userDetail.name;
            emailJSONData["RecipientEmail"] = userDetail.email;
            emailJSONData["Subject"] = "Reg: Apporval for Associated Document";
            emailJSONData[
              "Message"
            ] = `Please Kindly Approve the Associated Document Namely ${objJSONData["EntityName"]}`;
            emailJSONData["Is_Read"] = "NO";
            emailJSONData["Send_At"] = null;
            emailJSONData["Read_At"] = null;
 
            console.log(
              "Email Notification = " + JSON.stringify(emailJSONData)
            );
            response5 = await axios.post(
              "http://localhost:5000/Notifyemail/create",
              emailJSONData
            );
            console.log(
              "EmailNotification Server = " + JSON.stringify(response5.data)
            );
            alert("Created and Send for Approval");
            console.log("EmailNotification Server status :" + response5.status);
          }
        });
      }
    } catch (error) {
      // Handle errors for each step independently
      console.error("Error saving form data:", error);
    }
  };
 
  const getAssoDocContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <AssocDocDtl
            ref={AssocDocDtlFormRef}
            data={formData.step0Data}
            onChange={(name, value) =>
              handleMSFormChange(currentStep, name, value)
            }
            validateForm={validateForm}
            validationSchema={validationSchema}
            fieldValidation={createValidationSchema}
          />
        );
      //  return <AssocDocDtl />
      case 1:
        return (
          <AssocDocAttr
            data={formData.step1Data}
            onChange={(name, value) =>
              handleMSFormChange(currentStep, name, value)
            }
          />
        );
      case 2:
        return (
          <DualList
            data={formData.step2Data}
            onChange={(name, value) =>
              handleMSFormChange(currentStep, name, value)
            }
          />
        );
      case 3:
        return (
          <AssocDocTeam
            data={formData.step3Data}
            onChange={(name, value) =>
              handleMSFormChange(currentStep, name, value)
            }
          />
        );
      case 4:
        return <AssocDocVerify data={assocDocVerify} />;
 
      default:
        return null;
    }
  };
  const [currentPath, setCurrentPath] = useState(
    "Configure / Contracttype / Associate"
  );
 
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={12} xs={12} md={12}>
            <Breadcrumb currentPath={currentPath} />
          </Col>
        </Row>
      </Container>
      <Container fluid className={AssocdocMultistepformCSS.MultiBg}>
        <Row className=" p-1">
          <Col lg={1}></Col>
          <Col
            xs={6}
            md={4}
            lg={2}
            className={AssocdocMultistepformCSS.FlexContainer}
          >
            <div
              className={` ${AssocdocMultistepformCSS.AssodocMultistep} ${
                currentStep === 0 ? "bg-success text-white" : " "
              }`}
            >
              <h6 className={AssocdocMultistepformCSS.Tabstep}>1</h6>
            </div>
            <h5
              className={`ms-2 mt-2 fw-semibold ${AssocdocMultistepformCSS.Tabname}`}
            >
              Details
            </h5>
          </Col>
          <Col
            xs={6}
            md={4}
            lg={2}
            className={AssocdocMultistepformCSS.FlexContainer}
          >
            <div
              className={` ${AssocdocMultistepformCSS.AssodocMultistep} ${
                currentStep === 1 ? "bg-success text-white" : " "
              }`}
            >
              <h6 className={AssocdocMultistepformCSS.Tabstep}>2</h6>
            </div>
            <h5
              className={`ms-2 mt-2 fw-semibold ${AssocdocMultistepformCSS.Tabname}`}
            >
              Attributes
            </h5>
          </Col>
 
          <Col
            xs={6}
            md={4}
            lg={3}
            className={AssocdocMultistepformCSS.FlexContainer}
          >
            <div
              className={` ${AssocdocMultistepformCSS.AssodocMultistep} ${
                currentStep === 2 ? "bg-success text-white" : " "
              }`}
            >
              <h6 className={AssocdocMultistepformCSS.Tabstep}>3</h6>
            </div>
            <h5
              className={`ms-2 mt-2 fw-semibold ${AssocdocMultistepformCSS.Tabname}`}
            >
              Display Preference
            </h5>
          </Col>
          <Col
            xs={6}
            md={4}
            lg={2}
            className={AssocdocMultistepformCSS.FlexContainer}
          >
            <div
              className={` ${AssocdocMultistepformCSS.AssodocMultistep} ${
                currentStep === 3 ? "bg-success text-white" : " "
              } `}
            >
              <h6 className={AssocdocMultistepformCSS.Tabstep}>4</h6>
            </div>
            <h5
              className={`ms-2 mt-2 fw-semibold ${AssocdocMultistepformCSS.Tabname}`}
            >
              Team
            </h5>
          </Col>
          <Col
            xs={6}
            md={4}
            lg={2}
            className={AssocdocMultistepformCSS.FlexContainer}
          >
            <div
              className={` ${AssocdocMultistepformCSS.AssodocMultistep} ${
                currentStep === 4 ? "bg-success text-white" : " "
              }`}
            >
              <h6 className={AssocdocMultistepformCSS.Tabstep}>5</h6>
            </div>
            <h5
              className={`ms-2 mt-2 fw-semibold ${AssocdocMultistepformCSS.Tabname}`}
            >
              Verify
            </h5>
          </Col>
          {getAssoDocContent()}
        </Row>
        <Row className="p-3 p-md-5">
          <Col
            xs={12}
            lg={2}
            className="mb-3 d-flex justify-content-center justify-content-lg-start"
          >
            {currentStep > 0 && (
              <div
                className={AssocdocMultistepformCSS.movingButton}
                onClick={handlePrevious}
              >
                <p className={AssocdocMultistepformCSS.btnNext}>Previous</p>
                <div className={AssocdocMultistepformCSS.btnNextBg}>
                  <FaArrowLeft
                    className={AssocdocMultistepformCSS.btnNextArrow}
                  />
                </div>
              </div>
            )}
          </Col>
 
          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center">
            {currentStep < 4 && (
              <div
                className={AssocdocMultistepformCSS.movingButton}
                onClick={handleNext}
              >
                <p className={AssocdocMultistepformCSS.btnNext}>Next</p>
                <div className={AssocdocMultistepformCSS.btnNextBg}>
                  <FaArrowRight
                    className={AssocdocMultistepformCSS.btnNextArrow}
                  />
                </div>
              </div>
            )}
          </Col>
 
          <Col xs={12} lg={1} className="mb-3 d-flex justify-content-center">
            {currentStep === 4 && (
              <div className={AssocdocMultistepformCSS.CreateButton}>
                <p className={AssocdocMultistepformCSS.btnNext}>Create</p>
              </div>
            )}
          </Col>
 
          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center">
            {currentStep === 4 && (
              <div className={`${AssocdocMultistepformCSS.PublishButton}`}>
                <p className={AssocdocMultistepformCSS.btnNext}>
                  Create and Publish
                </p>
              </div>
            )}
          </Col>
 
          <Col xs={12} lg={3} className="mb-3 d-flex justify-content-center">
            {currentStep === 4 && (
              <div
                className={AssocdocMultistepformCSS.ApprovalButton}
                onClick={handleSubmit}
              >
                <p className={AssocdocMultistepformCSS.btnNext}>
                  Create and send For Approval
                </p>
              </div>
            )}
          </Col>
 
          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center ">
            {currentStep === 4 && (
              <div className={AssocdocMultistepformCSS.DiscardButton}>
                <p className={AssocdocMultistepformCSS.btnNext}>Discard</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
 
export default AssocDocuMultiform;
 