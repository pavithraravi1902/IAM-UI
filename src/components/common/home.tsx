import { Box } from "@mui/material";
import backgroundImage from "../../assets/auth1.jpeg";

export const Home = () => {
  return (
    <Box
      bgcolor="#f0f0f0"
      height="100%"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    ></Box>
  );
};
