import { useNavigate } from "react-router";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./ProjectsPage.clean.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getProjectsAsync,
  deleteProjectAsync,
} from "../../store/features/projects";
import { urls } from "../../common/menu";

export default function ProjectsPage() {
  const { data: projects } = useSelector((state) => state.projects);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(getProjectsAsync());
  }, [dispatch, isLoggedIn]);

  const handleClick = (projectId) => {
    navigate(`/tasks/${projectId}`);
  };

  const handleDelete = (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;
    dispatch(deleteProjectAsync(projectId));
  };

  return (
    <div className="ProjectsPage">
      <div className="ProjectsPage__actions">
        <button
          className="primary"
          type="button"
          onClick={() => navigate(urls.NEW_PROJECT_URL)}
        >
          Add Project
        </button>
      </div>
      <div className="Projects">
        {projects.length === 0 && <span>No projects available</span>}
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onClick={handleClick}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
