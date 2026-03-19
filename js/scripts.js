/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const revealTargets = document.querySelectorAll(
        '.resume-section .resume-section-content, .project-card, .skill-card, .contact-list a'
    );

    if (revealTargets.length > 0) {
        revealTargets.forEach((element, index) => {
            element.classList.add('reveal-item');
            element.style.setProperty('--reveal-delay', `${Math.min(index * 55, 420)}ms`);
        });

        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -10% 0px',
            }
        );

        revealTargets.forEach(element => revealObserver.observe(element));
    }

    const progressBar = document.querySelector('.scroll-progress-bar');
    const backToTop = document.querySelector('#backToTop');

    const updateScrollFeedback = () => {
        const scrollTop = window.scrollY;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;

        if (progressBar) {
            progressBar.style.transform = `scaleX(${ratio})`;
        }

        if (backToTop) {
            backToTop.classList.toggle('is-visible', scrollTop > 480);
        }
    };

    window.addEventListener('scroll', updateScrollFeedback, { passive: true });
    updateScrollFeedback();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (!reduceMotion) {
        const titleElement = document.querySelector('.hero-title');
        if (titleElement) {
            const titlePhrases = [
                'Desenvolvedor Web',
                'Criador de Interfaces',
                'Apaixonado por Software',
            ];
            const cursor = '<span class="typing-cursor">|</span>';
            let phraseIndex = 0;
            let charIndex = 0;
            let deleting = false;

            const animateTitle = () => {
                const currentPhrase = titlePhrases[phraseIndex];

                if (!deleting) {
                    charIndex += 1;
                } else {
                    charIndex -= 1;
                }

                const visibleText = currentPhrase.slice(0, charIndex);
                titleElement.innerHTML = `${visibleText}${cursor}`;

                let delay = deleting ? 42 : 78;

                if (!deleting && charIndex === currentPhrase.length) {
                    delay = 1300;
                    deleting = true;
                } else if (deleting && charIndex === 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % titlePhrases.length;
                    delay = 380;
                }

                window.setTimeout(animateTitle, delay);
            };

            titleElement.innerHTML = `${titlePhrases[0].slice(0, 1)}${cursor}`;
            charIndex = 1;
            window.setTimeout(animateTitle, 220);
        }

        const tiltCards = document.querySelectorAll('.project-card, .skill-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', event => {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const rotateY = (x - 0.5) * 8;
                const rotateX = (0.5 - y) * 8;

                card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
                card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
            });
        });
    }

});
