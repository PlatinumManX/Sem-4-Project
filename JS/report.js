function showReportFields(reportType) {
    // Hide all report fields
    document.querySelectorAll(".report-fields").forEach(el => el.classList.remove("active"));
    // Show the selected report fields
    document.getElementById(reportType).classList.add("active");

    // Update button states
    document.querySelectorAll(".report-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.report-btn[onclick="showReportFields('${reportType}')"]`).classList.add("active");
}

function generateReport() {
    const activeReport = document.querySelector(".report-fields.active").id;
    let reportData = {};

    if (activeReport === "patientReport") {
        reportData = {
            patientId: document.getElementById("patientId").value,
            patientName: document.getElementById("patientName").value,
            diagnosis: document.getElementById("diagnosis").value,
            date: document.getElementById("patientDate").value,
        };
    } else if (activeReport === "appointmentReport") {
        reportData = {
            doctorName: document.getElementById("doctorName").value,
            department: document.getElementById("department").value,
            status: document.getElementById("appointmentStatus").value,
            date: document.getElementById("appointmentDate").value,
        };
    } else if (activeReport === "billingReport") {
        reportData = {
            patientBillId: document.getElementById("patientBillId").value,
            billingStatus: document.getElementById("billingStatus").value,
            paymentMethod: document.getElementById("paymentMethod").value,
            date: document.getElementById("billingDate").value,
        };

        if (reportData.billingStatus === "partial") {
            reportData.remainingAmount = document.getElementById("remainingAmount").value;
        }
    }

    console.log(reportData); // Replace with actual report generation logic
    alert("Report generated successfully!"); // Placeholder for actual functionality
}

// Toggle remaining amount input based on billing status
document.getElementById("billingStatus").addEventListener("change", function () {
    const remainingPaymentSection = document.getElementById("remainingPaymentSection");
    if (this.value === "partial") {
        remainingPaymentSection.style.display = "block";
    } else {
        remainingPaymentSection.style.display = "none";
    }
});