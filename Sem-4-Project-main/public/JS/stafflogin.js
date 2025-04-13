console.log("stafflogin.js loaded");

document.getElementById("staffLoginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in both email and password!");
    return; // Stop the form submission
  }

  const res = await fetch("/auth/staff-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = "/staff.html"; // Adjust if needed
  } else {
    alert(data.message);
  }
});
