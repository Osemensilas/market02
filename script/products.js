const buttons = document.querySelectorAll(".tab-btn");

const productsContainer = document.getElementById(
    "products-container"
);

/* FETCH PRODUCTS */
async function fetchProducts(category){

    try{

        const response = await axios.get(
            `http://localhost/backends/power/get-product.php?category=${category}`
        );

        const products = response.data;

        console.log(response.data);

        productsContainer.innerHTML = "";

        /* NO PRODUCTS */
        if(products.length === 0){
            productsContainer.innerHTML = `
                <div class="empty-products">
                    <h3>
                        No products found
                    </h3>
                </div>
            `;
            return;
        }
        /* DISPLAY PRODUCTS */
        products.forEach(product => {
            productsContainer.innerHTML += `
                <div class="product-card">
                    <img 
                        src="http://localhost/backends/power/${product.image}" 
                        alt="${product.name}"
                    >
                    <div class="product-info">
                        <h3>
                            ${product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                        </h3>
                        <p class="description">
                            ${product.description}
                        </p>
                        <p class="price">
                            $${product.price}
                        </p>
                    </div>

                </div>

            `;

        });

    }catch(error){

        console.log(
            "Error fetching products:",
            error
        );

    }

}

/* BUTTON CLICK EVENTS */
buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.getAttribute(
            "data-category"
        );

        fetchProducts(category);

    });

});

/* DEFAULT LOAD */
fetchProducts("electronics");