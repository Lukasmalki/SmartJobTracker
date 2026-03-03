import { Link } from "react-router-dom";
import "../styles/jobitem.css";

function JobItem({ job }) {
  return (
    <div className="job-item">
      <div className="job-item-info">
        <p className="company">{job.company}</p>
        <hr className="divider-jobitem" />
        <p className="role">{job.role}</p>
        <p className="applied-date">Applied on {job.appliedDate}</p>
      </div>

      <div className="edit-delete-btns">
        <Link to={`/edit/${job.id}`} className="btn edit">
          Edit
        </Link>
        <button className="btn delete">Delete</button>
      </div>
    </div>
  );
}

export default JobItem;
