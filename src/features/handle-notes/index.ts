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
import { INote } from "shared/types/note";

export const useNotes = (userId?: string) => {
  const notesCollectionRef = collection(db, "notes");

  const [notes, setNotes] = useState<INote[]>([]);
  const [currentId, setCurrentId] = useState<string | undefined>();
  const currentNote = notes.find((note) => note.id === currentId);

  const createNewNote = async () => {
    await addDoc(notesCollectionRef, {
      title: "Untitled",
      content: "",
      created: new Date(),
      updated: new Date(),
      userId,
    });

    await getNotes();
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

  const updateNote = async (note?: INote) => {
    if (note?.id) {
      const noteDoc = doc(db, "notes", note.id);
      await updateDoc(noteDoc, {
        title: note.title ?? "Untitled",
        content: note.content ?? "",
        updated: new Date(),
      });

      await getNotes();
    }
  };

  const deleteNote = async (id?: string) => {
    if (id) {
      const noteDoc = doc(db, "notes", id);
      await deleteDoc(noteDoc);
      await getNotes();
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    setCurrentId(notes[0]?.id);
  }, [notes]);

  return {
    notes,
    currentId,
    setCurrentId,
    currentNote,
    createNewNote,
    updateNote,
    deleteNote,
  };
};
