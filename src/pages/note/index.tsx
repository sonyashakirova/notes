import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from "@mui/material";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { useAuth, useAutosave, useNotes, useSearch } from "features";
import {
  Drawer,
  PageLayout,
  Search,
  SelectableList,
  Sidebar,
  Workspace,
} from "shared/ui";
import { logout } from "features/handle-auth";

const Note = () => {
  const { user } = useAuth();
  const {
    notes,
    currentId,
    setCurrentId,
    currentNote,
    createNewNote,
    updateNote,
    deleteNote,
  } = useNotes(user?.uid);
  const { searchValue, setSearchValue, filteredNotes, getContentMatch } =
    useSearch(notes);
  const { editMode, setEditMode, title, setTitle, content, setContent } =
    useAutosave(currentNote, updateNote);

  const preparedNoteList = filteredNotes?.map((note) => {
    const contentMatch = getContentMatch(note?.content);
    const formattedDate = note?.updated.toDate().toLocaleDateString("ru-RU", {
      hour: "numeric",
      minute: "numeric",
    });

    return {
      id: note?.id,
      primary: note?.title,
      secondary:
        searchValue && contentMatch ? (
          <>
            {contentMatch}
            <br />
            {formattedDate}
          </>
        ) : (
          formattedDate
        ),
    };
  });

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(currentId);
  const [searchDialog, setSearchDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleEdit = () => {
    setEditMode((prevState) => !prevState);
  };

  const handleDelete = (id?: string) => {
    setDeleteDialog(true);
    setNoteToDelete(typeof id === "string" ? id : currentId);
  };

  return (
    <PageLayout
      onCreate={createNewNote}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onLogout={logout}
      onSearch={() => setSearchDialog(true)}
      userName={user?.displayName}
      openDrawer={openDrawer}
      setOpenDrawer={setOpenDrawer}
    >
      <Drawer from="left" opened={openDrawer}>
        <Search value={searchValue} onChange={setSearchValue} />
        <SelectableList
          sx={{
            marginTop: "24px",
            maxHeight: "calc(100svh - 200px)",
          }}
          items={preparedNoteList}
          onSelect={(id) => {
            setCurrentId(id);
            setOpenDrawer(false);
          }}
          onDelete={handleDelete}
          currentId={currentId}
        />
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          onClick={() => {
            createNewNote();
            setOpenDrawer(false);
          }}
        >
          <AddIcon />
        </Fab>
      </Drawer>
      <Sidebar notes={notes} currentId={currentId} onSelect={setCurrentId} />
      {editMode ? (
        <Workspace
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
        />
      ) : (
        <Box sx={{ padding: "20px 40px" }}>
          <h1>{title ?? "Untitled"}</h1>
          <Markdown>{content.split("\n").join("\n\n") ?? ""}</Markdown>
        </Box>
      )}
      <Dialog
        open={searchDialog}
        onClose={() => setSearchDialog(false)}
        maxWidth="md"
        scroll="paper"
        fullWidth
      >
        <DialogContent sx={{ height: "500px" }} dividers>
          <Search value={searchValue} onChange={setSearchValue} />
          <SelectableList
            items={searchValue ? preparedNoteList : []}
            onSelect={(id) => {
              setCurrentId(id);
              setSearchDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>No</Button>
          <Button
            onClick={() => {
              deleteNote(noteToDelete);
              setDeleteDialog(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
};

export default Note;
