const galleryImages = [
  {
    thumb: "img/store-front.webp",
    large: "img/large/store-front.webp",
    alt: "Kainaliu Fresh Store Front",
  },
  {
    thumb: "img/produce.webp",
    large: "img/large/produce.webp",
    alt: "Fresh Local Produce at Kainaliu Fresh",
  },
  {
    thumb: "img/interior.webp",
    large: "img/large/interior.webp",
    alt: "Kainaliu Fresh Store Interior",
  },
  {
    thumb: "img/produce-2.webp",
    large: "img/large/produce-2.webp",
    alt: "Fresh Local Vegetables",
  },
  {
    thumb: "img/produce-3.webp",
    large: "img/large/produce-3.webp",
    alt: "Local Tropical Fruits",
  },
  {
    thumb: "img/produce-4.webp",
    large: "img/large/produce-4.webp",
    alt: "Fresh Island Mushrooms",
  },
];

let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let modalImage = null;

function initializeModal() {
  modalImage = document.getElementById("modalImage");
  const modal = document.getElementById("imageModal");

  // Touch event listeners
  modal.addEventListener("touchstart", handleTouchStart, { passive: true });
  modal.addEventListener("touchend", handleTouchEnd, { passive: true });
  modal.addEventListener("touchmove", handleTouchMove, { passive: false });
}

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e) {
  // Prevent default only if we're in the modal
  if (!document.getElementById("imageModal").classList.contains("hidden")) {
    e.preventDefault();
  }
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].clientX;
  const swipeDistance = touchEndX - touchStartX;
  const minSwipeDistance = 50; // minimum distance for swipe

  if (Math.abs(swipeDistance) >= minSwipeDistance) {
    if (swipeDistance > 0) {
      // Swipe right -> previous image
      navigateImage(-1);
    } else {
      // Swipe left -> next image
      navigateImage(1);
    }
  }
}

function showLoading() {
  document.getElementById("loadingSpinner").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loadingSpinner").classList.add("hidden");
}

function openModal(imageSrc, imageAlt) {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("hidden");
  currentImageIndex = galleryImages.findIndex((img) => img.large === imageSrc);
  showLoading();
  updateModalImage();
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function navigateImage(direction) {
  showLoading();
  currentImageIndex =
    (currentImageIndex + direction + galleryImages.length) %
    galleryImages.length;
  updateModalImage();
}

function updateModalImage() {
  const modalImage = document.getElementById("modalImage");
  const currentImage = galleryImages[currentImageIndex];

  modalImage.onload = () => {
    hideLoading();
  };

  modalImage.onerror = () => {
    console.error("Error loading image:", currentImage.large);
    hideLoading();
  };

  modalImage.src = currentImage.large;
  modalImage.alt = currentImage.alt;
}

// Initialize modal when the page loads
document.addEventListener("DOMContentLoaded", initializeModal);
