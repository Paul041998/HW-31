import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./TasksPage.scss";
import TaskCard from "../../components/TaskCard/TaskCard";
import TaskFilters from "../../components/TaskFilter/TaskFilter";
import { useEffect, useState, useMemo } from "react";
import { getTasksAsync } from "../../store/features/tasks";

export default function TasksPage() {
  const { data: tasks } = useSelector((state) => state.tasks);
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(getTasksAsync(projectId));
  }, [dispatch, projectId, isLoggedIn]);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    let result = tasks.slice();
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          (t.title && t.title.toLowerCase().includes(q)) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    const [key, dir] = (sortBy || "").split("-");
    if (sortBy) {
      result.sort((a, b) => {
        let va = a[key] ?? "";
        let vb = b[key] ?? "";
        if (key === "priority") {
          const order = { LOW: 1, MEDIUM: 2, HIGH: 3 };
          va = order[(a.priority || "").toUpperCase()] ?? 0;
          vb = order[(b.priority || "").toUpperCase()] ?? 0;
        }
        if (va < vb) return dir === "desc" ? 1 : -1;
        if (va > vb) return dir === "desc" ? -1 : 1;
        return 0;
      });
    }
    return result;
  }, [tasks, search, sortBy]);

  return (
    <div className="TasksPage">
      <div className="TasksPage__controls">
        <TaskFilters
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      <div className="TasksPage__grid">
        {filteredTasks.length === 0 && <span>No tasks available</span>}
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}
