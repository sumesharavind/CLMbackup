import React, { useState } from "react";
import {
  Modal,
  Tabs,
  Tab,
  Button,
  Row,
  Col,
  Form,
  Container,
  InputGroup,
} from "react-bootstrap";
import "./Preferences.css";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IoPersonAddSharp } from "react-icons/io5";

const Preferences = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("1"); // For Active Tabs
  const [activeSubTab, setActiveSubTab] = useState("subTab1");
  const [selectedThemeColor, setSelectedThemeColor] = useState("#FF5733");
  const [toggleSwitch1, setToggleSwitch1] = useState(false);
  const [toggleSwitch2, setToggleSwitch2] = useState(false);
  const [toggleSwitch3, setToggleSwitch3] = useState(false);
  const [toggleSwitch4, setToggleSwitch4] = useState(false);
  const [defaultChoice, setDefaultChoice] = useState("");
  const [recordsLayout, setRecordsLayout] = useState(false);
  const [languages, setLanguages] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [dateFormat, setDateFormat] = useState("");
  const [timeFormat, setTimeFormat] = useState("");
  const [currency, setCurrency] = useState("");
  const [delegation, setDelegation] = useState("");
  const [deligate, setDeligate] = useState("");

  const handleSave = () => {
    console.log("Preferences saved!");
    // setAppliedColor(selectedThemeColor);
  };

  const changeThemeColor = (color) => {
    setSelectedThemeColor(color);
    const modalHeader = document.querySelector(".modal-header");
    if (modalHeader) {
      modalHeader.style.backgroundColor = color;
      modalHeader.style.color = "#fff";
    }
  };

  return (
    <Modal show={isOpen} onHide={() => onClose(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Preferences</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="preferences-tabs"
          activeKey={activeTab}
          onSelect={(tab) => setActiveTab(tab)}
        >
          <Tab eventKey="1" title="My Settings">
            <Container>
              <Row className="mb-2">
                <Col xs={6} md={6}>
                  <div>Records Per Page (User Defined)</div>
                </Col>
                <Col xs={4} md={2}>
                  <Form.Control type="number" />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6} md={6}>
                  <div>Default Choice on Grid</div>
                </Col>
                <Col xs={6} md={6}>
                  <Form.Select
                    value={defaultChoice}
                    onChange={(e) => setDefaultChoice(e.target.value)}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    {/* Add other options */}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6} md={6}>
                  <div>Records Layout</div>
                </Col>
                <Col xs={6} md={6}>
                  <Form.Select
                    value={recordsLayout}
                    onChange={(e) => setRecordsLayout(e.target.value)}
                  >
                    <option value="option1">1</option>
                    <option value="option2">2</option>
                    <option value="option2">3</option>
                    <option value="option2">4</option>
                    <option value="option2">5</option>
                    <option value="option2">6</option>
                    <option value="option2">7</option>
                    <option value="option2"></option>

                    {/* Add other options */}
                  </Form.Select>
                </Col>
              </Row>
              <Form>
                <Row id="1" className="mb-3">
                  <Col xs={6} md={6}>
                    <div>Search Pane Visibility</div>
                  </Col>
                  <Col xs={4} md={6}>
                    <Form.Check
                      type="switch"
                      id="toggle-switch-1"
                      checked={toggleSwitch1}
                      onChange={() => setToggleSwitch1(!toggleSwitch1)}
                      className={toggleSwitch1 ? "on" : "off"}
                    />
                  </Col>
                </Row>
                <Row id="2" className="mb-3">
                  <Col xs={6} md={6}>
                    <div>Expand Left Menu For Details Page</div>
                  </Col>
                  <Col xs={4} md={6}>
                    <Form.Check
                      type="switch"
                      id="toggle-switch-2"
                      checked={toggleSwitch2}
                      onChange={() => setToggleSwitch2(!toggleSwitch2)}
                      className={toggleSwitch2 ? "on" : "off"}
                    />
                  </Col>
                </Row>
                <Row id="3" className="mb-3">
                  <Col xs={6} md={6}>
                    <div>Open Every Record in the Same Tab</div>
                  </Col>
                  <Col xs={4} md={6}>
                    <Form.Check
                      type="switch"
                      id="toggle-switch-3"
                      checked={toggleSwitch3}
                      onChange={() => setToggleSwitch3(!toggleSwitch3)}
                      className={toggleSwitch3 ? "on" : "off"}
                    />
                  </Col>
                </Row>
                <Row id="4" className="mb-3">
                  <Col xs={6} md={6}>
                    <div>High Contrast Mode</div>
                  </Col>
                  <Col xs={4} md={6}>
                    <Form.Check
                      type="switch"
                      id="toggle-switch-4"
                      checked={toggleSwitch4}
                      onChange={() => setToggleSwitch4(!toggleSwitch4)}
                      className={toggleSwitch4 ? "on" : "off"}
                    />
                  </Col>
                </Row>
              </Form>
            </Container>
            <h5 className="mt-2">Theme Color</h5>
            <div className="color-circles">
              <div
                className="color-circle"
                style={{ backgroundColor: "#FF5733" }}
                onClick={() => changeThemeColor("#FF5733")}
              ></div>
              <div
                className="color-circle"
                style={{ backgroundColor: "#33FF57" }}
                onClick={() => changeThemeColor("#33FF57")}
              ></div>
              <div
                className="color-circle"
                style={{ backgroundColor: "#5733FF" }}
                onClick={() => changeThemeColor("#5733FF")}
              ></div>
              <div
                className="color-circle"
                style={{ backgroundColor: "#FF33E1" }}
                onClick={() => changeThemeColor("#FF33E1")}
              ></div>
              <div
                className="color-circle"
                style={{ backgroundColor: "#33E1FF" }}
                onClick={() => changeThemeColor("#33E1FF")}
              ></div>
            </div>
          </Tab>
          <Tab eventKey="2" title="Local Settings">
            <Container>
              <Form>
                <Row className="mb-3">
                  <Col xs={6} md={4}>
                    <div>Languages</div>
                  </Col>
                  <Col xs={5} md={5}>
                    {/* Dropdown for Languages */}
                    <Form.Select
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      {/* Add other language options */}
                    </Form.Select>
                  </Col>
                </Row>

                {/* Dropdown for Time zone */}
                <Row className="mb-3">
                  <Col xs={6} md={4}>
                    <div>Time zone</div>
                  </Col>
                  <Col xs={5} md={5}>
                    <Form.Select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                    >
                      <option value="utc">UTC</option>
                      <option value="est">EST</option>
                      {/* Add other time zone options */}
                    </Form.Select>
                  </Col>
                </Row>

                {/* Dropdown for Date Format */}
                <Row className="mb-3">
                  <Col xs={6} md={4}>
                    <div>Date Format</div>
                  </Col>
                  <Col xs={5} md={5}>
                    <Form.Select
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                    >
                      <option value="ddmmyyyy">DD/MM/YYYY</option>
                      <option value="mmddyyyy">MM/DD/YYYY</option>
                      {/* Add other date format options */}
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={6} md={4}>
                    <div>Time Format</div>
                  </Col>
                  <Col xs={5} md={5}>
                    <Form.Select
                      value={timeFormat}
                      onChange={(e) => setTimeFormat(e.target.value)}
                    >
                      <option value="HH:MM:SS">HH:MM:SS</option>
                      <option value="hh:mm:ss">hh:mm:ss</option>
                      {/* Add other date format options */}
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={6} md={4}>
                    <div>Preffered Currency</div>
                  </Col>
                  <Col xs={5} md={5}>
                    <Form.Select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="USD ($)">USD ($)</option>
                      <option value="EUR (€)"> EUR (€)</option>
                      {/* Add other date format options */}
                    </Form.Select>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Tab>
          <Tab eventKey="3" title="Auto Delegation">
            <Container>
              <Row className="mb-3">
                <Col xs={3} md={4}>
                  <div>Time Period</div>
                </Col>
                <Col className="mt-1" xs={1} md={1}>
                  <p>From</p>
                </Col>
                <Col xs={3} md={3}>
                  <Form.Control type="date" placeholder="From" />
                </Col>
                <Col xs={1} md={1}>
                  <p>To</p>
                </Col>
                <Col xs={3} md={3}>
                  <Form.Control type="date" placeholder="To" />
                </Col>
              </Row>
              <Row>
                <Col xs={4} md={4}>
                  <div>Delegation Condition</div>
                </Col>
                <Col xs={5} md={5}>
                  <Form.Select
                    value={delegation}
                    onChange={(e) => setDelegation(e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="Option 2">Option 2</option>
                    {/* Add other date format options */}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={4} md={4}>
                  <div>Delegate to User</div>
                </Col>
                <Col xs={5} md={5}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter user for delegation"
                      value={deligate}
                      onChange={(e) => setDeligate(e.target.value)}
                    />
                    <InputGroup.Text>
                      <IoPersonAddSharp
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("clicked!");
                        }}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Col xs={3} md={3}>
                <Button
                  variant="outline-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("clicked!");
                  }}
                >
                  Delegate
                </Button>
              </Col>
            </Container>
            <Container className="mt-2">
              <Tabs
                id="auto-delegation-tabs"
                activeKey={activeSubTab}
                onSelect={(tab) => setActiveSubTab(tab)}
              >
                <Tab eventKey="subTab1" title="Active Deligations">
                  {/* Content for Tab 1 */}
                </Tab>
                <Tab eventKey="subTab2" title="Expired Deligations">
                  {/* Content for Tab 2 */}
                </Tab>
              </Tabs>
            </Container>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Preferences;
