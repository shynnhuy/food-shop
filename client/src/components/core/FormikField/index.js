import React from "react";
import { ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";

const FormikField = ({
  margin = "none",
  name,
  label,
  variant = "outlined",
  type = "text",
  required = false,
  error,
}) => {
  return (
    <Field
      error={error || false}
      required={required}
      autoComplete="off"
      as={TextField}
      label={label}
      name={name}
      fullWidth
      type={type}
      variant={variant}
      margin={margin}
      helperText={<ErrorMessage name={name} />}
    />
  );
};

export default FormikField;
