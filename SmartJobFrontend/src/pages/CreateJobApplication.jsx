import JobForm from "../components/JobForm";
import { createJobApplication } from "../api/jobApplication";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import "../styles/createjobapplication.css";
import { useAuth } from "../context/AuthContext";

function CreateJobApplication() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleCreate = async (data) => {
    try {
      const result = await createJobApplication(data, token);
      console.log("Created:", result);
      alert("Job application created!");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error creating job application: " + err.message);
    }
  };

  return (
    <div className="createjobapplication-page">
      <SidebarMenu />
      <div className="jobform-container">
        <JobForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}

export default CreateJobApplication;
