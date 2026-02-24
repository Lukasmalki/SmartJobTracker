import "../styles/sidebarmenu.css";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";

function SidebarMenu() {
  return (
    <div className="menu">
      <div className="menu-header">
        <p className="smartjob">SmartJob&nbsp;</p>
        <p className="tracker">tracker</p>
      </div>

      <div className="menu-buttons">
        <Link to="/">
          <div className="button-logo-container">
            <FaHome className="logo" />
            <span>Home</span>
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
