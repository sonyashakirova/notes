import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loading } from "shared/ui";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>{component()}</Suspense>
    </BrowserRouter>
  );
