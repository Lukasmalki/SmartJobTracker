import JobForm from "../components/JobForm";
import { createJobApplication } from "../api/jobApplication";
import { useNavigate } from "react-router-dom"; // Om du använder React Router

function CreateJobApplication() {
  const navigate = useNavigate(); // För att gå tillbaka till Dashboard efter submit

  const handleCreate = async (data) => {
    try {
      const result = await createJobApplication(data);
      console.log("Created:", result); // Kontrollera res.json()
      alert("Job application created!");

      // Navigera tillbaka till Dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error creating job application: " + err.message);
    }
  };

  return <JobForm onSubmit={handleCreate} />;
}

export default CreateJobApplication;
