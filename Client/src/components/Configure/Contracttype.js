import { Container, Row, Col } from "react-bootstrap";
import Contracttypemodulecss from "./Contracttype.module.css";
import React, { useState } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Stack from "react-bootstrap/Stack";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { BsDatabaseFill } from "react-icons/bs";

const Contracttype = (props) => {
  const [currentPath, setCurrentPath] = useState("Configure / contracttype");

  const handleNavLinkClick = (componentName) => {
    // Call the callback function to change the displayed component in Home.js
    //setShowSubmenuNavbar(false);
    props.onComponentChange(componentName);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} md={12}>
            <Breadcrumb currentPath={currentPath} />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="mt-lg-2 mt-1">
          <h5
            className={`p-3 fw-semibold ${Contracttypemodulecss.Contractfont}`}
          >
            Create Contract Type
          </h5>
          <h6 className={Contracttypemodulecss.Selectcontractfont}>
            Select Contract Type
          </h6>
          <Row>
            <Col
              className={`p-3  m-2 text-center  ${Contracttypemodulecss.contractItems}`}
            >
              <Stack direction="horizontal">
                <div
                  class="form-check form-check-inline"
                  onClick={() => handleNavLinkClick("Multistep")}
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <span
                    className={`ms-2 ${Contracttypemodulecss.cursorPointer}`}
                  >
                    Agreement
                  </span>
                </div>
                <BsFillFileEarmarkPlusFill className="ms-auto" />
              </Stack>
            </Col>
            <Col
              className={`p-3  m-2 text-center  ${Contracttypemodulecss.contractItems}`}
            >
              <Stack direction="horizontal">
                <div
                  class="form-check form-check-inline"
                  onClick={() => handleNavLinkClick("AssocDocuMultiform")}
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <span
                    className={`ms-2 ${Contracttypemodulecss.cursorPointer}`}
                  >
                    Associated Documents
                  </span>
                </div>
                <BsFillFileEarmarkPlusFill className="ms-auto" />
              </Stack>
            </Col>
            <Col
              className={`p-3  m-2 text-center  ${Contracttypemodulecss.contractItems}`}
            >
              <Stack direction="horizontal">
                <div
                  class="form-check form-check-inline"
                  onClick={() => handleNavLinkClick("Multistep")}
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    value="option3"
                  />
                  <span
                    className={`ms-2 ${Contracttypemodulecss.cursorPointer}`}
                  >
                    Master Data
                  </span>
                </div>
                <BsDatabaseFill className="ms-auto" />
              </Stack>
            </Col>
            <Col
              className={`p-3  m-2 text-center  ${Contracttypemodulecss.contractItems}`}
            >
              <Stack direction="horizontal">
                <div
                  class="form-check form-check-inline"
                  onClick={() => handleNavLinkClick("Multistep")}
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio4"
                    value="option4"
                  />
                  <span
                    className={`ms-2 ${Contracttypemodulecss.cursorPointer}`}
                  >
                    Contract Request
                  </span>
                </div>
                <BsFillFileEarmarkPlusFill className="ms-auto" />
              </Stack>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default Contracttype;
