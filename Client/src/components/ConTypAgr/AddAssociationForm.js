import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { FaRegQuestionCircle } from "react-icons/fa";
import AddAssocCSS from "./ConTypAgree.module.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import * as yup from "yup"; //****   */
import { createValidationSchema } from "../ValidationSchema.js"; //******** */

const AddAssociationForm = ({
  saveAssociation,
  onCancel,
  deleteAssociation,
  formData: initialFormData,
  isEditMode,
  contractTypes,
}) => {
  const [formData, setFormData] = useState(
    initialFormData || {
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
    }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialFormData !== null) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  // useEffect(() => {
  //  console.log(JSON.stringify(formData));
  // });


  const validationSchema = yup.object().shape({
    AssociationName: createValidationSchema("text", "Association Name"),
    AssociatedContractType: createValidationSchema(
      "dropdown",
      "Associated Contract Type"
    ),
    // RelationType: createValidationSchema("dropdown", "Relation Type"),
    // AllowInheritance: createValidationSchema("checkbox", "Allow Inheritance"),
    // Add other fields and their validation rules
  });

  const validateForm = () => {
    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      setErrors({}); // Clear previous errors on successful validation
      return true;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((fieldError) => {
        validationErrors[fieldError.path] = fieldError.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };
  const handleBlur = async (fieldName) => {
    try {
      await createValidationSchema(fieldName).validate(
        { [fieldName]: formData[fieldName] },
        { abortEarly: false }
      );
      // Clear the error message for the field on successful validation
      setErrors({
        ...errors,
        [fieldName]: null,
      });
    } catch (error) {
      // Set the error message for the field on validation failure

      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };
  const handleSave = () => {
    const isValid = validateForm();

    if (isValid) {
      saveAssociation(formData);
      console.log("Saved Successfully", formData);
    }
  };

  // const handleSave = () => {
  //   saveAssociation(formData);
  //   console.log("Saved Successfully", formData);
  // };

  const handleCancel = () => {
    const clearedFormData = Object.keys(formData).reduce((acc, key) => {
      if (typeof formData[key] === "boolean") {
        acc[key] = false;
      } else {
        acc[key] = "";
      }
      return acc;
    }, {});

    setFormData(clearedFormData);
    console.log("Cleared");
  };

  const handleDelete = () => {
    deleteAssociation(); 
    console.log("Deleted Successfully");
  };

  const handleUpdate = () => {
    alert("Updated Successfully");
    console.log("Updated Successfully");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleChange = (value, name) => {
    const yesOrNo = value ? "Yes" : "No";
    setFormData((prevData) => ({
      ...prevData,
      [name]: yesOrNo,
    }));
  };
  
  return (
    <Col lg={12}>
      <h5 className="fw-lighter mt-5">Association</h5>

      <Form className={`mt-4 ${AddAssocCSS.form1}`}>
        <Form.Group as={Row} className="mb-3" controlId="formAssociationName">
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="4"
            md="5"
            xs="5"
          >
            ASSOCIATION NAME
          </Form.Label>
          <Col lg="1" md="1" xs="1">
            <Form.Label className={AddAssocCSS.addAssoFont}> ICM </Form.Label>
          </Col>

          <Col lg="7" md="6" xs="6">
            <Form.Control
              type="text"
              placeholder="Enter Association Name"
              name="AssociationName"
              value={formData.AssociationName}
              onChange={handleInputChange}
              isInvalid={!!errors.AssociationName}
              onBlur={() => handleBlur("AssociationName")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.AssociationName}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formAssociatedContractType"
        >
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            ASSOCIATED CONTRACT TYPE
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <Form.Control
              as="select"
              name="AssociatedContractType"
              className="form-select"
              value={formData.AssociatedContractType}
              onChange={handleInputChange}
              isInvalid={!!errors.AssociatedContractType}
              onBlur={() => handleBlur("AssociatedContractType")}

            >
              <option value="">Select Contract Type</option>
              {contractTypes.map((contractTypeName) => (
                <option key={contractTypeName} value={contractTypeName}>
                  {contractTypeName}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.AssociatedContractType}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <hr></hr>

        {/* <Form.Group as={Row} className="mb-3" controlId="formRelationType">
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            RELATION TYPE
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <Form.Control
              as="select"
              name="RelationType"
              className="form-select"
              value={formData.RelationType}
              onChange={handleInputChange}
              isInvalid={!!errors.RelationType}
              onBlur={() => handleBlur("RelationType")}

            >
              <option value="">Select Relation Type</option>
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.RelationType}
            </Form.Control.Feedback>
          </Col>
        </Form.Group> */}

        <Form.Group as={Row} className="mb-3" controlId="formAllowInhertiance">
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            ALLOW INHERTIANCE
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <BootstrapSwitchButton
              onstyle="success"
              offstyle="danger"
              id="AllowInheritanceSwitch"
              name="AllowInheritance"
              checked={formData.AllowInheritance === "Yes"}
              onChange={(value) =>
                handleToggleChange(value, "AllowInheritance")
              }
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formAllowMultipleInstance"
        >
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            ALLOW MULTIPLE INSTANCE <FaRegQuestionCircle />
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <BootstrapSwitchButton
              // checked={false}
              onstyle="success"
              offstyle="danger"
              id="AllowMultipleInstanceSwitch"
              name="AllowMultipleInstance"
              checked={formData.AllowMultipleInstance === "Yes"}
              onChange={(value) =>
                handleToggleChange(value, "AllowMultipleInstance")
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formIsMandatory">
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            IS MANDATORY <FaRegQuestionCircle />
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <BootstrapSwitchButton
              // checked={false}
              onstyle="success"
              offstyle="danger"
              id="IsMandatorySwitch"
              name="IsMandatory"
              checked={formData.IsMandatory === "Yes"}
              onChange={(value) => handleToggleChange(value, "IsMandatory")}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDefinedByRule">
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            DEFINED BY RULE
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <BootstrapSwitchButton
              // checked={false}
              onstyle="success"
              offstyle="danger"
              id="DefinedByRuleSwitch"
              name="DefinedByRule"
              checked={formData.DefinedByRule === "Yes"}
              onChange={(value) => handleToggleChange(value, "DefinedByRule")}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formAllowTwoWayLinkage"
        >
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            ALLOW TWO-WAY LINKAGE
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <BootstrapSwitchButton
              // checked={false}
              onstyle="success"
              offstyle="danger"
              id="AllowTwoWayLinkageSwitch"
              name="AllowTwoWayLinkage"
              checked={formData.AllowTwoWayLinkage === "Yes"}
              onChange={(value) =>
                handleToggleChange(value, "AllowTwoWayLinkage")
              }
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formAllowPeerCreationWizard"
        >
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            ALLOW PEER CREATION WIZARD <FaRegQuestionCircle />
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <BootstrapSwitchButton
              // checked={false}
              onstyle="success"
              offstyle="danger"
              id="AllowPeerCreationWizardSwitch"
              name="AllowPeerCreationWizard"
              checked={formData.AllowPeerCreationWizard === "Yes"}
              onChange={(value) =>
                handleToggleChange(value, "AllowPeerCreationWizard")
              }
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formUseCustomNomenclature"
        >
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            USE CUSTOM NOMENCLATURE <FaRegQuestionCircle />
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <BootstrapSwitchButton
              // checked={false}
              onstyle="success"
              offstyle="danger"
              id="UseCustomNomenclatureSwitch"
              name="UseCustomNomenclature"
              checked={formData.UseCustomNomenclature === "Yes"}
              onChange={(value) =>
                handleToggleChange(value, "UseCustomNomenclature")
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formInlineAssociation">
          <Form.Label
            className={AddAssocCSS.addAssoFont}
            column
            lg="5"
            md="6"
            xs="6"
          >
            INLINE ASSOCIATION
          </Form.Label>
          <Col lg="7" md="6" xs="6">
            <BootstrapSwitchButton
              //  checked={false}
              onstyle="success"
              offstyle="danger"
              id="InlineAssociationSwitch"
              name="InlineAssociation"
              checked={formData.InlineAssociation === "Yes"}
              onChange={(value) =>
                handleToggleChange(value, "InlineAssociation")
              }
            />
          </Col>
        </Form.Group>

        {isEditMode ? (
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formCopyAssociationDuringAmendment"
          >
            <Form.Label
              className={AddAssocCSS.addAssoFont}
              column
              lg="5"
              md="6"
              xs="6"
            >
              COPY ASSOCIATION DURING AMENDMENT <FaRegQuestionCircle />
            </Form.Label>
            <Col lg="7" md="6" xs="6">
              <BootstrapSwitchButton
                //  checked={false}
                onstyle="success"
                offstyle="danger"
                id="CopyAssociationDuringAmendmentSwitch"
                name="CopyAssociationDuringAmendment"
                checked={formData.CopyAssociationDuringAmendment === "Yes"}
                onChange={(value) =>
                  handleToggleChange(value, "CopyAssociationDuringAmendment")
                }
              />
            </Col>
            <br />
            <br />
            <>
              <Col xs={4} md={2} lg={2} className=" ">
                <Button variant="success" onClick={handleUpdate}>
                  Update
                </Button>
              </Col>

              <Col xs={4} md={2} lg={2} className=" ">
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </Col>
            </>
          </Form.Group>
        ) : (
          <Form.Group as={Row} className="mb-3">
            <>
              <Col xs={4} md={2} lg={2} className=" ">
                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
              </Col>

              <Col xs={4} md={2} lg={2} className=" ">
                <Button variant="danger" onClick={handleCancel}>
                  Clear
                </Button>
              </Col>
            </>
          </Form.Group>
        )}
      </Form>
    </Col>
  );
};

export default AddAssociationForm;
