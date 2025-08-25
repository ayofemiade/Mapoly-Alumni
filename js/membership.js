// Membership Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Populate graduation year dropdown
    populateGraduationYears();
    
    // Initialize FAQ toggles
    initFaqToggles();
    
    // Form validation
    initFormValidation();
});

/**
 * Populates the graduation year dropdown with years from 1979 to current year
 */
function populateGraduationYears() {
    const graduationYearSelect = document.getElementById('graduationYear');
    if (!graduationYearSelect) return;
    
    const currentYear = new Date().getFullYear();
    const startYear = 1979; // MAPOLY founding year
    
    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        graduationYearSelect.appendChild(option);
    }
}

/**
 * Initializes the FAQ accordion functionality
 */
function initFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Update the icon
            const icon = item.querySelector('.faq-toggle i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
}

/**
 * Initializes form validation for the registration form
 */
function initFormValidation() {
    const registrationForm = document.querySelector('.registration-form');
    if (!registrationForm) return;
    
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm(this)) {
            // Show success message
            showFormMessage('success', 'Registration submitted successfully! We will review your application and contact you soon.');
            
            // In a real application, you would send the form data to the server here
            // For demo purposes, we'll just reset the form after a delay
            setTimeout(() => {
                registrationForm.reset();
            }, 3000);
        }
    });
}

/**
 * Validates the registration form
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Remove any existing error messages
    const existingErrors = form.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Reset all fields styling
    const allFields = form.querySelectorAll('input, select, textarea');
    allFields.forEach(field => {
        field.classList.remove('error');
    });
    
    // Validate each required field
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate email format
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value.trim() && !isValidEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone number (basic validation)
    const phoneField = form.querySelector('#phone');
    if (phoneField && phoneField.value.trim() && !isValidPhone(phoneField.value)) {
        showError(phoneField, 'Please enter a valid phone number');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Shows an error message for a form field
 * @param {HTMLElement} field - The field with an error
 * @param {string} message - The error message to display
 */
function showError(field, message) {
    field.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    const parent = field.parentElement;
    parent.appendChild(errorMessage);
}

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates a phone number (basic validation)
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
function isValidPhone(phone) {
    // Basic validation - at least 10 digits
    const phoneRegex = /^\+?[0-9\s-()]{10,}$/;
    return phoneRegex.test(phone);
}

/**
 * Shows a form message (success or error)
 * @param {string} type - The message type ('success' or 'error')
 * @param {string} message - The message to display
 */
function showFormMessage(type, message) {
    // Remove any existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    const formContainer = document.querySelector('.form-container');
    const formSubmit = document.querySelector('.form-submit');
    
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}-message`;
    messageElement.textContent = message;
    
    if (formSubmit) {
        formSubmit.insertAdjacentElement('beforebegin', messageElement);
    } else if (formContainer) {
        formContainer.appendChild(messageElement);
    }
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS for form validation
addFormValidationStyles();

/**
 * Adds CSS styles for form validation
 */
function addFormValidationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #ff3860 !important;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 0.85rem;
            margin-top: 5px;
        }
        
        .form-message {
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .success-message {
            background-color: #23d160;
            color: white;
        }
        
        .error-message {
            background-color: #ff3860;
            color: white;
        }
    `;
    document.head.appendChild(style);
}