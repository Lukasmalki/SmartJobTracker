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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateJobApplication(id, form, token);
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

      <form>
        <div>
          <input name="company" value={form.company} onChange={handleChange} />
          <input name="role" value={form.role} onChange={handleChange} />

          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>

          <button
            className="jobdetails-btn delete"
            onClick={() => setIsModalOpen(true)}
          >
            Delete
          </button>

          {isModalOpen && (
            <ConfirmModal
              onConfirm={handleDelete}
              onCancel={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </form>
    </div>
  );
}
export default EditJobApplication;
