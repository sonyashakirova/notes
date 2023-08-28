import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "shared/config/firebase";
import { INote } from "shared/types/note";
import { Footer, Header, Sidebar, Workspace } from "shared/ui";

const Note = () => {
  const notesCollectionRef = query(collection(db, "notes"));

  const [notes, setNotes] = useState<INote[]>([]);
  const [currentId, setCurrentId] = useState(notes[0]?.id);

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      // @ts-ignore
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) ?? []);
    };

    getNotes();
  }, []);

  const currentNote = notes?.find((note) => note?.id === currentId);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header notes={notes} currentId={currentId} setCurrentId={setCurrentId} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar
          notes={notes}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
        <Workspace note={currentNote} />
      </Box>
      <Footer />
    </Box>
  );
};

export default Note;
