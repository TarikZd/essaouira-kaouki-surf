// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Update hamburger icon
            const span = menuToggle.querySelector('span');
            if (navMenu.classList.contains('active')) {
                span.textContent = '✕';
            } else {
                span.textContent = '☰';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const span = menuToggle.querySelector('span');
                span.textContent = '☰';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const span = menuToggle.querySelector('span');
                span.textContent = '☰';
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Transfer form handling
    const transferForm = document.getElementById('transferForm');
    if (transferForm) {
        transferForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const transferData = {
                fullName: formData.get('fullName'),
                countryCode: formData.get('countryCode'),
                phoneNumber: formData.get('phoneNumber'),
                type: formData.get('transferType'),
                pickupLocation: formData.get('pickupLocation'),
                dropoffLocation: formData.get('dropoffLocation'),
                date: formData.get('transferDate'),
                time: formData.get('transferTime'),
                adults: formData.get('adults'),
                kids: formData.get('kids'),
                babies: formData.get('babies')
            };

            // Validate form data
            if (validateTransferForm(transferData)) {
                // Simulate booking submission
                submitBooking('transfer', transferData);
            }
        });
    }

    // Adventure form handling
    const adventureForm = document.getElementById('adventureForm');
    if (adventureForm) {
        adventureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const adventureData = {
                fullName: formData.get('adventureFullName'),
                countryCode: formData.get('adventureCountryCode'),
                phoneNumber: formData.get('adventurePhoneNumber'),
                type: formData.get('adventureType'),
                date: formData.get('adventureDate'),
                duration: formData.get('adventureDuration'),
                adults: formData.get('adventureAdults'),
                kids: formData.get('adventureKids'),
                babies: formData.get('adventureBabies'),
                specialRequests: formData.get('specialRequests')
            };

            // Validate form data
            if (validateAdventureForm(adventureData)) {
                // Simulate booking submission
                submitBooking('adventure', adventureData);
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('contactName'),
                email: formData.get('contactEmail'),
                message: formData.get('contactMessage')
            };

            // Validate form data
            if (validateContactForm(contactData)) {
                // Simulate message submission
                submitContact(contactData);
            }
        });
    }

    // Form validation functions
    function validateTransferForm(data) {
        if (!data.fullName || !data.phoneNumber || !data.type || !data.pickupLocation || !data.dropoffLocation || !data.date || !data.time || !data.adults) {
            showMessage('Please fill in all required fields for the transfer booking.', 'error');
            return false;
        }

        if (new Date(data.date) < new Date()) {
            showMessage('Please select a future date for your transfer.', 'error');
            return false;
        }

        const totalPassengers = (parseInt(data.adults) || 0) + (parseInt(data.kids) || 0) + (parseInt(data.babies) || 0);
        if (totalPassengers < 1 || totalPassengers > 8) {
            showMessage('Total number of passengers must be between 1 and 8.', 'error');
            return false;
        }

        if (parseInt(data.adults) < 1) {
            showMessage('At least one adult is required for the transfer.', 'error');
            return false;
        }

        return true;
    }

    function validateAdventureForm(data) {
        if (!data.fullName || !data.phoneNumber || !data.type || !data.date || !data.duration || !data.adults) {
            showMessage('Please fill in all required fields for the adventure booking.', 'error');
            return false;
        }

        if (new Date(data.date) < new Date()) {
            showMessage('Please select a future date for your adventure.', 'error');
            return false;
        }

        const totalParticipants = (parseInt(data.adults) || 0) + (parseInt(data.kids) || 0) + (parseInt(data.babies) || 0);
        if (totalParticipants < 1 || totalParticipants > 12) {
            showMessage('Total number of participants must be between 1 and 12.', 'error');
            return false;
        }

        if (parseInt(data.adults) < 1) {
            showMessage('At least one adult is required for the adventure.', 'error');
            return false;
        }

        return true;
    }

    function validateContactForm(data) {
        if (!data.name || !data.email || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        return true;
    }

    // Booking submission simulation
    function submitBooking(type, data) {
        // Show loading state
        const submitButton = document.querySelector(`#${type}Form .submit-button`);
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Booking...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Show success message
            showMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} booked successfully! We'll contact you soon to confirm details.`, 'success');
            
            // Reset form
            document.getElementById(`${type}Form`).reset();
        }, 2000);
    }

    // Contact submission simulation
    function submitContact(data) {
        // Show loading state
        const submitButton = document.querySelector('#contactForm .submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Show success message
            showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            document.getElementById('contactForm').reset();
        }, 1500);
    }

    // Message display function
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            max-width: 300px;
            word-wrap: break-word;
            background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;

        // Add to page
        document.body.appendChild(messageDiv);

        // Remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Add some interactive animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe booking sections for animation
    const sections = document.querySelectorAll('.booking-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
