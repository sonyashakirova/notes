import { Box } from "@mui/material";
import { useState } from "react";
import { INote } from "shared/types/note";
import { Footer, Header, Sidebar, Workspace } from "shared/ui";

const Note = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [currentId, setCurrentId] = useState(notes[0]?.id);

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
