import React from "react";
import Stack from "react-bootstrap/Stack";
import SavButton from "../SavicControls/SavButton";
import HeadContentCSS from "./HeaderContent.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const HeaderContent = () => {
  return (
    <>
      <Stack
        direction="horizontal"
        className={`mt-3 ${HeadContentCSS.headContbg}`}
        gap={3}
      >
        <div className="p-2">Home</div>
        <div className="p-2 ms-auto">
          <SavButton
            text="EDIT DASHBOARD"
            className={HeadContentCSS.headContBtn}
          />
        </div>
        <div className="p-2">
          <SavButton text="REFRESH" className={HeadContentCSS.headContBtn} />
        </div>
      </Stack>
      <div>
        <Container fluid>
          <Row className="">
            <Col md={4} className="mt-3 pt-0 pb-0 ps-1 pe-0">
              <div className={` p-3 ${HeadContentCSS.HcontBg}`}>
                <h6 className="fw-bold">What would you like to do?</h6>
                <i className={HeadContentCSS.Nothing}>
                  Nothing to show here ,yet.
                </i>
              </div>
            </Col>
            <Col md={8} className="mt-3 pt-0 pb-0 ps-0 pe-1">
              <div className={` p-3 ${HeadContentCSS.HcontBg}`}>
                <h6 className="fw-bold">
                  My Task |&nbsp;&nbsp;&nbsp; 0 record
                </h6>
                <i className={HeadContentCSS.Nothing}>
                  Nothing to show here ,yet.
                </i>
              </div>
            </Col>
            <Col md={6} className="pt-0 pb-0 ps-1 pe-0">
              <div className={` p-3 ${HeadContentCSS.HcontBg}`}>
                <h6 className="fw-bold">What would you like to do?</h6>
                <i className={HeadContentCSS.Nothing}>
                  Nothing to show here ,yet.
                </i>
              </div>
            </Col>
            <Col md={6} className="pt-0 pb-0 ps-0 pe-1">
              <div className={` p-3 ${HeadContentCSS.HcontBg}`}>
                <h6 className="fw-bold">
                  My Task |&nbsp;&nbsp;&nbsp; 0 record
                </h6>
                <i className={HeadContentCSS.Nothing}>
                  Nothing to show here ,yet.
                </i>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HeaderContent;
