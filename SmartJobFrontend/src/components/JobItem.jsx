import { Link } from "react-router-dom";

function JobItem({ job }) {
  return (
    <div className="job-item">
      <p>Company: {job.company}</p>
      <p>Role: {job.role}</p>

      <Link to={`/edit/${job.id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default JobItem;
