import { useEffect, useRef } from "react";
import "./EditTaskPage.scss";
import { PRIORITIES } from "../../common/priorities";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../../store/features/tasks";
import { useNavigate, useParams } from "react-router";

export default function EditTaskPage() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const statusRef = useRef();
  const navigate = useNavigate();
  const { taskId, projectId } = useParams();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.data);
  const task = tasks.find((t) => t.id === taskId);

  useEffect(() => {
    if (task) {
      titleRef.current.value = task.title;
      descriptionRef.current.value = task.description;
      priorityRef.current.value = task.priority;
      statusRef.current.value = task.status;
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const priority = priorityRef.current.value;
    const status = statusRef.current.value;

    dispatch(
      updateTaskAsync({
        id: taskId,
        updates: { title, description, priority, status },
      })
    ).then(() => {
      navigate(`/tasks/${projectId}`);
    });
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="EditTaskPage">
      <h1>Edit Task</h1>
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
          <select name="status" ref={statusRef}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        <div>
          <button className="primary" type="button" onClick={handleSave}>
            Save
          </button>
          <button
            className="secondary"
            type="button"
            onClick={() => navigate(`/tasks/${projectId}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
