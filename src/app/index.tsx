import { Pages } from "pages";
import { withProviders } from "./providers";
import "./styles/normalize.css";

const App = () => {
  return <Pages />;
};

export default withProviders(App);
