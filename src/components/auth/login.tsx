import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { Home } from "../common/home";
import { getUserLogin, sendMail } from "./auth-service";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IResolveParams, LoginSocialGoogle } from "reactjs-social-login";
import { Google } from "@mui/icons-material";
import axios from "axios";

const Login = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>();
  const [mfaMail, setMfaMail] = useState<any>();
  const navigate = useNavigate();

  const handleMFA = async (data: any) => {
     setMfaMail(data);
    // console.log(data, "handleMfaval");
    try {
      const response = await axios.post('http://localhost:3000/users/send-otp', { email: data });
      console.log(response.data); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMFAVerification = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3000/users/verify-otp', { email: mfaMail, otp: data });
      console.log(response.data); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const { isLoading: isUpdateLoading, mutate: getLoginUser } = useMutation<
    any,
    Error
  >(
    async () => {
      if (userData) {
        return await getUserLogin(userData);
      }
    },
    {
      onSuccess: (res: any) => {
        console.log("updated successfully");
        navigate("/dashboard");
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  const { isLoading: isUpdateLoadings, mutate: sendEmail } = useMutation<
    any,
    Error
  >(
    async () => {
      if (mfaMail) {
        return await sendMail(mfaMail);
      }else{
        console.log("no mfa")
      }
    },
    {
      onSuccess: (res: any) => {
        console.log(res)
        console.log("mail sent successfully");
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    if(mfaMail){
      sendEmail();
    }
    if (userData) {
      getLoginUser();
    }
  }, [userData, mfaMail]);

  return (
    <Grid container spacing={2} style={{ height: "100vh" }}>
      <Grid item xs={8}>
        <Home />
      </Grid>
      <Grid item xs={4} spacing={2}>
        <Box height="15%">
          <Typography
            color={"#191970"}
            variant="h5"
            marginTop={5}
            fontWeight="bold"
            className="auth-welcome"
          >
            {t("User Login")}
          </Typography>
        </Box>
        <Box height="55%">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(data: any) => {
              setUserData(data);
              // getUserLogin(data);
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
                    onBlur={(e)=>{
                      handleMFA(e.target.value);
                    }}
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
                    onChange={(formik.handleChange)}
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
                  <TextField
                    id="mfa"
                    name="mfa"
                    label="Multi factor auth code"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={(e)=>{
                      handleMFAVerification(e.target.value);
                    }}
                    value={formik.values.mfa}
                    helperText={
                      formik.touched.mfa && !formik.values.mfa
                        ? "Enter the 6 digit MFA code"
                        : ""
                    }
                  />
                  {formik.errors.mfa && formik.touched.mfa && formik.errors.mfa}
                </Grid>
                <br />
                <Grid>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "#191970" }}
                    disabled={formik.isSubmitting}
                  >
                    {t("Submit")}
                  </Button>
                  <NavLink to="/sign-up" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#191970" }}
                    >
                      {t("Sign in")}
                    </Button>
                  </NavLink>
                  <NavLink
                    to="/forgot-password"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography color={"#191970"}>{t("forgot password")}?</Typography>
                  </NavLink>
                  <Grid>
                    <Typography>{t("OR")}</Typography>
                  </Grid>
                  <Grid>
                    <LoginSocialGoogle
                      client_id="1043116758259-0rjgl2irub8sempl72pl6t2fa766ftkq.apps.googleusercontent.com"
                      access_type="offline"
                      onResolve={({ provider, data }: IResolveParams) => {
                        console.log(provider, "Provider");
                        console.log(data, "data");
                      }}
                      onReject={(err) => {
                        console.log(err);
                      }}
                    >
                      Sign in with Google <Google></Google>
                    </LoginSocialGoogle>
                  </Grid>
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
