import { useEffect, useState } from "react";
import { getJobApplications } from "../api/jobApplication";
import JobItem from "../components/JobItem";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadApplications = async () => {
    try {
      const data = await getJobApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-page">
      <div className="menu">
        <h2>Dashboard</h2>
        <Link to="/create">
          <button>Create New Application</button>
        </Link>
      </div>

      <div className="overview">
        {applications.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
