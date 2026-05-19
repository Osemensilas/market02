const elements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            console.log(entry.target);
            entry.target.classList.add("show");
        }
    });
});

elements.forEach((element) => {
    observer.observe(element);
});