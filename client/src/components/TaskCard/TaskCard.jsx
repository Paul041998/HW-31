import PriorityLabel from "../PriorityLabel/PriorityLabel";
import "./TaskCard.clean.scss";

export default function TaskCard({ title, description, priority }) {
  return (
    <div className="TaskCard">
      <h3>{title}</h3>
      <PriorityLabel priority={priority} />
      <p>{description.slice(0, 100)}</p>
    </div>
  );
}
