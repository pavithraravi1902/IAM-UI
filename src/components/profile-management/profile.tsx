import { Avatar, Button, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { Formik } from "formik";
import * as React from "react";
import { useTranslation } from "react-i18next";
import UserProfileAPI from "./profile-service";
import { ToastContainer, toast } from "react-toastify";

export const Profile = () => {
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = React.useState<any>();
  const userId = localStorage.getItem("userId") || "";
  const username = localStorage.getItem("username") || "";
  const email = localStorage.getItem("email") || "";
  const [profile, setProfile] = React.useState<any>();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [uploadedFile, setUploadedFile] = React.useState();

  const { useAddProfile, useUpdateProfile, useGetProfileById } =
    UserProfileAPI();

  const { mutate: addProfile } = useAddProfile();
  const { mutate: updateProfile } = useUpdateProfile();
  const { data: userProfile } = useGetProfileById(userId);

  const handleImageChange = async (event: any, setFieldValue: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:3000/document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      setFieldValue("profilePhoto", response.data);
      setUploadedFile(response.data);
      setProfileImage(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSuccess = (response: any) => {
    console.log(response);
    toast.success("Profile Saved Successfully");
  };

  const handleError = (response: any) => {
    console.log(response);
    toast.error("Failed to save");
  };

  const handleSubmit = (data: any) => {
    if (userProfile) {
      updateProfile(data, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
    } else {
      addProfile(data, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
       console.log(userProfile, "userProfile")
        setProfile(userProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [userProfile]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{ bgcolor: "#FFFFFF", padding: 4, borderRadius: 2, boxShadow: 3 }}
        >
          <Formik
            initialValues={{
              profilePhoto: null || profile?.user?.profilePhoto,
              userId: userId || profile?.user?.userId || '',
              firstName: username || profile?.user?.firstName || '',
              lastName: "" || profile?.user?.lastName,
              dob: "" || profile?.user?.dob,
              mobileNumber: "" || profile?.user?.mobileNumber,
              email: email || profile?.user?.email,
            }}
            // validationSchema={}
            enableReinitialize={true} 
            onSubmit={(data: any) => {
              handleSubmit(data);
            }}
          >
            {(formik: any) => (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                >
                  <Grid item>
                    <label htmlFor="profile-image-upload">
                      <input
                        id="profile-image-upload"
                        type="file"
                        accept="image/*"
                        src={profileImage || ""}
                        style={{ display: "none" }}
                        onChange={(event) =>
                          handleImageChange(event, formik.setFieldValue)
                        }
                      />
                      <Avatar
                        alt="Profile Picture"
                        src={profileImage || ""}
                        sx={{ width: 100, height: 100, cursor: "pointer" }}
                        onClick={() =>
                          document
                            .getElementById("profile-image-upload")
                            ?.click()
                        }
                      />
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      id="profilePhoto"
                      label="Profile Photo"
                      variant="filled"
                      fullWidth
                      name="profilePhoto"
                      value={formik.values?.profilePhoto?.originalFileName}
                      disabled
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <TextField
                    id="userId"
                    name="userId"
                    value={formik.values.userId}
                    type="hidden"
                  />
                  <Grid item xs={12} sm={10}>
                    <TextField
                      id="firstName"
                      label="Firstname"
                      variant="filled"
                      fullWidth
                      name="firstName"
                      placeholder={t("firstname")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                      error={Boolean(
                        formik.touched.firstName && formik.errors.firstName
                      )}
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="lastName"
                      label="Lastname"
                      variant="filled"
                      fullWidth
                      name="lastName"
                      placeholder={t("lastname")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                      error={Boolean(
                        formik.touched.lastName && formik.errors.lastName
                      )}
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      id="dob"
                      label="Date Of Birth"
                      variant="filled"
                      fullWidth
                      name="dob"
                      placeholder={t("DOB")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dob}
                      error={Boolean(formik.touched.dob && formik.errors.dob)}
                      helperText={formik.touched.dob && formik.errors.dob}
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      id="mobileNumber"
                      label="Mobile Number"
                      variant="filled"
                      fullWidth
                      name="mobileNumber"
                      placeholder={t("Mobile Number")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobileNumber}
                      error={Boolean(
                        formik.touched.mobileNumber &&
                          formik.errors.mobileNumber
                      )}
                      helperText={
                        formik.touched.mobileNumber &&
                        formik.errors.mobileNumber
                      }
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      id="emailId"
                      label="Email ID"
                      variant="filled"
                      fullWidth
                      name="email"
                      placeholder={t("Email Id")}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      error={Boolean(
                        formik.touched.email && formik.errors.email
                      )}
                      helperText={formik.touched.email && formik.errors.email}
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10} textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ color: "#00008B" }}
                    >
                      {t("Save")}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
};
