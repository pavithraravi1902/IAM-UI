import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Button,
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
  const [isDeactivate, setIsDeactivate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const googleSignIn = localStorage.getItem("googleSignIn");
  const isLoggedInUser = localStorage.getItem("isLoggedIn");
  const isNewUser = localStorage.getItem("newUser");
  const userId = localStorage.getItem("userId") || "";
  const navigate = useNavigate();

  const { useAddProfile, useUpdateProfile, useGetProfileById } =
    UserProfileAPI();
  const { mutate: updateProfile } : any = useUpdateProfile();
  const { data: userProfile } = useGetProfileById(userId);

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

  const handleDeactivate = (userProfile: any) => {
    setIsDeactivate(true);
    const status = {
      profilePhoto: userProfile?.user?.profilePhoto,
      userId: userProfile?.user?.userId,
      firstName: userProfile?.user?.firstName,
      lastName: userProfile?.user?.lastName,
      dob: userProfile?.user?.dob,
      mobileNumber: userProfile?.user?.mobileNumber,
      email: userProfile?.user?.email,
      isActive: true
    }
    updateProfile(status, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
    console.log("handledeactivate");
   // handleDeleteClick()
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    console.log('Item deleted');
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const StyledAppBar = styled(AppBar)`
    background-color: #191970;
  `;

  useEffect(() => {
    if(isDeactivate){
      handleDeactivate(userProfile);
    }
  }, [userProfile, isDeactivate]);

  return (
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
          <MenuItem onClick={handleDeactivate}>Deactivate</MenuItem>
          {isLoggedIn && <MenuItem onClick={handleLogOut}>Log Out</MenuItem>}
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default LoggedInHeader;
