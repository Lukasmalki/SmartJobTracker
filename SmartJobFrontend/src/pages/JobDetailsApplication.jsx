import SidebarMenu from "../components/SidebarMenu";
import "../styles/jobdetailspage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import {
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} from "../api/jobApplication";
import JobForm from "../components/JobForm";

function EditJobApplication() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const load = async () => {
    try {
      const data = await getJobApplicationById(id, token);
      setForm(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id, token]);

  const handleSave = async (data) => {
    setSaving(true);
    try {
      await updateJobApplication(id, data, token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJobApplication(id, token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>Not found</p>;

  return (
    <div className="jobdetailsapplication-page">
      <SidebarMenu />

      <div className="jobdetails-container">
        <JobForm
          initialData={form}
          onSubmit={handleSave}
          submitLabel="Save changes"
          titleLabel="Edit application"
          onDelete={() => setIsModalOpen(true)}
        ></JobForm>
      </div>
      {isModalOpen && (
        <ConfirmModal
          id={id}
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
export default EditJobApplication;
