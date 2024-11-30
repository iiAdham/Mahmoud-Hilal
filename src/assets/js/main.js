window.addEventListener('load', function() {
    const windowHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    app.style.setProperty('--screen-Height', windowHeight + 'px');
    const overlay = document.getElementById('loader-overlay');
    overlay.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  const navBtn = document.getElementById('navBtn');
  const overlay = document.getElementById('overlay');
  const closeOverlayBtn = document.getElementById('closeOverlay');

  // Unified function to toggle overlay display
  const toggleOverlay = () => {
      overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
  };

  // Add event listeners for both click and touchstart
  navBtn.addEventListener('click', toggleOverlay);
  navBtn.addEventListener('touchstart', toggleOverlay);

  const closeOverlay = () => {
      overlay.style.display = 'none';
  };

  closeOverlayBtn.addEventListener('click', closeOverlay);
  closeOverlayBtn.addEventListener('touchstart', closeOverlay);

  window.addEventListener('click', (e) => {
      if (e.target === overlay) {
          closeOverlay();
      }
  });

  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          closeOverlay();
      }
  });
});

const app = document.getElementById('app');

function moveGradient(event) {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const mouseX = Math.round((event.pageX / winWidth) * 100);
    const mouseY = Math.round((event.pageY / winHeight) * 100);

    app.style.setProperty('--mouse-x', mouseX + '%');
    app.style.setProperty('--mouse-y', mouseY + '%');
}

document.addEventListener('mousemove', moveGradient);
