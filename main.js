// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Gallery Modal
const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
const modalImage = document.getElementById('modalImage');
const modalCounter = document.querySelector('.modal-counter');
let currentImageIndex = 0;
const galleryImages = Array.from(document.querySelectorAll('[data-gallery-image]'));

function updateModalImage(index) {
  currentImageIndex = index;
  modalImage.src = galleryImages[index].src;
  modalCounter.textContent = `${index + 1} / ${galleryImages.length}`;
}

// Add click event to gallery images
galleryImages.forEach((image, index) => {
  image.addEventListener('click', () => {
    updateModalImage(index);
    galleryModal.show();
  });
});

// Navigation buttons
document.querySelector('.modal-nav-button.prev').addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateModalImage(currentImageIndex);
});

document.querySelector('.modal-nav-button.next').addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateModalImage(currentImageIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!galleryModal._isShown) return;
  
  if (e.key === 'ArrowRight') {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateModalImage(currentImageIndex);
  } else if (e.key === 'ArrowLeft') {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModalImage(currentImageIndex);
  } else if (e.key === 'Escape') {
    galleryModal.hide();
  }
});