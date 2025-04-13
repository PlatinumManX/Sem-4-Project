console.log("patientlojin.js loaded");

document.getElementById("patientLoginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if both fields are filled
  if (!email || !password) {
    alert("Please fill in both email and password!");
    return; // Stop the form submission
  }

  const res = await fetch("/auth/patient-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = "/patienthome.html"; // Redirect after successful login
  } else {
    alert(data.message); // Show error message from the server
  }
});

