// import React from "react";
// import Form from "react-bootstrap/Form";
// import BootstrapSwitchButton from "bootstrap-switch-button-react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { FaRegQuestionCircle } from "react-icons/fa";
// import AgreeDocCSS from "./ConTypAgree.module.css";
// import { FaEye } from "react-icons/fa";

// const AggrForm = ({ formData, handleInputChange, handleToggleChange }) => {
//   return (
//     <Form
//       onSubmit={(e) => e.preventDefault()}
//       className={AgreeDocCSS.AsDocForm}
//     >
//       <Form.Group as={Row} className="mb-3" controlId="formName">
//         <Form.Label column lg="4" md="6" xs="12">
//           Name
//         </Form.Label>

//         <Col lg="8" md="6" xs="12">
//           <Form.Control
//             type=""
//             placeholder=""
//             name="Name"
//             value={formData.Name}
//             onChange={handleInputChange}
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formDisplayName">
//         <Form.Label column lg="4" md="6" xs="12">
//           Display Name
//         </Form.Label>

//         <Col lg="8" md="6" xs="12">
//           <Form.Control
//             type=""
//             placeholder=""
//             name="DisplayName"
//             value={formData.DisplayName}
//             onChange={handleInputChange}
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formPageName">
//         <Form.Label column lg="4" md="6" xs="12">
//           Page Name
//         </Form.Label>

//         <Col lg="8" md="6" xs="12">
//           <Form.Control
//             type=""
//             placeholder=""
//             name="PageName"
//             value={formData.PageName}
//             onChange={handleInputChange}
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formHTMLPrompt">
//         <Form.Label column lg="4" md="6" xs="6">
//           HTML Prompt
//         </Form.Label>
//         <Col lg="8" md="6" xs="6" name="HTMLPrompt">
//           <FaEye className={AgreeDocCSS.FaEye} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formDataType">
//         <Form.Label column lg="4" md="6" xs="12">
//           Data Type
//         </Form.Label>
//         <Col lg="8" md="6" xs="12">
//           <Form.Control
//             as="select"
//             className="form-select"
//             name="DataType"
//             value={formData.DataType}
//             onChange={handleInputChange}
//           >
//             <option value="Auto">Auto</option>
//             <option value="Boolean">Boolean</option>
//             <option value="Choice">Choice</option>
//             <option value="Currency">Currency</option>
//             <option value="Date">Date</option>
//             <option value="Date Time">Date Time</option>
//             <option value="Email">Email</option>
//             <option value="File Selection">File Selection</option>
//             <option value="Label">Label</option>
//             <option value="Multi Select Choice">Multi Select Choice</option>
//             <option value="Number">Number</option>
//             <option value="Percentage">Percentage</option>
//             <option value="Rich Text Area">Rich Text Area</option>
//             <option value="String">String</option>
//             <option value="Text Area">Text Area</option>
//             <option value="URL">URL</option>
//             <option value="User">User</option>
//             {/* Add more options as needed */}
//           </Form.Control>
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formGroup">
//         <Form.Label column lg="4" md="6" xs="12">
//           Group
//         </Form.Label>

//         <Col lg="8" md="6" xs="12">
//           <Form.Control
//             type=""
//             placeholder=""
//             name="Group"
//             value={formData.Group}
//             onChange={handleInputChange}
//           />
//         </Col>
//       </Form.Group>

//       {/* Add additional fields for association */}
//       <Form.Group as={Row} className="mb-3" controlId="formHelpMessage">
//         <Form.Label column lg="4" md="6" xs="12">
//           Help Message
//         </Form.Label>

//         <Col lg="8" md="6" xs="12">
//           <Form.Control
//             type=""
//             placeholder=""
//             name="HelpMessage"
//             value={formData.HelpMessage}
//             onChange={handleInputChange}
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formDescription">
//         <Form.Label column lg="4" md="6" xs="6">
//           Description
//         </Form.Label>
//         <Col lg="8" md="6" xs="6" name="Description">
//           <FaEye className={AgreeDocCSS.FaEye} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formSource">
//         <Form.Label column lg="4" md="6" xs="12">
//           Source
//         </Form.Label>
//         <Col lg="8" md="6" xs="12">
//           <Form.Control
//             as="select"
//             className="form-select"
//             name="Source"
//             value={formData.Source}
//             onChange={handleInputChange}
//           >
//             <option value="User">User</option>
//             <option value="Integrated">Integrated</option>
//             <option value="Script">Script</option>
//             {/* Add more options as needed */}
//           </Form.Control>
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formDefaultValue">
//         <Form.Label column lg="4" md="6" xs="6">
//           Default Value
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.DefaultValue === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="DefaultValue"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "DefaultValue")
//             }
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formIsDefault">
//         <Form.Label column lg="4" md="6" xs="6">
//           Is Default <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.IsDefault === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="IsDefault"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "IsDefault")
//             }
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formIsEditable">
//         <Form.Label column lg="4" md="6" xs="6">
//           Is Editable <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.IsEditable === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="IsEditable"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "IsEditable")
//             }
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formIsMandatory">
//         <Form.Label column lg="4" md="6" xs="6">
//           Is Mandatory <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.IsMandatory === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="IsMandatory"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "IsMandatory")
//             }
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formTrackingAttribute">
//         <Form.Label column lg="4" md="6" xs="6">
//           Tracking Attribute <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.TrackingAttribute === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="TrackingAttribute"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "TrackingAttribute")
//             }
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formIsUnique">
//         <Form.Label column lg="4" md="6" xs="6">
//           Is Unique <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.IsUnique === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="IsUnique"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "IsUnique")
//             }
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formDefinedByRule">
//         <Form.Label column lg="4" md="6" xs="6">
//           Defined By Rule <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.DefinedByRule === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="DefinedByRule"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "DefinedByRule")
//             }
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formIsInherit">
//         <Form.Label column lg="4" md="6" xs="6">
//           Is Inherit <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.IsInherit === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="IsInherit"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "IsInherit")
//             }
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formIsSearchable">
//         <Form.Label column lg="4" md="6" xs="6">
//           Is Searchable <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.IsSearchable === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="IsSearchable"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "IsSearchable")
//             }
//           />
//         </Col>
//       </Form.Group>

//       {/* Toggle button for "Copy Association During Amendment" */}
//       <Form.Group as={Row} className="mb-3" controlId="formIsConditional">
//         <Form.Label column lg="4" md="6" xs="6">
//           IsConditional <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.IsConditional === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="IsConditional"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "IsConditional")
//             }
//           />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row} className="mb-3" controlId="formIsLookup">
//         <Form.Label column lg="4" md="6" xs="6">
//           Is Lookup <FaRegQuestionCircle />
//         </Form.Label>
//         <Col>
//           <BootstrapSwitchButton
//             checked={formData.IsLookup === "Yes" ? true : false}
//             onstyle="success"
//             offstyle="danger"
//             type="toggle"
//             name="IsLookup"
//             onChange={(value) =>
//               handleToggleChange(value, formData, "IsLookup")
//             }
//           />
//         </Col>
//       </Form.Group>
//     </Form>
//   );
// };

// export default AggrForm;

if (response1.status === 201) {
    //ORM
    let assocFormValues = Object.values(formData.step2Data);
    let contractTypeCode1 = response1.data.data.ContractTCode;

    console.log("assocformvalues " + JSON.stringify(assocFormValues));
    // Use Promise.all to wait for all async operations to complete
    await Promise.all(
      assocFormValues.map(async (aggreAssoFormJSON) => {
        aggreAssoFormJSON.ConTCode = contractTypeCode1;

        console.log("input Attribute " + JSON.stringify(aggreAssoFormJSON));
        // Step 1
        response2 = await axios.post(
          "http://localhost:5000/Aggrassoctbl/create",
          aggreAssoFormJSON
        );
        console.log("Association = " + JSON.stringify(response2.data));
      })
    );
  }
  console.log(response2.status);












