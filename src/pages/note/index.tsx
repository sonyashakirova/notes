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

const Note = () => {
  const { user } = useAuth();
  const notesCollectionRef = collection(db, "notes");

  const [notes, setNotes] = useState<INote[]>([]);
  const [currentId, setCurrentId] = useState(notes[0]?.id);

  const createNewNote = async () => {
    await addDoc(notesCollectionRef, {
      title: "New note",
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
      />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar
          notes={notes}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
        <Workspace note={currentNote} />
      </Box>
      <Footer createNewNote={createNewNote} />
    </Box>
  );
};

export default Note;
