const API_URL = `${import.meta.env.VITE_API_URL}/jobapplication`;

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
})

// GET ALL
export async function getJobApplications(token) {
  const res = await fetch(API_URL, { headers: authHeaders(token)} );
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}

// GET ONE
export async function getJobApplicationById(id, token) {
  const res = await fetch(`${API_URL}/${id}`, { headers: authHeaders(token) });
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}


// POST
export async function createJobApplication(data, token) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create application");
  }

  return res.json();
}


// PUT
export async function updateJobApplication(id, data, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update application");
  }

  return res.json();
}

// DELETE
export async function deleteJobApplication(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    throw new Error("Failed to delete application");
  }
  
  return true;
}