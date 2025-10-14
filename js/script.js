// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Security features
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+C
    document.addEventListener('keydown', function(e) {
        // Disable F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 67)) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+U (view source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
    });

    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

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
        transferForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data using form elements directly
            const transferData = {
                fullName: document.getElementById('fullName').value,
                countryCode: document.getElementById('countryCode').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                type: document.getElementById('transferType').value,
                pickupLocation: document.getElementById('pickupLocation').value,
                dropoffLocation: document.getElementById('dropoffLocation').value,
                date: document.getElementById('transferDate').value,
                time: document.getElementById('transferTime').value,
                adults: document.getElementById('adults').value,
                kids: document.getElementById('kids').value,
                babies: document.getElementById('babies').value,
                created_at: new Date().toISOString()
            };

            // Validate form data
            if (validateTransferForm(transferData)) {
                try {
                    // Save to Supabase
                    const { data, error } = await window.supabaseClient
                        .from('transfers')
                        .insert([transferData]);

                    if (error) {
                        console.error('Error saving transfer:', error);
                        showMessage('Error saving booking. Please try again.', 'error');
                        return;
                    }

                    // Show success message
                    showMessage('Transfer booked successfully! We\'ll contact you soon to confirm details.', 'success');

                    // Reset form
                    this.reset();
                } catch (error) {
                    console.error('Error:', error);
                    showMessage('Error saving booking. Please try again.', 'error');
                }
            }
        });
    }

    // Adventure form handling
    const adventureForm = document.getElementById('adventureForm');
    if (adventureForm) {
        adventureForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data using form elements directly
            const adventureData = {
                fullName: document.getElementById('adventureFullName').value,
                countryCode: document.getElementById('adventureCountryCode').value,
                phoneNumber: document.getElementById('adventurePhoneNumber').value,
                type: document.getElementById('adventureType').value,
                date: document.getElementById('adventureDate').value,
                duration: document.getElementById('adventureDuration').value,
                adults: document.getElementById('adventureAdults').value,
                kids: document.getElementById('adventureKids').value,
                babies: document.getElementById('adventureBabies').value,
                specialRequests: document.getElementById('specialRequests').value,
                created_at: new Date().toISOString()
            };

            // Validate form data
            if (validateAdventureForm(adventureData)) {
                try {
                    // Save to Supabase
                    const { data, error } = await window.supabaseClient
                        .from('adventures')
                        .insert([adventureData]);

                    if (error) {
                        console.error('Error saving adventure:', error);
                        showMessage('Error saving booking. Please try again.', 'error');
                        return;
                    }

                    // Show success message
                    showMessage('Adventure booked successfully! We\'ll contact you soon to confirm details.', 'success');

                    // Reset form
                    this.reset();
                } catch (error) {
                    console.error('Error:', error);
                    showMessage('Error saving booking. Please try again.', 'error');
                }
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data using form elements directly
            const contactData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value || null,
                subject: document.getElementById('contactSubject').value || null,
                message: document.getElementById('contactMessage').value,
                created_at: new Date().toISOString()
            };

            // Validate form data
            if (validateContactForm(contactData)) {
                try {
                    // Save to Supabase
                    const { data, error } = await window.supabaseClient
                        .from('contacts')
                        .insert([contactData]);

                    if (error) {
                        console.error('Error saving contact:', error);
                        showMessage('Error sending message. Please try again.', 'error');
                        return;
                    }

                    // Show success message
                    showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');

                    // Reset form
                    this.reset();
                } catch (error) {
                    console.error('Error:', error);
                    showMessage('Error sending message. Please try again.', 'error');
                }
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
