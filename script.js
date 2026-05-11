document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Navigation Shrink on Scroll
    const header = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "5px 0";
        } else {
            header.style.padding = "15px 0";
        }
    });

    // 2. Lightbox Functionality for Portfolio
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const galleryImages = document.querySelectorAll(".gallery-img");

    // Open lightbox
    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
        });
    });

    // Close lightbox
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });

    // 3. Simple Form Submission Alert (Placeholder)
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
    });
});
