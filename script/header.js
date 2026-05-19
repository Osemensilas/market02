const navContainers = document.querySelectorAll(".nav-item");
const hamburger = document.querySelector('.hamburger-container');
const navContainer = document.querySelector('.header-right');

for (let i = 0; i < navContainers.length; i++){

    let navContainer = navContainers[0];

    if (window.location.pathname == "/home.html"){
        navContainers[0].children[0].classList.add("active");
        navContainers[0].children[1].classList.add("active")
    }else{
        if (window.location.pathname === "/products.html"){
            navContainers[1].children[0].classList.add("active");
            navContainers[1].children[1].classList.add("active")
        }else{
            if (window.location.pathname === "/about-us.html"){
                navContainers[2].children[0].classList.add("active");
                navContainers[2].children[1].classList.add("active")
            }else{
                if (window.location.pathname === "/contact-us.html"){
                    navContainers[3].children[0].classList.add("active");
                    navContainers[3].children[1].classList.add("active");
                }else{
                    navContainer.children[0].classList.remove("active");
                    navContainer.children[1].classList.remove("active")
                }
            }
        }
    }
}

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle('active');
    hamburger.children[0].classList.toggle("active");
    navContainer.classList.toggle('active');
})