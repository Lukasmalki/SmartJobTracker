import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateJobApplication from "./pages/CreateJobApplication";
import JobDetailsApplication from "./pages/JobDetailsApplication";

function App() {
  return (
    <Router>
      <Routes>
        {/* Om root → navigera till /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Sidor */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateJobApplication />} />
        <Route path="/job/:id" element={<JobDetailsApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
