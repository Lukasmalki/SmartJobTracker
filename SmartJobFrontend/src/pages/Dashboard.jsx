import { useEffect, useState } from "react";
import {
  getJobApplications,
  deleteJobApplication,
} from "../api/jobApplication";
import JobItem from "../components/JobItem";
import SidebarMenu from "../components/SidebarMenu";
import "../styles/dashboard.css";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const loadApplications = async () => {
    try {
      const data = await getJobApplications(token);
      setApplications(data);
    } catch (err) {
      console.error("Felmeddelande", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteJobApplication(id, token);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Failed to delete: ", err);
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
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
  }, [token]);

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
            <Link to="/create" className="new-application-btn">
              <FaPlus /> New Application
            </Link>
          </div>
        </div>
        <hr className="divider-dashboard" />

        <div className="stats-container">
          <div
            className={`stat-card ${selectedStatus === "" ? "stat-active" : ""}`}
            onClick={() => setSelectedStatus("")}
          >
            <p className="stat-label">Total</p>
            <p className="stat-number">{applications.length}</p>
          </div>
          <div
            className={`stat-card ${selectedStatus === "Applied" ? "stat-active" : ""}`}
            onClick={() =>
              setSelectedStatus(selectedStatus === "Applied" ? "" : "Applied")
            }
          >
            <p className="stat-label stat-applied">Applied</p>
            <p className="stat-number">
              {applications.filter((a) => a.status === "Applied").length}
            </p>
          </div>
          <div
            className={`stat-card ${selectedStatus === "Interview" ? "stat-active" : ""}`}
            onClick={() =>
              setSelectedStatus(
                selectedStatus === "Interview" ? "" : "Interview",
              )
            }
          >
            <p className="stat-label stat-interview">Interview</p>
            <p className="stat-number">
              {applications.filter((a) => a.status === "Interview").length}
            </p>
          </div>
          <div
            className={`stat-card ${selectedStatus === "Offer" ? "stat-active" : ""}`}
            onClick={() =>
              setSelectedStatus(selectedStatus === "Offer" ? "" : "Offer")
            }
          >
            <p className="stat-label stat-offer">Offer</p>
            <p className="stat-number">
              {applications.filter((a) => a.status === "Offer").length}
            </p>
          </div>
          <div
            className={`stat-card ${selectedStatus === "Rejected" ? "stat-active" : ""}`}
            onClick={() =>
              setSelectedStatus(selectedStatus === "Rejected" ? "" : "Rejected")
            }
          >
            <p className="stat-label stat-rejected">Rejected</p>
            <p className="stat-number">
              {applications.filter((a) => a.status === "Rejected").length}
            </p>
          </div>
        </div>

        <div className="applications-overview">
          {filtered.map((job) => (
            <JobItem key={job.id} job={job} onDelete={openDeleteModal} />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ConfirmModal
          id={selectedId}
          onConfirm={() => handleDelete(selectedId)}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
