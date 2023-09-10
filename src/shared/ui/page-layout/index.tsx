import { Box } from "@mui/material";
import { Footer, Header } from "shared/ui";

interface IPageLayoutProps {
  onCreate: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onLogout: () => void;
  onSearch: () => void;
  userName?: string | null;
  children: React.ReactNode;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PageLayout = ({
  onCreate,
  onDelete,
  onEdit,
  onLogout,
  onSearch,
  userName,
  children,
  openDrawer,
  setOpenDrawer,
}: IPageLayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header
        onCreate={onCreate}
        onDelete={onDelete}
        onEdit={onEdit}
        onLogout={onLogout}
        onSearch={onSearch}
        userName={userName}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <Box
        sx={(theme) => ({
          display: "grid",
          [theme.breakpoints.up("md")]: {
            gridTemplateColumns: "360px auto",
          },
          flexGrow: 1,
        })}
      >
        {children}
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Footer onCreate={onCreate} onDelete={onDelete} onEdit={onEdit} />
      </Box>
    </Box>
  );
};
