document.addEventListener('DOMContentLoaded', () => {
    // Dynamic text typing effect for hero
    const words = ["Study Ecosystem", "Print Network", "Book Market", "AI Co-Pilot"];
    let i = 0;
    let timer;
    const dynamicText = document.querySelector('.dynamic-word');

    // Make Navbar background solid on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.border = '1px solid rgba(255,255,255,0.1)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.border = '1px solid var(--glass-border)';
        }
    });

    // Simple word flipper for the hero section
    setInterval(() => {
        dynamicText.style.opacity = 0;
        setTimeout(() => {
            i = (i + 1) % words.length;
            dynamicText.textContent = words[i];
            dynamicText.style.opacity = 1;
            dynamicText.style.transition = 'opacity 0.5s ease';
        }, 500); // Wait for opacity to reach 0
    }, 3000);

    // Initial transition for opacity
    dynamicText.style.transition = 'opacity 0.5s ease';

    // Mobile menu toggle (simple alert for now since no menu HTML)
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            alert('Mobile navigation will open here.');
        });
    }

    // Add gentle 3D hover effect to the floating cards
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
