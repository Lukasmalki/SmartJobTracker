import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateJobApplication from "./pages/CreateJobApplication";
import EditJobApplication from "./pages/EditJobApplication";

function App() {
  return (
    <Router>
      <Routes>
        {/* Om root → navigera till /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Sidor */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateJobApplication />} />
        <Route path="/edit/:id" element={<EditJobApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
