import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaRegQuestionCircle } from "react-icons/fa";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import AssocDocCSS from "./ConTypAssocDoc.module.css";

const AssocDocDtl = React.forwardRef((props, ref) => {
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

  const [formData, setFormData] = useState(props.data);
  /* const [formData, setFormData] = useState({
    ContractTypeName: "",
    Description: "",
    AggrConstraint: "",
    AllowDocumentAssembly: false,
    AllowDocumentUpload: false,
    EnableApprovalWorkflow: false,
    ShowFileDropZone: false,
    TwoColumnAttributeLayout: false,
    EnableBulkProcessing: false,
  });*/

  useEffect(() => {
    setFormData(props.data);
    return () => {};
  }, [formData]);

  /*********** */
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

  return (
    <Container>
      <Row className={AssocDocCSS.detailAlign}>
        <Col lg={2}></Col>
        <Col lg={8}>
          <Form className={`mt-5 ${AssocDocCSS.detailFormAlign}`}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formContractTypeName"
            >
              <Form.Label column lg="5" md="6" xs="12">
                Contract Type Name
              </Form.Label>

              <Col lg="7" md="6" xs="12">
                <Form.Control
                  type=""
                  placeholder=""
                  name="ContractTypeName"
                  value={formData.ContractTypeName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.ContractTypeName}
                  onBlur={() => handleBlur("ContractTypeName")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ContractTypeName}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formDescription">
              <Form.Label column lg="5" md="6" xs="12">
                Description
              </Form.Label>

              <Col lg="7" md="6" xs="12">
                <Form.Control
                  type=""
                  placeholder=""
                  name="Description"
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
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formAggrConstraint"
            >
              <Form.Label column lg="5" md="6" xs="12">
                Constraint
              </Form.Label>
              <Col lg="7" md="6" xs="12">
                <Form.Control
                  as="select"
                  className="form-select"
                  name="AggrConstraint"
                  value={formData.AggrConstraint}
                  onChange={handleInputChange}
                  isInvalid={!!errors.AggrConstraint}
                  onBlur={() => handleBlur("AggrConstraint")}
                >
                  <option value="">Options</option>
                  <option value="Prerequisite">Prerequisite</option>
                  <option value="Postrequisite">Postrequisite</option>
                  <option value="None"> None</option>
                  {/* Add more options as needed */}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.AggrConstraint}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formAllowDocumentAssembly"
            >
              <Form.Label column lg="5" md="6" xs="6">
                Allow Document Assembly <FaRegQuestionCircle />
              </Form.Label>

              <Col>
                <BootstrapSwitchButton
                  onstyle="success"
                  offstyle="danger"
                  onChange={(value) =>
                    handleToggleChange(
                      value ? "Yes" : "No",
                      formData,
                      "AllowDocumentAssembly"
                    )
                  }
                  checked={
                    formData.AllowDocumentAssembly === "Yes" ? true : false
                  }
                  {...SwitchStyle}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formAllowDocumentUpload"
            >
              <Form.Label column lg="5" md="6" xs="6">
                Allow Document Upload <FaRegQuestionCircle />
              </Form.Label>
              <Col>
                <BootstrapSwitchButton
                  onstyle="success"
                  offstyle="danger"
                  onChange={(value) =>
                    handleToggleChange(
                      value ? "Yes" : "No",
                      formData,
                      "AllowDocumentUpload"
                    )
                  }
                  checked={
                    formData.AllowDocumentUpload === "Yes" ? true : false
                  }
                  {...SwitchStyle}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formEnableApprovalWorkflow"
            >
              <Form.Label column lg="5" md="6" xs="6">
                Enable Approval Workflow <FaRegQuestionCircle />
              </Form.Label>
              <Col>
                <BootstrapSwitchButton
                  onstyle="success"
                  offstyle="danger"
                  onChange={(value) =>
                    handleToggleChange(
                      value ? "Yes" : "No",
                      formData,
                      "EnableApprovalWorkflow"
                    )
                  }
                  checked={
                    formData.EnableApprovalWorkflow === "Yes" ? true : false
                  }
                  {...SwitchStyle}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formShowFileDropZone"
            >
              <Form.Label column lg="5" md="6" xs="6">
                Show File Drop Zone <FaRegQuestionCircle />
              </Form.Label>
              <Col>
                <BootstrapSwitchButton
                  onstyle="success"
                  offstyle="danger"
                  onChange={(value) =>
                    handleToggleChange(
                      value ? "Yes" : "No",
                      formData,
                      "ShowFileDropZone"
                    )
                  }
                  checked={formData.ShowFileDropZone === "Yes" ? true : false}
                  {...SwitchStyle}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formTwoColumnAttributeLayout"
            >
              <Form.Label column lg="5" md="6" xs="6">
                Two Column Attribute Layout <FaRegQuestionCircle />
              </Form.Label>
              <Col>
                <BootstrapSwitchButton
                  onstyle="success"
                  offstyle="danger"
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
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formEnableBulkProcessing"
            >
              <Form.Label column lg="5" md="6" xs="6">
                Enable Bulk Processing <FaRegQuestionCircle />
              </Form.Label>
              <Col>
                <BootstrapSwitchButton
                  onstyle="success"
                  offstyle="danger"
                  onChange={(value) =>
                    handleToggleChange(
                      value ? "Yes" : "No",
                      formData,
                      "EnableBulkProcessing"
                    )
                  }
                  checked={
                    formData.EnableBulkProcessing === "Yes" ? true : false
                  }
                  {...SwitchStyle}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <Col lg={2}></Col>
      </Row>
    </Container>
  );
});

export default AssocDocDtl;
