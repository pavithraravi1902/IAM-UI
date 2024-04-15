import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import backgroundImage from "../../assets/auth1.jpeg";
import { Formik } from "formik";
import { Home } from "../common/home";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "./auth-service";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [emailData, setEmailData] = useState();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const { isLoading: isUpdateLoading, mutate: doForgotPassword } = useMutation<
    any,
    Error
  >(
    async () => {
      if (emailData) {
        return await forgotPassword(emailData);
      }
    },
    {
      onSuccess: (res: any) => {
        console.log("updated successfully");
        //navigate("/dashboard");
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    if (emailData) {
      doForgotPassword();
    }
  }, [emailData]);

  return (
    <Grid container spacing={2} style={{ height: "100vh" }}>
      <Grid item xs={8}>
        <Home />
      </Grid>
      <Grid item xs={4}>
        <Box marginTop={25}>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(data: any) => {
              setEmailData(data);
              console.log(data, "data");
            }}
          >
            {(formik: any) => (
              <form onSubmit={formik.handleSubmit}>
                <Grid>
                  <Typography>{t("forgot password")}</Typography>
                </Grid>
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
                  />
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "#191970" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
