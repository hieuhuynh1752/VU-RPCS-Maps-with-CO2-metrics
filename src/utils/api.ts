import { Step, EnrichedStepsResponse } from "../types/api";

const API_BASE_URL = "http://localhost:8000/api/emissions"; // Replace with your server URL

// Fetch CO₂ emissions
export const fetchEmissions = async (
  steps: Step[],
): Promise<EnrichedStepsResponse> => {
  const response = await fetch(`${API_BASE_URL}/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ steps: steps }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch emissions data");
  }

  return response.json();
};
