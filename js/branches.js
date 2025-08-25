/**
 * MAPOLY Alumni Branches Page JavaScript
 * Handles branch dropdown menu, modal functionality, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Dropdown Menu Toggle
    initMobileDropdown();
    
    // Branch Details Modal
    initBranchModal();
    
    // Smooth Scrolling for Anchor Links
    initSmoothScrolling();
    
    // Scroll Animation for Branch Cards
    initScrollAnimation();
});

/**
 * Initialize mobile dropdown menu functionality
 */
function initMobileDropdown() {
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
}

/**
 * Initialize branch details modal functionality
 */
function initBranchModal() {
    const modal = document.getElementById('branch-modal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.close-modal');
    const detailBtns = document.querySelectorAll('.branch-details-btn');
    
    // Branch data for modal content
    const branchData = {
        lagos: {
            name: 'Lagos Branch',
            location: 'Lagos, Nigeria',
            established: 'January 15, 1985',
            chairman: 'Dr. Oluwaseun Adebayo',
            email: 'lagos@mapolyalumni.org',
            phone: '+234 801 234 5678',
            address: '25 Marina Street, Lagos Island, Lagos',
            meetingSchedule: 'Last Saturday of every month, 12:00 PM',
            members: '2,500+',
            events: [
                { name: 'Annual Dinner & Awards Night', date: 'December 10, 2023' },
                { name: 'Career Networking Mixer', date: 'September 15, 2023' },
                { name: 'Community Service Day', date: 'October 21, 2023' }
            ],
            achievements: [
                'Raised ₦25 million for scholarship funds in 2022',
                'Established mentorship program connecting 500+ students with alumni',
                'Organized annual career fair with 50+ companies participating'
            ]
        },
        abuja: {
            name: 'Abuja Branch',
            location: 'Abuja, Nigeria',
            established: 'March 22, 1990',
            chairman: 'Mrs. Funke Akindele',
            email: 'abuja@mapolyalumni.org',
            phone: '+234 802 345 6789',
            address: '10 Constitution Avenue, Central District, Abuja',
            meetingSchedule: 'First Sunday of every month, 2:00 PM',
            members: '1,800+',
            events: [
                { name: 'Independence Day Celebration', date: 'October 1, 2023' },
                { name: 'End of Year Party', date: 'December 17, 2023' },
                { name: 'Professional Development Workshop', date: 'November 5, 2023' }
            ],
            achievements: [
                'Donated computer equipment to 5 schools in FCT',
                'Established alumni business network with 300+ members',
                'Hosted successful legislative advocacy program'
            ]
        },
        ogun: {
            name: 'Ogun Branch',
            location: 'Abeokuta, Ogun State',
            established: 'May 8, 1979',
            chairman: 'Mr. Babatunde Johnson',
            email: 'ogun@mapolyalumni.org',
            phone: '+234 803 456 7890',
            address: '15 MAPOLY Road, Abeokuta, Ogun State',
            meetingSchedule: 'Second Saturday of every month, 11:00 AM',
            members: '3,200+',
            events: [
                { name: 'Homecoming Weekend', date: 'November 25-26, 2023' },
                { name: 'Alumni Sports Festival', date: 'August 12, 2023' },
                { name: 'Annual General Meeting', date: 'January 20, 2024' }
            ],
            achievements: [
                'Renovated campus library with ₦15 million donation',
                'Established endowment fund worth ₦50 million',
                'Created alumni job portal connecting graduates with employers'
            ]
        },
        usa: {
            name: 'USA Branch',
            location: 'New York, USA',
            established: 'June 12, 2005',
            chairman: 'Dr. Olufemi Bakare',
            email: 'usa@mapolyalumni.org',
            phone: '+1 212 345 6789',
            address: '350 Fifth Avenue, New York, NY 10118',
            meetingSchedule: 'Virtual meetings on third Thursday of every month, 7:00 PM EST',
            members: '850+',
            events: [
                { name: 'Annual Convention', date: 'July 15-17, 2023' },
                { name: 'Thanksgiving Dinner', date: 'November 23, 2023' },
                { name: 'Summer Picnic', date: 'August 5, 2023' }
            ],
            achievements: [
                'Raised $50,000 for international student scholarships',
                'Established mentorship program for new Nigerian immigrants',
                'Created professional networking platform for members'
            ]
        }
    };
    
    // Open modal when detail button is clicked
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const branchId = this.getAttribute('data-branch');
            const branch = branchData[branchId];
            
            if (branch) {
                // Create modal content
                let modalContent = `
                    <div class="modal-header">
                        <h2>${branch.name}</h2>
                        <p><i class="fas fa-map-marker-alt"></i> ${branch.location}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Branch Information</h3>
                        <div class="modal-grid">
                            <div class="modal-info-item">
                                <i class="fas fa-calendar-alt"></i>
                                <div>
                                    <strong>Established:</strong>
                                    <p>${branch.established}</p>
                                </div>
                            </div>
                            <div class="modal-info-item">
                                <i class="fas fa-user"></i>
                                <div>
                                    <strong>Chairman:</strong>
                                    <p>${branch.chairman}</p>
                                </div>
                            </div>
                            <div class="modal-info-item">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <strong>Email:</strong>
                                    <p>${branch.email}</p>
                                </div>
                            </div>
                            <div class="modal-info-item">
                                <i class="fas fa-phone"></i>
                                <div>
                                    <strong>Phone:</strong>
                                    <p>${branch.phone}</p>
                                </div>
                            </div>
                            <div class="modal-info-item">
                                <i class="fas fa-map"></i>
                                <div>
                                    <strong>Address:</strong>
                                    <p>${branch.address}</p>
                                </div>
                            </div>
                            <div class="modal-info-item">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <strong>Meeting Schedule:</strong>
                                    <p>${branch.meetingSchedule}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Upcoming Events</h3>
                        <ul class="event-list">
                `;
                
                // Add events
                branch.events.forEach(event => {
                    modalContent += `
                        <li>
                            <span>${event.name}</span>
                            <span class="event-date">${event.date}</span>
                        </li>
                    `;
                });
                
                modalContent += `
                        </ul>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Key Achievements</h3>
                        <ul>
                `;
                
                // Add achievements
                branch.achievements.forEach(achievement => {
                    modalContent += `<li>${achievement}</li>`;
                });
                
                modalContent += `
                        </ul>
                    </div>
                `;
                
                // Set modal content and show modal
                modalBody.innerHTML = modalContent;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('.dropdown-menu a[href^="#"], .dropdown-menu a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navList = document.querySelector('.nav-list');
            if (navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // Scroll to target
            let targetId = this.getAttribute('href');
            // Extract the hash part if it's a full URL
            if (targetId.includes('#')) {
                targetId = '#' + targetId.split('#')[1];
            }
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Highlight the target branch card
                document.querySelectorAll('.branch-card').forEach(card => {
                    card.classList.remove('highlight');
                });
                targetElement.classList.add('highlight');
                
                // Remove highlight after 2 seconds
                setTimeout(() => {
                    targetElement.classList.remove('highlight');
                }, 2000);
            }
        });
    });
}

/**
 * Initialize scroll animation for branch cards
 */
function initScrollAnimation() {
    const branchCards = document.querySelectorAll('.branch-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each branch card
    branchCards.forEach(card => {
        observer.observe(card);
    });
}