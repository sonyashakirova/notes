import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "shared/config/firebase";
import { INote } from "shared/types/note";
import { Footer, Header, Sidebar, Workspace } from "shared/ui";
import { useAuth } from "shared/hooks";
import Markdown from "markdown-to-jsx";

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

  useEffect(() => {
    getNotes();
    setCurrentId(notes[0]?.id);
  }, [notes]);

  const currentNote = notes?.find((note) => note?.id === currentId);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header
        notes={notes}
        currentId={currentId}
        setCurrentId={setCurrentId}
        createNewNote={createNewNote}
        setEditMode={setEditMode}
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
            <h1>{currentNote?.title ?? "Title"}</h1>
            <Markdown>
              {currentNote?.content.split("\n").join("\n\n") ?? ""}
            </Markdown>
          </Box>
        )}
      </Box>
      <Footer createNewNote={createNewNote} setEditMode={setEditMode} />
    </Box>
  );
};

export default Note;
