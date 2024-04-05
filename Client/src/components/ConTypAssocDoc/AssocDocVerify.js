import React from "react";
import { Form } from "react-bootstrap";
import AssocDocCSS from "./ConTypAssocDoc.module.css";
import {  Row, Col } from "react-bootstrap";

const AssocDocVerify = ({ data }) => {
  /*  alert("Test = " + JSON.stringify(data));
  console.log(JSON.stringify(data)); */
  return (
    <Row className={AssocDocCSS.verifyalign}>
      <Col lg={2}></Col>
      <Col lg={8}>
        <Form className={`mt-3 ${AssocDocCSS.verifyFormAlign}`}>
          <Form.Group as={Row} controlId="formContractTypeName">
            <Form.Label column lg={4} sm={2}>
              Contract Type Name
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.ContractTypeName}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDescription">
            <Form.Label column lg={4} sm={2}>
              Description
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.Description}
              />
            </Col>
          </Form.Group>

          {/* Add more Form.Group for other fields in a similar manner */}

          <Form.Group as={Row} controlId="formAggrConstraint">
            <Form.Label column lg={4} sm={2}>
              Constraint
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control plaintext readOnly defaultValue={data.Constraint} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAllowDocumentAssembly">
            <Form.Label column lg={4} sm={2}>
              AllowDocumentAssembly
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.AllowDocumentAssembly}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formAllowDocumentUpload">
            <Form.Label column lg={4} sm={2}>
              Allow Document Upload
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.AllowDocumentUpload}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEnableApprovalWorkflow">
            <Form.Label column lg={4} sm={2}>
              Enable Approval Work flow
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.EnableApprovalWorkflow}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formShowFileDropZone">
            <Form.Label column lg={4} sm={2}>
              Show File Drop Zone
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.ShowFileDropZone}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formTwoColumnAttributeLayout">
            <Form.Label column lg={4} sm={2}>
              Two Column Attribute Layout
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.TwoColumnAttributeLayout}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEnableBulkProcessing">
            <Form.Label column lg={4} sm={2}>
              Enable Bulk Processing
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.EnableBulkProcessing}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formSelectedAttributes">
            <Form.Label column lg={4} sm={2}>
              Selected Attributes
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.SelectedAttributes.join(", ")}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formTeamMembers">
            <Form.Label column lg={4} sm={2}>
              Team Members
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                as="textarea"
                plaintext
                readOnly
                defaultValue={data.TeamMembers.join("\n")}
                style={{
                  whiteSpace: "pre-line",
                  width: "80%",
                  height: "150%",
                }}
              />
            </Col>
          </Form.Group>
        </Form>
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
};

export default AssocDocVerify;
