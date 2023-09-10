import {
  AppBar,
  Box,
  Toolbar,
  Dialog,
  DialogContent,
  Popover,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { MobileMenu, Search, SelectableList } from "shared/ui";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "features";

interface IHeaderProps {
  notes: any[];
  currentId: string;
  setCurrentId: (id: string) => void;
  createNewNote: () => void;
  setEditMode: (prev: (params: boolean) => boolean) => void;
  deleteNote: (id: string) => void;
}

export const Header = ({
  notes,
  currentId,
  setCurrentId,
  createNewNote,
  setEditMode,
  deleteNote,
}: IHeaderProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, logout } = useAuth();
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
              onClick={() => setOpenMenu((o) => !o)}
            >
              {openMenu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <MobileMenu
              opened={openMenu}
              setOpened={setOpenMenu}
              notes={notes}
              currentId={currentId}
              setCurrentId={setCurrentId}
              createNewNote={createNewNote}
              deleteNote={deleteNote}
            />
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
              <Button sx={{ margin: "10px 14px" }} onClick={logout}>
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
              {user?.displayName}
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
              <Button sx={{ margin: "10px 14px" }} onClick={logout}>
                Logout
              </Button>
            </Popover>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setOpenSearch(true)}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setEditMode((s) => !s)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => deleteNote(currentId)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={createNewNote}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Dialog
          open={openSearch}
          onClose={() => setOpenSearch(false)}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <DialogContent sx={{ height: "500px" }} dividers>
            <Search value={searchValue} onChange={setSearchValue} />
            <SelectableList
              items={notes
                ?.filter(
                  (note) =>
                    (searchValue &&
                      note?.title
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase())) ||
                    (searchValue &&
                      note?.content
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()))
                )
                ?.map((note) => {
                  const reg = new RegExp(
                    `[а-яА-Яa-zA-Z0-9]*${searchValue}[а-яА-Яa-zA-Z0-9]*`,
                    "i"
                  );
                  const contentMatch = note?.content.match(reg);

                  return {
                    id: note.id,
                    primary: note.title,
                    secondary: contentMatch ? (
                      <>
                        {`…${contentMatch[0]}…`}
                        <br />
                        {note?.updated}
                      </>
                    ) : (
                      note?.updated
                    ),
                  };
                })}
              onSelectItem={(id) => {
                setCurrentId(id);
              }}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};
