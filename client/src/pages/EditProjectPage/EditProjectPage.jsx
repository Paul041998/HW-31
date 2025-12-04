import { useEffect, useRef } from "react";
import "./EditProjectPage.scss";
import { PRIORITIES } from "../../common/priorities";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectAsync } from "../../store/features/projects";
import { useNavigate, useParams } from "react-router";
import { urls } from "../../common/menu";

export default function EditProjectPage() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.data);
  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    if (project) {
      titleRef.current.value = project.title;
      descriptionRef.current.value = project.description;
      priorityRef.current.value = project.priority;
    }
  }, [project]);

  const handleSave = () => {
    if (!project) return;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const priority = priorityRef.current.value;

    dispatch(
      updateProjectAsync({
        id: projectId,
        updates: { title, description, priority },
      })
    ).then(() => {
      navigate(urls.PROJECTS_URL);
    });
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="EditProjectPage">
      <h1>Edit Project</h1>
      <form>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            ref={titleRef}
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Enter description"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div>
          <select name="priority" ref={priorityRef}>
            {Object.entries(PRIORITIES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className="primary" type="button" onClick={handleSave}>
            Save
          </button>
          <button
            className="secondary"
            type="button"
            onClick={() => navigate(urls.PROJECTS_URL)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
