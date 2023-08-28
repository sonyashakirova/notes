import { Box } from "@mui/material";
import { SelectableList } from "shared/ui";

interface ISidebarProps {
  notes: any[];
  currentId: string;
  setCurrentId: (noteId: string) => void;
}

export const Sidebar = ({ notes, currentId, setCurrentId }: ISidebarProps) => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        width: "360px",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <SelectableList
        sx={{ padding: 0, maxHeight: "calc(100svh - 64px)" }}
        items={notes?.map((note) => ({
          id: note.id,
          primary: note.title,
          secondary: note.updated.toDate().toLocaleDateString("ru-RU", {
            hour: "numeric",
            minute: "numeric",
          }),
          sx: { width: "360px", padding: "0 40px 0 30px" },
        }))}
        onSelectItem={setCurrentId}
        currentId={currentId}
      />
    </Box>
  );
};
