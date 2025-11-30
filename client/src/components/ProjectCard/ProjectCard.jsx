import PriorityLabel from "../PriorityLabel/PriorityLabel";
import "./ProjectCard.scss";

export default function ProjectCard({
  id,
  title,
  description,
  priority,
  onClick,
  onDelete,
}) {
  const handleClick = () => {
    onClick && onClick(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete && onDelete(id);
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
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
