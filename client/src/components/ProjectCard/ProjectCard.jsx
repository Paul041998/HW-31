import PriorityLabel from "../PriorityLabel/PriorityLabel";
import { useNavigate } from "react-router";
import { urls } from "../../common/menu";
import "./ProjectCard.scss";

export default function ProjectCard({
  id,
  title,
  description,
  priority,
  onClick,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick && onClick(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete && onDelete(id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`${urls.EDIT_PROJECT_URL}/${id}`);
  };

  return (
    <div
      className={`ProjectCard ProjectCard--${priority}`}
      onClick={handleClick}
    >
      <div className="ProjectCard__header">
        <h3>{title}</h3>
        <div className="ProjectCard__meta">
          <PriorityLabel priority={priority} />
        </div>
      </div>
      <p>{description}</p>
      <div className="ProjectCard__actions">
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
