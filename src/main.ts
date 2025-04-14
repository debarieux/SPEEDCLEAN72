// Point d'entrée principal du TypeScript
console.log("Script principal chargé.");

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle --- (Nouvelle logique)
    const menuButton = document.getElementById('mobile-menu-button') as HTMLButtonElement;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement;

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isExpanded));
            mobileMenu.classList.toggle('hidden'); // Bascule la classe Tailwind 'hidden'
            
            // Gérer les classes pour l'animation
            if (!isExpanded) {
                // Ouverture: supprimer 'hidden', puis les classes de transition après un court délai
                mobileMenu.classList.remove('hidden');
                // Force reflow pour que la transition s'applique
                void mobileMenu.offsetWidth; 
                mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
            } else {
                // Fermeture: ajouter les classes de transition, puis 'hidden' après la fin de la transition
                mobileMenu.classList.add('-translate-y-full', 'opacity-0');
                mobileMenu.addEventListener('transitionend', () => {
                    mobileMenu.classList.add('hidden');
                }, { once: true }); // Important: écouteur unique
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                // Directly close the menu instead of simulating button click
                if (menuButton && mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    menuButton.classList.remove('active');
                    menuButton.setAttribute('aria-expanded', 'false');
                    mobileMenu.classList.add('opacity-0', '-translate-y-full');
                    mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 300); // Match transition duration
                }
                // Allow the default link behavior to proceed
            });
        });
    }

    // --- Header Scroll Effect --- (Nouveau)
    const header = document.getElementById('main-header') as HTMLElement;
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Déclenchement après 50px de défilement

    if (header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling Down
                header.classList.add('header-scrolled-down');
            } else {
                // Scrolling Up or at the top
                header.classList.remove('header-scrolled-down');
            }

            // Pour les navigateurs mobiles où scrollTop peut être négatif
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
        }, { passive: true }); // Utilisation de passive pour de meilleures performances
    }

    // --- Testimonials Swiper Initialization --- 
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        // Use Navigation and Pagination modules // REMOVED - Included in bundle
        loop: true, // Optional: Enable continuous loop mode
        grabCursor: true,
        slidesPerView: 1, // Default: show 1 slide
        spaceBetween: 30,

        // Pagination configuration
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows configuration
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 768px (md)
            768: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            // when window width is >= 1024px (lg)
            1024: {
                slidesPerView: 3,
                spaceBetween: 50
            }
        }
    });

    // --- Fade-in Effect on Scroll --- 
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start animation slightly before element is fully in view
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target); // Stop observing once visible
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Back To Top Button --- (New Implementation)
    const backToTopButton = document.createElement('button');
    backToTopButton.setAttribute('aria-label', 'Remonter en haut');
    backToTopButton.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.03 9.83a.75.75 0 01-1.06-1.06l5.25-5.25a.75.75 0 011.06 0l5.25 5.25a.75.75 0 11-1.06 1.06L10.75 5.612V16.25a.75.75 0 01-.75.75z" clip-rule="evenodd"></path>
        </svg>
    `;
    // Base classes + initial hidden state for transition
    backToTopButton.className = 'back-to-top fixed bottom-6 right-6 z-50 bg-accent text-white rounded-full shadow-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary-100 transition-all duration-300 ease-in-out opacity-0 scale-95 invisible';

    // Function to update size based on screen width
    function updateBackToTopStyle() {
        if (window.innerWidth < 768) { // Mobile
            backToTopButton.classList.add('p-3'); // Larger padding/size for mobile
            backToTopButton.classList.remove('p-2');
        } else { // Tablet/Desktop
            backToTopButton.classList.add('p-2'); // Smaller padding/size
            backToTopButton.classList.remove('p-3');
        }
    }

    // Show/hide button based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show after scrolling 300px
            backToTopButton.classList.remove('opacity-0', 'scale-95', 'invisible');
            backToTopButton.classList.add('opacity-90', 'scale-100');
        } else {
            backToTopButton.classList.add('opacity-0', 'scale-95');
            // Keep invisible until transition ends
            setTimeout(() => {
                 if (window.pageYOffset <= 300) { // Double check in case user scrolled back up fast
                      backToTopButton.classList.add('invisible');
                 }
            }, 300); // Match transition duration
        }
    }, { passive: true });

    // Smooth scroll to top on click
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial style check + add listener + append to body
    updateBackToTopStyle();
    window.addEventListener('resize', updateBackToTopStyle);
    document.body.appendChild(backToTopButton);

    // --- Footer Adjustments --- (New Implementation)
    const footerElement = document.querySelector('footer');

    // Function to adjust footer padding
    function updateFooterStyle() {
        if (footerElement) {
            if (window.innerWidth < 768) { // Mobile
                footerElement.classList.add('pb-24'); // Add padding-bottom on mobile (adjust value if needed for button spacing)
                // footerElement.classList.remove('mt-16'); // Keep or remove top margin based on design needs
            } else { // Tablet/Desktop
                footerElement.classList.remove('pb-24');
                // footerElement.classList.add('mt-16'); // Restore top margin if needed
            }
        }
    }

    // Disable specific email link in footer
    document.querySelectorAll('footer a[href="mailto:contact.debarieux@gmail.com"]').forEach(link => {
        const emailLink = link as HTMLElement;
        emailLink.removeAttribute('href');
        emailLink.style.cursor = 'not-allowed'; // Indicate it's disabled
        emailLink.style.opacity = '0.6';
        emailLink.title = 'Ce lien email est désactivé'; // Add a tooltip
        // Prevent click action completely
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, true); // Use capture phase to stop event early
    });

    // Initial footer style check + add resize listener
    updateFooterStyle();
    window.addEventListener('resize', updateFooterStyle);

     // Placeholder for other JS functionalities like sliders, animations
     console.log('SpeedClean72 script loaded, Swiper initialized, Back-to-Top & Footer adjustments applied.');
 });
