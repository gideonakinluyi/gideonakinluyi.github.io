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
  mobileMenu.id = 'mobileMenu';
  hamburger.setAttribute('aria-controls', 'mobileMenu');
  hamburger.setAttribute('aria-expanded', 'false');
  const setMenu = (open) => {
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  };

  hamburger.addEventListener('click', () => {
    setMenu(!mobileMenu.classList.contains('open'));
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      setMenu(false);
      hamburger.focus();
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
  },
  art7: {
    image: 'images/art7.jpg',
    alt: "The Keeper of Innocence, oil and acrylic painting by Gideon Akinluyi of a man holding a sleeping puppy beneath a flowering arch",
    label: 'Oil and Acrylic · 91.44 x 121.92 cm · 2025',
    title: 'The Keeper of Innocence',
    tagline: 'Some things are worth protecting before the world can take them away.',
    subtitle: 'Innocence is fragile, but the instinct to protect it can be enduring.',
    description: [
      "The Keeper of Innocence portrays a quiet moment of tenderness between a man and a young puppy held securely in his arms. His expression carries a sense of calm and watchfulness, while the sleeping animal rests against him with complete trust. The relationship between the two figures creates an intimate image of protection, care, and vulnerability.",
      "The patterned garment surrounding the man introduces another layer of visual richness, with its leaves and yellow forms creating a connection between the figure and the natural world. Around him, flowers, butterflies, greenery, and the gentle outdoor setting create an atmosphere of growth and possibility.",
      "The sleeping puppy becomes the emotional centre of the work. Its vulnerability contrasts with the man's composed presence, suggesting the responsibility that comes with protecting something innocent and dependent. The butterfly resting near the foreground adds another quiet symbol of transformation, reminding us that innocence is not permanent, but a precious stage of life that deserves to be valued.",
      "The work reflects on the human instinct to protect what is vulnerable. It asks us to consider what we carry, what we shelter, and what responsibilities we accept when another life places its trust in us.",
      "The Keeper of Innocence is a reflection on tenderness, protection, trust, and the quiet responsibility of preserving what is still untouched by the world's harshness."
    ],
    status: 'This work is currently available, with ongoing private interest.',
    oof: 'One of one. No reproduction will ever exist. Once acquired, it leaves the collection permanently.'
  },
  art8: {
    image: 'images/art8.jpg',
    alt: "The Heart Makes Its Move, acrylic painting by Gideon Akinluyi of a woman with a red rose, wrapped in yellow and green drapery before a chessboard pattern",
    label: 'Acrylic on Canvas · 121.92 x 121.92 cm · 2026',
    title: 'The Heart Makes Its Move',
    tagline: 'When emotion becomes the next move.',
    subtitle: 'Sometimes the most difficult decisions are made quietly, where strategy meets feeling.',
    description: [
      "The Heart Makes Its Move captures a woman in a moment of quiet emotional reflection, her gaze turned away from the viewer as though considering something beyond the immediate moment. Her hand rests gently across her chest, creating an intimate gesture of feeling, restraint, vulnerability, and contemplation. A vivid red rose rests against her chest, introducing love, beauty, tenderness, and the emotions that often influence the choices we make.",
      "The chessboard pattern woven through the composition is central to the work. It extends beyond decoration and becomes a visual language for life itself. Like a chessboard, life presents us with possibilities, risks, sacrifices, unexpected turns, and decisions whose consequences may only become clear later. Every move changes the position of the next.",
      "Her flowing yellow and green drapery adds warmth, movement, and richness to the composition. The fabric surrounds her with a sense of protection while its earthy tones contrast with the deeper tones of her skin and the striking red of the rose. The movement of the fabric creates a feeling of life continuing around an otherwise still and contemplative figure.",
      "Her sideways gaze is perhaps the most intriguing element. She does not look directly at the viewer. Instead, she appears absorbed in something beyond the frame, leaving us to wonder what she is thinking, what she has experienced, and what move she is preparing to make.",
      "At the heart of the painting is a question that extends beyond the individual figure: when life places us before difficult choices, do we follow strategy, emotion, or both?",
      "The Heart Makes Its Move belongs to Gideon Akinluyi's ongoing exploration of The Chessboard of Life, where chess becomes a metaphor for human experience, decision making, relationships, consequence, vulnerability, and the uncertain journey toward becoming who we are meant to be.",
      "Sometimes the most important move is not the one we make on the board, but the one we make within ourselves."
    ],
    status: 'This work is currently available, with ongoing private interest.',
    oof: 'One of one. No reproduction will ever exist. Once acquired, it leaves the collection permanently.'
  }
};

let lastFocus = null;

function openModal(key) {
  const data = artworks[key];
  if (!data) return;

  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  overlay.querySelector('.modal__img').src = data.image;
  overlay.querySelector('.modal__img').alt = data.alt || data.title;
  overlay.querySelector('.modal__label').textContent = data.label;
  overlay.querySelector('.modal__title').textContent = data.title;
  overlay.querySelector('.modal__tagline').textContent = data.tagline;
  overlay.querySelector('.modal__subtitle').textContent = data.subtitle;
  // Description may be a single string (art1-art6) or an array of paragraphs (art7+)
  const paras = Array.isArray(data.description) ? data.description : [data.description];
  const descEl = overlay.querySelector('.modal__description');
  overlay.querySelectorAll('.modal__description--extra').forEach(el => el.remove());
  descEl.textContent = paras[0];
  let anchor = descEl;
  paras.slice(1).forEach(text => {
    const p = document.createElement('p');
    p.className = 'modal__description modal__description--extra';
    p.textContent = text;
    anchor.after(p);
    anchor = p;
  });
  overlay.querySelector('.modal__status').innerHTML = data.status + '<br><span>' + data.oof + '</span>';

  const waLink = overlay.querySelector('.modal__wa');
  if (waLink) {
    waLink.href = 'https://wa.me/2347062094974?text=Hello%20Gideon%2C%20I%20came%20across%20your%20work%20and%20one%20piece%20stayed%20with%20me.%20I%20would%20like%20to%20know%20more%20about%20its%20availability.';
  }

  lastFocus = document.activeElement;
  const modalBox = overlay.querySelector('.modal');
  if (modalBox) modalBox.scrollTop = 0;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  const closeBtn = overlay.querySelector('.modal__close');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    const modalTitle = overlay.querySelector('.modal__title');
    if (modalTitle) {
      modalTitle.id = 'modalTitle';
      overlay.setAttribute('aria-labelledby', 'modalTitle');
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    // Keep keyboard focus inside the open modal
    if (e.key === 'Tab' && overlay && overlay.classList.contains('open')) {
      const f = Array.from(overlay.querySelectorAll('button, a[href]'));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (!overlay.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  const closeBtn = document.querySelector('.modal__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Art card clicks
  const artCards = document.querySelectorAll('[data-artwork]');
  artCards.forEach(card => {
    const art = artworks[card.dataset.artwork];
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    if (art) card.setAttribute('aria-label', 'View ' + art.title);
    card.addEventListener('click', () => {
      openModal(card.dataset.artwork);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.artwork);
      }
    });
  });
});
