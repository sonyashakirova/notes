import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Box, Toolbar, Popover, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

interface IHeaderProps {
  onCreate: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onLogout: () => void;
  onSearch: () => void;
  userName?: string | null;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({
  onCreate,
  onDelete,
  onEdit,
  onLogout,
  onSearch,
  userName,
  openDrawer,
  setOpenDrawer,
}: IHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <AppBar
          position="static"
          color="transparent"
          sx={{ boxShadow: "none" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setOpenDrawer((prevState) => !prevState)}
            >
              {openDrawer ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <AccountCircleIcon />
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Button sx={{ margin: "10px 14px" }} onClick={onLogout}>
                Logout
              </Button>
            </Popover>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <AppBar position="static" sx={{ boxShadow: "none" }}>
          <Toolbar>
            <Button
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              startIcon={<AccountCircleIcon />}
            >
              {userName ?? ""}
            </Button>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Button sx={{ margin: "10px 14px" }} onClick={onLogout}>
                Logout
              </Button>
            </Popover>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton size="large" color="inherit" onClick={onSearch}>
              <SearchIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={onCreate}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
