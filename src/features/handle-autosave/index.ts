import { useEffect, useState } from "react";
import { INote } from "shared/types/note";

const DELAY = 5000;

export const useAutosave = (
  currentId: string | undefined,
  currentNote: INote | undefined,
  updateNote: (note?: INote) => void
) => {
  const [editMode, setEditMode] = useState(false);
  const [workspaceData, setWorkspaceData] = useState<INote | undefined>();

  const setTitle = (title: string) => {
    setWorkspaceData((prevState) => ({ ...prevState, title } as INote));
  };

  const setContent = (content: string) => {
    setWorkspaceData((prevState) => ({ ...prevState, content } as INote));
  };

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
      }, DELAY);

      return () => clearInterval(autosave);
    }
  }, [editMode, workspaceData]);

  useEffect(() => {
    if (!editMode && workspaceData?.id) updateNote(workspaceData);
  }, [editMode]);

  useEffect(() => {
    setWorkspaceData(currentNote);
  }, [currentNote]);

  return { editMode, setEditMode, workspaceData, setTitle, setContent };
};
