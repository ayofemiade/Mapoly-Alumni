// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initFormValidation();
    
    // Initialize FAQ toggles
    initFaqToggles();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Initialize form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form fields
        if (validateForm(contactForm)) {
            // Show success message
            showFormMessage('success', 'Thank you for your message! We will get back to you shortly.');
            
            // In a real implementation, you would submit the form data to a server
            // For demo purposes, reset the form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
            }, 3000);
        }
    });
}

// Validate form fields
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Clear previous error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    // Check required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate email format if email field exists
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

// Show error message for a field
function showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#d9534f';
    
    // Remove error styling on input
    field.addEventListener('input', function() {
        field.style.borderColor = '';
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

// Show form message (success/error)
function showFormMessage(type, message) {
    const formActions = document.querySelector('.form-actions');
    if (!formActions) return;
    
    // Remove any existing messages
    const existingMessage = formActions.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert before the submit button
    formActions.insertBefore(messageDiv, formActions.firstChild);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Initialize FAQ toggles
function initFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class
            item.classList.toggle('active');
            
            // Close other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// Initialize newsletter form
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    if (!newsletterForms.length) return;
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            if (!emailInput) return;
            
            if (validateEmail(emailInput.value)) {
                // Show success message
                const formParent = form.parentNode;
                const successMessage = document.createElement('div');
                successMessage.className = 'form-message success';
                successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                successMessage.style.marginTop = '15px';
                
                // Remove any existing messages
                const existingMessage = formParent.querySelector('.form-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                formParent.appendChild(successMessage);
                
                // Reset form
                form.reset();
            } else {
                // Show error message
                const formParent = form.parentNode;
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-message error';
                errorMessage.textContent = 'Please enter a valid email address.';
                errorMessage.style.marginTop = '15px';
                
                // Remove any existing messages
                const existingMessage = formParent.querySelector('.form-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                formParent.appendChild(errorMessage);
            }
        });
    });
}

// Validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.contact-info-card, .form-container, .faq-item');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    // Add CSS for animated elements
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
}