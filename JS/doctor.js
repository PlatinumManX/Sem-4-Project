function showReport(report) {
    // Get the div where the image is to be shown
    const reportDiv = document.getElementById(report);

    // Check if the reportDiv already has an image
    if (reportDiv.innerHTML.trim() !== "") {
        // If there's an image, hide it (clear the innerHTML)
        reportDiv.innerHTML = '';
    } else {
        // If there's no image, show the report's image
        const reportImage = `<img src="images/${report}.jpg" alt="${report}" style="width: 100%; height: auto;">`;
        reportDiv.innerHTML = reportImage;
    }

    // Clear other reports
    const reportImages = document.querySelectorAll('.report-image');
    reportImages.forEach(function(imageContainer) {
        if (imageContainer !== reportDiv) {
            imageContainer.innerHTML = '';  // Hide the other report images
        }
    });
}
