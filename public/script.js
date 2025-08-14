const API_URL = "http://localhost:3000/api/products";
const form = document.getElementById("productForm");
const productTable = document.getElementById("productTable");

async function fetchProducts() {
    const res = await fetch(API_URL);
    const data = await res.json();
    productTable.innerHTML = "";
    data.forEach(product => {
        productTable.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <button class="edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price })
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price })
        });
    }
    form.reset();
    fetchProducts();
});

async function editProduct(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    document.getElementById("productId").value = data.id;
    document.getElementById("productName").value = data.name;
    document.getElementById("productPrice").value = data.price;
}

async function deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
}

fetchProducts();
