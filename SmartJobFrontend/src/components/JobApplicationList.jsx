import { useEffect, useState } from "react";
import { getJobApplications } from "../api/jobApplication";

function JobApplicationList() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getJobApplications();
        setApplications(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadApplications();
  }, []);

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
