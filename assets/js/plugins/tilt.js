/**
 * GRITLINE AGGREGATES — 3D Perspective Card Tilt Engine (tilt.js)
 * Applies pointer-tracked 3D rotation, translateZ inner lift, and dynamic glare layer
 * to all .card elements. Automatically disabled on touch devices and prefers-reduced-motion.
 */

export function initTiltCards() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (prefersReducedMotion || isTouchDevice) {
    return;
  }

  const cards = document.querySelectorAll('.card');
  const maxTiltDeg = 7;

  cards.forEach((card) => {
    let glare = card.querySelector('.card__glare');
    if (!glare) {
      glare = document.createElement('span');
      glare.className = 'card__glare';
      glare.setAttribute('aria-hidden', 'true');
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (((y - centerY) / centerY) * -maxTiltDeg).toFixed(2);
      const rotateY = (((x - centerX) / centerX) * maxTiltDeg).toFixed(2);

      const percentX = Math.round((x / rect.width) * 100);
      const percentY = Math.round((y / rect.height) * 100);

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(251, 246, 236, 0.34), transparent 65%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

