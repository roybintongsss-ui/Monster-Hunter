// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
  });
});

// Quest progress tracker
const checkboxes = document.querySelectorAll('.quest-cb');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');

function updateProgress() {
  const total = checkboxes.length;
  const checked = document.querySelectorAll('.quest-cb:checked').length;
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
  if (progressFill) progressFill.style.width = percent + '%';
  if (progressPercent) progressPercent.textContent = percent + '%';
}

checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));

// Monster filter
const filterBtns = document.querySelectorAll('.filter-btn');
const monsterCards = document.querySelectorAll('.monster-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    monsterCards.forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Monster detail toggle
function toggleMonsterDetail(btn) {
  const detail = btn.nextElementSibling;
  if (detail) {
    detail.classList.toggle('show');
    btn.textContent = detail.classList.contains('show') ? '收起 ▲' : '查看打法 →';
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Animate elements on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.nav-card, .tip-card, .map-card, .quest-item, .monster-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});