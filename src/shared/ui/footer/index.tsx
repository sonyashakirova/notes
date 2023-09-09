import { Box, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface IFooterProps {
  currentId: string;
  createNewNote: () => void;
  setEditMode: (prev: (params: boolean) => boolean) => void;
  deleteNote: (id: string) => void;
}

export const Footer = ({
  currentId,
  createNewNote,
  setEditMode,
  deleteNote,
}: IFooterProps) => {
  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
          <IconButton
            size="large"
            color="inherit"
            onClick={() => {
              deleteNote(currentId);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => setEditMode((s) => !s)}
          >
            <EditIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={createNewNote}>
            <AddIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};
