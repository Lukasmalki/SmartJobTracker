const API_BASE = "https://localhost:7111/api/jobapplication";


// GET ALL
export async function getJobApplications() {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}

// GET ONE
export async function getJobApplicationById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}


// POST
export async function createJobApplication(data) {
  const res = await fetch(API_BASE, {
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
  const res = await fetch(`${API_BASE}/${id}`, {
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
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete application");
  }
  
  return true;
}