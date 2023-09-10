import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "shared/config/firebase";
import { INote } from "./types";

export const useNotes = (userId?: string) => {
  const notesCollectionRef = collection(db, "notes");

  const [notes, setNotes] = useState<INote[]>([]);
  const [currentNote, setCurrentNote] = useState<INote | null>(null);

  const createNewNote = async () => {
    await addDoc(notesCollectionRef, {
      title: "Untitled",
      content: "",
      created: new Date(),
      updated: new Date(),
      userId,
    });
  };

  const getNotes = async () => {
    const data = await getDocs(
      query(
        notesCollectionRef,
        where("userId", "==", userId),
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

  const updateNote = async (
    id: string | undefined,
    data: { title: string; content: string }
  ) => {
    if (id) {
      const noteDoc = doc(db, "notes", id);
      await updateDoc(noteDoc, {
        title: data.title ?? "Untitled",
        content: data.content ?? "",
        updated: new Date(),
      });
    }
  };

  const deleteNote = async (id?: string) => {
    if (id) {
      const noteDoc = doc(db, "notes", id);
      await deleteDoc(noteDoc);
    }
  };

  useEffect(() => {
    getNotes();
    setCurrentNote(notes[0]);
  }, [createNewNote, deleteNote]);

  return {
    notes,
    currentNote,
    setCurrentNote,
    createNewNote,
    updateNote,
    deleteNote,
  };
};
