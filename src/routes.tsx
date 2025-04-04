import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Board from "./pages/project/board";
import Backlog from "./pages/project/backlog";
import Sprints from "./pages/project/sprints";
import Home from "./pages/home";
import Register from "./pages/register";
import Error from "./pages/error";
import Projects from "./pages/projects";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Tasks from "./pages/project/tasks";
import Team from "./pages/project/team";
import UserDetails from "./pages/userDetails";

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
        path: "/userDetails",
        element: <UserDetails />,
        errorElement: <Error />,
      },
      {
        path: "/project/:id/board",
        element: <Board />,
        errorElement: <Error />,
      },
      {
        path: "/project/:id/backlog",
        element: <Backlog />,
        errorElement: <Error />,
      },
      {
        path: "/project/:id/sprints",
        element: <Sprints />,
        errorElement: <Error />,
      },
      {
        path: "/project/:id/tasks",
        element: <Tasks />,
        errorElement: <Error />,
      },
      {
        path: "/project/:id/team",
        element: <Team />,
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
