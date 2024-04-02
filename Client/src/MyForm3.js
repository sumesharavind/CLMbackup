import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import * as yup from "yup";

const schema = yup.object().shape({
  textInput: yup.string().required("Text Input is required"),
  selectInput: yup.string().required("Select Input is required"),
  checkboxInput: yup.boolean().oneOf([true], "Checkbox is required"),
  radioInput: yup.string().required("Radio Input is required"),
  toggleInput: yup.boolean().oneOf([true], "Toggle Switch is required"),
});

const MyForm3 = () => {
  const [formData, setFormData] = useState({
    textInput: "",
    selectInput: "",
    checkboxInput: false,
    radioInput: "",
    toggleInput: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      // Validation successful, continue with your form submission logic
      console.log("Form data is valid:", formData);
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrors(errors);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="textInput">
              <Form.Label>Text Input</Form.Label>
              <Form.Control
                type="text"
                name="textInput"
                value={formData.textInput}
                onChange={handleChange}
                isInvalid={!!errors.textInput}
              />
              <Form.Control.Feedback type="invalid">
                {errors.textInput}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="selectInput">
              <Form.Label>Select Input</Form.Label>
              <Form.Control
                as="select"
                name="selectInput"
                value={formData.selectInput}
                onChange={handleChange}
                isInvalid={!!errors.selectInput}
              >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.selectInput}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="checkboxInput">
              <Form.Check
                type="checkbox"
                label="Checkbox Input"
                name="checkboxInput"
                checked={formData.checkboxInput}
                onChange={handleChange}
                isInvalid={!!errors.checkboxInput}
              />
              <Form.Control.Feedback type="invalid">
                {errors.checkboxInput}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Radio Input</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Option 1"
                  name="radioInput"
                  value="option1"
                  checked={formData.radioInput === "option1"}
                  onChange={handleChange}
                  isInvalid={!!errors.radioInput}
                />
                <Form.Check
                  type="radio"
                  label="Option 2"
                  name="radioInput"
                  value="option2"
                  checked={formData.radioInput === "option2"}
                  onChange={handleChange}
                  isInvalid={!!errors.radioInput}
                />
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.radioInput}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="toggleInput">
              <Form.Check
                type="switch"
                label="Toggle Switch Input"
                name="toggleInput"
                checked={formData.toggleInput}
                onChange={handleChange}
                isInvalid={!!errors.toggleInput}
              />
              <Form.Control.Feedback type="invalid">
                {errors.toggleInput}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MyForm3;
