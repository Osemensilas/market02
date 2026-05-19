const reviews = document.querySelectorAll(".review-card");
let index = 0;

function showNextReview() {
  reviews[index].classList.remove("active");

  index = (index + 1) % reviews.length;

  reviews[index].classList.add("active");
}

setInterval(showNextReview, 4000);