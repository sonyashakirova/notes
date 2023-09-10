import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "shared/config/firebase";
import { INote } from "shared/types/note";
import { Footer, Header, Sidebar, Workspace } from "shared/ui";
import Markdown from "markdown-to-jsx";
import { useAuth } from "features";

const Note = () => {
  const { user } = useAuth();
  const notesCollectionRef = collection(db, "notes");

  const [notes, setNotes] = useState<INote[]>([]);
  const [currentId, setCurrentId] = useState(notes[0]?.id);

  const [editMode, setEditMode] = useState(false);

  const createNewNote = async () => {
    await addDoc(notesCollectionRef, {
      title: "Untitled",
      content: "",
      created: new Date(),
      updated: new Date(),
      userId: user?.uid,
    });
  };

  const getNotes = async () => {
    const data = await getDocs(
      query(
        notesCollectionRef,
        where("userId", "==", user?.uid),
        orderBy("updated", "desc")
      )
    );

    if (data.empty) {
      await createNewNote();
      await getNotes();
    } else {
      // @ts-ignore
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ?? []);
    }
  };

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(currentId);

  const deleteNote = async (id: string) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
  };

  const onDeleteNote = (id: string) => {
    setDeleteDialog(true);
    setNoteToDelete(id);
  };

  useEffect(() => {
    getNotes();
    setCurrentId(notes[0]?.id);
  }, []);

  const currentNote = notes?.find((note) => note?.id === currentId);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header
        notes={notes}
        currentId={currentId}
        setCurrentId={setCurrentId}
        createNewNote={createNewNote}
        setEditMode={setEditMode}
        deleteNote={onDeleteNote}
      />
      <Box
        sx={(theme) => ({
          display: "grid",
          [theme.breakpoints.up("md")]: {
            gridTemplateColumns: "360px auto",
          },
          flexGrow: 1,
        })}
      >
        <Sidebar
          notes={notes}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
        {editMode ? (
          <Workspace note={currentNote} />
        ) : (
          <Box sx={{ padding: "20px 40px" }}>
            <h1>{currentNote?.title ?? "Untitled"}</h1>
            <Markdown>
              {currentNote?.content.split("\n").join("\n\n") ?? ""}
            </Markdown>
          </Box>
        )}
      </Box>
      <Footer
        currentId={currentId}
        createNewNote={createNewNote}
        setEditMode={setEditMode}
        deleteNote={onDeleteNote}
      />
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>No</Button>
          <Button onClick={() => deleteNote(noteToDelete)}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Note;
