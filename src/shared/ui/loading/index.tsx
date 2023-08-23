import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100svh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};
