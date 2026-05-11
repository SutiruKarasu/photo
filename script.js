document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LANGUAGE SWITCHER LOGIC ---
    let translations = {};
    const langSwitch = document.getElementById("lang-switch");

    // Fetch the JSON file
    fetch('lang.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            translations = data;
            
            // Check if user has a saved language preference in their browser
            const savedLang = localStorage.getItem('selectedLang');
            if(savedLang && translations[savedLang]) {
                langSwitch.value = savedLang;
                updateLanguage(savedLang);
            } else {
                // Default is English
                updateLanguage('en');
            }
        })
        .catch(error => console.error('Error loading lang.json:', error));

    // Function to replace text on the screen
    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(translations[lang] && translations[lang][key]) {
                // If the element is an input or textarea, change the placeholder instead of the text
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        
        // Update HTML lang attribute for SEO
        document.documentElement.lang = lang;
        // Save choice to localStorage so it remembers the user next time
        localStorage.setItem('selectedLang', lang);
    }

    // Listen for dropdown changes
    langSwitch.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });


    // --- 2. NAVIGATION SHRINK ON SCROLL ---
    const header = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "5px 0";
        } else {
            header.style.padding = "15px 0";
        }
    });


    // --- 3. LIGHTBOX FUNCTIONALITY ---
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");
    const galleryImages = document.querySelectorAll(".gallery-img");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });

    // --- 4. FORM SUBMISSION ---
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Message sent! (Note: Connect this to a backend like Formspree to receive real emails)");
        contactForm.reset();
    });
});
