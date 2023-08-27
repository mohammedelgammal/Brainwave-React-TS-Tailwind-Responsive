// Paths
import paths from "./routes";

// Components
import { Login } from "features";
import { AuthLayout } from "layouts";

// Libraries
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: paths.auth.main,
    element: <AuthLayout />,
    children: [
      {
        path: paths.auth.login,
        element: <Login />,
      },
    ],
  },
]);

export default router;
