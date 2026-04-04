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
        setTheme('light'); // Default theme
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
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
            // Also check if element is already in viewport on load
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const delay = el.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    el.classList.add('revealed');
                }, parseInt(delay));
            }
        });

        // Fallback: reveal all elements after 2 seconds
        setTimeout(() => {
            scrollRevealElements.forEach(el => {
                if (!el.classList.contains('revealed')) {
                    el.classList.add('revealed');
                }
            });
        }, 2000);
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

    // ======================================================================
    // Shop Finder Map - Temporarily disabled for testing
    // ======================================================================
    /*
    const initMap = () => {
        const mapElement = document.getElementById('map');
        if (mapElement && typeof L !== 'undefined') {
            // Initialize map centered on a sample location (can be replaced with user's location)
            const map = L.map('map').setView([9.9312, 76.2673], 13); // Sample coordinates for Kochi, India

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Sample shop locations
            const shops = [
                { name: 'ABC Xerox', lat: 9.9312, lng: 76.2673, bwPrice: 1, colorPrice: 5 },
                { name: 'Fast Print Hub', lat: 9.9350, lng: 76.2700, bwPrice: 1.5, colorPrice: 6 },
                { name: 'Quick Copy', lat: 9.9280, lng: 76.2650, bwPrice: 1.2, colorPrice: 4.5 }
            ];

            // Add markers for each shop
            shops.forEach(shop => {
                const marker = L.marker([shop.lat, shop.lng]).addTo(map);
                marker.bindPopup(`
                    <div style="font-family: 'Outfit', sans-serif; text-align: center;">
                        <h3 style="margin: 0 0 8px; color: #4f46e5;">${shop.name}</h3>
                        <p style="margin: 4px 0;">BW: ₹${shop.bwPrice}/page</p>
                        <p style="margin: 4px 0;">Color: ₹${shop.colorPrice}/page</p>
                        <button style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; margin-top: 8px;">Select Shop</button>
                    </div>
                `);
            });

            // Try to get user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    map.setView([userLat, userLng], 13);
                    
                    // Add user location marker
                    L.marker([userLat, userLng], {
                        icon: L.divIcon({
                            className: 'user-location-marker',
                            html: '<div style="background: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                            iconSize: [20, 20],
                            iconAnchor: [10, 10]
                        })
                    }).addTo(map).bindPopup('Your Location');
                });
            }
        }
    };

    // Initialize map after a short delay to ensure Leaflet is loaded
    setTimeout(initMap, 1000);
    */

    // ======================================================================
    // Book Filter Functionality
    // ======================================================================
    const filterButtons = document.querySelectorAll('.skeuo-chip');
    const bookCards = document.querySelectorAll('.book-card');

    if (filterButtons.length > 0 && bookCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                bookCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ======================================================================
    // AI Chat Functionality
    // ======================================================================
    const chatInput = document.querySelector('.skeuo-input');
    const sendButton = document.querySelector('.chat-input-area .btn-primary');
    const chatMessages = document.querySelector('.chat-messages');
    const clipButton = document.querySelector('.ai-clip-btn');

    // Xerox calculator elements (present only on ai.html)
    const xeroxToggleBtn = document.getElementById('xerox-toggle');
    const xeroxPanel = document.getElementById('xerox-calc');
    const xeroxPages = document.getElementById('xerox-pages');
    const xeroxCopies = document.getElementById('xerox-copies');
    const xeroxType = document.getElementById('xerox-type');
    const xeroxSides = document.getElementById('xerox-sides');
    const xeroxRunBtn = document.getElementById('xerox-calc-run');
    const xeroxCancelBtn = document.getElementById('xerox-calc-cancel');

    if (chatInput && sendButton && chatMessages) {
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user';
                userMessage.textContent = message;
                chatMessages.appendChild(userMessage);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate AI response
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message bot';
                    
                    // Simple response logic
                    let response = '';
                    if (message.toLowerCase().includes('summarize') || message.toLowerCase().includes('summary')) {
                        response = "I'd be happy to help summarize! 📄 Please upload your PDF first using the paperclip button, and I'll provide a detailed summary with key points.";
                    } else if (message.toLowerCase().includes('quiz') || message.toLowerCase().includes('/quiz')) {
                        response = "Quiz time! 🎯 Here's a quick question: What is the time complexity of binary search? A) O(n) B) O(log n) C) O(n²) D) O(1)";
                    } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                        response = "Hello! 👋 I'm here to help with your studies. Ask me about summarizing PDFs, generating quizzes, or any academic questions!";
                    } else {
                        response = "That's an interesting question! 🤔 While I don't have access to external knowledge right now, I can help you study by summarizing uploaded PDFs, creating flashcards, or generating practice quizzes. What would you like to work on?";
                    }
                    
                    botMessage.textContent = response;
                    chatMessages.appendChild(botMessage);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        };

        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // File upload simulation
        if (clipButton) {
            clipButton.addEventListener('click', () => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.pdf';
                fileInput.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const userMessage = document.createElement('div');
                        userMessage.className = 'message user';
                        userMessage.innerHTML = `<i class="ph ph-file-pdf" style="margin-right: 8px;"></i> Uploaded: ${file.name}`;
                        chatMessages.appendChild(userMessage);
                        
                        setTimeout(() => {
                            const botMessage = document.createElement('div');
                            botMessage.className = 'message bot';
                            botMessage.textContent = `Great! I've received your PDF "${file.name}". Let me analyze it and provide a summary...`;
                            chatMessages.appendChild(botMessage);
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        }, 1000);
                    }
                };
                fileInput.click();
            });
        }

        // ======================================================================
        // Xerox calculator logic (shows results as bot messages)
        // ======================================================================
        if (xeroxToggleBtn && xeroxPanel) {
            xeroxToggleBtn.addEventListener('click', () => {
                xeroxPanel.style.display = xeroxPanel.style.display === 'block' ? 'none' : 'block';
                // scroll to bottom so panel is visible
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });

            if (xeroxCancelBtn) {
                xeroxCancelBtn.addEventListener('click', () => {
                    xeroxPanel.style.display = 'none';
                });
            }

            if (xeroxRunBtn) {
                xeroxRunBtn.addEventListener('click', () => {
                    const pages = Math.max(1, parseInt(xeroxPages.value || 1));
                    const copies = Math.max(1, parseInt(xeroxCopies.value || 1));
                    const type = (xeroxType && xeroxType.value) ? xeroxType.value : 'Black & White';
                    const sides = (xeroxSides && xeroxSides.value) ? xeroxSides.value : 'Single-sided';

                    // Sample shop prices (real app should call API)
                    const shops = [
                        { name: 'ABC Xerox', bw: 1.0, color: 5.0 },
                        { name: 'Fast Print Hub', bw: 1.5, color: 6.0 },
                        { name: 'Quick Copy', bw: 1.2, color: 4.5 }
                    ];

                    const sheets = (sides === 'Double-sided') ? Math.ceil(pages / 2) : pages;
                    const totalPages = sheets * copies;

                    const results = shops.map(shop => {
                        const pricePer = (type === 'Color') ? shop.color : shop.bw;
                        const total = totalPages * pricePer;
                        return { name: shop.name, total };
                    });

                    // Create bot message with results
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message bot';
                    let html = `<strong>📠 Xerox Cost Estimates</strong>`;
                    html += `<div style="margin-top:8px;">Pages: ${pages} • Copies: ${copies} • ${sides} • ${type}</div>`;
                    html += `<div style="margin-top:8px;">`;
                    results.forEach(r => {
                        html += `<div style="margin-bottom:6px;"><strong>${r.name}</strong>: ₹${r.total.toFixed(2)}</div>`;
                    });
                    html += `</div>`;
                    botMessage.innerHTML = html;
                    chatMessages.appendChild(botMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    // close panel after calculation
                    xeroxPanel.style.display = 'none';
                });
            }
        }
    }
});
