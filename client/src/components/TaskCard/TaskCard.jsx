import PriorityLabel from "../PriorityLabel/PriorityLabel";
import { useNavigate, useParams } from "react-router";
import { urls } from "../../common/menu";
import "./TaskCard.clean.scss";

export default function TaskCard({
  id,
  title,
  description,
  priority,
  status,
  onDelete,
}) {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`${urls.EDIT_TASK_URL}/${id}/${projectId}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete && onDelete(id);
  };

  return (
    <div className="TaskCard">
      <div className="TaskCard__header">
        <h3>{title}</h3>
        <div className="TaskCard__meta">
          <PriorityLabel priority={priority} />
          <span className={`TaskCard__status TaskCard__status--${status}`}>
            {status}
          </span>
        </div>
      </div>
      <p>{description.slice(0, 100)}</p>
      <div className="TaskCard__actions">
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
