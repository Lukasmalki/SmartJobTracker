const API_BASE = "https://localhost:7111/api/jobapplication";

export async function getJobApplications() {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}

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
