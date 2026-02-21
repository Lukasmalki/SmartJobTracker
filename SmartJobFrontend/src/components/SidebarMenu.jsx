import "../styles/sidebarmenu.css";
import { Link } from "react-router-dom";

function SidebarMenu() {
  return (
    <div className="menu">
      <div className="menu-header">
        <p className="smartjob">SmartJob&nbsp;</p>
        <p className="tracker">tracker</p>
      </div>

      <div className="menu-buttons">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/create">
          <button>Create New Application</button>
        </Link>
      </div>

      <div className="dontknow">VET INTE ÄN</div>
    </div>
  );
}
export default SidebarMenu;
