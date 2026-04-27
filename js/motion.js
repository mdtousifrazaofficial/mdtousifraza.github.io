document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation via IntersectionObserver
    const reveals = document.querySelectorAll('.reveal, .hero-visual');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add active class to trigger CSS transition
            entry.target.classList.add('active');
            
            // Stop observing once revealed to prevent re-animating
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 2. Navbar Glassmorphism Effect on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Terminal Typing Effect for Hero Name
    const typeTarget = document.querySelector('.typing-text');
    if (typeTarget) {
        const textToType = typeTarget.getAttribute('data-text');
        typeTarget.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < textToType.length) {
                typeTarget.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, Math.random() * 50 + 30); // Random delay 30-80ms
            } else {
                typeTarget.innerHTML += '<span class="blink" style="color: var(--accent-primary)">_</span>';
            }
        }
        
        setTimeout(typeWriter, 800); // Start typing after reveal animation
    }

    // 4. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
