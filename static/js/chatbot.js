// Chatbot JavaScript Implementation for Srinath Nulidonda's Portfolio
class SrinathChatbot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.currentStep = 0;
        this.userName = '';
        this.userInterests = [];
        
        // Initialize chatbot
        this.init();
        
        // Predefined responses based on Srinath's expertise
        this.responses = {
            greeting: [
                "Hello! 👋 I'm Srinath's AI assistant. I'm here to tell you about his work in full-stack development, mobile apps, and AI/ML projects!",
                "Hi there! 🚀 Welcome to Srinath's portfolio. I can help you learn about his projects, skills, or how to get in touch with him.",
                "Hey! 😊 I'm excited to chat with you about Srinath's journey in tech - from Flutter apps to AI travel recommendations!"
            ],
            
            about: [
                "Srinath is a passionate 21-year-old full-stack developer from Hyderabad, India! 🇮🇳 He specializes in web development, mobile apps with Flutter, and AI/ML projects. He's currently pursuing his Bachelor's in Engineering while building amazing digital solutions.",
                "Great question! Srinath combines frontend expertise (React, HTML/CSS/JS) with backend skills (Flask, Python) and mobile development (Flutter/Dart). He's also passionate about AI/ML, having built travel recommendation systems and drug discovery platforms!"
            ],
            
            projects: [
                "Srinath has built some incredible projects! 🎯 His standout work includes:\n\n📱 Mobile Apps: Manga reading app & Weather forecast app (Flutter)\n🤖 AI Projects: Travel recommendation system & Drug discovery platform\n🌍 Travel Sites: Beautiful guides for NYC, Rome & Paris\n💼 E-commerce platforms\n\nWhich type interests you most?",
                "His project portfolio is diverse! From AI-powered travel recommendations using TensorFlow to elegant Flutter mobile apps. He's also created agriculture price prediction systems and interactive travel websites. Want to know more about any specific project?"
            ],
            
            skills: [
                "Srinath's tech stack is impressive! 💻\n\n🎨 Frontend: HTML5, CSS3, JavaScript, React\n⚙️ Backend: Flask, Python, Node.js\n📱 Mobile: Flutter, Dart\n🤖 AI/ML: TensorFlow, Scikit-learn, NLTK\n🗄️ Database: SQLAlchemy, MongoDB\n☁️ Other: Git, API Integration, Responsive Design\n\nHe's also learning Java and exploring new technologies constantly!"
            ],
            
            contact: [
                "Ready to connect with Srinath? 📬 Here are the best ways:\n\n✉️ Email: srinathnulidonda@gmail.com\n💼 LinkedIn: linkedin.com/in/srinath-nulidonda-1a4230256/\n🐙 GitHub: github.com/Srinathnulidonda\n🐦 Twitter: @srinath2973\n\nHe typically responds within 24 hours and loves discussing new project ideas!"
            ],
            
            java: [
                "Yes! Srinath is expanding his skills in Java ☕ He's interested in enterprise development and Android app development with Java. His strong foundation in programming concepts makes picking up Java natural for him!",
                "Java is definitely on Srinath's learning path! With his experience in Python and Dart, he's exploring Java for backend development and Android apps. The transition has been smooth given his solid programming fundamentals."
            ],
            
            python: [
                "Python is one of Srinath's strongest languages! 🐍 He uses it extensively for:\n\n🤖 AI/ML projects with TensorFlow & Scikit-learn\n🌐 Web development with Flask\n📊 Data analysis and processing\n🔧 Automation scripts\n\nHis travel recommendation and drug discovery projects showcase his Python expertise beautifully!"
            ],
            
            flutter: [
                "Flutter is Srinath's go-to for mobile development! 📱 He's built beautiful apps like:\n\n📖 Manga reading app with offline capabilities\n🌤️ Weather forecast app with real-time updates\n\nHe loves Flutter's cross-platform capabilities and how it lets him create native-quality apps for both iOS and Android!"
            ],
            
            ai: [
                "AI/ML is where Srinath really shines! 🤖 His projects include:\n\n✈️ Travel recommendation system using ML algorithms\n💊 Drug discovery platform with molecular analysis\n🌾 Agriculture price prediction using weather data\n\nHe uses TensorFlow, Scikit-learn, and NLTK to build intelligent solutions that solve real-world problems!"
            ],
            
            hire: [
                "Srinath is open to exciting opportunities! 💼 He's particularly interested in:\n\n🚀 Full-stack development projects\n📱 Mobile app development\n🤖 AI/ML implementations\n🌟 Innovative tech solutions\n\nFeel free to reach out via email or LinkedIn to discuss potential collaborations!"
            ],
            
            location: [
                "Srinath is based in Hyderabad, India 🇮🇳 - a major tech hub! He's open to remote work opportunities and has experience collaborating with international teams. The time zone works great for both Asian and European clients."
            ],
            
            experience: [
                "While Srinath is 21 and early in his career, his portfolio speaks volumes! 📈 He's built multiple production-ready applications, from AI-powered systems to mobile apps. His combination of academic learning and hands-on project experience makes him a valuable developer."
            ],
            
            learning: [
                "Srinath is always learning! 📚 Currently he's diving deeper into:\n\n☕ Java for enterprise development\n🔧 Advanced AI/ML techniques\n☁️ Cloud technologies\n🎯 System design principles\n\nHis curiosity and dedication to growth are what make him special!"
            ],
            
            default: [
                "That's a great question! I'd love to help you learn more about Srinath's work. You can ask me about his projects, skills, how to contact him, or anything else you'd like to know! 🤔",
                "Interesting! While I might not have specific info on that, I can tell you about Srinath's projects, technical skills, or how to get in touch with him directly. What would you like to know? 😊",
                "I'm here to help! Feel free to ask about Srinath's development work, his AI/ML projects, mobile apps, or how to connect with him for potential collaborations! 🚀"
            ]
        };
        
        // Keywords for response matching
        this.keywords = {
            greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
            about: ['about', 'who', 'bio', 'background', 'story', 'srinath', 'tell me about'],
            projects: ['projects', 'work', 'portfolio', 'built', 'created', 'developed', 'apps', 'websites'],
            skills: ['skills', 'technologies', 'tech stack', 'programming', 'languages', 'frameworks', 'tools'],
            contact: ['contact', 'reach', 'email', 'linkedin', 'github', 'connect', 'get in touch'],
            java: ['java', 'java development', 'enterprise', 'spring'],
            python: ['python', 'flask', 'django', 'data science', 'machine learning'],
            flutter: ['flutter', 'dart', 'mobile', 'android', 'ios', 'cross-platform'],
            ai: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'tensorflow', 'data science'],
            hire: ['hire', 'work', 'job', 'opportunity', 'freelance', 'collaborate', 'available'],
            location: ['location', 'where', 'hyderabad', 'india', 'remote', 'timezone'],
            experience: ['experience', 'years', 'senior', 'junior', 'level'],
            learning: ['learning', 'studying', 'new', 'future', 'plans', 'goals']
        };
    }
    
    init() {
        this.bindEvents();
        this.hideTypingIndicator();
    }
    
    bindEvents() {
        const chatToggle = document.getElementById('chatToggle');
        const chatContainer = document.getElementById('chatContainer');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const whatsappButton = document.getElementById('whatsappButton');
        
        // Toggle chat
        chatToggle.addEventListener('click', () => this.toggleChat());
        
        // Send message on button click
        sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // WhatsApp button
        whatsappButton.addEventListener('click', () => this.openWhatsApp());
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (!chatContainer.contains(e.target) && !chatToggle.contains(e.target)) {
                if (this.isOpen) {
                    this.toggleChat();
                }
            }
        });
    }
    
    toggleChat() {
        const chatContainer = document.getElementById('chatContainer');
        const chatToggle = document.getElementById('chatToggle');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatContainer.classList.add('active');
            chatToggle.classList.add('active');
            document.getElementById('messageInput').focus();
            
            // Send initial greeting if no messages yet
            if (document.querySelectorAll('.message').length === 0) {
                setTimeout(() => this.sendBotMessage(this.getRandomResponse('greeting')), 1000);
            }
        } else {
            chatContainer.classList.remove('active');
            chatToggle.classList.remove('active');
        }
    }
    
    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (message === '' || this.isTyping) return;
        
        // Add user message
        this.addUserMessage(message);
        messageInput.value = '';
        
        // Show typing indicator and respond
        this.showTypingIndicator();
        
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.sendBotMessage(response);
        }, 1500 + Math.random() * 1000); // Simulate thinking time
    }
    
    addUserMessage(message) {
        const chatBody = document.getElementById('chatBody');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">${this.escapeHtml(message)}</div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        
        chatBody.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    sendBotMessage(message) {
        this.hideTypingIndicator();
        
        const chatBody = document.getElementById('chatBody');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">${this.formatMessage(message)}</div>
            <div class="message-time">${this.getCurrentTime()}</div>
        `;
        
        chatBody.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for keywords and return appropriate response
        for (const [category, keywords] of Object.entries(this.keywords)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                return this.getRandomResponse(category);
            }
        }
        
        // Default response
        return this.getRandomResponse('default');
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category] || this.responses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    formatMessage(message) {
        // Convert markdown-style formatting to HTML
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.style.display = 'none';
    }
    
    scrollToBottom() {
        const chatBody = document.getElementById('chatBody');
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    openWhatsApp() {
        const phoneNumber = '917013850214'; // Replace with Srinath's actual WhatsApp number
        const message = encodeURIComponent('Hi Srinath! I visited your portfolio and would like to discuss potential collaboration opportunities.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SrinathChatbot();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Animate chat toggle button
    const chatToggle = document.getElementById('chatToggle');
    
    // Add pulse animation on page load
    setTimeout(() => {
        chatToggle.classList.add('pulse');
        setTimeout(() => chatToggle.classList.remove('pulse'), 2000);
    }, 3000);
    
    // Add periodic subtle animations
    setInterval(() => {
        if (!document.getElementById('chatContainer').classList.contains('active')) {
            chatToggle.classList.add('subtle-bounce');
            setTimeout(() => chatToggle.classList.remove('subtle-bounce'), 1000);
        }
    }, 30000); // Every 30 seconds
});