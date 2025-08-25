// Events Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize view toggle
    initViewToggle();
    
    // Initialize event filters
    initEventFilters();
    
    // Initialize gallery filters
    initGalleryFilters();
    
    // Initialize FullCalendar
    initCalendar();
    
    // Initialize gallery lightbox
    initLightbox();
    
    // Initialize load more buttons
    initLoadMoreButtons();
});

/**
 * Initializes the view toggle functionality between grid and calendar views
 */
function initViewToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const viewSections = document.querySelectorAll('.view-section');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            
            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active view
            viewSections.forEach(section => {
                if (section.id === `${view}-view`) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Refresh calendar if switching to calendar view
            if (view === 'calendar' && calendar) {
                setTimeout(() => {
                    calendar.updateSize();
                }, 10);
            }
        });
    });
}

/**
 * Initializes the event filtering functionality
 */
function initEventFilters() {
    const filterButton = document.getElementById('filter-button');
    const eventTypeSelect = document.getElementById('event-type');
    const eventLocationSelect = document.getElementById('event-location');
    const eventDateSelect = document.getElementById('event-date');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (!filterButton) return;
    
    filterButton.addEventListener('click', () => {
        const typeFilter = eventTypeSelect.value;
        const locationFilter = eventLocationSelect.value;
        const dateFilter = eventDateSelect.value;
        
        eventCards.forEach(card => {
            let showCard = true;
            
            // Filter by type
            if (typeFilter !== 'all' && card.getAttribute('data-type') !== typeFilter) {
                showCard = false;
            }
            
            // Filter by location
            if (locationFilter !== 'all' && card.getAttribute('data-location') !== locationFilter) {
                showCard = false;
            }
            
            // Date filtering would require actual date comparison logic
            // For demo purposes, we'll just show all cards when date filter is applied
            
            // Show or hide card
            if (showCard) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update load more button visibility
        updateLoadMoreButton();
    });
}

/**
 * Updates the visibility of the load more button based on visible event cards
 */
function updateLoadMoreButton() {
    const visibleCards = document.querySelectorAll('.event-card[style="display: flex;"]');
    const loadMoreButton = document.querySelector('.load-more .btn');
    
    if (loadMoreButton) {
        if (visibleCards.length === 0) {
            loadMoreButton.style.display = 'none';
            
            // Show no results message
            let noResults = document.querySelector('.no-results');
            if (!noResults) {
                noResults = document.createElement('p');
                noResults.className = 'no-results';
                noResults.textContent = 'No events match your filter criteria.';
                noResults.style.textAlign = 'center';
                noResults.style.marginTop = '30px';
                noResults.style.fontSize = '1.1rem';
                noResults.style.color = '#666';
                
                const eventsGrid = document.querySelector('.events-grid');
                eventsGrid.after(noResults);
            }
        } else {
            loadMoreButton.style.display = 'inline-block';
            
            // Remove no results message if it exists
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
        }
    }
}

/**
 * Initializes the gallery filtering functionality
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Global calendar variable
let calendar;

/**
 * Initializes the FullCalendar component
 */
function initCalendar() {
    const calendarEl = document.getElementById('events-calendar');
    if (!calendarEl) return;
    
    // Sample event data
    const events = [
        {
            title: 'Annual Alumni Networking Mixer',
            start: '2023-06-15T18:00:00',
            end: '2023-06-15T21:00:00',
            className: 'fc-event-networking',
            extendedProps: {
                location: 'Radisson Blu Hotel, Lagos',
                type: 'networking'
            }
        },
        {
            title: 'Career Development Workshop',
            start: '2023-06-22T10:00:00',
            end: '2023-06-22T12:00:00',
            className: 'fc-event-workshop',
            extendedProps: {
                location: 'Online (Zoom)',
                type: 'workshop'
            }
        },
        {
            title: 'Class of 2010 Reunion',
            start: '2023-07-08T12:00:00',
            end: '2023-07-08T18:00:00',
            className: 'fc-event-reunion',
            extendedProps: {
                location: 'MAPOLY Campus, Abeokuta',
                type: 'reunion'
            }
        },
        {
            title: 'Scholarship Fundraising Gala',
            start: '2023-07-20T19:00:00',
            end: '2023-07-20T23:00:00',
            className: 'fc-event-fundraising',
            extendedProps: {
                location: 'Transcorp Hilton, Abuja',
                type: 'fundraising'
            }
        },
        {
            title: 'Alumni Family Day',
            start: '2023-08-05T11:00:00',
            end: '2023-08-05T16:00:00',
            className: 'fc-event-social',
            extendedProps: {
                location: 'Lekki Conservation Centre, Lagos',
                type: 'social'
            }
        },
        {
            title: 'Entrepreneurship Masterclass',
            start: '2023-08-12T09:00:00',
            end: '2023-08-12T15:00:00',
            className: 'fc-event-workshop',
            extendedProps: {
                location: 'MAPOLY Business School, Abeokuta',
                type: 'workshop'
            }
        }
    ];
    
    // Initialize FullCalendar
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listMonth'
        },
        events: events,
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: true
        },
        eventClick: function(info) {
            showEventDetails(info.event);
        },
        height: 'auto'
    });
    
    calendar.render();
}

/**
 * Shows event details in a modal when an event is clicked in the calendar
 * @param {Object} event - The FullCalendar event object
 */
function showEventDetails(event) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('event-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'event-modal';
        modal.className = 'event-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .event-modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.7);
            }
            
            .modal-content {
                background-color: #fff;
                margin: 10% auto;
                padding: 30px;
                border-radius: 8px;
                max-width: 500px;
                position: relative;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 28px;
                font-weight: bold;
                color: #666;
                cursor: pointer;
            }
            
            .close-modal:hover {
                color: #000;
            }
            
            .event-modal-title {
                font-family: 'Montserrat', sans-serif;
                font-weight: 700;
                font-size: 1.5rem;
                color: #1C1A64;
                margin-bottom: 15px;
            }
            
            .event-modal-detail {
                margin-bottom: 10px;
                display: flex;
                align-items: flex-start;
                gap: 10px;
            }
            
            .event-modal-detail i {
                color: #1C1A64;
                margin-top: 3px;
            }
            
            .event-modal-actions {
                margin-top: 25px;
                text-align: center;
            }
        `;
        document.head.appendChild(style);
        
        // Close modal when clicking on X or outside the modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Populate modal with event details
    const modalBody = modal.querySelector('.modal-body');
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };
    
    // Get event type and format it
    const eventType = event.extendedProps.type;
    const formattedType = eventType.charAt(0).toUpperCase() + eventType.slice(1);
    
    modalBody.innerHTML = `
        <h3 class="event-modal-title">${event.title}</h3>
        
        <div class="event-modal-detail">
            <i class="fas fa-calendar"></i>
            <div>${formatDate(eventStart)}</div>
        </div>
        
        <div class="event-modal-detail">
            <i class="fas fa-clock"></i>
            <div>${formatTime(eventStart)} - ${formatTime(eventEnd)}</div>
        </div>
        
        <div class="event-modal-detail">
            <i class="fas fa-map-marker-alt"></i>
            <div>${event.extendedProps.location}</div>
        </div>
        
        <div class="event-modal-detail">
            <i class="fas fa-tag"></i>
            <div>${formattedType}</div>
        </div>
        
        <div class="event-modal-actions">
            <button class="btn btn-primary">RSVP Now</button>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'block';
}

/**
 * Initializes the lightbox for gallery images
 */
function initLightbox() {
    // Check if SimpleLightbox is available
    if (typeof SimpleLightbox !== 'undefined') {
        new SimpleLightbox('.gallery-link', {
            captionsData: 'alt',
            captionDelay: 250,
            animationSpeed: 250,
            fadeSpeed: 300
        });
    } else {
        // Fallback for when SimpleLightbox is not available
        console.log('SimpleLightbox not loaded. Using basic image links.');
        
        // Make gallery links open in new tab
        document.querySelectorAll('.gallery-link').forEach(link => {
            link.setAttribute('target', '_blank');
        });
    }
}

/**
 * Initializes the load more buttons functionality
 */
function initLoadMoreButtons() {
    // Load more events
    const loadMoreEventsBtn = document.querySelector('.load-more .btn');
    if (loadMoreEventsBtn) {
        loadMoreEventsBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            
            // Simulate loading delay
            setTimeout(() => {
                this.textContent = 'No More Events';
                this.disabled = true;
                this.classList.add('disabled');
            }, 1000);
        });
    }
    
    // Load more gallery photos
    const loadMoreGalleryBtn = document.querySelector('.gallery-load-more .btn');
    if (loadMoreGalleryBtn) {
        loadMoreGalleryBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            
            // Simulate loading delay
            setTimeout(() => {
                this.textContent = 'No More Photos';
                this.disabled = true;
                this.classList.add('disabled');
            }, 1000);
        });
    }
}