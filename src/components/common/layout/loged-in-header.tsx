import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import UserProfileAPI from "../../profile-management/profile-service";
import { toast } from "react-toastify";

const LoggedInHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { t, i18n } = useTranslation();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeactivate, setIsDeactivate] = useState(false)
  const googleSignIn = localStorage.getItem("googleSignIn");
  const isLoggedInUser = localStorage.getItem("isLoggedIn");
  const isNewUser = localStorage.getItem("newUser");
  const userId = localStorage.getItem("userId") || "";
  const navigate = useNavigate();

  const { useUpdateProfile, useGetProfileById }: any = UserProfileAPI();
  const { mutate: updateProfile }: any = useUpdateProfile();
  const { data: userProfile }: any = useGetProfileById(userId);

  useEffect(() => {
    if (isLoggedInUser || isNewUser || googleSignIn) {
      setIsLoggedIn(true);
    }
  }, [isLoggedInUser, isNewUser, googleSignIn]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleViewProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
    handleMenuClose();
  };

  const handleLanguageChange = (event: any) => {
    const lang = event.target.value as string;
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleFeaturesClick = () => {
    const fetchedFeatures = ["Feature 1", "Feature 2", "Feature 3"];
    setFeatures(fetchedFeatures);
    console.log(fetchedFeatures);
  };

  const handleSuccess = (response: any) => {
    console.log(response);
    toast.success("Profile Saved Successfully");
  };

  const handleError = (response: any) => {
    console.log(response);
    toast.error("Failed to save");
  };

  const handleDeactivate = () => {
    localStorage.setItem("isDeactivate", "true");
    if (userProfile && userProfile.user) {
      const status = {
        profilePhoto: userProfile.user.profilePhoto,
        userId: userProfile.user.userId,
        firstName: userProfile.user.firstName,
        lastName: userProfile.user.lastName,
        dob: userProfile.user.dob,
        mobileNumber: userProfile.user.mobileNumber,
        email: userProfile.user.email,
        isActive: false,
      };
      updateProfile(status, {
        onSuccess: handleSuccess,
        onError: handleError,
      });
      setShowConfirm(false);
      navigate("/login");
    } else {
      console.error("User profile data is not available");
    }
  };

  const handleDeactivateClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const StyledAppBar = styled(AppBar)`
    background-color: #191970;
  `;

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography
            variant="h2"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {t("AuthNexus")}
          </Typography>
          <Button
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "auto",
            }}
            onClick={handleFeaturesClick}
          >
            {t("Data 1")}
          </Button>

          <Button
            style={{
              textDecoration: "none",
              color: "inherit",
              marginRight: "40px",
            }}
            onClick={handleFeaturesClick}
          >
            {t("Data 2")}
          </Button>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            style={{ marginLeft: "1100px", marginTop: "40px" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {features.map((feature, index) => (
              <MenuItem key={index}>{feature}</MenuItem>
            ))}
          </Menu>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "10px",
            }}
            defaultValue="en"
          >
            <MenuItem value="en">{t("English")}</MenuItem>
            <MenuItem value="fr">{t("French")}</MenuItem>
          </Select>
          <Button
            style={{
              textDecoration: "none",
              color: "inherit",
              marginRight: "50px",
            }}
          >
            {t("Data 3")}
          </Button>
          <Button
            style={{
              textDecoration: "none",
              color: "inherit",
              marginRight: "40px",
            }}
          >
            {t("Data 4")}
          </Button>
          <Grid onClick={handleMenuOpen}>
            <Avatar alt="Profile Picture" src={profileImage || undefined} />
          </Grid>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            style={{ marginLeft: "1100px", marginTop: "40px" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleViewProfile}>
              <Avatar alt="Profile Picture" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                {"username"}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
            <MenuItem onClick={handleDeactivateClick}>Deactivate</MenuItem>
            {isLoggedIn && <MenuItem onClick={handleLogOut}>Log Out</MenuItem>}
          </Menu>
        </Toolbar>
      </StyledAppBar>
      <Dialog open={showConfirm} onClose={handleCancel}>
        <DialogTitle>{t("Confirmation")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Are you sure you want to deactivate your account?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            {t("No")}
          </Button>
          <Button onClick={handleDeactivate} color="primary" autoFocus>
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoggedInHeader;
