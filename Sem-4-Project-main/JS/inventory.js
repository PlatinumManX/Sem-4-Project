let inventory = [
    { name: "Syringes", category: "Medical Supplies", quantity: 50, expiry: "2025-12-31", supplier: "MedCorp" },
    { name: "Gloves", category: "Medical Supplies", quantity: 200, expiry: "2026-06-15", supplier: "SafeHands" },
    { name: "Painkillers", category: "Pharmaceuticals", quantity: 100, expiry: "2024-10-20", supplier: "PharmaMax" },
    { name: "Antibiotics", category: "Pharmaceuticals", quantity: 80, expiry: "2025-03-12", supplier: "MedLife" },
    { name: "Stethoscope", category: "Equipment", quantity: 10, supplier: "HealthTech" },
    { name: "Blood Pressure Monitor", category: "Equipment", quantity: 15, supplier: "MediEquip" },
    { name: "Sanitizer", category: "Medical Supplies", quantity: 150, expiry: "2025-08-30", supplier: "CleanHands" }
];

// Populate categories
function displayCategories() {
    document.getElementById("medicalSupplies").innerHTML += inventory.filter(i => i.category === "Medical Supplies").map(i => `<p>${i.name} (${i.quantity})</p>`).join("");
    document.getElementById("pharmaceuticals").innerHTML += inventory.filter(i => i.category === "Pharmaceuticals").map(i => `<p>${i.name} (${i.quantity})</p>`).join("");
    document.getElementById("equipment").innerHTML += inventory.filter(i => i.category === "Equipment").map(i => `<p>${i.name} (${i.quantity})</p>`).join("");
}

// Add stock
document.getElementById("addStockForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let item = {
        name: document.getElementById("itemName").value,
        category: document.getElementById("itemCategory").value,
        quantity: parseInt(document.getElementById("itemQuantity").value),
        expiry: document.getElementById("itemExpiry").value,
        supplier: document.getElementById("itemSupplier").value
    };
    inventory.splice(0,inventory.length);
    inventory.push(item);
    alert("Stock Added!");
    displayCategories();
});

// Search with suggestions
document.getElementById("searchItemName").addEventListener("input", function() {
    let searchTerm = this.value.toLowerCase();
    let suggestions = inventory.filter(item => item.name.toLowerCase().includes(searchTerm)).map(item => `<li onclick="selectSearch('${item.name}')">${item.name}</li>`).join("");
    document.getElementById("searchSuggestions").innerHTML = suggestions;
    document.getElementById("searchSuggestions").style.display = searchTerm ? "block" : "none";
});

function selectSearch(itemName) {
    document.getElementById("searchItemName").value = itemName;
    document.getElementById("searchSuggestions").style.display = "none";
    searchItem();
}

// Search item details
function searchItem() {
    let searchTerm = document.getElementById("searchItemName").value.toLowerCase();
    let foundItem = inventory.find(item => item.name.toLowerCase() === searchTerm);
    let resultDiv = document.getElementById("searchResult");
    if (foundItem) {
        resultDiv.innerHTML = `<p><strong>Name:</strong> ${foundItem.name}</p>
                               <p><strong>Category:</strong> ${foundItem.category}</p>
                               <p><strong>Quantity:</strong> ${foundItem.quantity}</p>
                               <p><strong>Expiry:</strong> ${foundItem.expiry || "N/A"}</p>
                               <p><strong>Supplier:</strong> ${foundItem.supplier}</p>`;
    } else {
        resultDiv.innerHTML = `<p style="color: red;">Item not found!</p>`;
    }
}

// Initialize
displayCategories();
