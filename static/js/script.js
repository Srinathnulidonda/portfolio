// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    const navbarBrand = document.querySelector('.navbar-brand');

    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.background = 'rgba(33, 37, 41, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.background = 'rgba(33, 37, 41, 0.9)';
            navbar.style.backdropFilter = 'blur(5px)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Call once on load

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Typed.js initialization for hero section
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: [
                'Full Stack Development',
                'Mobile App Development',
                'Machine Learning',
                'Web Design',
                'UI/UX Design',
                'Problem Solving'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true,
        });
    }

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    function filterProjects(category) {
        projectItems.forEach(item => {
            const itemCategories = item.classList;

            if (category === 'all' || itemCategories.contains(category)) {
                item.style.display = 'block';
                item.classList.remove('hidden');
                // Re-trigger AOS animation
                setTimeout(() => {
                    item.classList.add('aos-animate');
                }, 100);
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter category
            const filterCategory = this.getAttribute('data-filter');

            // Filter projects
            filterProjects(filterCategory);

            // Add loading effect
            projectItems.forEach(item => {
                item.classList.add('loading');
                setTimeout(() => {
                    item.classList.remove('loading');
                }, 300);
            });
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        function toggleBackToTopButton() {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'flex';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        backToTopButton.style.display = 'none';
                    }
                }, 300);
            }
        }

        window.addEventListener('scroll', toggleBackToTopButton);

        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form handling (if exists)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;

                // Show success message
                showNotification('Message sent successfully!', 'success');

                // Reset form
                this.reset();
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Skills animation (if skills section exists)
    const skillBars = document.querySelectorAll('.skill-progress');

    if (skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = progress + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillsObserver.observe(bar));
    }

    // Theme switcher (if exists)
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update toggle icon
            const icon = this.querySelector('i');
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Counter animation for statistics (if exists)
    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 200;
                    let current = 0;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            setTimeout(updateCounter, 10);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Preloader (if exists)
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Mobile menu enhancements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function () {
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navbar.contains(event.target);
            if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }

    // Service worker registration (for PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // Performance monitoring
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log('Page Load Time:', entry.loadEventEnd - entry.fetchStart);
                }
            }
        });

        perfObserver.observe({ entryTypes: ['navigation'] });
    }

    // Console message
    console.log('%c👨‍💻 Welcome to Srinath Nulidonda\'s Portfolio!',
        'color: #007bff; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub: https://github.com/Srinathnulidonda',
        'color: #28a745; font-size: 12px;');
});

// Global utility functions
window.portfolioUtils = {
    // Smooth scroll to element
    scrollTo: function (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const navbarHeight = document.getElementById('mainNav').offsetHeight;
            const targetPosition = element.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Copy text to clipboard
    copyToClipboard: function (text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Copied to clipboard!', 'success');
        });
    },

    // Show notification
    showNotification: function (message, type = 'info') {
        // Implementation already included above
    },

    // Format date
    formatDate: function (date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Debounce function
    debounce: function (func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: function (func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Error handling
window.addEventListener('error', function (e) {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.portfolioUtils;
}