const API_URL = import.meta.env.VITE_API_URL;

// GET ALL
export async function getJobApplications() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}

// GET ONE
export async function getJobApplicationById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}


// POST
export async function createJobApplication(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create application");
  }

  return res.json();
}


// PUT
export async function updateJobApplication(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update application");
  }

  return res.json();
}

// DELETE
export async function deleteJobApplication(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete application");
  }
  
  return true;
}