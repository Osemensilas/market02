const container = document.getElementById("productList");

// FETCH PRODUCTS
async function loadProducts() {

  const res = await axios.get("http://localhost/backends/power/get-products.php");

  const products = res.data.data;

  container.innerHTML = "";

  products.forEach(product => {

    container.innerHTML += `
      <div class="card" style="border:1px solid #ddd; padding:10px; margin:10px;">
        <img src="http://localhost/backends/power/${product.image}" width="80">
        <h3>${product.product_name}</h3>
        <p>${product.price}</p>

        <button onclick="deleteProduct(${product.id})">
          Delete
        </button>
      </div>
    `;

  });
}

// DELETE PRODUCT
async function deleteProduct(id) {

  try {

    const res = await axios.post(
      "http://localhost/backends/power/delete-product.php",
      { id: id }
    );

    alert(res.data.message);

    loadProducts(); // refresh list

  } catch (err) {
    console.log(err);
  }
}

loadProducts();