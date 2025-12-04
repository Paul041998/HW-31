import MainPage from "../pages/MainPage/MainPage";
import NewProjectPage from "../pages/NewProjectPage/NewProjectPage";
import EditProjectPage from "../pages/EditProjectPage/EditProjectPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import TasksPage from "../pages/TasksPage/TasksPage";
import EditTaskPage from "../pages/EditTaskPage/EditTaskPage";

export const urls = {
  NEW_PROJECT_URL: "/projects/new",
  PROJECTS_URL: "/projects",
  EDIT_PROJECT_URL: "/projects/edit",
  EDIT_TASK_URL: "/tasks/edit",
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
    path: `${urls.EDIT_PROJECT_URL}/:projectId`,
    hideInMenu: true,
    Component: EditProjectPage,
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
  {
    path: `${urls.EDIT_TASK_URL}/:taskId/:projectId`,
    hideInMenu: true,
    Component: EditTaskPage,
    authRequired: true,
  },
];
