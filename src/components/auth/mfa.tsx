import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Box, Button, Grid, Typography } from "@mui/material";

export const MultiFactorAuthentication = () => {
  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue: any) => {
    setOtp(newValue);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid container>
        <Grid xs={12}>
          <Typography>Enter Verification Code</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography>We have sent a otp on you registered email</Typography>
        </Grid>
        <Grid xs={12}>
          <MuiOtpInput value={otp} onChange={handleChange} />
        </Grid>
        <Grid xs={12}>
          <Typography>Otp auto sends in `${"sec"}` sec</Typography>
        </Grid>
        <Grid xs={12}>
          <Button variant="contained" style={{ backgroundColor: "#191970" }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
