const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_1atiujn',        
    OWNER_TEMPLATE_ID: 'template_tl8dokg', 
    CONFIRMATION_TEMPLATE_ID: 'template_5uil1fx', 
    PUBLIC_KEY: 'PDZrWzWCWkcVj-8oj'         
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// DOM Elements
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const sendIcon = document.getElementById('send-icon');
const btnText = submitBtn.querySelector('.btn-text');
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('char-count');
const progressFill = document.getElementById('progress-fill');

// Character counter for message textarea
messageTextarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    const maxLength = 500;
    const percentage = (currentLength / maxLength) * 100;
    
    charCount.textContent = currentLength;
    progressFill.style.width = percentage + '%';
    
    // Change color based on usage
    if (percentage < 50) {
        progressFill.style.backgroundColor = '#28a745';
    } else if (percentage < 80) {
        progressFill.style.backgroundColor = '#ffc107';
    } else {
        progressFill.style.backgroundColor = '#dc3545';
    }
});

// Form validation
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Validate name
    if (!name.value.trim() || name.value.length < 2) {
        name.classList.add('is-invalid');
        isValid = false;
    } else {
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }
    
    // Validate message
    if (!message.value.trim() || message.value.length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
    } else {
        message.classList.remove('is-invalid');
        message.classList.add('is-valid');
    }
    
    return isValid;
}

// Show loading state
function showLoading() {
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    loadingSpinner.style.display = 'inline-block';
    sendIcon.style.display = 'none';
    submitBtn.classList.add('loading');
}

// Hide loading state
function hideLoading() {
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
    loadingSpinner.style.display = 'none';
    sendIcon.style.display = 'inline';
    submitBtn.classList.remove('loading');
}

// Show success modal
function showSuccessModal() {
    const modalHtml = `
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header border-0 text-center">
                        <div class="w-100">
                            <div class="success-icon mb-3">
                                <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                            </div>
                            <h4 class="modal-title text-success fw-bold" id="successModalLabel">Message Sent Successfully!</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p class="mb-3 text-muted">Thank you for reaching out! Your message has been successfully sent.</p>
                        <p class="mb-0">
                            <small class="text-muted">
                                <i class="fas fa-envelope me-2"></i>
                                A confirmation email has been sent to your email address.
                                <br>
                                <i class="fas fa-clock me-2"></i>
                                I'll get back to you within 24 hours!
                            </small>
                        </p>
                    </div>
                    <div class="modal-footer border-0 justify-content-center">
                        <button type="button" class="btn btn-primary rounded-pill px-4" data-bs-dismiss="modal">
                            <i class="fas fa-thumbs-up me-2"></i>Awesome!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('successModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
    
    // Clean up modal after it's hidden
    document.getElementById('successModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Show error modal
function showErrorModal(errorMessage = 'Something went wrong. Please try again or contact me directly.') {
    const modalHtml = `
        <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header border-0 text-center">
                        <div class="w-100">
                            <div class="error-icon mb-3">
                                <i class="fas fa-exclamation-circle text-danger" style="font-size: 4rem;"></i>
                            </div>
                            <h4 class="modal-title text-danger fw-bold" id="errorModalLabel">Oops! Something went wrong</h4>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p class="mb-3 text-muted">${errorMessage}</p>
                        <p class="mb-0">
                            <small class="text-muted">
                                <i class="fas fa-envelope me-2"></i>
                                You can also reach me directly at: 
                                <a href="mailto:srinathnulidonda@gmail.com" class="text-primary">srinathnulidonda@gmail.com</a>
                            </small>
                        </p>
                    </div>
                    <div class="modal-footer border-0 justify-content-center">
                        <button type="button" class="btn btn-outline-primary rounded-pill px-4 me-2" data-bs-dismiss="modal">
                            Try Again
                        </button>
                        <a href="mailto:srinathnulidonda@gmail.com" class="btn btn-primary rounded-pill px-4">
                            <i class="fas fa-envelope me-2"></i>Email Directly
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('errorModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();
    
    // Clean up modal after it's hidden
    document.getElementById('errorModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Send email to owner (you)
async function sendOwnerNotification(formData) {
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Srinath Nulidonda',
        to_email: 'srinathnulidonda@gmail.com',
        reply_to: formData.email,
        subject: `New Contact Form Message from ${formData.name}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.OWNER_TEMPLATE_ID,
        templateParams
    );
}

// Send confirmation email to sender
async function sendConfirmationEmail(formData) {
    const templateParams = {
        to_name: formData.name,
        to_email: formData.email,
        from_name: 'Srinath Nulidonda',
        from_email: 'srinathnulidonda@gmail.com',
        user_message: formData.message,
        date: new Date().toLocaleDateString(),
        reply_to: 'srinathnulidonda@gmail.com'
    };
    
    return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONFIRMATION_TEMPLATE_ID,
        templateParams
    );
}

// Handle form submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Show loading state
    showLoading();
    
    try {
        // Send both emails concurrently
        await Promise.all([
            sendOwnerNotification(formData),
            sendConfirmationEmail(formData)
        ]);
        
        // Reset form
        contactForm.reset();
        
        // Reset validation classes
        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        // Reset character counter
        charCount.textContent = '0';
        progressFill.style.width = '0%';
        
        // Show success modal
        showSuccessModal();
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        
        // Show error modal with specific message
        let errorMessage = 'Failed to send message. Please try again.';
        if (error.text) {
            errorMessage = `Error: ${error.text}`;
        }
        showErrorModal(errorMessage);
        
    } finally {
        // Hide loading state
        hideLoading();
    }
});

// Real-time validation
document.getElementById('name').addEventListener('blur', function() {
    if (this.value.trim() && this.value.length >= 2) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    }
});

document.getElementById('email').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() && emailRegex.test(this.value)) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    }
});

document.getElementById('message').addEventListener('blur', function() {
    if (this.value.trim() && this.value.length >= 10) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    }
});

// Add some CSS for the loading spinner and modal animations
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        display: none;
        width: 16px;
        height: 16px;
        border: 2px solid #ffffff;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .character-count {
        font-size: 0.875rem;
        color: #6c757d;
        margin-top: 0.25rem;
    }
    
    .progress-bar {
        width: 100%;
        height: 3px;
        background-color: #e9ecef;
        border-radius: 1.5px;
        margin-top: 0.25rem;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background-color: #28a745;
        transition: width 0.3s ease, background-color 0.3s ease;
        border-radius: 1.5px;
    }
    
    .modal-content {
        border-radius: 1rem;
    }
    
    .success-icon, .error-icon {
        animation: scaleIn 0.5s ease-out;
    }
    
    @keyframes scaleIn {
        0% { transform: scale(0); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);