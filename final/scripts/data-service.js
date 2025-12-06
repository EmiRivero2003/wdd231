export async function fetchVehicles() {
  try {
    const response = await fetch("scripts/vehicles.json");

    if (!response.ok) {
      throw new Error("Failed to load vehicle data.");
    }

    const data = await response.json();
    return data.vehicles;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }
}