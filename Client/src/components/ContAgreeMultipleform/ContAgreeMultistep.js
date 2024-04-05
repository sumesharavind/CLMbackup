import React, { useRef, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import AgreeMultiCSS from "./AgreeMultistep.module.css";
import DualList from "../DualBox/DualList.js";
import AggreementDtl from "../ConTypAgr/AggreementDtl.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import AgreementVerify from "../ConTypAgr/AgreementVerify.js";

import { createValidationSchema } from "../ValidationSchema.js"; //******** */
import * as yup from "yup"; //****   */
import AgreeTeam from "../ConTypAgr/AgreeTeam.js";
import ContTypAgreeAddAssoc from "../ConTypAgr/ContTypAgreeAddAssoc.js";
import AgreeAttr from "../ConTypAgr/AgreeAttr.js";
import { useGlobalContext } from "../GlobalContext.js";

const ContAgreeMultistep = () => {
  const [currentStep, setCurrentStep] = useState(0);
  //***********/
  const [isValidated, setIsValidated] = useState(false);
  const [associatedDocuments, setAssociatedDocuments] = useState([]);
  const { state } = useGlobalContext();
  const [agreementVerify, setAgreementVerify] = useState({});

  //******************/
  const childFormRef = useRef(null);

  const [formData, setFormData] = useState({
    step0Data: {
      ContractTypeName: "",
      Description: "",
      Category: "",
      AllowThirdPartyPaper: "No",
      AllowClauseAssembly: "No",
      QRCode: "No",
      AllowCopywithAssociation: "No",
      TwoColumnAttributeLayout: "No",
      EnableCollaboration: "No",
      EnableAutoSupersede: "No",
      ExpandDropDownonMouseHover: "No",
    },
    step1Data: {
      AvailAttr: [],
      SelAttr: [],
      AttrForm: [],
    },
    step2Data: {
      AssociationName: "",
      AssociatedContractType: "",
      // RelationType: "",
      AllowInheritance: "No",
      AllowMultipleInstance: "No",
      IsMandatory: "No",
      DefinedByRule: "No",
      AllowTwoWayLinkage: "No",
      AllowPeerCreationWizard: "No",
      UseCustomNomenclature: "No",
      InlineAssociation: "No",
      CopyAssociationDuringAmendment: "No",
    },
    step3Data: {
      AvailAttr: [],
      SelAttr: [],
    },
    step4Data: { UserDtl: [] },
    step5Data: [],
  });

  //**************** */
  const validationSchema = yup.object().shape({
    ContractTypeName: createValidationSchema("text", "ContractTypeName"),
    Description: createValidationSchema("text", "Description"),
    Category: createValidationSchema("dropdown", "AggrConstraint"),
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
        childFormRef.current.setErrors(errors);
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

  const handleAssocChange = (arrayAssocdata) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      step2Data: arrayAssocdata,
    }));
  };

  const handleNext = () => {
    /*  if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } */
    try {
      childFormRef.current.handleFormSubmit();
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
        setAgreementVerify({
          ...agreementVerify,
          ContractTypeName: formData.step0Data.ContractTypeName,
        });
        verifyJSON.ContractTypeName = formData.step0Data.ContractTypeName;
        verifyJSON.Description = formData.step0Data.Description;
        verifyJSON.Category = formData.step0Data.Category;
        verifyJSON.AllowThirdPartyPaper = formData.step0Data.AllowThirdPartyPaper;
        verifyJSON.AllowClauseAssembly = formData.step0Data.AllowClauseAssembly;
        verifyJSON.QRCode = formData.step0Data.QRCode;
        verifyJSON.AllowCopywithAssociation = formData.step0Data.AllowCopywithAssociation;
        verifyJSON.TwoColumnAttributeLayout = formData.step0Data.TwoColumnAttributeLayout;
        verifyJSON.EnableCollaboration = formData.step0Data.EnableCollaboration;
        verifyJSON.EnableAutoSupersede = formData.step0Data.EnableAutoSupersede;
        verifyJSON.ExpandDropDownonMouseHover = formData.step0Data.ExpandDropDownonMouseHover;
        verifyJSON.SelectedAttributes = formData.step1Data.SelAttr;

        formData.step4Data.UserDtl.forEach((user) => {
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
        setAgreementVerify({ ...agreementVerify, ...verifyJSON });
  
        console.log("verifyJSON = " + JSON.stringify(verifyJSON));
        console.log("Updated verifyJSON:" + JSON.stringify(agreementVerify));
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
      let response0 = null;
      let response1 = null;
      let response2 = null;
      let response3 = null;
      let response4 = null;
      let response5 = null;
      let response6 = null;
      let resUID = null;
      // Step 0
      response0 = await axios.post(
        "http://localhost:5000/AggrDtlTbl/create",
        formData.step0Data
      );
      console.log(response0.data);

      let contractTypeCode = response0.data.data.ContractTypeCode;
      console.log("ContractTypeCode" + contractTypeCode);

      if (response0.status === 201) {
        let attrFormValues = Object.values(formData.step1Data.AttrForm);
        let contractTypeCode = response0.data.data.ContractTypeCode;

        await Promise.all(
          attrFormValues.map(async (assocDocAttrJSON) => {
            assocDocAttrJSON.ContractTCode = contractTypeCode;
            console.log("input Attribute " + JSON.stringify(assocDocAttrJSON));
            console.log(assocDocAttrJSON, "zzzzzz");
            // Step 1
            response1 = await axios.post(
              "http://localhost:5000/Aggrattrtbl/create",
              assocDocAttrJSON
            );
            console.log("Attribute = " + JSON.stringify(response1.data));
          })
        );
        console.log(response1.status);

        if (response1.status === 201) {
          let assocFormValues = Object.values(formData.step2Data); // Convert step2Data object to array
          console.log(assocFormValues, "values");
          let data = assocFormValues.map((aggreAssoFormJSON) => ({
            ...aggreAssoFormJSON,
            ConTCode: contractTypeCode,
          }));

          console.log("Hiiii" + JSON.stringify(data));
          await Promise.all(
            data.map(async (aggreAssoFormJSON) => {
              console.log(aggreAssoFormJSON, "step 2");
              response2 = await axios.post(
                "http://localhost:5000/Aggrassoctbl/create",
                aggreAssoFormJSON
              );
              console.log("Association = " + JSON.stringify(response2.data));
            })
          );
        }
        if (response2.status === 201) {
          //ORM
          let attrFormValues = Object.values(formData.step3Data.SelAttr);
          console.log("DP : " + attrFormValues);

          await Promise.all(
            attrFormValues.map(async (strSelAttr, index) => {
              let dispPrefJson = {};
              dispPrefJson.AttributeName = strSelAttr;
              dispPrefJson.CTCodeDis = contractTypeCode;
              dispPrefJson.Sequence = index + 1;
              console.log("DP : " + JSON.stringify(dispPrefJson));

              // Step 3
              response3 = await axios.post(
                "http://localhost:5000/AggrDispPref/create",
                dispPrefJson
              );
              console.log(response3.data);
            })
          );
        }
        console.log(response3.status);
        if (response3.status === 201) {
          //ORM
          let attrFormValues = Object.values(formData.step4Data.UserDtl);
          console.log(attrFormValues);
          // Use Promise.all to wait for all async operations to complete
          await Promise.all(
            attrFormValues.map(async (assocDocAttrJSON) => {
              let teamMembersJson = {};
              teamMembersJson.TeamMembName = assocDocAttrJSON.name;
              teamMembersJson.CTCteam = contractTypeCode;
              teamMembersJson.Role = assocDocAttrJSON.role;
              teamMembersJson.Email = assocDocAttrJSON.email;
              teamMembersJson.Status = "Draft";
              console.log(JSON.stringify(teamMembersJson));
              // Step 3
              response4 = await axios.post(
                "http://localhost:5000/AggrTeamTbl/create",
                teamMembersJson
              );
              console.log(response4.data);
            })
          );
        }
        console.log(response4.status);
        if (response4.status === 201) {
          formData.step4Data.UserDtl.forEach(async (userDetail) => {
            let objJSONData = {};
            resUID = await axios.get(
              `http://localhost:5000/Users/read/${userDetail.email}`
            );
            console.log(
              "User Details = " + JSON.stringify(resUID.data.data.id)
            );
            objJSONData["EntityID"] = contractTypeCode;
            objJSONData["EntityName"] = "Associated Document";
            objJSONData["EntityCreatedBy"] = state.userName;
            objJSONData["CreatedOn"] = "";
            objJSONData["EntityStatus"] = "Pending";
            objJSONData.Data = JSON.stringify({
              ContractTypeName: formData.step0Data.ContractTypeName,
              Description: formData.step0Data.Description,
              Category: formData.step0Data.Category,
              AllowThirdPartyPaper: formData.step0Data.AllowThirdPartyPaper,
              AllowClauseAssembly: formData.step0Data.AllowClauseAssembly,
              QRCode: formData.step0Data.QRCode,
              AllowCopywithAssociation:
                formData.step0Data.AllowCopywithAssociation,
              TwoColumnAttributeLayout:
                formData.step0Data.TwoColumnAttributeLayout,
              EnableCollaboration: formData.step0Data.EnableCollaboration,
              EnableAutoSupersede: formData.step0Data.EnableAutoSupersede,
              ExpandDropDownonMouseHover:
                formData.step0Data.ExpandDropDownonMouseHover,
                
              TeamMembers: formData.step4Data.UserDtl,
            });
            objJSONData["NotificationId"] = null;
            objJSONData["EntityType"] = "AssociationDocument";
            objJSONData["UserId"] = resUID.data.data.id; //state.userID;
            console.log("Notification = " + JSON.stringify(objJSONData));
            response5 = await axios.post(
              "http://localhost:5000/Notifications/create",
              objJSONData
            );
            console.log("server Notify = " + JSON.stringify(response5.data));
            let notificationId = response5.data.data.NotificationId;
            console.log("Notificatin ID = " + notificationId);
            console.log("server notify status :" + response5.status);
            if (response5.status === 201) {
              let emailJSONData = {};
              emailJSONData["EmailId"] = null;
              emailJSONData["NotificationId"] = notificationId;
              /*  resUID = await axios.get(`http://localhost:5000/Users/read/${userDetail.email}`);
                  console.log("User Details = " + JSON.stringify(resUID.data.data.id)); */
              emailJSONData["UserId_email"] = JSON.stringify(
                resUID.data.data.id
              ); //state.userID;
              emailJSONData["SenderName"] = state.userName;
              emailJSONData["SenderEmail"] = state.userEmail;
              emailJSONData["RecipientName"] = userDetail.name;
              emailJSONData["RecipientEmail"] = userDetail.email;
              emailJSONData["Subject"] =
                "Reg: Apporval for Agreement Document";
              emailJSONData[
                "Message"
              ] = `Please Kindly Approve the Agreement Document Namely ${objJSONData["EntityName"]}`;
              emailJSONData["Is_Read"] = "NO";
              emailJSONData["Send_At"] = null;
              emailJSONData["Read_At"] = null;

              console.log(
                "Email Notification = " + JSON.stringify(emailJSONData)
              );
              response6 = await axios.post(
                "http://localhost:5000/Notifyemail/create",
                emailJSONData
              );
              console.log(
                "EmailNotification Server = " + JSON.stringify(response6.data)
              );
              alert("Created and Send for Approval");
              console.log(
                "EmailNotification Server status :" + response6.status
              );
            }
          });
        }
      }
    } catch (error) {
      console.error("Error Saving data:", error);
    }
  };

  const getColumnContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <AggreementDtl
            ref={childFormRef}
            data={formData.step0Data}
            onChange={(name, value) =>
              handleMSFormChange(currentStep, name, value)
            }
            validateForm={validateForm}
            validationSchema={validationSchema}
            fieldValidation={createValidationSchema}
          />
        );
      case 1:
        return (
          <AgreeAttr
            data={formData.step1Data}
            onChange={(name, value) =>
              handleMSFormChange(currentStep, name, value)
            }
          />
        );
      case 2:
        return (
          <ContTypAgreeAddAssoc
            formData={formData.step2Data}
            onChange={(name, value) =>
              handleMSFormChange(currentStep, name, value)
            }
            associatedDocuments={associatedDocuments}
            setAssociatedDocuments={setAssociatedDocuments}
            onAssociationChange={handleAssocChange}
          />
        );
      case 3:
        return (
          <DualList
            data={formData.step3Data}
            onChange={(name, value) =>
              handleMSFormChange(currentStep, name, value)
            }
          />
        );
      case 4:
        return (
          <AgreeTeam
            data={formData.step4Data}
            onChange={(name, value) =>
              handleMSFormChange(currentStep, name, value)
            }
          />
        );
      case 5:
        return <AgreementVerify data={agreementVerify} />;
      default:
        return null;
    }
  };
  const [currentPath, setCurrentPath] = useState(
    "Configure / Contracttype / Aggrement"
  );

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} md={12}>
            <Breadcrumb currentPath={currentPath} />
          </Col>
        </Row>
      </Container>
      <Container fluid className={AgreeMultiCSS.MultiBg}>
        <Row className=" p-1">
          <Col xs={6} md={4} lg={2} className={AgreeMultiCSS.FlexContainer}>
            <div
              className={` ${AgreeMultiCSS.AgreeMultistep} ${
                currentStep === 0 ? "bg-success text-white" : " "
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabstep}>1</h6>
            </div>
            <h5 className={`ms-2 mt-2 fw-semibold ${AgreeMultiCSS.Tabname}`}>
              Details
            </h5>
          </Col>
          <Col xs={6} md={4} lg={2} className={AgreeMultiCSS.FlexContainer}>
            <div
              className={` ${AgreeMultiCSS.AgreeMultistep} ${
                currentStep === 1 ? "bg-success text-white" : " "
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabstep}>2</h6>
            </div>
            <h5 className={`ms-2 mt-2 fw-semibold ${AgreeMultiCSS.Tabname}`}>
              Attributes
            </h5>
          </Col>

          <Col xs={6} md={4} lg={2} className={AgreeMultiCSS.FlexContainer}>
            <div
              className={` ${AgreeMultiCSS.AgreeMultistep} ${
                currentStep === 2 ? "bg-success text-white" : " "
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabstep}>3</h6>
            </div>
            <h5 className={`ms-2 mt-2 fw-semibold ${AgreeMultiCSS.Tabname}`}>
              Association
            </h5>
          </Col>

          <Col xs={6} md={4} lg={2} className={AgreeMultiCSS.FlexContainer}>
            <div
              className={` ${AgreeMultiCSS.AgreeMultistep} ${
                currentStep === 3 ? "bg-success text-white" : " "
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabstep}>4</h6>
            </div>
            <h5 className={`ms-2 mt-2 fw-semibold ${AgreeMultiCSS.Tabname}`}>
              Display Preference
            </h5>
          </Col>
          <Col xs={6} md={4} lg={2} className={AgreeMultiCSS.FlexContainer}>
            <div
              className={` ${AgreeMultiCSS.AgreeMultistep} ${
                currentStep === 4 ? "bg-success text-white" : " "
              } `}
            >
              <h6 className={AgreeMultiCSS.Tabstep}>5</h6>
            </div>
            <h5 className={`ms-2 mt-2 fw-semibold ${AgreeMultiCSS.Tabname}`}>
              Team
            </h5>
          </Col>
          <Col xs={6} md={4} lg={2} className={AgreeMultiCSS.FlexContainer}>
            <div
              className={` ${AgreeMultiCSS.AgreeMultistep} ${
                currentStep === 5 ? "bg-success text-white" : " "
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabstep}>6</h6>
            </div>
            <h5 className={`ms-2 mt-2 fw-semibold ${AgreeMultiCSS.Tabname}`}>
              Verify
            </h5>
          </Col>
          {getColumnContent()}
        </Row>
        <Row className="p-3 p-md-5">
          <Col
            xs={12}
            lg={2}
            className="mb-3 d-flex justify-content-center justify-content-lg-start"
          >
            {currentStep > 0 && (
              <div
                className={AgreeMultiCSS.movingButton}
                onClick={handlePrevious}
              >
                <p className={AgreeMultiCSS.btnNext}>Previous</p>
                <div className={AgreeMultiCSS.btnNextBg}>
                  <FaArrowLeft className={AgreeMultiCSS.btnNextArrow} />
                </div>
              </div>
            )}
          </Col>

          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center">
            {currentStep < 5 && (
              <div className={AgreeMultiCSS.movingButton} onClick={handleNext}>
                <p className={AgreeMultiCSS.btnNext}>Next</p>
                <div className={AgreeMultiCSS.btnNextBg}>
                  <FaArrowRight className={AgreeMultiCSS.btnNextArrow} />
                </div>
              </div>
            )}
          </Col>

          <Col xs={12} lg={1} className="mb-3 d-flex justify-content-center">
            {currentStep === 5 && (
              <div className={AgreeMultiCSS.CreateButton}>
                <p className={AgreeMultiCSS.btnNext}>Create</p>
              </div>
            )}
          </Col>

          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center">
            {currentStep === 5 && (
              <div className={`${AgreeMultiCSS.PublishButton}`}>
                <p className={AgreeMultiCSS.btnNext}>Create and Publish</p>
              </div>
            )}
          </Col>

          <Col xs={12} lg={3} className="mb-3 d-flex justify-content-center">
            {currentStep === 5 && (
              <div
                className={AgreeMultiCSS.ApprovalButton}
                onClick={handleSubmit}
              >
                <p className={AgreeMultiCSS.btnNext}>
                  Create and send For Approval
                </p>
              </div>
            )}
          </Col>

          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center ">
            {currentStep === 5 && (
              <div className={AgreeMultiCSS.DiscardButton}>
                <p className={AgreeMultiCSS.btnNext}>Discard</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContAgreeMultistep;
