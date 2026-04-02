document.addEventListener('DOMContentLoaded', () => {
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
    // Make Navbar background solid on scroll
    // ======================================================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'var(--nav-solid-bg)';
                navbar.style.border = '1px solid var(--glass-border)';
            } else {
                navbar.style.background = 'var(--glass-bg)';
                navbar.style.border = '1px solid var(--glass-border)';
            }
        });
    }

    // ======================================================================
    // Dynamic text typing effect for hero (only on index page)
    // ======================================================================
    const dynamicText = document.querySelector('.dynamic-word');
    if (dynamicText) {
        const words = ["Study Ecosystem", "Print Network", "Book Market", "Brainiac Buddy 🤖"];
        let i = 0;

        dynamicText.style.transition = 'opacity 0.5s ease';

        setInterval(() => {
            dynamicText.style.opacity = 0;
            setTimeout(() => {
                i = (i + 1) % words.length;
                dynamicText.textContent = words[i];
                dynamicText.style.opacity = 1;
            }, 500);
        }, 3000);
    }

    // ======================================================================
    // Mobile Menu Toggle — slide-down nav
    // ======================================================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('ph-list', !isOpen);
                icon.classList.toggle('ph-x', isOpen);
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            });
        });
    }

    // ======================================================================
    // 3D hover effect on floating cards (only on pages that have them)
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
});
