import { useEffect, useState } from "react";
import { INote } from "shared/types/note";

const DELAY = 10 * 1000;

export const useAutosave = (
  note: INote | undefined,
  onUpdate: (
    id: string | undefined,
    data: { title: string; content: string }
  ) => void
) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(note?.title ?? "Untitled");
  const [content, setContent] = useState(note?.content ?? "");

  useEffect(() => {
    if (editMode) {
      const autosave = setInterval(() => {
        if (note?.title !== title && note?.content !== content) {
          onUpdate(note?.id, { title, content });
        }
      }, DELAY);

      return () => {
        clearInterval(autosave);
      };
    }
  }, [editMode, title, content]);

  useEffect;

  return {
    editMode,
    setEditMode,
    title,
    setTitle,
    content,
    setContent,
  };
};
