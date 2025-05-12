const phrases = [
    document.getElementById("eddie1"),
    document.getElementById("venom1"),
    document.getElementById("eddie2"),
    document.getElementById("venom2"),
    document.getElementById("eddie3"),
    document.getElementById("venom3"),
    document.getElementById("eddie4"),
    document.getElementById("venom4"),
    document.getElementById("eddie5"),
  ];
  
  let index = 0;
  let canScroll = true;
  
  window.addEventListener("DOMContentLoaded", () => {
    phrases.forEach(phrase => {
      phrase.classList.remove("apparait");
      phrase.style.opacity = 0;
    });
  });
  
  window.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (!canScroll) return;
  
    const direction = event.deltaY;
  
    if (direction > 0 && index < phrases.length) {
      const current = phrases[index];
      current.classList.add("apparait");
      current.style.opacity = 1;
      index++;
    } 
    else if (direction < 0 && index > 0) {
      index--;
      const current = phrases[index];
      current.classList.remove("apparait");
      current.style.opacity = 0;
    }
  
    canScroll = false;
    setTimeout(() => canScroll = true, 400);
  }, { passive: false });
  