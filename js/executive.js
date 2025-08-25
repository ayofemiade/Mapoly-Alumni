// Executive Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize executive card hover effects
    initExecutiveCards();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
});

/**
 * Initializes hover effects and interactions for executive cards
 */
function initExecutiveCards() {
    const executiveCards = document.querySelectorAll('.executive-card');
    
    executiveCards.forEach(card => {
        // Add hover effect class for touch devices
        card.addEventListener('touchstart', function() {
            this.classList.add('hover-active');
        }, {passive: true});
        
        // Remove hover effect class when touch moves away
        document.addEventListener('touchstart', function(e) {
            if (!card.contains(e.target)) {
                card.classList.remove('hover-active');
            }
        }, {passive: true});
        
        // Add click event to show more info on mobile
        card.addEventListener('click', function(e) {
            // Only trigger for mobile devices
            if (window.innerWidth <= 768) {
                // Don't trigger if clicking on a link
                if (e.target.tagName.toLowerCase() !== 'a') {
                    this.classList.toggle('show-details');
                }
            }
        });
    });
}

/**
 * Initializes smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Get header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                // Calculate position to scroll to
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Adds animation to elements when they come into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.executive-card, .region-card');
    
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
        observer.observe(element);
    });
}

// Initialize scroll animations if IntersectionObserver is supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
}