// Function to validate name fields (only alphabets and spaces)
function validateName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

// Function to validate contact number (10 digits only)
function validateContact(contact) {
    const regex = /^\d{10}$/;
    return regex.test(contact);
}

// Function to validate email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to validate date (not in the future)
function validateDate(date) {
    const inputDate = new Date(date);
    const currentDate = new Date();
    return inputDate <= currentDate;
}

// Function to validate number fields (positive numbers only)
function validateNumber(number) {
    return !isNaN(number) && number >= 0;
}

// Add event listeners for real-time validation
document.getElementById('patientName').addEventListener('input', function () {
    if (!validateName(this.value)) {
        this.setCustomValidity("Name should only contain alphabets and spaces.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById('patientContact').addEventListener('input', function () {
    if (!validateContact(this.value)) {
        this.setCustomValidity("Contact number must be 10 digits.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById('doctorName').addEventListener('input', function () {
    if (!validateName(this.value)) {
        this.setCustomValidity("Name should only contain alphabets and spaces.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById('patientAge').addEventListener('input', function () {
    if (!validateNumber(this.value)) {
        this.setCustomValidity("Age must be a valid number.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById('totalAmount').addEventListener('input', function () {
    if (!validateNumber(this.value)) {
        this.setCustomValidity("Total amount must be a valid number.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById('amountPaid').addEventListener('input', function () {
    if (!validateNumber(this.value)) {
        this.setCustomValidity("Amount paid must be a valid number.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById('coverageAmount').addEventListener('input', function () {
    if (!validateNumber(this.value)) {
        this.setCustomValidity("Coverage amount must be a valid number.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById('patientDate').addEventListener('input', function () {
    if (!validateDate(this.value)) {
        this.setCustomValidity("Date cannot be in the future.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById('appointmentDate').addEventListener('input', function () {
    if (!validateDate(this.value)) {
        this.setCustomValidity("Date cannot be in the future.");
    } else {
        this.setCustomValidity("");
    }
});

document.getElementById('billingDate').addEventListener('input', function () {
    if (!validateDate(this.value)) {
        this.setCustomValidity("Date cannot be in the future.");
    } else {
        this.setCustomValidity("");
    }
});

// Payment Method Handler
document.getElementById('paymentMethod').addEventListener('change', function () {
    const amountPaidSection = document.getElementById('amountPaidSection');
    const insuranceSection = document.getElementById('medicalInsuranceSection');

    if (this.value === 'insurance') {
        amountPaidSection.style.display = 'block';
        insuranceSection.style.display = 'block';
    } else if (this.value !== '') {
        amountPaidSection.style.display = 'block';
        insuranceSection.style.display = 'none';
    } else {
        amountPaidSection.style.display = 'none';
        insuranceSection.style.display = 'none';
    }
});

// Show Report Fields
function showReportFields(reportType) {
    document.querySelectorAll('.report-fields').forEach(field => field.classList.remove('active'));
    document.getElementById(reportType).classList.add('active');

    document.querySelectorAll('.report-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`button[onclick="showReportFields('${reportType}')"]`).classList.add('active');
}

// Patient Report Generator
function generatePatientReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Validate inputs
    const patientId = document.getElementById('patientId').value;
    const patientName = document.getElementById('patientName').value;
    const patientContact = document.getElementById('patientContact').value;

    if (!patientId) {
        alert("Please enter a valid Patient ID.");
        return;
    }
    if (!validateName(patientName)) {
        alert("Please enter a valid Patient Name (only alphabets and spaces).");
        return;
    }
    if (!validateContact(patientContact)) {
        alert("Please enter a valid 10-digit Contact Number.");
        return;
    }

    // Add logo and company info
    const img = new Image();
    img.src = 'images/Logo.png'; // Ensure this path is correct
    img.onload = function () {
        doc.addImage(img, 'PNG', 10, 10, 40, 20);

        // Company Info
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(22, 160, 133);
        doc.text("HospitAll Pvt Ltd", 55, 15);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("1234 Medical Street, City, Country", 55, 20);
        doc.text("Phone: (123) 456-7890 | Email: contact@hospitall.com", 55, 25);

        // Report Title
        doc.setFontSize(18);
        doc.setTextColor(44, 62, 80);
        doc.text("Patient Medical Report", 10, 50);

        // Patient Data
        const data = [
            ["Patient ID", patientId],
            ["Name", patientName],
            ["Age", document.getElementById('patientAge').value],
            ["Gender", document.getElementById('patientGender').value],
            ["Address", document.getElementById('patientAddress').value],
            ["Contact", patientContact],
            ["Diagnosis", document.getElementById('diagnosis').value],
            ["Treatment", document.getElementById('treatment').value],
            ["Date", document.getElementById('patientDate').value]
        ];

        // Generate Table
        doc.autoTable({
            startY: 60,
            head: [['Field', 'Details']],
            body: data,
            theme: 'grid',
            styles: { fontSize: 12, cellPadding: 4 },
            headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [240, 240, 240] }
        });

        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Confidential Report - Generated by HospitAll Pvt Ltd", 10, pageHeight - 10);

        // Save PDF
        doc.save(`Patient_Report_${patientId}.pdf`);
    };
}

// Appointment Report Generator
function generateAppointmentReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Validate inputs
    const appointmentId = document.getElementById('appointmentId').value;
    const doctorName = document.getElementById('doctorName').value;

    if (!appointmentId) {
        alert("Please enter a valid Appointment ID.");
        return;
    }
    if (!validateName(doctorName)) {
        alert("Please enter a valid Doctor Name (only alphabets and spaces).");
        return;
    }

    // Add logo and company info
    const img = new Image();
    img.src = 'images/Logo.png'; // Ensure this path is correct
    img.onload = function () {
        doc.addImage(img, 'PNG', 10, 10, 40, 20);

        // Company Info
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(41, 128, 185);
        doc.text("HospitAll Pvt Ltd", 55, 15);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("1234 Medical Street, City, Country", 55, 20);
        doc.text("Phone: (123) 456-7890 | Email: contact@hospitall.com", 55, 25);

        // Report Title
        doc.setFontSize(18);
        doc.setTextColor(41, 128, 185);
        doc.text("Appointment Report", 10, 50);

        // Appointment Data
        const data = [
            ["Appointment ID", appointmentId],
            ["Doctor", doctorName],
            ["Department", document.getElementById('department').value],
            ["Date", document.getElementById('appointmentDate').value],
            ["Time", document.getElementById('appointmentTime').value],
            ["Status", document.getElementById('appointmentStatus').value],
            ["Notes", document.getElementById('notes').value]
        ];

        // Generate Table
        doc.autoTable({
            startY: 60,
            head: [['Field', 'Details']],
            body: data,
            theme: 'grid',
            styles: { fontSize: 12, cellPadding: 4 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [230, 240, 255] }
        });

        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Confidential Report - Generated by HospitAll Pvt Ltd", 10, pageHeight - 10);

        // Save PDF
        doc.save(`Appointment_Report_${appointmentId}.pdf`);
    };
}

// Billing Report Generator
function generateBillReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Validate inputs
    const billId = document.getElementById('billId').value;
    const patientNameBill = document.getElementById('patientNameBill').value;

    if (!billId) {
        alert("Please enter a valid Bill ID.");
        return;
    }
    if (!validateName(patientNameBill)) {
        alert("Please enter a valid Patient Name (only alphabets and spaces).");
        return;
    }

    // Add logo and company info
    const img = new Image();
    img.src = 'images/Logo.png'; // Ensure this path is correct
    img.onload = function () {
        doc.addImage(img, 'PNG', 10, 10, 40, 20);

        // Company Info
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(192, 57, 43);
        doc.text("HospitAll Pvt Ltd", 55, 15);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("1234 Medical Street, City, Country", 55, 20);
        doc.text("Phone: (123) 456-7890 | Email: contact@hospitall.com", 55, 25);

        // Report Title
        doc.setFontSize(18);
        doc.setTextColor(192, 57, 43);
        doc.text("Billing Report", 10, 50);

        // Billing Data
        const totalAmount = parseFloat(document.getElementById('totalAmount').value) || 0;
        const amountPaid = parseFloat(document.getElementById('amountPaid').value) || 0;
        const data = [
            ["Bill ID", billId],
            ["Patient", patientNameBill],
            ["Total Amount", `₹${totalAmount.toFixed(2)}`],
            ["Amount Paid", `₹${amountPaid.toFixed(2)}`],
            ["Balance", `₹${(totalAmount - amountPaid).toFixed(2)}`],
            ["Payment Method", document.getElementById('paymentMethod').value],
            ["Date", document.getElementById('billingDate').value]
        ];

        if (document.getElementById('paymentMethod').value === 'insurance') {
            data.push(
                ["Insurance Provider", document.getElementById('insuranceProvider').value],
                ["Policy Number", document.getElementById('policyNumber').value],
                ["Coverage Amount", `₹${document.getElementById('coverageAmount').value}`],
                ["Claim Status", document.getElementById('claimStatus').value]
            );
        }

        // Generate Table
        doc.autoTable({
            startY: 60,
            head: [['Field', 'Details']],
            body: data,
            theme: 'grid',
            styles: { fontSize: 12, cellPadding: 4 },
            headStyles: { fillColor: [192, 57, 43], textColor: 255, fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [255, 230, 230] }
        });

        // Footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Confidential Report - Generated by HospitAll Pvt Ltd", 10, pageHeight - 10);

        // Save PDF
        doc.save(`Bill_Report_${billId}.pdf`);
    };
}
