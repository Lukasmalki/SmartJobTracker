import { useEffect, useState } from "react";
import { getJobApplications } from "../api/jobApplication";
import JobItem from "../components/JobItem";
import SidebarMenu from "../components/SidebarMenu";
import "../styles/dashboard.css";
import { FaPlus } from "react-icons/fa";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

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

  const filtered = applications.filter(
    (item) =>
      item.company.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.role.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.appliedDate.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.notes.toLowerCase().includes(search.trim().toLowerCase()),
  );

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard-page">
      <SidebarMenu />

      <div className="dashboard-container">
        <div className="applications-title-search">
          <div className="title">
            <p>Job Applications</p>
          </div>

          <div className="search">
            <input
              className="search-input"
              type="text"
              placeholder="Search applications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="new-application-btn">
              <FaPlus /> New Application
            </button>
          </div>
        </div>

        <div className="applications-overview">
          {filtered.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
