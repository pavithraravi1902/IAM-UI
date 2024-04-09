import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Home } from "../common/home";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { registerNewUser } from "./auth-service";
import { create } from "domain";
import { IResolveParams, LoginSocialGoogle } from "reactjs-social-login";
import { Google } from "@mui/icons-material";

const Signup = () => {
  const { t } = useTranslation();
  const [newUser, setNewUser] = useState();
  const navigate = useNavigate();

  const { isLoading: isUpdateLoading, mutate: createNewUser } = useMutation<
    any,
    Error
  >(
    async () => {
      if (newUser) {
        return await registerNewUser(newUser);
      }
    },
    {
      onSuccess: (res: any) => {
        console.log(res, "response message");
        console.log("updated successfully");
        navigate("/dashboard");
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    if (newUser) {
      createNewUser();
    }
  }, [newUser]);

  return (
    <Grid container spacing={2} style={{ height: "100vh" }}>
      <Grid item xs={8}>
        <Home />
      </Grid>
      <Grid item xs={4}>
        <Box height="15%">
          <Typography
            color={"#191970"}
            variant="h5"
            marginTop={15}
            fontWeight="bold"
            className="auth-welcome"
          >
            {t("New User")}
          </Typography>
        </Box>
        <Box height="55%">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(data: any) => {
              setNewUser(data);
              console.log(data);
            }}
          >
            {(formik: any) => (
              <form onSubmit={formik.handleSubmit}>
                <Grid>
                  <TextField
                    id="username"
                    name="username"
                    label="username"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    required
                    helperText={
                      formik.errors.username &&
                      formik.touched.username &&
                      formik.errors.username
                    }
                  />
                </Grid>
                <br />
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
                  <NavLink to="/login" style={{ textDecoration: "none" }}>
                    <Typography color={"#191970"}>login</Typography>
                  </NavLink>
                </Grid>
                <Grid><Typography>OR</Typography></Grid>
                  <Grid>
                    <LoginSocialGoogle
                      client_id="1043116758259-0rjgl2irub8sempl72pl6t2fa766ftkq.apps.googleusercontent.com"
                      access_type="offline"
                      onResolve={({ provider, data }: IResolveParams) => {
                        console.log(provider, 'Provider');
                        console.log(data, "data")
                      }}
                      onReject={(err)=>{
                        console.log(err)
                      }}
                      >
                        Sign in with Google <Google></Google>
                      </LoginSocialGoogle>
                  </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
