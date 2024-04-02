// validationSchema.js
import * as yup from "yup";

export function createValidationSchema(fieldType, fieldName) {
  let EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  switch (fieldType) {
    case "text":
      return yup
        .string()
        .required(`${fieldName} is required`)
        .transform((value) =>
          typeof value === "string" ? value.trim() : value
        )
        .matches(
          /^[a-zA-Z][a-zA-Z0-9\s]*$/,
          `${fieldName} must start with an alphabetic character and must only contain alphanumeric characters`
        )
        .min(3, `${fieldName} must be at least 3 characters long`)
        .max(50, `${fieldName} must not exceed 50 characters`);
    case "textarea":
      return (
        yup
          .string()
          .required(`${fieldName} is required`)
          .transform((value) =>
            typeof value === "string" ? value.trim() : value
          )
          /*.matches(
          /^[a-zA-Z][a-zA-Z0-9\s]*$/,
          `${fieldName} must start with an alphabetic character and must only contain alphanumeric characters`
        )*/
          .min(3, `${fieldName} must be at least 3 characters long`)
          .max(500, `${fieldName} must not exceed 500 characters`)
      );
    case "email":
      return yup
        .string()
        .email("Invalid email")
        .required("Email is required")
        .matches(EMAIL_REGEX, "Invalid email address");

    case "password":
      return yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required");

    case "checkbox":
      return yup.boolean().oneOf([true], "Checkbox must be checked");

    case "radio":
      return yup.string().required("Please select one option");

    case "dropdown":
      return yup.string().required("Please select an option");

    case "list":
      return yup.string().required("Please select an option");

    case "datepicker":
      return yup.date().required("Date is required");

    case "textarea":
      return yup.string().required("This field is required");

    case "custom":
      return yup
        .string()
        .test("custom-validation", "Custom validation failed", (value) => {
          // Add your custom validation logic here
          return value && value.length > 5;
        });

    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }
}
