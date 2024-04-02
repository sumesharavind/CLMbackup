// Install Yup and other required packages
// npm install yup react-bootstrap bootstrap

// Import necessary libraries
import React, { useState } from "react";
import { Form, Button, Col, Container, Row, ListGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  textInput: yup
    .string()
    .trim("The contact name cannot include leading and trailing spaces")
    .required("some error msg")

    .matches(
      /^[a-zA-Z][a-zA-Z0-9\s]*$/,
      "Display Name must start with an alphabetic character and must only contain alphanumeric characters"
    )
    .min(3, "Display Name must be at least 3 characters long")
    .max(20, "Display Name must not exceed 20 characters"),
  listInput: yup.string().required("List input is required"),
  checkboxInput: yup.boolean().oneOf([true], "Checkbox must be checked"),
  radioInput: yup.string().required("Radio input is required"),
});

const initialValues = {
  textInput: "",
  listInput: "",
  checkboxInput: false,
  radioInput: "",
};

const options = ["Male", "Female"];
// Component
const MyForm2 = () => {
  const [validated, setValidated] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setValidated(true);
      // Handle form submission
      console.log(values);
    },
  });

  const handleValidation = () => {
    formik.handleSubmit();
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
            <Form.Group controlId="textInput">
              <Form.Label>Text Input</Form.Label>
              <Form.Control
                type="text"
                name="textInput"
                value={formik.values.textInput}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.textInput && !!formik.errors.textInput
                }
                feedback={formik.errors.textInput}
              />
            </Form.Group>

            <Form.Group controlId="listInput">
              <Form.Label>List Input</Form.Label>
              {/* Assume options is an array of options for the list */}
              <Form.Control
                as="select"
                name="listInput"
                value={formik.values.listInput}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.listInput && !!formik.errors.listInput
                }
              >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.listInput}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="checkboxInput">
              <Form.Check
                type="checkbox"
                name="checkboxInput"
                label="Checkbox Input"
                checked={formik.values.checkboxInput}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.checkboxInput && !!formik.errors.checkboxInput
                }
                feedback={formik.errors.checkboxInput}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Radio Input</Form.Label>
              <div>
                {options.map((option) => (
                  <Form.Check
                    key={option}
                    type="radio"
                    id={option}
                    name="radioInput"
                    label={option}
                    value={option}
                    checked={formik.values.radioInput === option}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.radioInput && !!formik.errors.radioInput
                    }
                    feedback={formik.errors.radioInput}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group controlId="toggleInput">
              <Form.Check
                type="switch"
                label="Toggle Switch Input"
                name="toggleInput"
                checked={formik.values.toggleInput}
                value={formik.values.toggleInput}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.toggleInput && !!formik.errors.textInput
                }
                feedback={formik.errors.toggleInput}
              />
            </Form.Group>

            <Button onClick={handleValidation} variant="primary" type="button">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MyForm2;
