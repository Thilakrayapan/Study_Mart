document.addEventListener('DOMContentLoaded', () => {
    // Dynamic text typing effect for hero
    const words = ["Study Ecosystem", "Print Network", "Book Market", "Brainiac Buddy 🤖"];
    let i = 0;
    let timer;
    const dynamicText = document.querySelector('.dynamic-word');

    // ======================================================================
    // Navbar scroll effect
    // ======================================================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Solid background on scroll
        if (scrollY > 50) {
            navbar.style.background = 'var(--nav-solid-bg)';
            navbar.style.border = '1px solid var(--glass-border)';
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.border = '1px solid var(--glass-border)';
            navbar.classList.remove('navbar-scrolled');
        }

        // Hide/show navbar on scroll direction
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateX(-50%) translateY(-100%)';
        } else {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
        }
        lastScrollY = scrollY;
    });

    // ======================================================================
    // Theme Toggle Logic
    // ======================================================================
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle i');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('study-mart-theme', theme);
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.classList.remove('ph-moon');
                themeIcon.classList.add('ph-sun');
            } else {
                themeIcon.classList.remove('ph-sun');
                themeIcon.classList.add('ph-moon');
            }
        }
    }

    // Initialize Theme
    const savedTheme = localStorage.getItem('study-mart-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('dark'); // Default theme
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // ======================================================================
    // Dynamic word flipper for hero
    // ======================================================================
    if (dynamicText) {
        dynamicText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setInterval(() => {
            dynamicText.style.opacity = 0;
            dynamicText.style.transform = 'translateY(10px)';
            setTimeout(() => {
                i = (i + 1) % words.length;
                dynamicText.textContent = words[i];
                dynamicText.style.opacity = 1;
                dynamicText.style.transform = 'translateY(0)';
            }, 500);
        }, 3000);
    }

    // ======================================================================
    // Mobile menu toggle
    // ======================================================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('mobile-open')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            });
        });
    }

    // ======================================================================
    // Smooth Scroll for anchor links
    // ======================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ======================================================================
    // Scroll Reveal Animations (Intersection Observer)
    // ======================================================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    if (scrollRevealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        scrollRevealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ======================================================================
    // Parallax Orbs on Scroll
    // ======================================================================
    const orbs = document.querySelectorAll('.bg-orb');

    if (orbs.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.03;
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }

    // ======================================================================
    // Staggered card reveal for book-card and service-card
    // ======================================================================
    const staggerCards = document.querySelectorAll('.book-card, .service-card:not(.scroll-reveal)');

    if (staggerCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, idx * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -30px 0px'
        });

        staggerCards.forEach(card => {
            card.classList.add('scroll-reveal');
            cardObserver.observe(card);
        });
    }

    // ======================================================================
    // 3D hover effect for floating cards
    // ======================================================================
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ======================================================================
    // Counter animation for stats (if any .counter elements exist)
    // ======================================================================
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let count = 0;
                    const increment = Math.ceil(target / 60);
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            entry.target.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = count.toLocaleString();
                        }
                    }, 30);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }
});
