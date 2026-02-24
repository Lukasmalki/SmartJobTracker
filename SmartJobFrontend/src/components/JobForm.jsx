import { useState } from "react";
import "../styles/jobform.css";

function JobForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    company: initialData.company || "",
    role: initialData.role || "",
    appliedDate: initialData.appliedDate || "",
    notes: initialData.notes || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="company">
        <label>Company</label>
        <input
          className="company-input"
          type="text"
          required
          placeholder="e.g. Apple, Volvo, Google"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
        />
      </div>

      <div>
        <label>Role</label>
        <input
          className="role-input"
          type="text"
          required
          placeholder="e.g. Backend Developer, UX Designer"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        />
      </div>

      <div>
        <label>Date</label>
        <input
          className="date-input"
          type="date"
          required
          value={formData.appliedDate}
          onChange={(e) =>
            setFormData({ ...formData, appliedDate: e.target.value })
          }
        />
      </div>

      <div>
        <label>Notes</label>
        <textarea
          className="notes-input"
          type="text"
          placeholder="Add details about the application, interview, or follow-up..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <button className="submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default JobForm;
