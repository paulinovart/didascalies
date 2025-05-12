const stayput = document.querySelector('#stayput');
const dot = document.querySelector('#mouse-dot');

// Quand la souris entre dans stayput, on montre le point
stayput.addEventListener('mouseenter', () => {
  dot.style.opacity = 1;
});

// Quand la souris quitte stayput, on cache le point
stayput.addEventListener('mouseleave', () => {
  dot.style.opacity = 0;
});

// Quand la souris bouge dans stayput, on déplace le point
stayput.addEventListener('mousemove', (e) => {
  const offset = 15; // Décalage pour que le point ne soit pas sous la souris
  dot.style.left = (e.pageX + offset) + 'px';
  dot.style.top = (e.pageY + offset) + 'px';
});
