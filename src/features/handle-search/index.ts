import { useEffect, useState } from "react";
import { INote } from "shared/types/note";

const wordBySubstringRegex = (substring: string) =>
  new RegExp(`[а-яА-Яa-zA-Z0-9]*${substring}[а-яА-Яa-zA-Z0-9]*`, "i");

export const useSearch = (notes: INote[]) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const getContentMatch = (content: string) => {
    const pattern = wordBySubstringRegex(searchValue);
    const contentMatch = content.match(pattern);

    return contentMatch ? `…${contentMatch[0]}…` : "";
  };

  useEffect(() => {
    setFilteredNotes(
      notes?.filter(
        (note) =>
          note?.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
          note?.content?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [notes, searchValue]);

  return {
    searchValue,
    setSearchValue,
    filteredNotes,
    getContentMatch,
  };
};
