import JobForm from "../components/JobForm";
import { createJobApplication } from "../api/jobApplication";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import "../styles/createjobapplication.css";

function CreateJobApplication() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      const result = await createJobApplication(data);
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
      <JobForm onSubmit={handleCreate} />
    </div>
  );
}

export default CreateJobApplication;
