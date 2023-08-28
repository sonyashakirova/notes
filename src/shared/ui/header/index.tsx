import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { Search } from "shared/ui";

interface ISidebarProps {}

export const Header = ({}: ISidebarProps) => {
  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <AppBar
          position="static"
          color="transparent"
          sx={{ boxShadow: "none" }}
        >
          <Toolbar>
            <IconButton size="large" color="inherit">
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton size="large" color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <AppBar position="static" sx={{ boxShadow: "none" }}>
          <Toolbar>
            <IconButton size="large" color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Typography>Sofia</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Search light />
            <IconButton size="large" color="inherit">
              <EditIcon />
            </IconButton>
            <IconButton size="large" color="inherit">
              <DeleteIcon />
            </IconButton>
            <IconButton size="large" color="inherit">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
