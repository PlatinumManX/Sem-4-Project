// Sample patient data (can be replaced with data from a database or API)
const patients = [
    {
        id: "001",
        name: "John Doe",
        age: 34,
        gender: "Male",
        contact: "john.doe@example.com",
        history: "Allergies to penicillin",
        image: "https://via.placeholder.com/150"
    },
    {
        id: "002",
        name: "Jane Smith",
        age: 28,
        gender: "Female",
        contact: "jane.smith@example.com",
        history: "No known allergies",
        image: "https://via.placeholder.com/150"
    }
];

function searchPatient() {
    const patientId = document.getElementById("patientId").value;
    const patient = patients.find(p => p.id === patientId);

    if (patient) {
        document.getElementById("patientName").textContent = patient.name;
        document.getElementById("patientAge").textContent = patient.age;
        document.getElementById("patientGender").textContent = patient.gender;
        document.getElementById("patientContact").textContent = patient.contact;
        document.getElementById("patientHistory").textContent = patient.history;
        document.getElementById("patientImage").src = patient.image;

        document.getElementById("patientDetails").style.display = "block";
    } else {
        alert("Patient not found!");
    }
}

function editPatient() {
    const fields = ["patientName", "patientAge", "patientGender", "patientContact", "patientHistory"];
    fields.forEach(field => {
        const span = document.getElementById(field);
        const value = span.textContent;
        span.innerHTML = `<input type="text" id="edit${field}" value="${value}">`;
    });

    document.getElementById("saveButton").style.display = "inline-block";
}

function savePatient() {
    const fields = ["patientName", "patientAge", "patientGender", "patientContact", "patientHistory"];
    fields.forEach(field => {
        const input = document.getElementById(`edit${field}`);
        const span = document.getElementById(field);
        span.textContent = input.value;
    });

    document.getElementById("saveButton").style.display = "none";
    alert("Patient details updated successfully!");
}