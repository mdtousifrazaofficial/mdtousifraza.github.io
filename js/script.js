document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.85)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for scroll animations (fade in)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation starting state to elements
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-item, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Certificate Filtering Logic
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            certCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Global Certificate Image Viewer Helper
let currentModalImageSrc = '';

function viewFullCertImage(url) {
    const targetUrl = url || currentModalImageSrc;
    if (!targetUrl) return;
    const encodedUrl = encodeURI(targetUrl);
    window.open(encodedUrl, '_blank');
}

// Certificate Lightbox Modal Functions
function openCertModal(imageSrc, title, issuer, date, credId, skillsStr) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalCertImg');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalIssuer = document.getElementById('modalCertIssuer');
    const modalDate = document.getElementById('modalCertDate');
    const modalId = document.getElementById('modalCertId');
    const modalSkills = document.getElementById('modalCertSkills');
    const modalDownload = document.getElementById('modalCertDownload');

    if (!modal) return;

    currentModalImageSrc = imageSrc;
    const encodedSrc = encodeURI(imageSrc);

    modalImg.src = imageSrc;
    modalTitle.textContent = title;
    modalIssuer.textContent = issuer;
    modalDate.textContent = date;
    modalId.textContent = credId;

    if (modalDownload) {
        modalDownload.href = encodedSrc;
        modalDownload.onclick = function(e) {
            e.preventDefault();
            viewFullCertImage(imageSrc);
        };
    }

    // Make modal image clickable to view full size too
    modalImg.onclick = function() {
        viewFullCertImage(imageSrc);
    };
    modalImg.style.cursor = 'pointer';
    modalImg.title = 'Click to open full size image';

    // Render skills pills
    if (modalSkills) {
        modalSkills.innerHTML = '';
        if (skillsStr) {
            const skills = skillsStr.split(',').map(s => s.trim());
            skills.forEach(skill => {
                const pill = document.createElement('span');
                pill.className = 'skill-pill';
                pill.textContent = skill;
                modalSkills.appendChild(pill);
            });
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal(e) {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
    }
});
