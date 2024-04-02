import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Switch from "react-switch";
import { FaRegQuestionCircle } from "react-icons/fa";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FaEye } from "react-icons/fa"; // Adjust the import path based on your library
import AttributemoduleCSS from "./Attribute.module.css";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import * as yup from "yup";

const Attribute = ({ onHideAttribute, attrData, isAttrSearch }) => {
  const formDataRef = useRef([]);
  const [errors, setErrors] = useState({});
  formDataRef.current = attrData;
  const [isInitialRender, setIsInitialRender] = useState(true);

  const emptyAttrForm = () => {
    formDataRef.current["DisplayName"] = "";
    formDataRef.current["HtmlPrompt"] = "ABC";
    formDataRef.current["DataType"] = "Boolean";
    formDataRef.current["HelpMessage"] = "HelpMessage";
    formDataRef.current["Description"] = "XYZ";
    formDataRef.current["Source"] = "User";
    formDataRef.current["DefaultValue"] = "DefaultValue";
    formDataRef.current["IsDefault"] = "No";
    formDataRef.current["IsEditable"] = "No";
    formDataRef.current["IsMandatory"] = "No";
    formDataRef.current["TrackingAttribute"] = "No";
    formDataRef.current["IsUnique"] = "No";
    formDataRef.current["DefinedByRule"] = "No";
    formDataRef.current["IsInherit"] = "No";
    formDataRef.current["IsSearchable"] = "No";
    formDataRef.current["IsConditional"] = "No";
    formDataRef.current["IsSupersedableByAmmendments"] = "No";
    formDataRef.current["IsSupersedableByAssignments"] = "No";
    formDataRef.current["IsSupersedableByTermination"] = "No";
    formDataRef.current["IsLookup"] = "No";
    formDataRef.current["IsMultiSelect"] = "No";
    formDataRef.current["HasLookupFilter"] = "No";
    formDataRef.current["IsCascade"] = "No";
    formDataRef.current["JustificationRequired"] = "No";
    formDataRef.current["IsInheriteonAmendment"] = "No";
    formDataRef.current["IsDependonvaluebyReference"] = "No";
    formDataRef.current["EnableExpressions"] = "No";
  };

  const [formData, setFormData] = useState({
    DisplayName: "",
    HtmlPrompt: "ABC",
    DataType: "Boolean",
    HelpMessage: "HelpMessage",
    Description: "XYZ",
    Source: "User",
    DefaultValue: "DefaultValue",
    IsDefault: "No",
    IsEditable: "No",
    IsMandatory: "No",
    TrackingAttribute: "No",
    IsUnique: "No",
    DefinedByRule: "No",
    IsInherit: "No",
    IsSearchable: "No",
    IsConditional: "No",
    IsSupersedableByAmmendments: "No",
    IsSupersedableByAssignments: "No",
    IsSupersedableByTermination: "No",
    IsLookup: "No",
    IsMultiSelect: "No",
    HasLookupFilter: "No",
    IsCascade: "No",
    JustificationRequired: "No",
    IsInheriteonAmendment: "No",
    IsDependonvaluebyReference: "No",
    EnableExpressions: "No",
  });

  const SwitchStyle = {
    onColor: "#008000",
    offColor: "#FF0000",
    onHandleColor: "#FFFFFF",
    offHandleColor: "#FFFFFF",
    handleDiameter: 20,
    uncheckedIcon: false,
    checkedIcon: false,
  };

  const createFieldValidation = (fieldName) => {
    return yup
      .string()
      .required(`${fieldName} is required`)
      .transform((value) => (typeof value === "string" ? value.trim() : value))
      .matches(
        /^[a-zA-Z][a-zA-Z0-9\s]*$/,
        `${fieldName} must start with an alphabetic character and must only contain alphanumeric characters`
      )
      .min(3, `${fieldName} must be at least 3 characters long`)
      .max(20, `${fieldName} must not exceed 20 characters`);
  };

  const schema = yup.object().shape({
    DisplayName: !isAttrSearch ? createFieldValidation("Display Name") : "",
    HelpMessage: createFieldValidation("HelpMessage"),
    DefaultValue: createFieldValidation("DefaultValue"),
    // Add validation for other fields as needed
  });

  const handleBlur = async (fieldName) => {
    try {
      await createFieldValidation(fieldName).validate(
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

  // Handler for clearing data
  const handleClear = () => {
    // Implement your clear logic here
    emptyAttrForm();
    isAttrSearch = false;
    setIsInitialRender(true);
    onHideAttribute();
    console.log("Data cleared");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    formDataRef.current[name] = value;
  };

  const handleToggleChange = (value, object, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === true ? "Yes" : "No",
    }));
    formDataRef.current[name] = value === true ? "Yes" : "No";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      // Validation successful, continue with your form submission logic
      console.log("Form data is valid:", formData);

      console.log("Client" + formData);
      //  alert(JSON.stringify(formData));
      onHideAttribute();
      if (!isAttrSearch) {
        await axios
          .post("http://localhost:5000/attribute/create", formData)
          .then((response) => {
            console.log("Data created successfully:", response.data);
            alert("Data Saved Successfully");
          })
          .catch((error) => {
            console.error("Error adding item:", error);
          });
      } else {
        await axios
          .put(
            `http://localhost:5000/attribute/update/${formDataRef.current.DisplayName}`,
            formDataRef.current
          )
          .then((response) => {
            console.log("Data Updated Successfully", response.data);
            alert("Data Updated Successfully");
          })
          .catch((error) => {
            console.error("Error retrieving items:", error);
          });
      }
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrors(errors);
    }
  };

  // Handler for saving data
  const handleSave = () => {
    // Implement your save logic here
  };

  // Handler for adding
  const handleAdd = () => {
    // Implement your add logic here
    console.log("Add button clicked");
  };

  useEffect(() => {
    if (!isAttrSearch && isInitialRender) {
      emptyAttrForm();
      setIsInitialRender(false);
    }
  }, [isInitialRender]);

  return (
    <>
      <div className={AttributemoduleCSS.SlipaneBg}>
        <Row className="mt-lg-3 mt-md-3">
          <Col xs={12} md={4} lg={6} className="">
            <h4 className="fw-bold"> Add Attribute </h4>
          </Col>

          <Col xs={4} md={2} lg={2} className=" ">
            <Button
              className={`${AttributemoduleCSS.ButtonZoom} `}
              variant="success"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Col>

          <Col xs={4} md={2} lg={2} className=" ">
            <Button
              className={`${AttributemoduleCSS.ButtonZoom} `}
              variant="danger"
              onClick={handleClear}
            >
              Clear
            </Button>
          </Col>

          <Col xs={4} md={2} lg={2} className=" ">
            <Button
              className={`${AttributemoduleCSS.ButtonZoom} `}
              variant="primary"
              onClick={handleAdd}
            >
              + Add
            </Button>
          </Col>
        </Row>
        <Row className="mb-3 mt-lg-5 mt-3">
          <Col md={4} className=" ">
            <h4 className={AttributemoduleCSS.AttributeFont}> Display Name</h4>
          </Col>

          <Col md={8} className=" ">
            <Form.Control
              className={AttributemoduleCSS.formControl}
              type="text" // Add type attribute as 'text'
              placeholder="DisplayName" // Add placeholder
              name="DisplayName" // Add a name attribute
              value={formDataRef.current.DisplayName}
              onChange={handleInputChange}
              isInvalid={!!errors.DisplayName}
              onBlur={() => handleBlur("DisplayName")}
              disabled={isAttrSearch}
            />
            <Form.Control.Feedback type="invalid">
              {errors.DisplayName}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} className=" ">
            <h4 className={AttributemoduleCSS.AttributeFont}>HTML Prompt</h4>
          </Col>

          <Col md={8} className=" ">
            <div className={AttributemoduleCSS.abc}>
              <FaEye />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} className=" ">
            <h4 className={AttributemoduleCSS.AttributeFont}> Data Type </h4>
          </Col>

          <Col md={8} className=" ">
            <Form.Select
              className={AttributemoduleCSS.formControl}
              type="text" // Add type attribute as 'text'
              placeholder="DataType" // Add placeholder
              name="DataType" // Add a name attribute
              value={formDataRef.current.DataType}
              onChange={handleInputChange}
              isInvalid={!!errors.DataType}
            >
              <option value="Auto">Auto</option>
              <option value="Boolean">Boolean</option>
              <option value="Choice">Choice</option>
              <option value="Currency">Currency</option>
              <option value="Date">Date</option>
              <option value="Date Time">Date Time</option>
              <option value="Email">Email</option>
              <option value="File Selection">File Selection</option>
              <option value="Label">Label</option>
              <option value="Multi Select Choice">Multi Select Choice</option>
              <option value="Number">Number</option>
              <option value="Percentage">Percentage</option>
              <option value="Rich Text Area">Rich Text Area</option>
              <option value="String">String</option>
              <option value="Text Area">Text Area</option>
              <option value="URL">URL</option>
              <option value="User">User</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.DataType}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} className=" ">
            <h4 className={AttributemoduleCSS.AttributeFont}> Help Message </h4>
          </Col>

          <Col md={8} className=" ">
            <Form.Control
              className={AttributemoduleCSS.formControl}
              type="text" // Add type attribute as 'text'
              placeholder="HelpMessage" // Add placeholder
              name="HelpMessage" // Add a name attribute
              value={formDataRef.current.HelpMessage}
              onChange={handleInputChange}
              isInvalid={!!errors.HelpMessage}
              onBlur={() => handleBlur("HelpMessage")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.HelpMessage}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} className=" ">
            <h4 className={AttributemoduleCSS.AttributeFont}> Description </h4>
          </Col>

          <Col md={8} className=" ">
            <div className={AttributemoduleCSS.abc}>
              <FaEye />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} className=" ">
            <h4 className={AttributemoduleCSS.AttributeFont}> Source </h4>
          </Col>

          <Col md={8} className=" ">
            <Form.Select
              className={AttributemoduleCSS.formControl}
              type="text" // Add type attribute as 'text'
              placeholder="Source" // Add placeholder
              name="Source" // Add a name attribute
              value={formDataRef.current.Source}
              onChange={handleInputChange}
              isInvalid={!!errors.Source}
            >
              <option value="User">User</option>
              <option value="Integrated">Integrated</option>
              <option value="Script">Script</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.Source}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} className=" ">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Default Value{" "}
            </h4>
          </Col>

          <Col md={8} className=" ">
            <Form.Control
              className={AttributemoduleCSS.formControl}
              type="text" // Add type attribute as 'text'
              placeholder="DefaultValue" // Add placeholder
              name="DefaultValue" // Add a name attribute
              value={formDataRef.current.DefaultValue}
              onChange={handleInputChange}
              isInvalid={!!errors.DefaultValue}
              onBlur={() => handleBlur("DefaultValue")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.DefaultValue}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}> Is Default </h4>
            <div className="d-flex">
              <Switch
                id="IsDefault"
                name="IsDefault"
                onChange={(value) =>
                  handleToggleChange(value, formDataRef.current, "IsDefault")
                }
                isInvalid={!!errors.IsDefault}
                checked={formDataRef.current.IsDefault === "Yes" ? true : false}
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsDefault}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsDefault === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}> Is Editable </h4>
            <div className="d-flex">
              <Switch
                id="IsEditable"
                name="IsEditable"
                onChange={(value) =>
                  handleToggleChange(value, formDataRef.current, "IsEditable")
                }
                isInvalid={!!errors.IsEditable}
                checked={
                  formDataRef.current.IsEditable === "Yes" ? true : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsEditable}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsEditable === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}> Is Mandatory </h4>
            <div className="d-flex">
              <Switch
                id="IsMandatory"
                name="IsMandatory"
                onChange={(value) =>
                  handleToggleChange(value, formDataRef.current, "IsMandatory")
                }
                isInvalid={!!errors.IsMandatory}
                checked={
                  formDataRef.current.IsMandatory === "Yes" ? true : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsMandatory}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsMandatory === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>
          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Tracking Attribute{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="TrackingAttribute"
                name="TrackingAttribute"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "TrackingAttribute"
                  )
                }
                isInvalid={!!errors.TrackingAttribute}
                checked={
                  formDataRef.current.TrackingAttribute === "Yes" ? true : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.TrackingAttribute}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.TrackingAttribute === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}> Is Unique </h4>
            <div className="d-flex">
              <Switch
                id="IsUnique"
                name="IsUnique"
                onChange={(value) =>
                  handleToggleChange(value, formDataRef.current, "IsUnique")
                }
                isInvalid={!!errors.IsUnique}
                checked={formDataRef.current.IsUnique === "Yes" ? true : false}
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsUnique}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsUnique === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Defined by Rule{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="DefinedByRule"
                name="DefinedByRule"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "DefinedByRule"
                  )
                }
                isInvalid={!!errors.DefinedByRule}
                checked={
                  formDataRef.current.DefinedByRule === "Yes" ? true : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.DefinedByRule}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.DefinedByRule === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>
          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}> Is Inherit </h4>
            <div className="d-flex">
              <Switch
                id="IsInherit"
                name="IsInherit"
                onChange={(value) =>
                  handleToggleChange(value, formDataRef.current, "IsInherit")
                }
                isInvalid={!!errors.IsInherit}
                checked={formDataRef.current.IsInherit === "Yes" ? true : false}
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsInherit}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsInherit === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Is Searchable{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="IsSearchable"
                name="IsSearchable"
                onChange={(value) =>
                  handleToggleChange(value, formDataRef.current, "IsSearchable")
                }
                isInvalid={!!errors.IsSearchable}
                checked={
                  formDataRef.current.IsSearchable === "Yes" ? true : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsSearchable}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsSearchable === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Is Conditional{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="IsConditional"
                name="IsConditional"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "IsConditional"
                  )
                }
                isInvalid={!!errors.IsConditional}
                checked={
                  formDataRef.current.IsConditional === "Yes" ? true : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsConditional}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsConditional === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>
          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}> Is Lookup </h4>
            <div className="d-flex">
              <Switch
                id="IsLookup"
                name="IsLookup"
                onChange={(value) =>
                  handleToggleChange(value, formDataRef.current, "IsLookup")
                }
                isInvalid={!!errors.IsLookup}
                checked={formDataRef.current.IsLookup === "Yes" ? true : false}
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsLookup}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsLookup === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Is Multi Select{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="IsMultiSelect"
                name="IsMultiSelect"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "IsMultiSelect"
                  )
                }
                isInvalid={!!errors.IsMultiSelect}
                checked={
                  formDataRef.current.IsMultiSelect === "Yes" ? true : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsMultiSelect}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsMultiSelect === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Has Lookup Filter{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="HasLookupFilter"
                name="HasLookupFilter"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "HasLookupFilter"
                  )
                }
                isInvalid={!!errors.HasLookupFilter}
                checked={
                  formDataRef.current.HasLookupFilter === "Yes" ? true : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.HasLookupFilter}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.HasLookupFilter === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>
          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}> Is Cascade </h4>
            <div className="d-flex">
              <Switch
                id="IsCascade"
                name="IsCascade"
                onChange={(value) =>
                  handleToggleChange(value, formDataRef.current, "IsCascade")
                }
                isInvalid={!!errors.IsCascade}
                checked={formDataRef.current.IsCascade === "Yes" ? true : false}
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsCascade}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsCascade === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Justification Required{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="JustificationRequired"
                name="JustificationRequired"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "JustificationRequired"
                  )
                }
                isInvalid={!!errors.JustificationRequired}
                checked={
                  formDataRef.current.JustificationRequired === "Yes"
                    ? true
                    : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.JustificationRequired}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.JustificationRequired === "Yes"
                  ? "ON"
                  : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Is Supersedable By Amendment{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="IsSupersedableByAmmendments"
                name="IsSupersedableByAmmendments"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "IsSupersedableByAmmendments"
                  )
                }
                isInvalid={!!errors.IsSupersedableByAmmendments}
                checked={
                  formDataRef.current.IsSupersedableByAmmendments === "Yes"
                    ? true
                    : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsSupersedableByAmmendments}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsSupersedableByAmmendments === "Yes"
                  ? "ON"
                  : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>
          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Is Supersedable By Assignments{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="IsSupersedableByAssignments"
                name="IsSupersedableByAssignments"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "IsSupersedableByAssignments"
                  )
                }
                isInvalid={!!errors.IsSupersedableByAssignments}
                checked={
                  formDataRef.current.IsSupersedableByAssignments === "Yes"
                    ? true
                    : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsSupersedableByAssignments}
              </Form.Control.Feedback>

              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsSupersedableByAssignments === "Yes"
                  ? "ON"
                  : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Is Supersedable By Termination{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="IsSupersedableByTermination"
                name="IsSupersedableByTermination"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "IsSupersedableByTermination"
                  )
                }
                isInvalid={!!errors.IsSupersedableByTermination}
                checked={
                  formDataRef.current.IsSupersedableByTermination === "Yes"
                    ? true
                    : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsSupersedableByTermination}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsSupersedableByTermination === "Yes"
                  ? "ON"
                  : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>

          <Col xs={6} md={4} lg={4} className="py-md-3 py-2">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Is Inherite on Amendment{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="IsInheriteonAmendment"
                name="IsInheriteonAmendment"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "IsInheriteonAmendment"
                  )
                }
                isInvalid={!!errors.IsInheriteonAmendment}
                checked={
                  formDataRef.current.IsInheriteonAmendment === "Yes"
                    ? true
                    : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsInheriteonAmendment}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsInheriteonAmendment === "Yes"
                  ? "ON"
                  : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>
          <Col xs={6} md={6} lg={4} className=" ">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Is Depend on Value by reference{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="IsDependonvaluebyReference"
                name="IsDependonvaluebyReference"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "IsDependonvaluebyReference"
                  )
                }
                isInvalid={!!errors.IsDependonvaluebyReference}
                checked={
                  formDataRef.current.IsDependonvaluebyReference === "Yes"
                    ? true
                    : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.IsDependonvaluebyReference}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.IsDependonvaluebyReference === "Yes"
                  ? "ON"
                  : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>
          <Col xs={6} md={6} lg={4} className=" ">
            <h4 className={AttributemoduleCSS.AttributeFont}>
              {" "}
              Enable Expressions{" "}
            </h4>
            <div className="d-flex">
              <Switch
                id="EnableExpressions"
                name="EnableExpressions"
                onChange={(value) =>
                  handleToggleChange(
                    value,
                    formDataRef.current,
                    "EnableExpressions"
                  )
                }
                isInvalid={!!errors.EnableExpressions}
                checked={
                  formDataRef.current.EnableExpressions === "Yes" ? true : false
                }
                {...SwitchStyle}
                className={AttributemoduleCSS.switchAnimate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.EnableExpressions}
              </Form.Control.Feedback>
              <div className={AttributemoduleCSS.onoff}>
                {formDataRef.current.EnableExpressions === "Yes" ? "ON" : "OFF"}
                <FaRegQuestionCircle className="ms-1" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Attribute;
