import React, { useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import { FaRegQuestionCircle } from "react-icons/fa";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";

import AgreeDocCSS from "./ConTypAgree.module.css";
import { Row, Col, Button } from "react-bootstrap";

//**** const Aggreement = (props) => {****/
const AggreementDtl = React.forwardRef((props, ref) => {
  const refValue = useRef();
  const [errors, setErrors] = useState({}); //**** */

  const SwitchStyle = {
    onColor: "#008000",
    offColor: "#FF0000",
    onHandleColor: "#FFFFFF",
    offHandleColor: "#FFFFFF",
    handleDiameter: 20,
    uncheckedIcon: false,
    checkedIcon: false,
  };

  const [formData, setFormData] = useState({
    // ContractTypeName: "",
    // Description: "",
    // Category: "",
    // AllowThirdPartyPaper: false,
    // AllowClauseAssembly: false,
    // QRCode: false,
    // AllowCopywithAssociation: false,
    // TwoColumnAttributeLayout: false,
    // EnableCollaboration: false,
    // EnableAutoSupersede: false,
    // ExpandDropDownonMouseHover: false,
  });

  useEffect(() => {
    setFormData(props.data);
    return () => {};
  }, [formData]);

  //*********** */
  const handleFormSubmit = (e) => {
    props.validateForm(formData, props.validationSchema);
  };

  // ******Forward the ref to the parent component*******/
  React.useImperativeHandle(ref, () => ({
    handleFormSubmit,
    setErrors,
  }));
  //*************************** */
  const handleBlur = async (fieldName) => {
    try {
      await props
        .fieldValidation("text", fieldName)
        .validate({ [fieldName]: formData[fieldName] }, { abortEarly: false });
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

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    refValue.current = formData;
    props.onChange(name, value);
  };

  const handleToggleChange = (value, object, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    refValue.current = formData;
    props.onChange(name, value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Form Data:", formData);
  // };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Form Data:", formData);

  //   try {
  //     // Make an HTTP POST request to your API endpoint
  //     const response = await axios.post(
  //       "http://localhost:5000/AggrDtlTbl/create",
  //       formData
  //     );

  //     // Check if the request was successful
  //     if (response.status === 200) {
  //       console.log("Data has been successfully stored in the database.");
  //       // You can perform any additional actions here, such as showing a success message.
  //     } else {
  //       console.error("Error storing data in the database.");
  //       // Handle error scenarios, such as displaying an error message to the user.
  //     }
  //   }
  // };

  // ... (rest of your existing code)

  return (
    <>
      <Row className="mt-lg-4 mt-2 mt-md-3 ">
        <Col lg={1} className=" "></Col>
        <Col md={4} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}> Contract Type Name </h4>
        </Col>

        <Col md={8} lg={4} className=" mb-2 mb-lg-0">
          <FloatingLabel
            controlId="floatingInput"
            // label="Please enter Contract type name"
            className="mb-lg-2 mb-1"
          >
            <Form.Control
              type="text" // Add type attribute as 'text'
              placeholder="ContractTypeName" // Add placeholder
              name="ContractTypeName" // Add a name attribute
              value={formData.ContractTypeName}
              onChange={handleInputChange}
              isInvalid={!!errors.ContractTypeName} // ********/
              onBlur={() => handleBlur("ContractTypeName")} // ********/
            />
            {/******* */}
            <Form.Control.Feedback type="invalid">
              {errors.ContractTypeName}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col lg={4} className=" "></Col>
      </Row>

      {/*<Row>
        <Col lg={1} className=" "></Col>
        <Col md={4} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}> Contract Type Code </h4>
        </Col>

        <Col md={8} lg={4} className=" mb-2 mb-lg-0 ">
          <>
            <FloatingLabel
              controlId="floatingInput"
              //label="Auto Generated"
              className="mb-3"
            >
              <Form.Control
                type="text" // Add type attribute as 'text'
                placeholder="ContractTypeid" // Add placeholder
                name="ContractTypeid" // Add a name attribute
                value={formData.ContractTypeid}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </>
        </Col>

        <Col lg={4} className=" "></Col>
  </Row>*/}

      <Row>
        <Col lg={1} className=" "></Col>
        <Col md={4} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}> Description </h4>
        </Col>

        <Col md={8} lg={4} className=" mb-2 mb-lg-0">
          <>
            <FloatingLabel
              controlId="floatingInput"
              //label="Please enter Contract type description"
              className="mb-3"
            >
              <Form.Control
                type="text" // Add type attribute as 'text'
                placeholder="Description" // Add placeholder
                name="Description" // Add a name attribute
                value={formData.Description}
                onChange={handleInputChange}
                isInvalid={!!errors.Description}
                onBlur={() => handleBlur("Description")}
                as="textarea"
                style={{ height: "80px" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Description}
              </Form.Control.Feedback>
            </FloatingLabel>
          </>
        </Col>

        <Col lg={4} className=" "></Col>
      </Row>

      <Row>
        <Col lg={1} className=" "></Col>
        <Col md={4} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}> Category </h4>
        </Col>

        <Col md={8} lg={4} className="  mb-2 mb-lg-0">
          <FloatingLabel>
            <Form.Select
              type="select" // Add type attribute as 'text'
              //placeholder="Category" // Add placeholder
              className="form-select"
              name="Category" // Add a name attribute
              value={formData.Category}
              onChange={handleInputChange}
              isInvalid={!!errors.Category}
              onBlur={() => handleBlur("Category")}
            >
              <option value="Default">Default</option>
              <option value="Master Data Field">Master Data Field </option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.Category}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col lg={4} className=" "></Col>
      </Row>

      <Row className="my-2">
        <Col lg={1} className=" "></Col>
        <Col xs={6} md={6} lg={3} className="">
          <h4 className={AgreeDocCSS.AgreeFont}> Allow Third Party Paper </h4>
        </Col>

        <Col xs={6} md={6} lg={4} className=" ">
          <div className={AgreeDocCSS.column}>
            <Switch
              className={AgreeDocCSS.toggle}
              id="AllowThirdPartyPaper"
              name="AllowThirdPartyPaper"
              // value={props.AllowThirdPartyPaper }
              onChange={(value) =>
                handleToggleChange(
                  value ? "Yes" : "No",
                  formData,
                  "AllowThirdPartyPaper"
                )
              }
              checked={formData.AllowThirdPartyPaper === "Yes" ? true : false}
              {...SwitchStyle}
            />
            <div className={AgreeDocCSS.onoff}>
              {formData.AllowThirdPartyPaper === "Yes" ? "ON" : "OFF"}
            </div>
            <div className={AgreeDocCSS.question}>
              <FaRegQuestionCircle />
            </div>
          </div>
        </Col>

        <Col xs={0} md={0} lg={4} className=" "></Col>
      </Row>

      <Row className="my-2">
        <Col lg={1} className=" "></Col>
        <Col xs={6} md={6} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}> Allow Clause Assembly </h4>
        </Col>

        <Col xs={6} md={6} lg={4} className=" ">
          <div className={AgreeDocCSS.column}>
            <Switch
              className={AgreeDocCSS.toggle}
              id="AllowClauseAssembly"
              name="AllowClauseAssembly"
              onChange={(value) =>
                handleToggleChange(
                  value ? "Yes" : "No",
                  formData,
                  "AllowClauseAssembly"
                )
              }
              checked={formData.AllowClauseAssembly === "Yes" ? true : false}
              {...SwitchStyle}
            />
            <div className={AgreeDocCSS.onoff}>
              {formData.AllowClauseAssembly === "Yes" ? "ON" : "OFF"}
            </div>
            <div className={AgreeDocCSS.question}>
              <FaRegQuestionCircle />
            </div>
          </div>
        </Col>

        <Col xs={0} md={0} lg={4} className=" "></Col>
      </Row>

      <Row className="my-2">
        <Col lg={1} className=" "></Col>
        <Col xs={6} md={6} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}> QR Code </h4>
        </Col>

        <Col xs={6} md={6} lg={4} className=" ">
          <div className={AgreeDocCSS.column}>
            <Switch
              className={AgreeDocCSS.toggle}
              id="QRCode"
              name="QRCode"
              onChange={(value) =>
                handleToggleChange(value ? "Yes" : "No", formData, "QRCode")
              }
              checked={formData.QRCode === "Yes" ? true : false}
              {...SwitchStyle}
            />
            <div className={AgreeDocCSS.onoff}>
              {formData.QRCode === "Yes" ? "ON" : "OFF"}
            </div>
            <div className={AgreeDocCSS.question}>
              <FaRegQuestionCircle />
            </div>
          </div>
        </Col>

        <Col xs={0} md={0} lg={4} className=" "></Col>
      </Row>

      <Row className="my-2">
        <Col lg={1} className=" "></Col>
        <Col xs={6} md={6} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}>
            {" "}
            Allow Copy With Association{" "}
          </h4>
        </Col>

        <Col xs={6} md={6} lg={4} className=" ">
          <div className={AgreeDocCSS.column}>
            <Switch
              className={AgreeDocCSS.toggle}
              id="AllowCopywithAssociation"
              name="AllowCopywithAssociation"
              onChange={(value) =>
                handleToggleChange(
                  value ? "Yes" : "No",
                  formData,
                  "AllowCopywithAssociation"
                )
              }
              checked={
                formData.AllowCopywithAssociation === "Yes" ? true : false
              }
              {...SwitchStyle}
            />
            <div className={AgreeDocCSS.onoff}>
              {formData.AllowCopywithAssociation === "Yes" ? "ON" : "OFF"}
            </div>
            <div className={AgreeDocCSS.question}>
              <FaRegQuestionCircle />
            </div>
          </div>
        </Col>

        <Col xs={0} md={0} lg={4} className=" "></Col>
      </Row>

      <Row className="my-2">
        <Col lg={1} className=" "></Col>
        <Col xs={6} md={6} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}>
            {" "}
            Two Column Attribute Layout{" "}
          </h4>
        </Col>

        <Col xs={6} md={6} lg={4} className=" ">
          <div className={AgreeDocCSS.column}>
            <Switch
              className={AgreeDocCSS.toggle}
              id="TwoColumnAttributeLayout"
              name="TwoColumnAttributeLayout"
              onChange={(value) =>
                handleToggleChange(
                  value ? "Yes" : "No",
                  formData,
                  "TwoColumnAttributeLayout"
                )
              }
              checked={
                formData.TwoColumnAttributeLayout === "Yes" ? true : false
              }
              {...SwitchStyle}
            />
            <div className={AgreeDocCSS.onoff}>
              {formData.TwoColumnAttributeLayout === "Yes" ? "ON" : "OFF"}
            </div>
            <div className={AgreeDocCSS.question}>
              <FaRegQuestionCircle />
            </div>
          </div>
        </Col>

        <Col xs={0} md={0} lg={4} className=" "></Col>
      </Row>

      <Row className="my-2">
        <Col lg={1} className=" "></Col>
        <Col xs={6} md={6} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}>Enable Collaboration</h4>
        </Col>

        <Col xs={6} md={6} lg={4} className=" ">
          <div className={AgreeDocCSS.column}>
            <Switch
              className={AgreeDocCSS.toggle}
              id="EnableCollaboration"
              name="EnableCollaboration"
              onChange={(value) =>
                handleToggleChange(
                  value ? "Yes" : "No",
                  formData,
                  "EnableCollaboration"
                )
              }
              checked={formData.EnableCollaboration === "Yes" ? true : false}
              {...SwitchStyle}
            />
            <div className={AgreeDocCSS.onoff}>
              {formData.EnableCollaboration === "Yes" ? "ON" : "OFF"}
            </div>
            <div className={AgreeDocCSS.question}>
              <FaRegQuestionCircle />
            </div>
          </div>
        </Col>

        <Col xs={0} md={0} lg={4} className=" "></Col>
      </Row>

      <Row className="my-2">
        <Col lg={1} className=" "></Col>
        <Col xs={6} md={6} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}> Enable Auto Supersede </h4>
        </Col>

        <Col xs={6} md={6} lg={4} className=" ">
          <div className={AgreeDocCSS.column}>
            <Switch
              className={AgreeDocCSS.toggle}
              id="EnableAutoSupersede"
              name="EnableAutoSupersede"
              onChange={(value) =>
                handleToggleChange(
                  value ? "Yes" : "No",
                  formData,
                  "EnableAutoSupersede"
                )
              }
              checked={formData.EnableAutoSupersede === "Yes" ? true : false}
              {...SwitchStyle}
            />
            <div className={AgreeDocCSS.onoff}>
              {formData.EnableAutoSupersede === "Yes" ? "ON" : "OFF"}
            </div>
            <div className={AgreeDocCSS.question}>
              <FaRegQuestionCircle />
            </div>
          </div>
        </Col>

        <Col xs={0} md={0} lg={4} className=" "></Col>
      </Row>

      <Row className="my-2">
        <Col lg={1} className=" "></Col>
        <Col xs={6} md={6} lg={3} className=" ">
          <h4 className={AgreeDocCSS.AgreeFont}>
            {" "}
            Expand Drop-down on Mouse Hover{" "}
          </h4>
        </Col>

        <Col xs={6} md={6} lg={4} className=" ">
          <div className={AgreeDocCSS.column}>
            <Switch
              className={AgreeDocCSS.toggle}
              id="ExpandDropDownonMouseHover"
              name="ExpandDropDownonMouseHover"
              onChange={(value) =>
                handleToggleChange(
                  value ? "Yes" : "No",
                  formData,
                  "ExpandDropDownonMouseHover"
                )
              }
              checked={
                formData.ExpandDropDownonMouseHover === "Yes" ? true : false
              }
              {...SwitchStyle}
            />
            <div className={AgreeDocCSS.onoff}>
              {formData.ExpandDropDownonMouseHover === "Yes" ? "ON" : "OFF"}
            </div>
            <div className={AgreeDocCSS.question}>
              <FaRegQuestionCircle />
            </div>
          </div>
        </Col>

        <Col xs={0} md={0} lg={4} className=" ">
          {/* <Button onClick={handleSubmit}>Submit</Button> */}
        </Col>
      </Row>
    </>
  );
});
export default AggreementDtl;
