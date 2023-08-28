import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SxProps,
  Theme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface IListProps {
  items: {
    id: string;
    primary: string;
    secondary?: string;
    sx?: SxProps<Theme>;
  }[];
  currentId: string;
  onSelectItem: (id: string) => void;
  onDeleteItem?: (id: string) => void;
  sx?: SxProps<Theme>;
}

export const SelectableList = ({
  items,
  currentId,
  onSelectItem,
  onDeleteItem,
  sx,
}: IListProps) => {
  return (
    <List sx={{ ...sx, boxSizing: "border-box", overflow: "auto" }}>
      {items.map((item) => (
        <ListItem disablePadding divider key={item.id}>
          <ListItemButton selected={item.id === currentId}>
            <ListItemText
              sx={item.sx}
              primary={item.primary}
              secondary={item.secondary}
              onClick={() => onSelectItem(item.id)}
            />
            {!!onDeleteItem && (
              <IconButton
                size="small"
                color="inherit"
                onClick={() => onDeleteItem(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
