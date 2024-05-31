import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useState } from "react";

const useQuery = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

const ResetPassword = () => {
  const { t } = useTranslation();
  const query = useQuery();
  const token = query.get('token');
  const navigate = useNavigate();

  const handleResetPassword = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: token,
          password: values.newPassword
        })
      });

      if (response.ok) {
        alert("Password reset successful!");
        navigate("/login"); 
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred. Please try again.");
    }
    setSubmitting(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      <Grid container spacing={2} style={{ height: "80vh" }}>
      <Grid item xs={12} spacing={2}>
        <Box height="15%">
          <Typography
            color={"#191970"}
            variant="h5"
            marginTop={20}
            fontWeight="bold"
            className="auth-welcome"
          >
            {t("Reset Password")}
          </Typography>
        </Box>
        <Box height="55%">
          <Formik
            initialValues={{ newPassword: "" }}
            onSubmit={handleResetPassword}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Grid>
                  <TextField
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    required
                    helperText={
                      formik.touched.newPassword && !formik.values.newPassword
                        ? "Password mandatory"
                        : ""
                    }
                  />
                  {formik.errors.newPassword &&
                    formik.touched.newPassword &&
                    formik.errors.newPassword}
                </Grid>
                <br />
                <Grid>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "#191970" }}
                    disabled={formik.isSubmitting}
                  >
                    Update
                  </Button>
                  <NavLink to="/login" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#191970" }}
                    >
                      Cancel
                    </Button>
                  </NavLink>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
      </Container>
    </React.Fragment>
  );
};

export default ResetPassword;