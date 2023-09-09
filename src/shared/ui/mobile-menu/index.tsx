import AddIcon from "@mui/icons-material/Add";
import { Drawer, Search, SelectableList } from "shared/ui";
import { Fab } from "@mui/material";

interface IMobileMenuProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  notes: any[];
  currentId: string;
  setCurrentId: (id: string) => void;
  createNewNote: () => void;
  deleteNote: (id: string) => void;
}

export const MobileMenu = ({
  opened,
  setOpened,
  notes,
  currentId,
  setCurrentId,
  createNewNote,
  deleteNote,
}: IMobileMenuProps) => {
  return (
    <Drawer from="left" opened={opened}>
      <Search />
      <SelectableList
        sx={{
          marginTop: "24px",
          maxHeight: "calc(100svh - 200px)",
        }}
        items={notes?.map((note) => ({
          id: note.id,
          primary: note.title,
          secondary: note.updated.toDate().toLocaleDateString("ru-RU", {
            hour: "numeric",
            minute: "numeric",
          }),
        }))}
        onSelectItem={(id) => {
          setCurrentId(id);
          setOpened(false);
        }}
        onDeleteItem={deleteNote}
        currentId={currentId}
      />
      <Fab
        color="primary"
        sx={{
          position: "absolute",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        onClick={createNewNote}
      >
        <AddIcon />
      </Fab>
    </Drawer>
  );
};
