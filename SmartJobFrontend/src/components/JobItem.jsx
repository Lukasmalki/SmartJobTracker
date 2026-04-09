import { Link } from "react-router-dom";
import "../styles/jobitem.css";

function JobItem({ job, onDelete }) {
  return (
    <div className="job-item">
      <div className="job-item-info">
        <div className="job-item-title-status">
          <p className="company">{job.company}</p>
          <span className={`status-badge status-${job.status?.toLowerCase()}`}>
            {job.status}
          </span>
        </div>
        <hr className="divider-jobitem" />
        <p className="role">{job.role}</p>
        <p className="applied-date">Applied on {job.appliedDate}</p>
        <p className="notes-preview">
          {job.notes
            ? job.notes.slice(0, 60) + (job.notes.length > 60 ? "..." : "")
            : "No notes"}
        </p>
      </div>

      <div className="edit-delete-btns">
        <Link to={`/job/${job.id}`} className="btn edit">
          Edit
        </Link>
        <button onClick={() => onDelete(job.id)} className="btn delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobItem;
