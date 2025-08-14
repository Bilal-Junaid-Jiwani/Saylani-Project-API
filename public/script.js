// ✅ Use relative path so it works on Render
const API_URL = "https://saylani-project-api.onrender.com/api/products";

async function getProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log(data);
}

async function addProduct(name, price) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  });
  const data = await res.json();
  console.log("Product Added:", data);
}

async function updateProduct(id, name, price) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price })
  });
  const data = await res.json();
  console.log("Product Updated:", data);
}

async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  const data = await res.json();
  console.log(data);
}

// Example calls
getProducts();
