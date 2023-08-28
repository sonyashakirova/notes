import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Drawer, Search, SelectableList } from "shared/ui";
import { Fab } from "@mui/material";

interface IMobileMenuProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  notes: any[];
  currentId: string;
  setCurrentId: (id: string) => void;
}

export const MobileMenu = ({
  opened,
  setOpened,
  notes,
  currentId,
  setCurrentId,
}: IMobileMenuProps) => {
  return (
    <Drawer from="left" opened={opened}>
      <Search />
      <SelectableList
        sx={{
          marginTop: "24px",
          maxHeight: "calc(100svh - 240px)",
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
        currentId={currentId}
      />
      {/* <StyledIconButton size="large" color="inherit">
        <AddIcon />
      </StyledIconButton> */}
      <Fab
        color="secondary"
        sx={{
          position: "absolute",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
      >
        <AddIcon />
      </Fab>
    </Drawer>
  );
};

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  bottom: 24,
  right: 24,
  backgroundColor: theme.palette.primary.main,
  "&:hover, &:active": {
    backgroundColor: theme.palette.primary.main,
  },
}));
