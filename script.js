// Constantes
const O = document.querySelector('#O');
const texte = document.querySelector('#texte');
let mots = document.querySelectorAll('.venom span, #stayput'); // Ajoute #stayput dans les mots
const huh = document.querySelector('#huh');
const huh2 = document.querySelector('#huh2');
const stayput = document.querySelector('#stayput');
const target = document.querySelector('#target');

let p = 0;
let canScroll = true;
let serrureActivee = false;

// Redirection
let redirectionDéjàFaite = false;
let scrollCountAprèsFin = 0;
const seuilScrolls = 3;
const delaiRedirection = 500;

// Réinitialisation de la page, ajout de la classe cache
window.addEventListener("DOMContentLoaded", () => {
  mots.forEach(mot => mot.classList.add("cache"));
  huh2.classList.add("cache");
  stayput.classList.add("cache");
});

// Clic sur le O
O.addEventListener("click", function () {
  O.classList.toggle('flipped');

  if (O.classList.contains('flipped')) {
    serrureActivee = true;
    huh2.classList.remove('cache');
    huh2.classList.add('effet-cool');
  } else {
    serrureActivee = false;
    huh2.classList.remove('effet-cool');
    huh2.classList.add('cache');

    mots.forEach(mot => mot.classList.add("cache"));
    p = 0;
    stayput.classList.add("cache");
    scrollCountAprèsFin = 0;
    redirectionDéjàFaite = false;
  }
});

// Apparition des mots au scroll
window.addEventListener('wheel', (event) => {
  event.preventDefault();

  if (!canScroll) return;

  if (event.deltaY > 0) {
    if (p < mots.length) {
      const currentMot = mots[p];

      // Si stayput mais serrure verrouillée → on bloque
      if (currentMot.id === "stayput" && !serrureActivee) return;

      currentMot.classList.remove('cache');
      currentMot.classList.add('effet-cool');
      p++;

      if (currentMot.id === "stayput" && serrureActivee) {
        stayput.classList.remove('cache');
        stayput.classList.add('effet-cool');
      }

      scrollCountAprèsFin = 0; // Réinitialisation si on progresse normalement
    }
    else if (p >= mots.length && serrureActivee && !redirectionDéjàFaite) {
      scrollCountAprèsFin++;

      if (scrollCountAprèsFin >= seuilScrolls) {
        redirectionDéjàFaite = true;
        setTimeout(() => {
          window.location.href = "index2.html";
        }, delaiRedirection);
      }
    }
  }

  // Scroll vers le haut
  else if (event.deltaY < 0 && p > 0) {
    p--;
    const currentMot = mots[p];
    currentMot.classList.add('cache');
    currentMot.classList.remove('effet-cool');

    if (currentMot.id === "stayput") {
      stayput.classList.add('cache');
    }

    scrollCountAprèsFin = 0; // Réinitialise si on remonte
  }

  canScroll = false;
  setTimeout(() => { //temps de délai pour scroll
    canScroll = true;
  }, 250);
}, { passive: false });

// Cible souris = survole de stayput
stayput.addEventListener('mouseenter', () => {
  if (O.classList.contains('flipped')) {
    target.style.opacity = 1;
  }
});

stayput.addEventListener('mouseleave', () => { //disparition si hors du mot
  target.style.opacity = 0;
});

stayput.addEventListener('mousemove', (e) => {
  if (!O.classList.contains('flipped')) return;
  const offset = 15;
  target.style.left = (e.pageX + offset) + 'px'; //décalage du rond à la souris
  target.style.top = (e.pageY + offset) + 'px';
});
