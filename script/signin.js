const signInForm = document.querySelector('.signin-main-form');
const submitBtn = document.querySelector('.submitBtn');

signInForm.onsubmit = (e) => {
    e.preventDefault();
}

submitBtn.addEventListener('click', async function(e){

    let errorContainer = e.target.parentElement.children[0];
    const email = e.target.parentElement.children[1].children[1].value;
    const password = e.target.parentElement.children[2].children[1].value;

    let emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password){
        errorContainer.innerText = "All fields required";
        errorContainer.classList.add("error");
        return;
    }

    if (!emailFormat.test(email)){
        errorContainer.innerText = "Invalid email address";
        errorContainer.classList.add("error");
        return;
    }

    errorContainer.innerText = "";
    errorContainer.classList.remove("error");

    try{
        const url = "http://localhost/backends/power/sign-in.php";

        const response = await axios.post(url, {
            email: email,
            password: password
        }, {
            headers: {
                "Content-Type" : "application/json"
            },withCredentials: true
        })

        if (response.data.status === "error"){
            errorContainer.innerText = response.data.message;
            errorContainer.classList.add("error");
            return;
        }

        if (response.data.status === "success"){
            errorContainer.innerText = "";
            errorContainer.classList.remove("error");
            
            window.location = '/frontend/protection/admin/add-product.html';
        }
    }catch(error){
        console.log("Error posting data: ", error);
        console.log(error.response);
    }
})