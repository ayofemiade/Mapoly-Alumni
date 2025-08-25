/**
 * MAPOLY Alumni Website JavaScript
 * Handles responsive navigation, sliders, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navList && navList.classList.contains('active') && 
            !event.target.closest('.main-nav') && 
            !event.target.closest('.mobile-menu-toggle')) {
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Mobile Dropdown Menu Toggle
    const hasDropdown = document.querySelector('.has-dropdown');
    
    if (hasDropdown) {
        // For mobile: toggle dropdown on click
        if (window.innerWidth < 992) {
            const dropdownToggle = hasDropdown.querySelector('a');
            
            dropdownToggle.addEventListener('click', function(e) {
                // Only prevent default if we're in mobile view
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    hasDropdown.classList.toggle('active');
                }
            });
        }
        
        // Handle resize events to reset dropdown state
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                hasDropdown.classList.remove('active');
            }
        });
    }
    
    // Events Slider
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const slides = document.querySelectorAll('.slide');
    
    if (slider && prevBtn && nextBtn && slides.length > 0) {
        let currentIndex = 0;
        let slideWidth;
        
        // Calculate how many slides to show based on screen width
        function calculateSlidesPerView() {
            const screenWidth = window.innerWidth;
            if (screenWidth < 768) {
                return 1; // Mobile: 1 slide
            } else if (screenWidth < 992) {
                return 2; // Tablet: 2 slides
            } else {
                return 3; // Desktop: 3 slides
            }
        }
        
        // Update slider position
        function updateSlider() {
            const slidesPerView = calculateSlidesPerView();
            slideWidth = 100 / slidesPerView;
            
            // Set width for each slide
            slides.forEach(slide => {
                slide.style.minWidth = `${slideWidth}%`;
            });
            
            // Ensure currentIndex is within bounds
            const maxIndex = Math.max(0, slides.length - slidesPerView);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            
            // Move slider to current position
            slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === maxIndex;
            prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
            nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        }
        
        // Initialize slider
        updateSlider();
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const slidesPerView = calculateSlidesPerView();
            if (currentIndex < slides.length - slidesPerView) {
                currentIndex++;
                updateSlider();
            }
        });
        
        // Update slider on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateSlider, 250);
        });
    }
    
    // Sticky Header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('sticky');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                // Calculate header height for offset
                const headerHeight = header ? header.offsetHeight : 0;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                    
                    // Create error message if it doesn't exist
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                    
                    // Email validation
                    if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
                        valid = false;
                        field.classList.add('error');
                        
                        const emailError = document.createElement('div');
                        emailError.classList.add('error-message');
                        emailError.textContent = 'Please enter a valid email address';
                        field.parentNode.insertBefore(emailError, field.nextSibling);
                    }
                }
            });
            
            if (!valid) {
                e.preventDefault();
            } else {
                // For demo purposes, prevent actual form submission
                if (form.classList.contains('newsletter-form')) {
                    e.preventDefault();
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.classList.add('success-message');
                    successMsg.textContent = 'Thank you for subscribing!';
                    form.innerHTML = '';
                    form.appendChild(successMsg);
                }
            }
        });
        
        // Clear error on input
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
                
                const errorMsg = this.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });
        });
    });
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.pageYOffset;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animated');
            }
        });
    }
    
    // Add animation classes to elements
    document.querySelectorAll('.stat-item').forEach(item => {
        item.classList.add('animate-on-scroll');
    });
    
    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.classList.add('animate-on-scroll');
    });
    
    // Check elements on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
});