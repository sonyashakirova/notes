import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Drawer, Search } from "shared/ui";

interface IMobileMenuProps {
  opened: boolean;
}

export const MobileMenu = ({ opened }: IMobileMenuProps) => {
  return (
    <Drawer from="left" opened={opened}>
      <Search />
      <StyledIconButton size="large" color="inherit">
        <AddIcon />
      </StyledIconButton>
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
