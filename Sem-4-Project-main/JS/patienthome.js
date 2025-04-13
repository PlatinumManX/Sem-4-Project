document.addEventListener("DOMContentLoaded", function () {
    let dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        let button = dropdown.querySelector(".drop-btn");
        let content = dropdown.querySelector(".drop-content");

        dropdown.addEventListener("mouseenter", function () {
            content.style.display = "block";
        });

        dropdown.addEventListener("mouseleave", function () {
            content.style.display = "none";
        });
    });
});

function showPatientDetails(date) {
    // Sample data for demonstration
    const patientData = {
        "2023-10-12": {
            name: "John Doe",
            suggestion: "Follow up in two weeks.",
            prescription: "Amoxicillin 500mg, 3 times a day for 7 days."
        },
        "2023-10-05": {
            name: "Jane Smith",
            suggestion: "Rest and drink plenty of fluids.",
            prescription: "Ibuprofen 200mg, as needed for pain."
        },
        // Add more dates as needed...
    };

    const details = patientData[date];

    if (details) {
        document.getElementById('patient-name').innerText = details.name;
        document.getElementById('doctor-suggestion').innerText = details.suggestion;
        document.getElementById('prescription').innerText = details.prescription;
        document.getElementById('original-copy-link').setAttribute('href', `original-prescription-${date}.pdf`); // Update link based on date
    } else {
        document.getElementById('patient-name').innerText = "No data available.";
        document.getElementById('doctor-suggestion').innerText = "No data available.";
        document.getElementById('prescription').innerText = "No data available.";
        document.getElementById('original-copy-link').setAttribute('href', '#'); // Reset link
    }
}

// Toggle Prescription
document.getElementById("prescription-link").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link behavior
    let text = document.getElementById("prescription-text");
    let image = document.getElementById("prescription-image");

    if (text.style.display === "none") {
        text.style.display = "block";
        image.style.display = "none";
        this.innerText = "View Original Prescription";
    } else {
        text.style.display = "none";
        image.style.display = "block";
        this.innerText = "Hide Original Prescription";
    }
});

// Toggle Report
document.getElementById("report-link").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link behavior
    let text = document.getElementById("report-text");
    let image = document.getElementById("report-image");

    if (text.style.display === "none") {
        text.style.display = "block";
        image.style.display = "none";
        this.innerText = "View Full Report";
    } else {
        text.style.display = "none";
        image.style.display = "block";
        this.innerText = "Hide Full Report";
    }
});
