document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  const email = params.get("email");
  const vehicleType = params.get("vehicleType");
  const message = params.get("message");

  const nameElement = document.getElementById("result-name");
  const emailElement = document.getElementById("result-email");
  const typeElement = document.getElementById("result-vehicle-type");
  const messageElement = document.getElementById("result-message");
  const summaryElement = document.getElementById("form-summary");

  if (!name && !email && !vehicleType && !message) {
    summaryElement.textContent = "No form data was found. Please submit the form first.";
    return;
  }

  nameElement.textContent = name || "Not provided";
  emailElement.textContent = email || "Not provided";

  let typeLabel = "Not specified";

  switch (vehicleType) {
    case "cars":
      typeLabel = "Sports cars";
      break;
    case "bikes":
      typeLabel = "Motorbikes";
      break;
    case "both":
      typeLabel = "Both cars and bikes";
      break;
  }

  typeElement.textContent = typeLabel;
  messageElement.textContent = message || "No message provided.";
});