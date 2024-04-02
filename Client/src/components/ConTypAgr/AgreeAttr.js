import React, { useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import AgreeDocCSS from "./ConTypAgree.module.css";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
 
const AgreeAttr = (props) => {
  const [availableOptions, setAvailableOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const avaiAttrRef = useRef(null);
  const selAttrRef = useRef(null);
  const [attrFormData, setAttrFormData] = useState([]);
 
  const initialFormData = {
    Name:"", ///
    DisplayName: "",
    PageName:"",///
    HTMLPrompt: "ABC",
    DataType: "", //----------------
    Group:"",///
    HelpMessage: "",
    Description:"XYZ",///
    Source:"",///
    DefaultValue: "No",////
    IsDefault: "No",
    IsEditable: "No",
    IsMandatory: "No",
    TrackingAttribute: "No",
    IsUnique: "No",
    DefinedByRule: "No", //-------------
    IsInherit: "No",
    IsSearchable: "No",
    IsConditional: "No",
    IsLookup: "No",
    // ContractTypeCode: "", //--------
  };
 
  const [formData, setFormData] = useState(initialFormData);
 
  const collectFormData = (key, collectData) => {
    setAttrFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [key]: collectData,
      };
      props.onChange("AttrForm", updatedData);
      return updatedData;
    });
  };
 
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      collectFormData(selectedAttribute, updatedData);
      return updatedData;
    });
  };
 
  const handleToggleChange = (value, object, name) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value === true ? "Yes" : "No",
      };
      collectFormData(selectedAttribute, updatedData);
      return updatedData;
    });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with data:", formData);
  };
 
  const handleAttributeClick = (attribute) => {
    setFormData(initialFormData);
    setSelectedAttribute(attribute);
    if (attrFormData && attrFormData[attribute]) {
      setFormData(attrFormData[attribute]);
    } else {
      setFormData(initialFormData);
    }
  };
 
  const moveToLeft = () => {
    if (selAttrRef.current) {
      // Get the selected items
      const checkedOptions = Array.from(
        selAttrRef.current.querySelectorAll("li")
      )
        .filter((li) => li.querySelector('input[type="checkbox"]').checked)
        .map((checkedOption) => checkedOption.innerText);
 
      // Remove selected items from selectedItems
      const updatedSelectedOptions = selectedOptions.filter(
        (option) => !checkedOptions.includes(option)
      );
 
      // Add selected items to availableItems
      setAvailableOptions([...availableOptions, ...checkedOptions]);
 
      // Update selectedItemsnp
      setSelectedOptions(updatedSelectedOptions);
 
      setAttrFormData((prevData) => {
        const updatedData = { ...prevData };
        checkedOptions.forEach((option) => delete updatedData[option]);
        return updatedData;
      });
    }
  };
 
  const moveToRight = () => {
    if (avaiAttrRef.current) {
      // Get the selected items
      const checkedOptions = Array.from(
        avaiAttrRef.current.querySelectorAll("li")
      )
        .filter((li) => li.querySelector('input[type="checkbox"]').checked)
        .map((checkedOption) => checkedOption.innerText);
 
      // Remove selected items from availableItems
      const updatedAvailableOptions = availableOptions.filter(
        (option) => !checkedOptions.includes(option)
      );
 
      // Add selected items to selectedItems
      setSelectedOptions([...selectedOptions, ...checkedOptions]);
 
      // Update availableItems
      setAvailableOptions(updatedAvailableOptions);
 
      // Clear the selected attribute when moving items
      setSelectedAttribute(null);
    }
  };
 
  const moveToLeftAll = () => {
    if (selectedOptions.length > 0) {
      setAvailableOptions((prevOptions) => [
        ...prevOptions,
        ...selectedOptions,
      ]);
      setSelectedOptions([]);
 
      setFormData(initialFormData);
      setAttrFormData({});
    }
  };
 
  const moveToRightAll = () => {
    if (availableOptions.length > 0) {
      setSelectedOptions((prevOptions) => [
        ...prevOptions,
        ...availableOptions,
      ]);
      setAvailableOptions([]);
    }
  };
 
  const moveCheckedToTop = () => {
    // Get the selected items
 
    const checkedOptions = Array.from(selAttrRef.current.querySelectorAll("li"))
      .filter((li) => li.querySelector('input[type="checkbox"]').checked)
      .map((checkedOption) => checkedOption.innerText);
 
    const uncheckedOptions = Array.from(
      selAttrRef.current.querySelectorAll("li")
    )
      .filter((li) => !li.querySelector('input[type="checkbox"]').checked)
      .map((checkedOption) => checkedOption.innerText);
 
    setSelectedOptions([...checkedOptions, ...uncheckedOptions]);
 
    // Set the checked property of each option to false
    selectedOptions.forEach((option) => {
      const checkbox = selAttrRef.current.querySelector(
        `input[type="checkbox"][id="${option}"]`
      );
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  };
 
  const moveCheckedToBottom = () => {
    // Get the selected items
    const checkedOptions = Array.from(selAttrRef.current.querySelectorAll("li"))
      .filter((li) => li.querySelector('input[type="checkbox"]').checked)
      .map((checkedOption) => checkedOption.innerText);
 
    const uncheckedOptions = Array.from(
      selAttrRef.current.querySelectorAll("li")
    )
      .filter((li) => !li.querySelector('input[type="checkbox"]').checked)
      .map((checkedOption) => checkedOption.innerText);
 
    setSelectedOptions([...uncheckedOptions, ...checkedOptions]);
 
    // Set the checked property of each option to false
    selectedOptions.forEach((option) => {
      const checkbox = selAttrRef.current.querySelector(
        `input[type="checkbox"][id="${option}"]`
      );
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  };
 
  const moveCheckedToUp = () => {
    const selectedIndexes = [];
 
    // Get the selected items indexes
 
    selectedOptions.filter((option, index) => {
      if (
        selAttrRef.current.querySelector(
          `input[type="checkbox"][id="${option}"]`
        )?.checked
      ) {
        selectedIndexes.push(index);
      }
    });
 
    const newOptionist = [...selectedOptions];
 
    for (let i = 0; i < selectedIndexes.length; i++) {
      if (selectedIndexes[i] > 0) {
        const selectedOption = newOptionist.splice(selectedIndexes[i], 1)[0];
 
        newOptionist.splice(selectedIndexes[i] - 1, 0, selectedOption);
 
        setSelectedOptions(newOptionist);
      }
    }
 
    // Set the checked property of each option to false
    /* selectedOptions.forEach((option) => {
      const checkbox = selAttrRef.current.querySelector(
        `input[type="checkbox"][id="${option}"]`
      );
      if (checkbox) {
        checkbox.checked = false;
      }
    }); */
  };
 
  const moveCheckedToDown = () => {
    const selectedIndexes = [];
 
    // Get the selected items indexes
 
    selectedOptions.filter((option, index) => {
      if (
        selAttrRef.current.querySelector(
          `input[type="checkbox"][id="${option}"]`
        )?.checked
      ) {
        selectedIndexes.push(index);
      }
    });
 
    const newOptionist = [...selectedOptions];
 
    for (let i = selectedIndexes.length - 1; i >= 0; i--) {
      if (
        selectedIndexes[i] <= newOptionist.length - 1 &&
        selectedIndexes[i] !== -1
      ) {
        const selectedOption = newOptionist.splice(selectedIndexes[i], 1)[0];
 
        newOptionist.splice(selectedIndexes[i] + 1, 0, selectedOption);
 
        setSelectedOptions(newOptionist);
      }
    }
 
    // Set the checked property of each option to false
    /* selectedOptions.forEach((option) => {
      const checkbox = selAttrRef.current.querySelector(
        `input[type="checkbox"][id="${option}"]`
      );
      if (checkbox) {
        checkbox.checked = false;
      }
    }); */
  };
 
  useEffect(() => {
    // changes by 26/10/2023
    setAvailableOptions(props.data.AvailAttr);
    setSelectedOptions(props.data.SelAttr);
    setAttrFormData(props.data.AttrForm);
    if (
      (props.data.AvailAttr === null || props.data.AvailAttr.length === 0) &&
      (props.data.SelAttr === null || props.data.SelAttr.length === 0)
    ) {
      axios
        .get("http://localhost:5000/Attribute/read")
        .then((response) => {
          console.log("Item retrived successfully:", response.data);
          const display = response.data.map((x) => x.DisplayName);
          setAvailableOptions(display);
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    }
  }, []);
 
  useEffect(() => {
    props.onChange("AvailAttr", availableOptions);
    props.onChange("SelAttr", selectedOptions);
  }, [selectedOptions, availableOptions]);
 
  /*  useEffect(() => {
   
    return () => {};
  }, [formData,setFormData]);  */
 
  return (
    <div>
      <Row className="mt-lg-5 mt-3">
        <Col lg={3} xs={9} md={4}>
          <div className={AgreeDocCSS.dualListBox}>
            <div className={`pt-3 ps-4 pb-2 ${AgreeDocCSS.dualHead}`}>
              <h4 className={AgreeDocCSS.dualHeadFont}>Available Attributes</h4>
              <form>
                <input
                  className={AgreeDocCSS.attSearch}
                  type="text"
                  name="search"
                  placeholder="Search.."
                />
              </form>
            </div>
            <div className={AgreeDocCSS.leftList}>
              <ul ref={avaiAttrRef}>
                {availableOptions
                  .filter((val, id, array) => {
                    return array.indexOf(val) === id;
                  })
                  .map((option) => (
                    <li key={option}>
                      <label className={AgreeDocCSS.LabelAdjustment}>
                        <input
                          type="checkbox"
                          id={option}
                          value={option}
                          className={AgreeDocCSS.checkStyle}
                        />
                        <span className="ms-3">{option}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
            <div className={AgreeDocCSS.buttonContainer}>
              <button
                className={AgreeDocCSS.DualArrowBtn}
                onClick={moveToLeftAll}
              >
                <MdOutlineKeyboardDoubleArrowLeft />
              </button>
              <button className={AgreeDocCSS.DualArrowBtn} onClick={moveToLeft}>
                <MdOutlineKeyboardArrowLeft />
              </button>
              <button
                className={AgreeDocCSS.DualArrowBtn}
                onClick={moveToRight}
              >
                <MdOutlineKeyboardArrowRight />
              </button>
              <button
                className={AgreeDocCSS.DualArrowBtn}
                onClick={moveToRightAll}
              >
                <MdOutlineKeyboardDoubleArrowRight />
              </button>
            </div>
          </div>
        </Col>
 
        <Col lg={4} xs={9} md={4}>
          <div className={AgreeDocCSS.dualListBox}>
            <div className={`pt-3 ps-4 pb-2 ${AgreeDocCSS.dualHead}`}>
              <h4 className={AgreeDocCSS.dualHeadFont}>Selected Attributes</h4>
              <form>
                <input
                  className={AgreeDocCSS.attSearch}
                  type="text"
                  name="search"
                  placeholder="Search.."
                />
              </form>
            </div>
            <div className={` mt-3 mt-lg-0 ${AgreeDocCSS.rightList}`}>
              <ul ref={selAttrRef}>
                {selectedOptions
                  .filter((val, id, array) => {
                    return array.indexOf(val) === id;
                  })
                  .map((option) => (
                    <li key={option} className={AgreeDocCSS.parentList}>
                      <label className={AgreeDocCSS.LabelAdjustment}>
                        <input
                          type="checkbox"
                          id={option}
                          value={option}
                          className={AgreeDocCSS.checkStyle}
                        />
                        <span className="ms-3">{option}</span>
                      </label>
                      <input
                        type="radio"
                        name="SelectedAttribute"
                        onClick={() => handleAttributeClick(option)}
                        className={`${AgreeDocCSS.radioStyle}`}
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className={AgreeDocCSS.buttonContainer}>
              <button
                className={AgreeDocCSS.DualArrowBtn}
                onClick={moveCheckedToTop}
              >
                <MdOutlineKeyboardDoubleArrowUp />
              </button>
              <button
                className={AgreeDocCSS.DualArrowBtn}
                onClick={moveCheckedToUp}
              >
                <MdOutlineKeyboardArrowUp />
              </button>
              <button
                className={AgreeDocCSS.DualArrowBtn}
                onClick={moveCheckedToDown}
              >
                <MdOutlineKeyboardArrowDown />
              </button>
              <button
                className={AgreeDocCSS.DualArrowBtn}
                onClick={moveCheckedToBottom}
              >
                <MdOutlineKeyboardDoubleArrowDown />
              </button>
            </div>
          </div>
        </Col>
 
        {selectedOptions.length > 0 && selectedAttribute && (
          <Col lg={5}>
            <Form onSubmit={handleSubmit} className={AgreeDocCSS.AsDocForm}>
              <Form.Group as={Row} className="mb-3" controlId="formName">
                <Form.Label column lg="4" md="6" xs="12">
                   Name
                </Form.Label>
 
                <Col lg="8" md="6" xs="12">
                  <Form.Control
                    type=""
                    placeholder=""
                    name="Name"
                    value={formData.Name}
                    onChange={handleInputChange}
                  />
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formDisplayName">
                <Form.Label column lg="4" md="6" xs="12">
                  Display Name
                </Form.Label>
 
                <Col lg="8" md="6" xs="12">
                  <Form.Control
                    type=""
                    placeholder=""
                    name="DisplayName"
                    value={formData.DisplayName}
                    onChange={handleInputChange}
                  />
                </Col>
              </Form.Group>
 
             
              <Form.Group as={Row} className="mb-3" controlId="formPageName">
                <Form.Label column lg="4" md="6" xs="12">
                  Page Name
                </Form.Label>
 
                <Col lg="8" md="6" xs="12">
                  <Form.Control
                    type=""
                    placeholder=""
                    name="PageName"
                    value={formData.PageName}
                    onChange={handleInputChange}
                  />
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formHTMLPrompt">
                <Form.Label column lg="4" md="6" xs="6">
                  HTML Prompt
                </Form.Label>
                <Col lg="8" md="6" xs="6" name="HTMLPrompt">
                  <FaEye className={AgreeDocCSS.FaEye} />
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formDataType">
                <Form.Label column lg="4" md="6" xs="12">
                  Data Type
                </Form.Label>
                <Col lg="8" md="6" xs="12">
                  <Form.Control
                    as="select"
                    className="form-select"
                    name="DataType"
                    value={formData.DataType}
                    onChange={handleInputChange}
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
                    <option value="Multi Select Choice">
                      Multi Select Choice
                    </option>
                    <option value="Number">Number</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Rich Text Area">Rich Text Area</option>
                    <option value="String">String</option>
                    <option value="Text Area">Text Area</option>
                    <option value="URL">URL</option>
                    <option value="User">User</option>
                    {/* Add more options as needed */}
                  </Form.Control>
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formGroup">
                <Form.Label column lg="4" md="6" xs="12">
                  Group
                </Form.Label>
 
                <Col lg="8" md="6" xs="12">
                  <Form.Control
                    type=""
                    placeholder=""
                    name="Group"
                    value={formData.Group}
                    onChange={handleInputChange}
                  />
                </Col>
              </Form.Group>
 
              {/* Add additional fields for association */}
              <Form.Group as={Row} className="mb-3" controlId="formHelpMessage">
                <Form.Label column lg="4" md="6" xs="12">
                  Help Message
                </Form.Label>
 
                <Col lg="8" md="6" xs="12">
                  <Form.Control
                    type=""
                    placeholder=""
                    name="HelpMessage"
                    value={formData.HelpMessage}
                    onChange={handleInputChange}
                  />
                </Col>
              </Form.Group>
 
 
              <Form.Group as={Row} className="mb-3" controlId="formDescription">
                <Form.Label column lg="4" md="6" xs="6">
                Description
                </Form.Label>
                <Col lg="8" md="6" xs="6" name="Description">
                  <FaEye className={AgreeDocCSS.FaEye} />
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formSource">
                <Form.Label column lg="4" md="6" xs="12">
                Source
                </Form.Label>
                <Col lg="8" md="6" xs="12">
                  <Form.Control
                    as="select"
                    className="form-select"
                    name="Source"
                    value={formData.Source}
                    onChange={handleInputChange}
                  >
               
                    <option value="User">User</option>
                    <option value="Integrated">Integrated</option>
                    <option value="Script">Script</option>
                    {/* Add more options as needed */}
                  </Form.Control>
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formDefaultValue">
                <Form.Label column lg="4" md="6" xs="6">
                Default Value
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.DefaultValue === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="DefaultValue"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "DefaultValue")
                    }
                  />
                </Col>
              </Form.Group>
 
 
           
 
              <Form.Group as={Row} className="mb-3" controlId="formIsDefault">
                <Form.Label column lg="4" md="6" xs="6">
                  Is Default <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.IsDefault === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="IsDefault"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "IsDefault")
                    }
                  />
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formIsEditable">
                <Form.Label column lg="4" md="6" xs="6">
                  Is Editable <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.IsEditable === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="IsEditable"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "IsEditable")
                    }
                  />
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formIsMandatory">
                <Form.Label column lg="4" md="6" xs="6">
                  Is Mandatory <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.IsMandatory === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="IsMandatory"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "IsMandatory")
                    }
                  />
                </Col>
              </Form.Group>
 
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formTrackingAttribute"
              >
                <Form.Label column lg="4" md="6" xs="6">
                  Tracking Attribute <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={
                      formData.TrackingAttribute === "Yes" ? true : false
                    }
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="TrackingAttribute"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "TrackingAttribute")
                    }
                  />
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formIsUnique">
                <Form.Label column lg="4" md="6" xs="6">
                  Is Unique <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.IsUnique === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="IsUnique"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "IsUnique")
                    }
                  />
                </Col>
              </Form.Group>
 
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formDefinedByRule"
              >
                <Form.Label column lg="4" md="6" xs="6">
                  Defined By Rule <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.DefinedByRule === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="DefinedByRule"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "DefinedByRule")
                    }
                  />
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formIsInherit">
                <Form.Label column lg="4" md="6" xs="6">
                  Is Inherit <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.IsInherit === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="IsInherit"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "IsInherit")
                    }
                  />
                </Col>
              </Form.Group>
 
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formIsSearchable"
              >
                <Form.Label column lg="4" md="6" xs="6">
                  Is Searchable <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.IsSearchable === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="IsSearchable"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "IsSearchable")
                    }
                  />
                </Col>
              </Form.Group>
 
              {/* Toggle button for "Copy Association During Amendment" */}
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formIsConditional"
              >
                <Form.Label column lg="4" md="6" xs="6">
                  IsConditional <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.IsConditional === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="IsConditional"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "IsConditional")
                    }
                  />
                </Col>
              </Form.Group>
 
              <Form.Group as={Row} className="mb-3" controlId="formIsLookup">
                <Form.Label column lg="4" md="6" xs="6">
                  Is Lookup <FaRegQuestionCircle />
                </Form.Label>
                <Col>
                  <BootstrapSwitchButton
                    checked={formData.IsLookup === "Yes" ? true : false}
                    onstyle="success"
                    offstyle="danger"
                    type="toggle"
                    name="IsLookup"
                    onChange={(value) =>
                      handleToggleChange(value, formData, "IsLookup")
                    }
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        )}
      </Row>
    </div>
  );
};
 
export default AgreeAttr;