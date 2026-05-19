const elements = document.querySelectorAll('.hidden');
const counter = document.getElementById("counter");
const card = document.getElementById("counterCard");

let hasStarted = false;

function animateCounter(end, duration) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easing (smooth acceleration + slow end)
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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.classList.add("show");
            card.classList.add("show");
            animateCounter(4627, 1800);
        }
    });
});

elements.forEach((element) => {
    observer.observe(element, card);
});