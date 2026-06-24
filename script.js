tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        background: 'rgb(var(--background-rgb, 255 255 255))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
      }
    }
  }
}

// Ensure background color variables are also available for opacity transitions if needed
function updateRgbVariables() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  if (isDark) {
    root.style.setProperty('--background-rgb', '11 11 18');
  } else {
    root.style.setProperty('--background-rgb', '248 247 255');
  }
}

// ── Theme ──────────────────────────────────────────────
const body      = document.getElementById('body');
const sunIcon   = document.getElementById('sunIcon');
const moonIcon  = document.getElementById('moonIcon');
const toggle    = document.getElementById('themeToggle');

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  body.classList.remove('light', 'dark');
  
  root.classList.add(theme);
  body.classList.add(theme);
  
  if (theme === 'dark') {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
  }
  localStorage.setItem('theme', theme);
  updateRgbVariables();
}

// System default or stored theme
const saved = localStorage.getItem('theme');
if (saved) {
  applyTheme(saved);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

toggle.addEventListener('click', () => {
  const root = document.documentElement;
  const isCurrentlyDark = root.classList.contains('dark');
  applyTheme(isCurrentlyDark ? 'light' : 'dark');
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
const roles = ['AI Engineer', 'Data Scientist', 'Python Developer'];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const word = roles[ri];
  tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

  if (!deleting && ci > word.length) {
    deleting = true;
    setTimeout(type, 1600);
    return;
  }
  if (deleting && ci < 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
    ci = 0;
    setTimeout(type, 400);
    return;
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 800);

// ── Smooth Scroll on click (JS scroll to keep URL clean) ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      closeMenu();
    }
  });
});

// ── Active Nav on scroll ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    // For styling the active state, we can toggle border/color classes
    if (l.getAttribute('href') === '#' + current) {
      l.classList.add('active');
    }
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
  .from('#hero-img',     { opacity:0, scale:0.9, duration:0.9, ease:'power2.out' }, '-=0.8');

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
