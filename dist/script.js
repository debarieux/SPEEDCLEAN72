"use strict";
// src/script.ts
document.addEventListener('DOMContentLoaded', () => {
    // Création de la flèche de retour en haut (mobile + desktop)
    const backToTop = document.createElement('button');
    backToTop.className = 'fixed bottom-6 right-6 z-50 p-3 bg-accent/90 hover:bg-accent text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2';
    backToTop.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4l-8 8h5v8h6v-8h5z"/>
        </svg>
    `;
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(backToTop);
    // Style responsive
    function updateBackToTopStyle() {
        if (window.innerWidth < 768) {
            backToTop.className = 'fixed bottom-6 right-6 z-50 p-3 bg-accent/90 hover:bg-accent text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2';
            backToTop.style.width = '48px';
            backToTop.style.height = '48px';
        }
        else {
            backToTop.className = 'fixed bottom-6 right-6 z-50 p-2 bg-accent/80 hover:bg-accent text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2';
            backToTop.style.width = '40px';
            backToTop.style.height = '40px';
        }
    }
    // Initial call + resize listener
    updateBackToTopStyle();
    window.addEventListener('resize', updateBackToTopStyle);
    // Vérification du chargement des styles
    console.log('Styles chargés:', {
        bubbles: document.querySelector('link[href*="bubbles.css"]') ? 'OK' : 'MANQUANT',
        style: document.querySelector('link[href*="style.css"]') ? 'OK' : 'MANQUANT'
    });
    // Fonction pour générer les bulles dans la section CTA
    function createBubbles() {
        const ctaSection = document.querySelector('.cta-section');
        if (!ctaSection)
            return;
        // Créer 20 bulles supplémentaires
        for (let i = 0; i < 20; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            // Choisir une animation aléatoire
            const animations = ['bubble-slow', 'bubble-medium', 'bubble-fast', 'bubble-sway', 'bubble-pop'];
            const randomAnim = animations[Math.floor(Math.random() * animations.length)];
            bubble.classList.add(randomAnim);
            // Position et taille aléatoires
            const size = Math.random() * 30 + 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.bottom = `-${size}px`;
            // Délai d'animation aléatoire
            bubble.style.animationDelay = `${Math.random() * 20}s`;
            ctaSection.appendChild(bubble);
        }
    }
    createBubbles(); // Call it directly inside DOMContentLoaded
    // Animation d'apparition au défilement
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));
    // Gestion du menu burger
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isCurrentlyOpen = !mobileMenu.classList.contains('hidden');
            mobileMenuButton.classList.toggle('active');
            mobileMenuButton.setAttribute('aria-expanded', String(!isCurrentlyOpen));
            if (isCurrentlyOpen) {
                // Close menu
                mobileMenu.classList.add('opacity-0', '-translate-y-full');
                mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                // Wait for transition before hiding
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300); // Match transition duration
            }
            else {
                // Open menu
                mobileMenu.classList.remove('hidden');
                // Use requestAnimationFrame to ensure 'hidden' is removed before applying transitions
                requestAnimationFrame(() => {
                    mobileMenu.classList.add('opacity-100', 'translate-y-0');
                    mobileMenu.classList.remove('opacity-0', '-translate-y-full');
                });
            }
        });
        // Close menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('opacity-0', '-translate-y-full');
                mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            });
        });
    }
    // Modifications du footer pour mobile
    const footer = document.querySelector('footer');
    if (footer) {
        // Espacement pour mobile
        if (window.innerWidth < 768) {
            footer.classList.add('pb-16');
        }
        // Désactivation du lien email
        const emailLink = footer.querySelector('a[href^="mailto:contact.debarieux"]');
        if (emailLink) {
            emailLink.removeAttribute('href');
            emailLink.style.cursor = 'default';
            emailLink.style.opacity = '0.7';
        }
    }
    // Gestion responsive du footer
    function updateFooterStyle() {
        if (footer) {
            if (window.innerWidth < 768) {
                footer.classList.add('pb-16');
                footer.classList.remove('mt-16');
            }
            else {
                footer.classList.remove('pb-16');
                footer.classList.add('mt-16');
            }
        }
    }
    // Initial call + resize listener
    updateFooterStyle();
    window.addEventListener('resize', updateFooterStyle);
});
