import { Home } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";

const ResetPassword = () => {
  const { t } = useTranslation();
  return (
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
            onSubmit={(data: any) => {
              console.log(data, "forgot password data");
            }}
          >
            {(formik: any) => (
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
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
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
                  <NavLink to="/sign-up" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ backgroundColor: "#191970" }}
                    >
                      Cancel
                    </Button>
                  </NavLink>
                  <NavLink to="/sign-up" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#191970" }}
                    >
                      Sign in
                    </Button>
                  </NavLink>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
