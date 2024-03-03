import { createBrowserRouter } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <LogInPage />,
      },
    ],
  },
]);

export default Router;
