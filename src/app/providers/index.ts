import compose from "compose-function";
import { withAuth } from "./with-auth";
import { withRouter } from "./with-router";
import { withTheme } from "./with-theme";

export const withProviders = compose(withTheme, withRouter, withAuth);
