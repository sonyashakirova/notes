import { Box } from "@mui/material";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./styles.css";

interface IWorkspaceProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export const Workspace = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}: IWorkspaceProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <input
        className="title-input"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Untitled"
      />
      <SimpleMdeReact
        id="workspace"
        value={content}
        onChange={onContentChange}
      />
    </Box>
  );
};
