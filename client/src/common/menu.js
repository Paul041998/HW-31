import MainPage from "../pages/MainPage/MainPage";
import NewProjectPage from "../pages/NewProjectPage/NewProjectPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import TasksPage from "../pages/TasksPage/TasksPage";

export const urls = {
  NEW_PROJECT_URL: "/projects/new",
  PROJECTS_URL: "/projects",
};

export const menuItems = [
  {
    path: "/",
    title: "Main",
    Component: MainPage,
  },
  {
    path: urls.PROJECTS_URL,
    title: "Projects",
    Component: ProjectsPage,
    authRequired: true,
  },
  {
    path: urls.NEW_PROJECT_URL,
    hideInMenu: true,
    Component: NewProjectPage,
    authRequired: true,
  },
  {
    path: "/tasks",
    title: "Tasks",
    Component: TasksPage,
    authRequired: true,
  },
  {
    path: "/tasks/:projectId",
    hideInMenu: true,
    Component: TasksPage,
  },
];
