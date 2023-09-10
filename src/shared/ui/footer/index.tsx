import { Box, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface IFooterProps {
  onCreate: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const Footer = ({ onCreate, onDelete, onEdit }: IFooterProps) => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "primary.main",
        borderRadius: 0,
      }}
      elevation={3}
    >
      <Box
        sx={{
          maxWidth: "360px",
          display: "flex",
          justifyContent: "space-around",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <IconButton size="large" color="inherit" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton size="large" color="inherit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton size="large" color="inherit" onClick={onCreate}>
          <AddIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};
