import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./TasksPage.scss";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useEffect } from "react";
import { getTasksAsync } from "../../store/features/tasks";

export default function TasksPage() {
  const { data: tasks } = useSelector((state) => state.tasks);
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(getTasksAsync(projectId));
  }, [dispatch, projectId, isLoggedIn]);

  return (
    <div className="TasksPage">
      {tasks.length === 0 && <span>No tasks available</span>}
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}
