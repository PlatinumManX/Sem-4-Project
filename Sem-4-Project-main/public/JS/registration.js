document.querySelector(".form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const birthDate = document.getElementById("birth_date").value;
  const gender = document.getElementById("gender").value;
  const address1 = document.getElementById("address_line1").value.trim();
  const address2 = document.getElementById("address_line2").value.trim();
  const country = document.getElementById("country").value.trim();
  const city = document.getElementById("city").value.trim();
  const region = document.getElementById("region").value.trim();
  const postalCode = document.getElementById("postal_code").value.trim();

  if (!fullName || !email || !phone || !birthDate || !gender || !address1 || !country || !city || !region || !postalCode) {
    alert("Please fill all required fields!");
    return;
  }

  const cleanedName = fullName.replace(/\s+/g, '').toLowerCase();
  const randomNumber = Math.floor(Math.random() * 900 + 100); // 3-digit random number
  const password = cleanedName + randomNumber;

  alert("Your generated password is: " + password);

  try {
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
        email,
        phone,
        birth_date: birthDate,
        gender,
        address_line1: address1,
        address_line2: address2,
        country,
        city,
        region,
        postal_code: postalCode,
        password
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful!");
    } else {
      alert(data.message || "Registration failed!");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Something went wrong!");
  }
});
