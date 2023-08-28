import "./styles.css";

interface IDrawerProps {
  from: string;
  opened: boolean;
  onClick?: (params: any) => void;
  children: React.ReactNode;
}

export function Drawer({ from, opened, onClick, children }: IDrawerProps) {
  return (
    <div
      className={`drawer ${from} ${opened ? "show" : "hide"}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
