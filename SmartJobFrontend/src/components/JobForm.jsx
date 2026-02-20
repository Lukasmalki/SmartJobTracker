import { useState } from "react";

function JobForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    company: initialData.company || "",
    role: initialData.role || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company:</label>
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
        />
      </div>

      <div>
        <label>Role:</label>
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default JobForm;
