document.addEventListener('DOMContentLoaded', function() {
    // Animation Initialization
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out'
    });
    // Typed.js Initialization
    const typed = new Typed('.typed-text', {
        strings: ['Web Development', 'Full Stack Development', 'UI/UX Design', 'Mobile App Development'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Navbar Scrolling Effect
    const mainNav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-scrolled');
        } else {
            mainNav.classList.remove('navbar-scrolled');
        }
    });
    
    // Active Navigation Link Update
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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
    updateActiveNavLink(); // Initialize on page load
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Apply filtering with animation
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    // Project Hover Effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const projectOverlay = this.querySelector('.project-overlay');
            if (projectOverlay) {
                projectOverlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const projectOverlay = this.querySelector('.project-overlay');
            if (projectOverlay) {
                projectOverlay.style.opacity = '0';
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Disable button and show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            submitButton.disabled = true;
            
            // Prepare the form data to send
            const formData = {
                name: name,
                email: email,
                message: message,
                to: "srinathnulidonda@gmail.com" // Your email address
            };
            
            // Send email using Email.js (you need to include the Email.js library)
            // First, add this script tag in your HTML head:
            // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
            
            emailjs.init("srinathnulidonda"); // Replace with your Email.js user ID
            
            emailjs.send("service_1atiujn", "template_nz8yvyo", formData)
                .then(function(response) {
                    console.log("SUCCESS!", response.status, response.text);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    submitButton.innerHTML = '<i class="fas fa-check me-2"></i> Message Sent!';
                    submitButton.classList.remove('btn-primary');
                    submitButton.classList.add('btn-success');
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('btn-success');
                        submitButton.classList.add('btn-primary');
                    }, 3000);
                }, function(error) {
                    console.log("FAILED...", error);
                    
                    // Show error message
                    submitButton.innerHTML = '<i class="fas fa-times me-2"></i> Failed to Send';
                    submitButton.classList.remove('btn-primary');
                    submitButton.classList.add('btn-danger');
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('btn-danger');
                        submitButton.classList.add('btn-primary');
                    }, 3000);
                });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Chat Widget Functionality
    const toggleChat = document.getElementById('toggleChat');
    const closeChat = document.getElementById('closeChat');
    const chatWindow = document.getElementById('chatWindow');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const quickReplies = document.querySelectorAll('.quick-reply-button');
    const whatsappButton = document.getElementById('whatsappButton');

    // Your WhatsApp number (replace with actual number)
    const whatsappNumber = '7013850214';

    // Toggle chat window
    if (toggleChat && chatWindow) {
        toggleChat.addEventListener('click', () => {
            chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
            if (chatWindow.style.display === 'flex') {
                chatInput.focus();
            }
        });
    }

    if (closeChat && chatWindow) {
        closeChat.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });
    }

    // Send message function
    function sendChatMessage(message, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${message}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    // Bot response function
    function getBotResponse(message) {
        const responses = {
            'hello': "Hi there! How can I help you today?",
            'hi': "Hello! What would you like to know about srinath's portfolio?",
            'hey': "Hey there! Looking for information about srinath's work?",
            'portfolio': "You can check out srinath's projects in the Projects section. He specializes in full-stack web development with a focus on modern JavaScript frameworks.",
            'skills': "srinath is proficient in HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and various other web technologies. Check out his projects for examples of his work!",
            'experience': "srinath has experience in building e-commerce platforms, task management apps, and various web applications. See the Projects section for details!",
            'contact': "You can reach srinath through the contact form above, via email at srinathnulidonda@gmail.com, or connect on LinkedIn and GitHub.",
            'project': "srinath has worked on several projects including e-commerce platforms, task management apps, and finance tracking tools. Check out the Projects section for more details!",
            'hire': "Interested in working with srinath? Please use the contact form to discuss your project requirements or job opportunity.",
            'resume': "You can download srinath's resume from the About section. It contains detailed information about his skills and experience.",
            'whatsapp': `I'll redirect you to WhatsApp now. You can also click this link to chat directly: <a href="https://wa.me/${whatsappNumber}" target="_blank" class="text-primary">Open WhatsApp</a>`,
            'default': "Thanks for your message! Feel free to ask about srinath's projects, skills, or contact information. You can also use the quick reply buttons below."
        };

        const lowercaseMsg = message.toLowerCase();
        let response = responses.default;

        // Check for matching keywords
        Object.keys(responses).forEach(key => {
            if (lowercaseMsg.includes(key)) {
                response = responses[key];
            }
        });

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        // Remove typing indicator and show response after delay
        setTimeout(() => {
            typingIndicator.remove();
            sendChatMessage(response, false);
        }, 1200);
    }

    // Handle send message
    function handleSend() {
        const message = chatInput.value.trim();
        if (message) {
            sendChatMessage(message);
            chatInput.value = '';
            getBotResponse(message);
        }
    }

    // WhatsApp redirect function
    function redirectToWhatsApp() {
        const whatsappUrl = `https://wa.me/${whatsappNumber}`;
        sendChatMessage("Redirecting to WhatsApp...");
        getBotResponse("whatsapp");
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1500);
    }

    // Event listeners for chat functionality
    if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', handleSend);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSend();
            }
        });
    }

    // Quick replies
    if (quickReplies) {
        quickReplies.forEach(button => {
            button.addEventListener('click', () => {
                if (button.id === 'whatsappButton') {
                    redirectToWhatsApp();
                } else {
                    const message = button.textContent;
                    sendChatMessage(message);
                    getBotResponse(message.toLowerCase());
                }
            });
        });
    }
    // Theme Toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const html = document.documentElement;
        const icon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-bs-theme', newTheme);
            
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
            
            localStorage.setItem('theme', newTheme);
        });

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            html.setAttribute('data-bs-theme', savedTheme);
            if (icon && savedTheme === 'dark') {
                icon.classList.replace('fa-moon', 'fa-sun');
            }
        }
    }
    // Project Image Lazy Loading
    const projectImages = document.querySelectorAll('.project-card img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        projectImages.forEach(img => {
            if (img.hasAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        projectImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('preloader-hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
});