import { Box } from "@mui/material";
import { SimpleMdeReact } from "react-simplemde-editor";
import { INote } from "shared/types/note";

interface IWorkspaceProps {
  note?: INote;
}

export const Workspace = ({ note }: IWorkspaceProps) => {
  return (
    <Box sx={{ padding: "30px" }}>
      <SimpleMdeReact value={note?.content} />
    </Box>
  );
};
