tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            display: ['Syne', 'sans-serif'],
            body: ['DM Sans', 'sans-serif'],
          },
          colors: {
            purple: {
              400: '#c084fc',
              500: '#a855f7',
              600: '#9333ea',
              700: '#7e22ce',
            }
          }
        }
      }
    }

// ── Theme ──────────────────────────────────────────────
const body      = document.getElementById('body');
const sunIcon   = document.getElementById('sunIcon');
const moonIcon  = document.getElementById('moonIcon');
const toggle    = document.getElementById('themeToggle');

function applyTheme(theme) {
body.classList.remove('light','dark');
body.classList.add(theme);
if (theme === 'dark') {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
} else {
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
}
localStorage.setItem('theme', theme);
}

// System default
const saved = localStorage.getItem('theme');
if (saved) {
applyTheme(saved);
} else {
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(prefersDark ? 'dark' : 'light');
}

toggle.addEventListener('click', () => {
applyTheme(body.classList.contains('dark') ? 'light' : 'dark');
});

// ── Mobile Menu ────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
hamburger.classList.toggle('open');
mobileMenu.classList.toggle('hidden');
});
function closeMenu() {
hamburger.classList.remove('open');
mobileMenu.classList.add('hidden');
}

// ── Typewriter ─────────────────────────────────────────
const roles = ['Data Scientist', 'AI/ML Engineer', 'Python Developer'];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
const word = roles[ri];
tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

if (!deleting && ci > word.length) {
    deleting = true; setTimeout(type, 1600); return;
}
if (deleting && ci < 0) {
    deleting = false; ri = (ri + 1) % roles.length; ci = 0;
    setTimeout(type, 400); return;
}
setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 800);

// ── Active Nav on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
let current = '';
sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
});
navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
});
}, {passive: true});

// ── GSAP Animations ────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// Page load — hero
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from('#hero-badge',   { opacity:0, y:20, duration:0.7 })
.from('#hero-name',    { opacity:0, y:30, duration:0.7 }, '-=0.3')
.from('#hero-desc',    { opacity:0, y:20, duration:0.6 }, '-=0.4')
.from('#hero-btns',    { opacity:0, y:20, duration:0.6 }, '-=0.4')
.from('#hero-socials', { opacity:0, y:15, duration:0.5 }, '-=0.3')
.from('#hero-img',     { opacity:0, x:60, duration:0.9, ease:'power2.out' }, '-=0.8');

// Scroll-triggered fade-up for all .fade-up elements
gsap.utils.toArray('.fade-up').forEach(el => {
gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
    trigger: el,
    start: 'top 88%',
    toggleActions: 'play none none none'
    }
});
});
