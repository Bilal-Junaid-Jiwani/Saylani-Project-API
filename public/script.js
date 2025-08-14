// ✅ Update this to your Render deployed URL
const API_URL = "https://saylani-project-api.onrender.com/api/products";

const form = document.getElementById("productForm");
const productTable = document.getElementById("productTable");
let editId = null;

// Fetch & render products
async function fetchProducts() {
    const res = await fetch(API_URL);
    const data = await res.json();
    productTable.innerHTML = "";

    data.forEach(product => {
        productTable.innerHTML += `
            <tr>
                <td>${product._id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <button class="edit" onclick="editProduct('${product._id}', '${product.name}', ${product.price})">Edit</button>
                    <button class="delete" onclick="deleteProduct('${product._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add or Update Product
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);

    if (!name || !price) {
        alert("Please fill all fields!");
        return;
    }

    if (editId) {
        // Update product
        await fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price })
        });
        editId = null;
        form.querySelector("button").textContent = "Save Product";
    } else {
        // Add product
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price })
        });
    }

    form.reset();
    fetchProducts();
});

// Edit product
function editProduct(id, name, price) {
    document.getElementById("productName").value = name;
    document.getElementById("productPrice").value = price;
    editId = id;
    form.querySelector("button").textContent = "Update Product";
}

// Delete product
async function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchProducts();
    }
}

// Initial fetch
fetchProducts();
