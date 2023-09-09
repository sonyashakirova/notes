import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { SimpleMdeReact } from "react-simplemde-editor";
import { INote } from "shared/types/note";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "shared/config/firebase";
import "easymde/dist/easymde.min.css";
import "./styles.css";

interface IWorkspaceProps {
  note?: INote;
}

const DELAY = 10 * 1000;

export const Workspace = ({ note }: IWorkspaceProps) => {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  const updateNote = async (title: string, content: string) => {
    if (note?.id) {
      const noteDoc = doc(db, "notes", note.id);
      await updateDoc(noteDoc, {
        title: title ?? "Untitled",
        content: content ?? "",
      });
    }
  };

  useEffect(() => {
    const autosave = setInterval(() => {
      if (note?.title !== title && note?.content !== content) {
        updateNote(title, content);
      }
    }, DELAY);

    return () => clearInterval(autosave);
  }, [title, content]);

  return (
    <Box sx={{ width: "100%" }}>
      <input
        className="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled"
      />
      <SimpleMdeReact id="workspace" value={content} onChange={setContent} />
    </Box>
  );
};
