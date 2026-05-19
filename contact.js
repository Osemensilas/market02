const contactForm = document.querySelector('.contact-form');
const sendBtn = document.querySelector('.message-btn');

contactForm.onsubmit = (e) => {
    e.preventDefault();
}

sendBtn.addEventListener('click', async function(e){

    let errorContainer = e.target.parentElement.children[0];
    let clientName = e.target.parentElement.children[1].value;
    let clientEmail = e.target.parentElement.children[2].value;
    let clientSubject = e.target.parentElement.children[3].value;
    let clientMessage = e.target.parentElement.children[4].value;

    let nameFormat = /^[a-zA-z|| ]+$/ 
    let emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!clientName || !clientEmail || !clientSubject || !clientMessage){
        errorContainer.innerText = "All fields required";
        errorContainer.classList.add("error");
        return;
    }

    if (clientName.length < 2){
        errorContainer.innerText = "Name should be atleast two characters";
        errorContainer.classList.add("error");
        return;
    }

    if (!nameFormat.test(clientName)){
        errorContainer.innerText = "Name should be letters only";
        errorContainer.classList.add("error");
        return;
    }

    if (!emailFormat.test(clientEmail)){
        errorContainer.innerText = "Invalid email address";
        errorContainer.classList.add("error");
        return;
    }

    errorContainer.innerText = "";
    errorContainer.classList.remove("error");

    try{
        const url = "http://localhost/backends/power/contact.php";

        const response = await axios.post(url, {
            fullname: clientName,
            email: clientEmail,
            subject: clientSubject,
            message: clientMessage
        }, {
            headers: {
                "Content-Type" : "application/json"
            },withCredentials: true
        })
        console.log(response.data);
    }catch(error){
        console.log("Error posting data: ", error);
        console.log(error.response);
    }
})