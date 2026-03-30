import { useEffect, useState } from "react";
import { getJobApplications } from "../api/jobApplication";
import { useAuth } from "../context/AuthContext";

function JobApplicationList() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getJobApplications(token);
        setApplications(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadApplications();
  }, [token]);

  return (
    <div>
      <h2>Job Applications</h2>

      {error && <p>{error}</p>}

      {applications.map((app) => (
        <div key={app.id}>
          <p>{app.company}</p>
          <p>{app.role}</p>
        </div>
      ))}
    </div>
  );
}

export default JobApplicationList;
