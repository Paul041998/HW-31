import express, { response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { projectsMock } from "./mockData/projects.js";
import { tasksData } from "./mockData/tasks.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/projects", (request, response) => {
  return response.json(projectsMock);
});

app.post("/projects", (request, response) => {
  const data = request.body;
  const newProject = {
    id: uuidv4(),
    ...data,
  };
  projectsMock.push(newProject);
  return response.send(newProject);
});

app.get("/tasks", (request, response) => {
  return response.json(tasksData);
});

app.get("/tasks/:projectId", (request, response) => {
  const { projectId } = request.params;
  const filtered = tasksData.filter((t) => t.projectId === projectId);
  return response.json(filtered);
});

app.delete("/projects/:projectId", (request, response) => {
  const { projectId } = request.params;
  const projectIndex = projectsMock.findIndex((p) => p.id === projectId);
  if (projectIndex === -1) {
    return response.status(404).json({ message: "Project not found" });
  }
  const [deleted] = projectsMock.splice(projectIndex, 1);
  for (let i = tasksData.length - 1; i >= 0; i--) {
    if (tasksData[i].projectId === projectId) {
      tasksData.splice(i, 1);
    }
  }
  return response.json(deleted);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
