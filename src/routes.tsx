import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Board from "./pages/project/board";
import Planning from "./pages/project/planning";
import Sprints from "./pages/project/sprints";
import Home from "./pages/home";
import Register from "./pages/register";
import Error from "./pages/error";
import Projects from "./pages/projects";
import ProtectedRoutes from "./components/ProtectedRoutes";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/projects",
        element: <Projects />,
        errorElement: <Error />,
      },
      {
        path: "/project/:id/board",
        element: <Board />,
        errorElement: <Error />,
      },
      {
        path: "/project/:id/planning",
        element: <Planning />,
        errorElement: <Error />,
      },
      {
        path: "/project/:id/sprints",
        element: <Sprints />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);
