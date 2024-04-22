import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setProfileImage(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          dob: "",
          mobNumber: "",
          email: "",
        }}
        onSubmit={(data: any) => {
          console.log(data, "data");
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} textAlign="center">
                <label htmlFor="profile-image">
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <Avatar
                    alt="Profile Picture"
                    src={profileImage || null || undefined}
                    sx={{ width: 100, height: 100, cursor: "pointer" }}
                  />
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="firstname"
                  label="Firstname"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lastname"
                  label="Lastname"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="dob"
                  label="DOB"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dob}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="mobNumber"
                  label="Mobile Number"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobNumber}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button type="submit" variant="contained" color="primary">
                  {t("Save")}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};
