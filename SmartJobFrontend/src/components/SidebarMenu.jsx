import "../styles/sidebarmenu.css";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function SidebarMenu() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initial = user?.username?.charAt(0).toUpperCase();

  return (
    <div className="menu">
      <div className="menu-logo">
        <p className="menu-title">
          SmartJob<span className="menu-subtitle">tracker</span>
        </p>
      </div>

      <div className="menu-divider" />

      <div className="menu-buttons">
        <Link
          to="/dashboard"
          className={`menu-item ${location.pathname === "/dashboard" ? "active" : ""}`}
        >
          <FaHome className="menu-icon" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/create"
          className={`menu-item ${location.pathname === "/create" ? "active" : ""}`}
        >
          <FaPlus className="menu-icon" />
          <span>Create New Application</span>
        </Link>
      </div>

      <div className="menu-divider" />

      <div className="menu-footer">
        <div className="menu-user">
          <div className="menu-avatar">{initial}</div>
          <div>
            <p className="menu-username">{user?.username}</p>
            <p className="menu-email">{user?.email}</p>
          </div>
        </div>
        <div onClick={handleLogout} className="menu-signout">
          <FaSignOutAlt className="menu-icon" />
          <span>Sign out</span>
        </div>
      </div>
    </div>
  );
}
export default SidebarMenu;
