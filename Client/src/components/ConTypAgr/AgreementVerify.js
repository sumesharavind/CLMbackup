import React from "react";
import { Form } from "react-bootstrap";
import AgreeCSS from "./ConTypAgree.module.css";
import { Container, Row, Col } from "react-bootstrap";

const AgreementVerify = ({ data }) => {
  /*  alert("Test = " + JSON.stringify(data));
  console.log(JSON.stringify(data)); */
  return (
    <Row className={AgreeCSS.verifyalign}>
      <Col lg={2}></Col>
      <Col lg={8}>
        <Form className={`mt-3 ${AgreeCSS.verifyFormAlign}`}>
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

          <Form.Group as={Row} controlId="formCategory">
            <Form.Label column lg={4} sm={2}>
              Category
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control plaintext readOnly defaultValue={data.Category} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAllowThirdPartyPaper">
            <Form.Label column lg={4} sm={2}>
              AllowThirdPartyPaper
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.AllowThirdPartyPaper}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formAllowClauseAssembly">
            <Form.Label column lg={4} sm={2}>
            AllowClauseAssembly
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.AllowClauseAssembly}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formQRCode">
            <Form.Label column lg={4} sm={2}>
              QRCode{" "}
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control plaintext readOnly defaultValue={data.QRCode} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formAllowCopywithAssociation">
            <Form.Label column lg={4} sm={2}>
            AllowCopywithAssociation{" "}
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.AllowCopywithAssociation}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formTwoColumnAttributeLayout">
            <Form.Label column lg={4} sm={2}>
              TwoColumnAttributeLayout{" "}
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.TwoColumnAttributeLayout}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEnableCollaboration">
            <Form.Label column lg={4} sm={2}>
            EnableCollaboration{" "}
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.EnableCollaboration}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formEnableAutoSupersede">
            <Form.Label column lg={4} sm={2}>
              EnableAutoSupersede{" "}
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.EnableAutoSupersede}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formExpandDropDownonMouseHover">
            <Form.Label column lg={4} sm={2}>
            ExpandDropDownonMouseHover{" "}
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={data.ExpandDropDownonMouseHover}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formSelectedAddAssociations">
            <Form.Label column lg={4} sm={2}>
              Selected AddAssociations
            </Form.Label>
            <Col lg={8} sm={10}>
              <Form.Control
                plaintext
                readOnly
                defaultValue={
                  data.SelectedAddAssociations
                    ? data.SelectedAddAssociations.join(", ")
                    : ""
                }
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
                defaultValue={
                  data.SelectedAttributes
                    ? data.SelectedAttributes.join(", ")
                    : ""
                }
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
                defaultValue={
                  data.TeamMembers ? data.TeamMembers.join("\n") : ""
                }
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

export default AgreementVerify;
