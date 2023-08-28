import { Box } from "@mui/material";
import { Footer, Header } from "shared/ui";

const Note = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <h1>Note Page</h1>
      </Box>
      <Footer />
    </Box>
  );
};

export default Note;
