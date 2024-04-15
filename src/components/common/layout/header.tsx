import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Button,
  Avatar,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import profileImage from "../../../assets/download.jpeg";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (
    event: any
  ) => {
    const lang = event.target.value as string; 
    console.log(lang, "lang");
    console.log(i18n, "i18n")
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };
  
  const StyledAppBar = styled(AppBar)`
    background-color: #191970;
  `;

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
          component={Link}
          to="/about"
        >
          {t("About Us")}
        </Button>
        <Button
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "40px",
          }}
          component={Link}
          to="/features"
        >
          {t("Features")}
        </Button>
        <Select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{ textDecoration: "none", color: "inherit", marginLeft: "10px" }}
          defaultValue="en"
        >
          <MenuItem value="en">{t("English")}</MenuItem>
          <MenuItem value="fr">{t("French")}</MenuItem>
        </Select>
        <Button
          component={Link}
          to="/login"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "50px",
          }}
        >
          {t("Log In")}
        </Button>
        <Button
          component={Link}
          to="/sign-up"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "40px",
          }}
        >
          {t("Create an AuthNexus Account")}
        </Button>
        <NavLink to="/profile" style={{ marginLeft: "10px" }}>
          <Avatar
            className="profile-avatar"
            alt="User Profile"
            src={profileImage}
          />
        </NavLink>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
