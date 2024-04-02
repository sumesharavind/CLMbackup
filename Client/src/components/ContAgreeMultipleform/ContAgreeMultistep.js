import React, { useRef, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import AgreeMultiCSS from "./AgreeMultistep.module.css";
import DualList from "../DualBox/DualList.js";
import AggreementDtl from "../ConTypAgr/AggreementDtl.js";
import Breadcrumb from "../Breadcrumb/Breadcrumb.js";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import axios from "axios";

import { createValidationSchema } from "../ValidationSchema.js"; //******** */
import * as yup from "yup"; //****   */
import AgreeTeam from "../ConTypAgr/AgreeTeam.js";
import ContTypAgreeAddAssoc from "../ConTypAgr/ContTypAgreeAddAssoc.js";
import AgreeAttr from "../ConTypAgr/AgreeAttr.js";
const ContAgreeMultistep = () => {
  const [currentStep, setCurrentStep] = useState(0);
  //***********/
  const [isValidated, setIsValidated] = useState(false);
  const [associatedDocuments, setAssociatedDocuments] = useState([]);

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
    /*if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }*/
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
        if (currentStep === 2) {
          // Pass the form data and the associated documents list to the child component
          setAssociatedDocuments(formData.step2Data);
        }
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
        return <h6>Verify</h6>;
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
          <Col xs={6} md={4} lg={2}>
            <div
              className={` ${AgreeMultiCSS.ContAgreeMultisteptab} ${
                currentStep === 0
                  ? "bg-success border border-dark text-white rounded "
                  : "bg-white border border-dark text-dark rounded"
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabname}>Details</h6>
            </div>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <div
              className={` ${AgreeMultiCSS.ContAgreeMultisteptab} ${
                currentStep === 1
                  ? "bg-success border border-dark text-white rounded "
                  : "bg-white border border-dark text-dark rounded"
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabname}>Attributes</h6>
            </div>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <div
              className={`mt-md-0 mt-4 p-1 ${
                AgreeMultiCSS.ContAgreeMultisteptab
              } ${
                currentStep === 2
                  ? "bg-success border border-dark text-white rounded "
                  : "bg-white border border-dark text-dark rounded"
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabname}>Association</h6>
            </div>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <div
              className={`mt-lg-0 mt-4 p-1 ${
                AgreeMultiCSS.ContAgreeMultisteptab
              } ${
                currentStep === 3
                  ? "bg-success border border-dark text-white rounded "
                  : "bg-white border border-dark text-dark rounded"
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabname}>Display Preference</h6>
            </div>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <div
              className={`mt-lg-0 mt-4 p-1 ${
                AgreeMultiCSS.ContAgreeMultisteptab
              } ${
                currentStep === 4
                  ? "bg-success border border-dark text-white rounded "
                  : "bg-white border border-dark text-dark rounded"
              } `}
            >
              <h6 className={AgreeMultiCSS.Tabname}>Team</h6>
            </div>
          </Col>
          <Col xs={6} md={4} lg={2}>
            <div
              className={`mt-lg-0 mt-4 p-1 ${
                AgreeMultiCSS.ContAgreeMultisteptab
              } ${
                currentStep === 5
                  ? "bg-success border border-dark text-white rounded "
                  : "bg-white border border-dark text-dark rounded"
              }`}
            >
              <h6 className={AgreeMultiCSS.Tabname}>Verify</h6>
            </div>
          </Col>
          {getColumnContent()}
        </Row>
        <Row className="p-5">
          <Col lg={3}></Col>
          <Col xs={4} md={4} lg={2}>
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
          <Col xs={4} md={4} lg={2}>
            {currentStep < 5 && (
              <div className={AgreeMultiCSS.movingButton} onClick={handleNext}>
                <p className={AgreeMultiCSS.btnNext}>Next</p>
                <div className={AgreeMultiCSS.btnNextBg}>
                  <FaArrowRight className={AgreeMultiCSS.btnNextArrow} />
                </div>
              </div>
            )}
          </Col>
          <Col xs={4} md={4} lg={2}>
            {currentStep === 5 && (
              <Button
                onClick={handleSubmit}
                className="bg-dark border border-dark text-white  p-2 m-1"
              >
                Submit
              </Button>
            )}
          </Col>
          <Col lg={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default ContAgreeMultistep;
