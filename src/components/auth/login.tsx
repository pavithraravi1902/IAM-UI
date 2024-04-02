import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import backgroundImage from "../../assets/auth1.jpeg";

const Login = () => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} style={{ height: "100vh" }}>
      <Grid item xs={8}>
        <Box
          bgcolor="#f0f0f0"
          height="100%"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        >
          ` First Box (3/4th) `{" "}
        </Box>
      </Grid>
      <Grid item xs={4} spacing={2}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Box height="25%" style={{ marginRight: "20px" }}>
            <Typography
              color={"#191970"}
              variant="h5"
              marginTop={5}
              fontWeight="bold"
            >
              {t("User Login")}
            </Typography>
          </Box>
          <Box height="25%">
            <Typography
              color={"#191970"}
              variant="h5"
              marginTop={5}
              fontWeight="bold"
            >
              {t("New User")}
            </Typography>
          </Box>
        </div>
        <Box height="75%">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(data: any) => {
              console.log(data);
            }}
          >
            {(formik: any) => (
              <form onSubmit={formik.handleSubmit}>
                <Grid>
                  <TextField
                    id="email"
                    name="email"
                    label="email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
                    helperText={
                      formik.errors.email &&
                      formik.touched.email &&
                      formik.errors.email
                    }
                  />
                </Grid>
                <br />
                <Grid>
                  <TextField
                    id="password"
                    name="password"
                    label="password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    required
                    helperText={
                      formik.touched.password && !formik.values.password
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
                    Submit
                  </Button>
                  <NavLink
                    to="/forgot-password"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography color={"#191970"}>forgot password?</Typography>
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

export default Login;
