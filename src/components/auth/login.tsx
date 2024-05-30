import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IResolveParams, LoginSocialGoogle } from "reactjs-social-login";
import { Home } from "../common/home";
import { forgotPassword, getUserLogin } from "./auth-service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>();
  const [showMFAField, setShowMFAField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [TimeoutState, setTimeoutState] = useState<any>(null);
  const [loginSession, setLoginSession] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading: isForgotPasswordLoading,
    mutate: sendForgotPasswordEmail,
  } = useMutation<any, Error>(forgotPassword, {
    onSuccess: (res) => {
      toast.success("Mail Sent!");
      setOpenDialog(false);
    },
    onError: (err) => {
      toast.error("Failed to send mail");
      console.error("Error sending forgot password email:", err);
    },
  });

  const { isLoading: isUpdateLoading, mutate: getLoginUser } = useMutation<
    any,
    Error
  >(
    async () => {
      if (userData) {
        const loginResponse = await getUserLogin(userData);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", loginResponse.user?.user?._id);
        localStorage.setItem("email", loginResponse.user?.user?.email);
        localStorage.setItem("password", loginResponse.user?.user?.password);
        localStorage.setItem("username", loginResponse.user?.user?.username);
        return loginResponse;
      }
    },
    {
      onSuccess: (res: any) => {
        toast.success("Login Successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

        // setTimeoutState(
        //   setTimeout(() => {
        //     console.log("Session has expired, Please login!")
        //     toast.error("Session has expired, Please login!");
        //     localStorage.clear();
        //     navigate("/login");
        //   }, 2 * 60 * 1000)
        // );
      },
      onError: (err: any) => {
        toast.error("Failed to LogIn");
        console.log(err);
      },
    }
  );

  const handleMFAVerification = async (formik: any) => {
    const email = formik.values.email;
    const otp = formik.values.mfa;
    try {
      if (otp.length === 6) {
        const response = await axios.post(
          "http://localhost:3000/users/verify-otp",
          { email: email, otp: otp }
        );
        setOtpErrorMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setOtpErrorMessage("OTP verification failed. Please try again.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSendOTP = async (formik: any) => {
    const email = formik.values.email;
    setShowMFAField(true);
    setIsOtpSending(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/users/send-otp",
        { email: email }
      );
      console.log("OTP Sent Successfully!");
      setIsOtpSending(false);
      setIsOtpSent(true);
      setCountdown(60);
    } catch (error) {
      setIsOtpSending(false);
      console.error("Error:", error);
    }
  };

  const handleForgotPassword = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (userData) {
      getLoginUser();
    }
  }, [userData]);

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
                    label="Password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    style={{ width: "55%" }}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    required
                    type={showPassword ? "text" : "password"}
                    helperText={
                      formik.touched.password && !formik.values.password
                        ? "Password mandatory"
                        : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                    disabled={!showMFAField}
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      handleMFAVerification(formik);
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
                {otpErrorMessage && (
                  <Typography color="error">{otpErrorMessage}</Typography>
                )}
                <Grid>
                  <Button
                    onClick={() => handleSendOTP(formik)}
                    disabled={isOtpSending || countdown > 0}
                  >
                    {isOtpSending
                      ? "Sending OTP..."
                      : isOtpSent
                      ? `Resend OTP (${countdown}s)`
                      : "Send OTP"}
                  </Button>
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
                    to="#"
                    onClick={handleForgotPassword}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography color={"#191970"}>
                      {t("Forgot password")}?
                    </Typography>
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
                      Sign in with Google <Google />
                    </LoginSocialGoogle>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
      <Dialog
        open={openDialog}
        maxWidth="md"
        fullWidth
        sx={{ "& .MuiDialog-paper": { width: "600px", height: "200px" } }}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{t("Forgot Password")}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values: any) => {
              sendForgotPasswordEmail(values);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  fullWidth
                  margin="normal"
                  required
                />
                <DialogActions>
                  <Button onClick={handleCloseDialog}>{t("Cancel")}</Button>
                  <Button type="submit" variant="contained" color="primary">
                    {t("Submit")}
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Grid>
  );
};

export default Login;
