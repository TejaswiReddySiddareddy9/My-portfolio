// Dark Mode Toggle
const toggle = document.getElementById("dark-toggle");
const htmlEl = document.documentElement;

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    htmlEl.setAttribute("data-theme", "dark");
    toggle.setAttribute("aria-checked", "true");
  } else {
    htmlEl.setAttribute("data-theme", "light");
    toggle.setAttribute("aria-checked", "false");
  }
});

// Hamburger Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");

  const expanded = hamburger.classList.contains("active");
  hamburger.setAttribute("aria-expanded", expanded.toString());
});

// Navbar shadow on scroll
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Initialize AOS
AOS.init({
  duration: 900,
  easing: "ease-out-cubic",
  once: true,
  offset: 100,
});

// Custom Cursor Logic
const cursor = document.getElementById("cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const interactiveElements = document.querySelectorAll(
  "a, button, .nav-link, .hamburger"
);

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hover");
  });
});

// 3D tilt for project cards
const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside the element
    const y = e.clientY - rect.top; // y position inside the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    const maxRotate = 12;

    const rotateX = deltaY * maxRotate * -1;
    const rotateY = deltaX * maxRotate;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});
const cube = document.getElementById('cube');
const container = document.getElementById('cube-container');

let isDragging = false;
let lastX, lastY;
let rotationX = 15; // start rotation X (match CSS animation)
let rotationY = 0;
let animationId = null;

// Stop auto animation while dragging
function stopAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

// Start auto animation again after drag ends
function startAnimation() {
  let angle = 0;
  function animate() {
    if (!isDragging) {
      angle += 0.3;
      rotationY = angle;
      cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
    animationId = requestAnimationFrame(animate);
  }
  animate();
}

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  stopAnimation();
});

container.addEventListener('mouseup', () => {
  isDragging = false;
  startAnimation();
});

container.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    startAnimation();
  }
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;
  rotationY += deltaX * 0.5;
  rotationX += deltaY * 0.5;
  rotationX = Math.min(Math.max(rotationX, -90), 90);
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  lastX = e.clientX;
  lastY = e.clientY;
});

// Touch support
container.addEventListener('touchstart', (e) => {
  isDragging = true;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
  stopAnimation();
});

container.addEventListener('touchend', () => {
  isDragging = false;
  startAnimation();
});

container.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - lastX;
  const deltaY = e.touches[0].clientY - lastY;
  rotationY += deltaX * 0.5;
  rotationX += deltaY * 0.5;
  rotationX = Math.min(Math.max(rotationX, -90), 90);
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
});

// Start the auto rotation animation
startAnimation();

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (!isTouchDevice) {
  const cursor = document.querySelector('.custom-cursor');

  document.addEventListener('mousemove', (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  });

  // Show/hide logic if needed
  cursor.style.display = 'block';
} else {
  // Hide on mobile
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) cursor.style.display = 'none';
}

