import { Box } from "@mui/material";
import { useState } from "react";
import { Footer, Header, Sidebar } from "shared/ui";

interface INote {
  id: string;
  title: string;
  content: string;
  created: any;
  updated: any;
  userId?: string;
}

const Note = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [currentId, setCurrentId] = useState(notes[0]?.id);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header notes={notes} currentId={currentId} setCurrentId={setCurrentId} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar
          notes={notes}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
        <h1>Note Page</h1>
      </Box>
      <Footer />
    </Box>
  );
};

export default Note;
