import "../styles/sidebarmenu.css";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SidebarMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="menu">
      <div className="menu-header">
        <p className="smartjob">SmartJob&nbsp;</p>
        <p className="tracker">tracker</p>
      </div>

      <div className="menu-buttons">
        <Link to="/dashboard">
          <div className="button-logo-container">
            <FaHome className="logo" />
            <span>Dashboard</span>
          </div>
        </Link>
        <Link to="/create">
          <div className="button-logo-container">
            <FaPlus className="logo" />
            <span>Create New Application</span>
          </div>
        </Link>
      </div>

      <div className="signout-container">
        <div className="accountinfo-container">
          <p className="fullname">Lukas Malki</p>
          <p className="email">lukasandremalki@hotmail.com</p>
          <button onClick={handleLogout}>Sign out</button>
        </div>
        <div className="signout">
          <FaSignOutAlt className="logo" />
          <span>Sign out</span>
        </div>
      </div>
    </div>
  );
}
export default SidebarMenu;
