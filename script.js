document.addEventListener("DOMContentLoaded", () => {
    

    const typewriterElement = document.getElementById("typewriter");
    const phrases = [
        "Senior UX Designer",
        "Frontend Developer",
        "Backend Developer",
        "Problem Solver"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }
    type();


    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
       
                if (entry.target.id === 'about') {
                    const counters = document.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const updateCount = () => {
                            const count = +counter.innerText;
                            const inc = target / 50; // Speed
                            if (count < target) {
                                counter.innerText = Math.ceil(count + inc);
                                setTimeout(updateCount, 40);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                }
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));


    const modal = document.getElementById("impressum-modal");
    const btn = document.getElementById("open-impressum");
    const span = document.getElementsByClassName("close-btn")[0];

    btn.onclick = (e) => { e.preventDefault(); modal.style.display = "block"; }
    span.onclick = () => { modal.style.display = "none"; }
    window.onclick = (event) => { if (event.target == modal) { modal.style.display = "none"; } }


    const langSelect = document.getElementById("lang-switch");
    let currentLangData = {};

    async function loadLanguage(lang) {
        try {
            
            const response = await fetch('lang.json');
            const data = await response.json();
            currentLangData = data[lang];
            
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if(currentLangData[key]) {
                    if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
                        el.placeholder = currentLangData[key];
                    } else {
                        el.textContent = currentLangData[key];
                    }
                }
            });
            document.documentElement.lang = lang;
        } catch (error) {
            console.error("Error loading language JSON:", error);
        }
    }

    langSelect.addEventListener("change", (e) => {
        loadLanguage(e.target.value);
    });

   
    loadLanguage('de');
});
