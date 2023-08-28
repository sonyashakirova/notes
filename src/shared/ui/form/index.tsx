import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import "./styles.css";

interface IFormProps {
  children: ReactNode;
  title: string;
  buttons: ReactNode;
  onSubmit: (params: any) => void;
}

export const Form = ({ children, title, buttons, onSubmit }: IFormProps) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 30px 100px",
        boxSizing: "border-box",
      }}
    >
      <form className="form" onSubmit={handleSubmit}>
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        {children}
        <Box sx={{ display: "flex", gap: "14px", marginLeft: "auto" }}>
          {buttons}
        </Box>
      </form>
    </Box>
  );
};
