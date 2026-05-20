const elements = document.querySelectorAll('.hidden');
const counter = document.getElementById("counter");
const card = document.getElementById("counterCard");

let hasStarted = false;

// COUNTER ANIMATION
function animateCounter(end, duration) {
  let startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const eased = 1 - Math.pow(1 - progress, 3);

    const value = Math.floor(eased * end);
    counter.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = end;
    }
  }

  requestAnimationFrame(update);
}

// OBSERVER
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {

      // reveal animation
      entry.target.classList.add("show");

      // run counter ONLY ONCE
      if (!hasStarted && entry.target.id === "counterCard") {
        hasStarted = true;
        card.classList.add("show");
        animateCounter(4627, 1800);
      }
    }
  });
}, {
  threshold: 0.3
});

// observe elements correctly
elements.forEach((el) => observer.observe(el));
observer.observe(card);