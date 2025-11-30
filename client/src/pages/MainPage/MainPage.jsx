import "./MainPage.scss";
import { useNavigate } from "react-router";
import { urls } from "../../common/menu";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="MainPage">
      <div className="MainPage__card">
        <h1>Welcome to the Project Tracker</h1>
        <p>
          Organize tasks and projects with priorities. Add and manage projects
          and tasks quickly.
        </p>
        <div style={{ marginTop: 16 }}>
          <button
            className="primary"
            onClick={() => navigate(urls.PROJECTS_URL)}
          >
            View Projects
          </button>
          <button
            className="primary"
            style={{ marginLeft: 12 }}
            onClick={() => navigate(urls.NEW_PROJECT_URL)}
          >
            New Project
          </button>
        </div>
      </div>
    </div>
  );
}
