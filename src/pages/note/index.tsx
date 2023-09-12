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
import { useEffect, useState } from "react";
import { useAuth, useNotes, useSearch } from "features";
import {
  Drawer,
  PageLayout,
  Search,
  SelectableList,
  Sidebar,
  Workspace,
} from "shared/ui";
import { INote } from "shared/types/note";

const Note = () => {
  const { user, logout } = useAuth();
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

  const [editMode, setEditMode] = useState(false);
  const [workspaceData, setWorkspaceData] = useState<INote | undefined>();

  useEffect(() => {
    setEditMode(false);
  }, [currentId]);

  useEffect(() => {
    if (editMode) {
      const autosave = setInterval(() => {
        if (
          currentNote?.title !== workspaceData?.title ||
          currentNote?.content !== workspaceData?.content
        ) {
          updateNote(workspaceData);
        }
      }, 5000);

      return () => clearInterval(autosave);
    }
  }, [editMode, workspaceData]);

  useEffect(() => {
    if (!editMode && workspaceData?.id) updateNote(workspaceData);
  }, [editMode]);

  useEffect(() => {
    setWorkspaceData(currentNote);
  }, [currentNote]);

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
          title={workspaceData?.title ?? "Untitled"}
          content={workspaceData?.content ?? ""}
          onTitleChange={(title) =>
            setWorkspaceData((prevState) => ({ ...prevState, title } as INote))
          }
          onContentChange={(content) =>
            setWorkspaceData(
              (prevState) => ({ ...prevState, content } as INote)
            )
          }
        />
      ) : (
        <Box sx={{ padding: "20px 40px" }}>
          <h1>{workspaceData?.title ?? "Untitled"}</h1>
          <Markdown>
            {workspaceData?.content.split("\n").join("\n\n") ?? ""}
          </Markdown>
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
