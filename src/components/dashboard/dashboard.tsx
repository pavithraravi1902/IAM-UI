import { Box } from "@mui/material";
import { LoremIpsum } from "lorem-ipsum";
const lorem = new LoremIpsum();

const Dashboard = () => {
  const loremText = lorem.generateParagraphs(10);
  return (
    <Box>
      {" "}
      <p>{loremText}</p>{" "}
    </Box>
  );
};

export default Dashboard;
