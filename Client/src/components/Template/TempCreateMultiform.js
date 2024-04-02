import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import TemplateCreationMultistepformCSS from "./TempCreateMultiform.module.css";

const TemplcreateMultiform = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle the form submission logic here
  };

  const getTemplatecreationDocContent = () => {
    switch (currentStep) {
      case 0:
        return <h6>Agrre</h6>;
      case 1:
        return <h6>Dual</h6>;
      case 2:
        return <h6>Association</h6>;
      case 3:
        return <h6>Display Prefrence</h6>;

      default:
        return null;
    }
  };

  return (
    <>
      <Container fluid></Container>
      <Container fluid className={TemplateCreationMultistepformCSS.MultiBg}>
        <Row className=" p-1">
          <Col
            xs={6}
            md={4}
            lg={3}
            className={TemplateCreationMultistepformCSS.FlexContainer}
          >
            <div
              className={` ${
                TemplateCreationMultistepformCSS.TemplatecreationMultistep
              } ${currentStep === 0 ? "bg-success text-white" : " "}`}
            >
              <h6 className={TemplateCreationMultistepformCSS.Tabstep}>1</h6>
            </div>
            <h5
              className={`ms-2 mt-2 fw-semibold ${TemplateCreationMultistepformCSS.Tabname}`}
            >
              Template Details
            </h5>
          </Col>
          <Col
            xs={6}
            md={4}
            lg={3}
            className={TemplateCreationMultistepformCSS.FlexContainer}
          >
            <div
              className={` ${
                TemplateCreationMultistepformCSS.TemplatecreationMultistep
              } ${currentStep === 1 ? "bg-success text-white" : " "}`}
            >
              <h6 className={TemplateCreationMultistepformCSS.Tabstep}>2</h6>
            </div>
            <h5
              className={`ms-2 mt-2 fw-semibold ${TemplateCreationMultistepformCSS.Tabname}`}
            >
              Tempalte Variables
            </h5>
          </Col>
          <Col
            xs={6}
            md={4}
            lg={3}
            className={TemplateCreationMultistepformCSS.FlexContainer}
          >
            <div
              className={` ${
                TemplateCreationMultistepformCSS.TemplatecreationMultistep
              } ${currentStep === 2 ? "bg-success text-white" : " "}`}
            >
              <h6 className={TemplateCreationMultistepformCSS.Tabstep}>3</h6>
            </div>
            <h5
              className={`ms-2 mt-2 fw-semibold ${TemplateCreationMultistepformCSS.Tabname}`}
            >
              Team
            </h5>
          </Col>

          <Col
            xs={6}
            md={4}
            lg={3}
            className={`${TemplateCreationMultistepformCSS.FlexContainer}`}
          >
            <div
              className={` ${
                TemplateCreationMultistepformCSS.TemplatecreationMultistep
              } ${currentStep === 3 ? "bg-success text-white" : " "}`}
            >
              <h6 className={TemplateCreationMultistepformCSS.Tabstep}>4</h6>
            </div>
            <h5
              className={`ms-2 mt-2 fw-semibold ${TemplateCreationMultistepformCSS.Tabname}`}
            >
              Verify
            </h5>
          </Col>

          {getTemplatecreationDocContent()}
        </Row>
        <Row className="p-3 p-md-5">
          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center">
            {currentStep > 0 && (
              <div
                className={TemplateCreationMultistepformCSS.movingButton}
                onClick={handlePrevious}
              >
                <p className={TemplateCreationMultistepformCSS.btnNext}>
                  Previous
                </p>
                <div className={TemplateCreationMultistepformCSS.btnNextBg}>
                  <FaArrowLeft
                    className={TemplateCreationMultistepformCSS.btnNextArrow}
                  />
                </div>
              </div>
            )}
          </Col>

          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center">
            {currentStep < 3 && (
              <div
                className={TemplateCreationMultistepformCSS.movingButton}
                onClick={handleNext}
              >
                <p className={TemplateCreationMultistepformCSS.btnNext}>Next</p>
                <div className={TemplateCreationMultistepformCSS.btnNextBg}>
                  <FaArrowRight
                    className={TemplateCreationMultistepformCSS.btnNextArrow}
                  />
                </div>
              </div>
            )}
          </Col>
          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center">
            {currentStep === 3 && (
              <div
                className={TemplateCreationMultistepformCSS.ApprovalButton}
                onClick={handleSubmit}
              >
                <p className={TemplateCreationMultistepformCSS.btnNext}>
                  Create
                </p>
              </div>
            )}
          </Col>

          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center ">
            {currentStep === 3 && (
              <div className={TemplateCreationMultistepformCSS.DiscardButton}>
                <p className={TemplateCreationMultistepformCSS.btnNext}>
                  Discard
                </p>
              </div>
            )}
          </Col>
          <Col xs={12} lg={4}></Col>

          {/* <Col xs={12} lg={1} className="mb-3 d-flex justify-content-center">
            {currentStep === 5 && (
              <div className={ TemplateCreationMultistepformCSS.CreateButton}>
                <p className={ TemplateCreationMultistepformCSS.btnNext}>Create</p>
              </div>
            )}
          </Col>
 
          <Col xs={12} lg={2} className="mb-3 d-flex justify-content-center">
            {currentStep === 5 && (
              <div className={`${ TemplateCreationMultistepformCSS.PublishButton}`}>
                <p className={ TemplateCreationMultistepformCSS.btnNext}>
                  Create and Publish
                </p>
              </div>
            )}
          </Col> */}

          <Col xs={12} lg={4}></Col>
        </Row>
      </Container>
    </>
  );
};

export default TemplcreateMultiform;
