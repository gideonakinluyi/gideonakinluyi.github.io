// NAV SCROLL
const nav = document.querySelector('.nav');
const mobileMenu = document.querySelector('.nav__mobile');
const hamburger = document.querySelector('.nav__hamburger');

if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// ACTIVE NAV LINK
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const allNavLinks = document.querySelectorAll('.nav__links a, .nav__mobile a');
allNavLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (
    (href === currentPage) ||
    (currentPage === '' && href === 'index.html') ||
    (currentPage === 'index.html' && href === 'index.html')
  ) {
    link.classList.add('active');
  }
});

// FADE IN ON SCROLL
// Uses a small rootMargin so elements near the top of the page
// still trigger even when threshold alone would miss them on load.
function initFadeIn() {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  fadeEls.forEach(el => observer.observe(el));
}

// Fire immediately if DOM is ready, otherwise wait for it
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFadeIn);
} else {
  initFadeIn();
}

// MODAL SYSTEM
const artworks = {
  art1: {
    image: 'images/art1.jpg',
    label: 'Acrylic on Canvas · 91.44 x 121.92 cm',
    title: 'A Bouquet of Reflection',
    tagline: 'Time is moving. Beauty remains.',
    subtitle: 'A moment where time slows and what truly matters becomes visible.',
    description: 'This painting shows a young girl holding a bouquet of bright red roses, symbols of love, care, and beauty. Behind her, a chess clock ticks, reminding us that time never stops. Even though time is passing, the girl looks calm and thoughtful, as if she knows how important it is to enjoy the beautiful moments in life. The roses she holds show the things we hold dear, love, friendship, and happiness, that can still bloom even when time seems to be running out.',
    status: 'This work is currently available, with ongoing private interest.',
    oof: 'One of one. No reproduction will ever exist. Once acquired, it leaves the collection permanently.'
  },
  art2: {
    image: 'images/art2.jpg',
    label: 'Acrylic on Canvas · 121.92 x 121.92 cm',
    title: 'Timeless Elegance',
    tagline: 'Grace and wisdom across time.',
    subtitle: 'Strength, grace, and wisdom shaped through experience.',
    description: 'A man and woman sit together, dressed in elegant clothes from a different time. Their posture radiates confidence and strength, the calm of those who have weathered much and remained wise. The chessboard on the wall suggests a life of careful, deliberate decisions. White roses on the table remind us that even in life\'s hardest moments, beauty and peace are always possible.',
    status: 'This work is currently available, with ongoing private interest.',
    oof: 'One of one. No reproduction will ever exist. Once acquired, it leaves the collection permanently.'
  },
  art3: {
    image: 'images/art3.jpg',
    label: 'Acrylic on Canvas · 50.60 x 61.50 cm',
    title: 'Bound by Love, Moved by Purpose',
    tagline: 'The strongest move is made together.',
    subtitle: 'Where unity becomes the strongest move.',
    description: 'In a world full of choices, two souls stand united, embodying the power of love and purpose. Their expressions reveal strength and shared vision. The chessboard guiding their journey represents the careful moves we make in life, while their connection symbolises that the strongest moves are always made in unity.',
    status: 'This work is currently available, with ongoing private interest.',
    oof: 'One of one. No reproduction will ever exist. Once acquired, it leaves the collection permanently.'
  },
  art4: {
    image: 'images/art4.jpg',
    label: 'Acrylic on Canvas · 91.44 x 121.92 cm',
    title: 'Contemplation in Silence',
    tagline: 'Every great move begins in silence.',
    subtitle: 'The weight and power behind quiet decisions.',
    description: 'A young man sits quietly in deep thought, wearing a white shirt and dark trousers, with pink roses resting at his side. Above him, a chessboard displays its pieces, a powerful symbol of life\'s most difficult decisions. Just as in chess, every move we make has weight and consequence. The roses beside him remind us that even amid challenge and strategy, life also holds beauty, softness, and love.',
    status: 'This work is currently available, with ongoing private interest.',
    oof: 'One of one. No reproduction will ever exist. Once acquired, it leaves the collection permanently.'
  },
  art5: {
    image: 'images/art5.jpg',
    label: 'Acrylic on Canvas · 60.4 x 94.7 cm',
    title: 'Future Moves, Innocence and Possibility',
    tagline: 'Greatness starts with a single step.',
    subtitle: 'The beginning of possibility and unseen paths.',
    description: 'A young boy wears a chessboard patterned hat, his eyes full of wonder and quiet determination. His future is still unwritten, every move ahead of him waiting to be made. Like a chess game at its very beginning, each step he takes will shape the journey ahead. This painting captures the magic of childhood, where innocence and possibility meet.',
    status: 'This work is currently available, with ongoing private interest.',
    oof: 'One of one. No reproduction will ever exist. Once acquired, it leaves the collection permanently.'
  },
  art6: {
    image: 'images/art6.jpg',
    label: 'Acrylic on Canvas · 41.00 x 55.00 cm',
    title: 'The Heart That Speaks',
    tagline: 'The simplest gestures speak the loudest.',
    subtitle: 'Love expressed in its simplest and purest form.',
    description: 'A loyal companion stands with a bouquet of roses, symbols of love, care, and devotion. The eyes speak of silent promises, and the roses remind us that the simplest gestures hold the greatest meaning. Much like a well played game of chess, loyalty and love are built on thoughtful moves and deep connection. This artwork captures the beauty of quiet moments that speak louder than words.',
    status: 'This work is currently available, with ongoing private interest.',
    oof: 'One of one. No reproduction will ever exist. Once acquired, it leaves the collection permanently.'
  }
};

function openModal(key) {
  const data = artworks[key];
  if (!data) return;

  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  overlay.querySelector('.modal__img').src = data.image;
  overlay.querySelector('.modal__img').alt = data.title;
  overlay.querySelector('.modal__label').textContent = data.label;
  overlay.querySelector('.modal__title').textContent = data.title;
  overlay.querySelector('.modal__tagline').textContent = data.tagline;
  overlay.querySelector('.modal__subtitle').textContent = data.subtitle;
  overlay.querySelector('.modal__description').textContent = data.description;
  overlay.querySelector('.modal__status').innerHTML = data.status + '<br><span>' + data.oof + '</span>';

  const waLink = overlay.querySelector('.modal__wa');
  if (waLink) {
    waLink.href = 'https://wa.me/2347062094974?text=Hello%20Gideon%2C%20I%20came%20across%20your%20work%20and%20one%20piece%20stayed%20with%20me.%20I%20would%20like%20to%20know%20more%20about%20its%20availability.';
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const closeBtn = document.querySelector('.modal__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Art card clicks
  const artCards = document.querySelectorAll('[data-artwork]');
  artCards.forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.dataset.artwork);
    });
  });
});
