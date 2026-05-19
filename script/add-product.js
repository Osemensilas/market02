const productsForm = document.querySelector('.product-form');
const submitBtn = document.querySelector('.submit-btn');
const logout = document.querySelector('.logout-btn');

productsForm.onsubmit = (e) => {
    e.preventDefault();
}

submitBtn.addEventListener('click', async function(e){

    let errorContainer = e.target.parentElement.children[0];
    const product = e.target.parentElement.children[1].children[1].value;
    const price = e.target.parentElement.children[2].children[1].value;
    const category = e.target.parentElement.children[3].children[1].value;
    const image = document.getElementById('imageInput').files[0];
    const description = e.target.parentElement.children[5].children[1].value;

    let priceFormat = /^[0-9]+$/;
    let allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!product || !price || !category || !description || !image){
        errorContainer.innerText = "All fields required";
        errorContainer.classList.add("error");
        return;
    }

    if (!priceFormat.test(price)){
        errorContainer.innerText = "Invalid Price";
        errorContainer.classList.add("error");
        return;
    }

    if (!allowedTypes.includes(image.type)){
        errorContainer.innerText = "Invalid Image Type";
        errorContainer.classList.add("error");
        return;
    }

    errorContainer.innerText = "";
    errorContainer.classList.remove("error");

    const formData = new FormData();
    formData.append("product", product);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("description", description);

    try{
        const url = "http://localhost/backends/power/add-product.php";

        const response = await axios.post(url, formData, {
            withCredentials: true
        })
        console.log(response.data);
        if (response.data.status === "error"){
            errorContainer.innerText = response.data.message;
            errorContainer.classList.add("error");
            return;
        }

        if (response.data.status === "success"){
            alert("Product added successfully");
        }
    }catch(error){
        console.log("Error posting data: ", error);
        console.log(error.response);
    }
})

logout.addEventListener('click', async function(){
    const url = "http://localhost/backends/power/logout.php";

    const response = await axios.get(url, {
        headers: {
            "Content-Type" : "application/json"
        },withCredentials: true
    })
    if (response.data.status === "success"){
        window.location = "/frontend/protection/home.html";
    }
})