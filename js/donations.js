// Donations Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize donation amount input
    initDonationAmount();
    
    // Initialize donation tiers
    initDonationTiers();
    
    // Initialize payment options
    initPaymentOptions();
    
    // Initialize FAQ toggles
    initFaqToggles();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Initialize donation amount input
function initDonationAmount() {
    const donationAmountInput = document.getElementById('donationAmount');
    if (!donationAmountInput) return;
    
    // Format the input as currency
    donationAmountInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        // Remove non-numeric characters
        value = value.replace(/[^0-9]/g, '');
        
        // Format with commas for thousands
        if (value.length > 0) {
            value = parseInt(value).toLocaleString('en-NG');
        }
        
        e.target.value = value;
    });
}

// Initialize donation tiers
function initDonationTiers() {
    const donationTiers = document.querySelectorAll('.donation-tier');
    const selectedOptionText = document.querySelector('.selected-option h3');
    const selectedOptionDesc = document.querySelector('.selected-option p');
    const donationAmountInput = document.getElementById('donationAmount');
    
    if (!donationTiers.length || !selectedOptionText || !donationAmountInput) return;
    
    donationTiers.forEach(tier => {
        tier.addEventListener('click', function() {
            // Get tier data
            const tierName = this.querySelector('.tier-name').textContent;
            const tierAmount = this.querySelector('.tier-header h3').textContent;
            const tierDesc = this.querySelector('.tier-description').textContent;
            
            // Update selected option in form
            selectedOptionText.textContent = tierName;
            if (selectedOptionDesc) {
                selectedOptionDesc.textContent = tierDesc;
            }
            
            // Update donation amount (remove currency symbol and commas)
            const amount = tierAmount.replace(/[^0-9]/g, '');
            donationAmountInput.value = parseInt(amount).toLocaleString('en-NG');
            
            // Scroll to form
            document.querySelector('.donation-form-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Initialize payment options
function initPaymentOptions() {
    const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
    const paystackFields = document.getElementById('paystackFields');
    const bankTransferFields = document.getElementById('bankTransferFields');
    
    if (!paymentOptions.length) return;
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'paystack' && paystackFields) {
                paystackFields.style.display = 'block';
                if (bankTransferFields) bankTransferFields.style.display = 'none';
            } else if (this.value === 'bank' && bankTransferFields) {
                bankTransferFields.style.display = 'block';
                if (paystackFields) paystackFields.style.display = 'none';
            }
        });
    });
    
    // Trigger change event on the checked option
    const checkedOption = document.querySelector('input[name="paymentMethod"]:checked');
    if (checkedOption) {
        checkedOption.dispatchEvent(new Event('change'));
    }
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

// Initialize form validation
function initFormValidation() {
    const donationForm = document.getElementById('donationForm');
    
    if (!donationForm) return;
    
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form fields
        if (validateForm(donationForm)) {
            // Show success message or redirect
            showFormMessage('success', 'Thank you for your donation! We will process your contribution shortly.');
            
            // In a real implementation, you would submit the form data to a server
            // or integrate with Paystack API here
            
            // For demo purposes, reset the form after 3 seconds
            setTimeout(() => {
                donationForm.reset();
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
    
    // Validate donation amount
    const donationAmount = document.getElementById('donationAmount');
    if (donationAmount && donationAmount.value.trim()) {
        const amount = parseInt(donationAmount.value.replace(/[^0-9]/g, ''));
        if (isNaN(amount) || amount <= 0) {
            showError(donationAmount, 'Please enter a valid donation amount');
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
    errorDiv.style.color = '#d9534f';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    
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
    
    // Style based on type
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#dff0d8';
        messageDiv.style.color = '#3c763d';
    } else {
        messageDiv.style.backgroundColor = '#f2dede';
        messageDiv.style.color = '#a94442';
    }
    
    messageDiv.style.padding = '15px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.marginBottom = '20px';
    
    // Insert before the submit button
    formActions.insertBefore(messageDiv, formActions.firstChild);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.impact-card, .donation-tier, .campaign-card');
    
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