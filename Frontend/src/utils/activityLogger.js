const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";

export const logActivity = async (source, message, link = "") => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await fetch(`${API_URL}/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ source, message, link }),
    });

    if (!response.ok) {
      console.error("Failed to log activity:", await response.json());
    }
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
