import { Box, Typography, Paper, Tabs, Tab, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { object, string } from "yup";

import useStyles from "./styles";
import FormikField from "components/core/FormikField";
import FormikRadio from "components/core/FormikRadio";

export const Profile = () => {
  const auth = useSelector((state) => state.auth);

  const { user } = auth;

  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => setValue(newValue);

  const classes = useStyles();

  const genderItems = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Neutral",
      value: "neutral",
    },
  ];

  const initalState = {
    email: user.email,
    displayName: user.displayName,
    address: user.address,
    age: user.age,
    gender: user.gender,
  };

  const validationSchema = object({
    email: string()
      .email("Invalid email format!")
      .required("Email are required!"),
    displayName: string().required("Display Name are required!"),
    address: string().required("Address are required!"),
    age: string().required("Age are required!"),
  });

  if (auth.isAuthenticated) {
    return (
      <Box className={classes.root}>
        <Box className={classes.child}>
          <Typography variant="h2" gutterBottom>
            {user.displayName} Profile
          </Typography>
          <Paper square className={classes.tab}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              variant="fullWidth"
            >
              <Tab label="Profile" />
              <Tab label="Shop Register" />
            </Tabs>

            <TabPanel value={value} index={0}>
              <Formik
                initialValues={initalState}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log(values);
                }}
              >
                {({ submitForm, isSubmitting, dirty, isValid, errors }) => (
                  <Form className={classes.form}>
                    <FormikField
                      margin="normal"
                      label="Email Address"
                      name="email"
                      type="email"
                      error={errors.email}
                    />
                    <FormikField
                      margin="normal"
                      label="Display Name"
                      name="displayName"
                      error={errors.displayName}
                    />
                    <FormikField
                      margin="normal"
                      label="Address"
                      name="address"
                      error={errors.address}
                    />
                    <FormikField
                      margin="normal"
                      label="Age"
                      name="age"
                      error={errors.age}
                      type="number"
                    />
                    <FormikRadio
                      className={classes.radio}
                      name="gender"
                      items={genderItems}
                      isSubmitting={isSubmitting}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      UPDATE INFORMATION
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item 2
            </TabPanel>
          </Paper>
        </Box>
      </Box>
    );
  }
  return null;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
