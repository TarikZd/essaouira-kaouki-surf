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

    // Test storage connection on page load
    window.addEventListener('load', async function() {
        console.log('Page loaded, testing storage connection...');
        const testResult = await window.testStorageConnection();
        if (testResult.success) {
            if (testResult.method === 'json') {
                console.log('✅ JSON storage method active - forms will save to localStorage');
                console.log('💡 To view saved data, check browser console or localStorage');
            } else {
                console.log('✅ Supabase connection successful');
            }
        } else {
            console.error('❌ Storage connection failed:', testResult.error);
        }
    });

    // Transfer form handling
    const transferForm = document.getElementById('transferForm');
    if (transferForm) {
        console.log('Transfer form found and event listener attached'); // Debug log
        transferForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Transfer form submitted'); // Debug log

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

            console.log('Transfer form data collected:', transferData); // Debug log

            // Validate form data
            if (validateTransferForm(transferData)) {
                console.log('Transfer form validation passed, attempting to save to JSON'); // Debug log
                try {
                    // Save to JSON
                    const result = await window.saveToJSON('transfers', transferData);

                    if (!result.success) {
                        console.error('❌ Error saving transfer:', result.error);
                        showMessage(`Error saving booking: ${result.error.message || 'Unknown error'}. Please try again.`, 'error');
                        return;
                    }

                    console.log('✅ Transfer saved successfully to localStorage:', result.data); // Debug log
                    console.log('💡 Check browser console or localStorage to view saved data');
                    // Show success message
                    showMessage('Transfer booked successfully! We\'ll contact you soon to confirm details.', 'success');

                    // Reset form
                    this.reset();
                } catch (error) {
                    console.error('❌ Unexpected error:', error);
                    showMessage('Error saving booking. Please try again.', 'error');
                }
            } else {
                console.log('❌ Transfer form validation failed'); // Debug log
            }
        });
    } else {
        console.log('❌ Transfer form not found'); // Debug log
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
                    // Save to JSON
                    const result = await window.saveToJSON('adventures', adventureData);

                    if (!result.success) {
                        console.error('❌ Error saving adventure:', result.error);
                        showMessage(`Error saving booking: ${result.error.message || 'Unknown error'}. Please try again.`, 'error');
                        return;
                    }

                    console.log('✅ Adventure saved successfully to localStorage:', result.data);
                    console.log('💡 Check browser console or localStorage to view saved data');
                    // Show success message
                    showMessage('Adventure booked successfully! We\'ll contact you soon to confirm details.', 'success');

                    // Reset form
                    this.reset();
                } catch (error) {
                    console.error('❌ Unexpected error:', error);
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
                    // Save to JSON
                    const result = await window.saveToJSON('contacts', contactData);

                    if (!result.success) {
                        console.error('❌ Error saving contact:', result.error);
                        showMessage(`Error sending message: ${result.error.message || 'Unknown error'}. Please try again.`, 'error');
                        return;
                    }

                    console.log('✅ Contact saved successfully to localStorage:', result.data);
                    console.log('💡 Check browser console or localStorage to view saved data');
                    // Show success message
                    showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');

                    // Reset form
                    this.reset();
                } catch (error) {
                    console.error('❌ Unexpected error:', error);
                    showMessage('Error sending message. Please try again.', 'error');
                }
            }
        });
    }

    // Souks form handling
    const souksForm = document.getElementById('souksForm');
    if (souksForm) {
        souksForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const souksData = {
                fullName: document.getElementById('souksFullName').value,
                email: document.getElementById('souksEmail').value,
                countryCode: document.getElementById('souksCountryCode').value,
                phoneNumber: document.getElementById('souksPhoneNumber').value,
                date: document.getElementById('souksDate').value,
                duration: document.getElementById('souksDuration').value,
                adults: document.getElementById('souksAdults').value,
                kids: document.getElementById('souksKids').value,
                specialRequests: document.getElementById('souksSpecialRequests').value,
                created_at: new Date().toISOString()
            };

            if (validateSouksForm(souksData)) {
                try {
                    // Save to JSON
                    const result = await window.saveToJSON('adventures', souksData);

                    if (!result.success) {
                        console.error('❌ Error saving souks booking:', result.error);
                        showMessage(`Error saving booking: ${result.error.message || 'Unknown error'}. Please try again.`, 'error');
                        return;
                    }

                    console.log('✅ Souks Adventure saved successfully to localStorage:', result.data);
                    console.log('💡 Check browser console or localStorage to view saved data');
                    showMessage('Souks Adventure booked successfully! We\'ll contact you soon to confirm details.', 'success');
                    this.reset();
                } catch (error) {
                    console.error('❌ Unexpected error:', error);
                    showMessage('Error saving booking. Please try again.', 'error');
                }
            }
        });
    }

    // Surf form handling
    const surfForm = document.getElementById('surfForm');
    if (surfForm) {
        surfForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const surfData = {
                fullName: document.getElementById('surfFullName').value,
                email: document.getElementById('surfEmail').value,
                countryCode: document.getElementById('surfCountryCode').value,
                phoneNumber: document.getElementById('surfPhoneNumber').value,
                skillLevel: document.getElementById('surfSkillLevel').value,
                date: document.getElementById('surfDate').value,
                duration: document.getElementById('surfDuration').value,
                adults: document.getElementById('surfAdults').value,
                teens: document.getElementById('surfTeens').value,
                equipment: document.getElementById('surfEquipment').value,
                specialRequests: document.getElementById('surfSpecialRequests').value,
                created_at: new Date().toISOString()
            };

            if (validateSurfForm(surfData)) {
                try {
                    // Save to JSON
                    const result = await window.saveToJSON('adventures', surfData);

                    if (!result.success) {
                        console.error('❌ Error saving surf booking:', result.error);
                        showMessage(`Error saving booking: ${result.error.message || 'Unknown error'}. Please try again.`, 'error');
                        return;
                    }

                    console.log('✅ Surf Experience saved successfully to localStorage:', result.data);
                    console.log('💡 Check browser console or localStorage to view saved data');
                    showMessage('Surf Experience booked successfully! We\'ll contact you soon to confirm details.', 'success');
                    this.reset();
                } catch (error) {
                    console.error('❌ Unexpected error:', error);
                    showMessage('Error saving booking. Please try again.', 'error');
                }
            }
        });
    }

    // Iftane form handling
    const iftaneForm = document.getElementById('iftaneForm');
    if (iftaneForm) {
        iftaneForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const iftaneData = {
                fullName: document.getElementById('iftaneFullName').value,
                email: document.getElementById('iftaneEmail').value,
                countryCode: document.getElementById('iftaneCountryCode').value,
                phoneNumber: document.getElementById('iftanePhoneNumber').value,
                skillLevel: document.getElementById('iftaneSkillLevel').value,
                date: document.getElementById('iftaneDate').value,
                mealPreference: document.getElementById('iftaneMealPreference').value,
                adults: document.getElementById('iftaneAdults').value,
                teens: document.getElementById('iftaneTeens').value,
                dietaryRestrictions: document.getElementById('iftaneDietaryRestrictions').value,
                specialRequests: document.getElementById('iftaneSpecialRequests').value,
                created_at: new Date().toISOString()
            };

            if (validateIftaneForm(iftaneData)) {
                try {
                    // Save to JSON
                    const result = await window.saveToJSON('adventures', iftaneData);

                    if (!result.success) {
                        console.error('❌ Error saving iftane booking:', result.error);
                        showMessage(`Error saving booking: ${result.error.message || 'Unknown error'}. Please try again.`, 'error');
                        return;
                    }

                    console.log('✅ Surf & Food Experience saved successfully to localStorage:', result.data);
                    console.log('💡 Check browser console or localStorage to view saved data');
                    showMessage('Surf & Food Experience booked successfully! We\'ll contact you soon to confirm details.', 'success');
                    this.reset();
                } catch (error) {
                    console.error('❌ Unexpected error:', error);
                    showMessage('Error saving booking. Please try again.', 'error');
                }
            }
        });
    }

    // Tafedna form handling
    const tafednaForm = document.getElementById('tafednaForm');
    if (tafednaForm) {
        tafednaForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const tafednaData = {
                fullName: document.getElementById('tafednaFullName').value,
                email: document.getElementById('tafednaEmail').value,
                countryCode: document.getElementById('tafednaCountryCode').value,
                phoneNumber: document.getElementById('tafednaPhoneNumber').value,
                skillLevel: document.getElementById('tafednaSkillLevel').value,
                date: document.getElementById('tafednaDate').value,
                mealPreference: document.getElementById('tafednaMealPreference').value,
                adults: document.getElementById('tafednaAdults').value,
                dietaryRestrictions: document.getElementById('tafednaDietaryRestrictions').value,
                specialRequests: document.getElementById('tafednaSpecialRequests').value,
                created_at: new Date().toISOString()
            };

            if (validateTafednaForm(tafednaData)) {
                try {
                    // Save to JSON
                    const result = await window.saveToJSON('adventures', tafednaData);

                    if (!result.success) {
                        console.error('❌ Error saving tafedna booking:', result.error);
                        showMessage(`Error saving booking: ${result.error.message || 'Unknown error'}. Please try again.`, 'error');
                        return;
                    }

                    console.log('✅ Tafedna Experience saved successfully to localStorage:', result.data);
                    console.log('💡 Check browser console or localStorage to view saved data');
                    showMessage('Tafedna Experience booked successfully! We\'ll contact you soon to confirm details.', 'success');
                    this.reset();
                } catch (error) {
                    console.error('❌ Unexpected error:', error);
                    showMessage('Error saving booking. Please try again.', 'error');
                }
            }
        });
    }

    // Fishing form handling
    const fishingForm = document.getElementById('fishingForm');
    if (fishingForm) {
        fishingForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const fishingData = {
                fullName: document.getElementById('fishingFullName').value,
                email: document.getElementById('fishingEmail').value,
                countryCode: document.getElementById('fishingCountryCode').value,
                phoneNumber: document.getElementById('fishingPhoneNumber').value,
                experience: document.getElementById('fishingExperience').value,
                date: document.getElementById('fishingDate').value,
                time: document.getElementById('fishingTime').value,
                adults: document.getElementById('fishingAdults').value,
                teens: document.getElementById('fishingTeens').value,
                dietaryRestrictions: document.getElementById('fishingDietaryRestrictions').value,
                specialRequests: document.getElementById('fishingSpecialRequests').value,
                created_at: new Date().toISOString()
            };

            if (validateFishingForm(fishingData)) {
                try {
                    // Save to JSON
                    const result = await window.saveToJSON('adventures', fishingData);

                    if (!result.success) {
                        console.error('❌ Error saving fishing booking:', result.error);
                        showMessage(`Error saving booking: ${result.error.message || 'Unknown error'}. Please try again.`, 'error');
                        return;
                    }

                    console.log('✅ Fishing Experience saved successfully to localStorage:', result.data);
                    console.log('💡 Check browser console or localStorage to view saved data');
                    showMessage('Fishing Experience booked successfully! We\'ll contact you soon to confirm details.', 'success');
                    this.reset();
                } catch (error) {
                    console.error('❌ Unexpected error:', error);
                    showMessage('Error saving booking. Please try again.', 'error');
                }
            }
        });
    }

    // Villages form handling
    const villagesForm = document.getElementById('villagesForm');
    if (villagesForm) {
        villagesForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const villagesData = {
                fullName: document.getElementById('villagesFullName').value,
                email: document.getElementById('villagesEmail').value,
                countryCode: document.getElementById('villagesCountryCode').value,
                phoneNumber: document.getElementById('villagesPhoneNumber').value,
                date: document.getElementById('villagesDate').value,
                focus: document.getElementById('villagesFocus').value,
                adults: document.getElementById('villagesAdults').value,
                kids: document.getElementById('villagesKids').value,
                dietaryRestrictions: document.getElementById('villagesDietaryRestrictions').value,
                specialRequests: document.getElementById('villagesSpecialRequests').value,
                created_at: new Date().toISOString()
            };

            if (validateVillagesForm(villagesData)) {
                try {
                    // Save to JSON
                    const result = await window.saveToJSON('adventures', villagesData);

                    if (!result.success) {
                        console.error('❌ Error saving villages booking:', result.error);
                        showMessage(`Error saving booking: ${result.error.message || 'Unknown error'}. Please try again.`, 'error');
                        return;
                    }

                    console.log('✅ Coastal Villages Tour saved successfully to localStorage:', result.data);
                    console.log('💡 Check browser console or localStorage to view saved data');
                    showMessage('Coastal Villages Tour booked successfully! We\'ll contact you soon to confirm details.', 'success');
                    this.reset();
                } catch (error) {
                    console.error('❌ Unexpected error:', error);
                    showMessage('Error saving booking. Please try again.', 'error');
                }
            }
        });
    }

    // Form validation functions
    function validateTransferForm(data) {
        console.log('Validating transfer form data:', data); // Debug log

        if (!data.fullName || !data.phoneNumber || !data.type || !data.pickupLocation || !data.dropoffLocation || !data.date || !data.time || !data.adults) {
            console.log('Missing required fields:', {
                fullName: !!data.fullName,
                phoneNumber: !!data.phoneNumber,
                type: !!data.type,
                pickupLocation: !!data.pickupLocation,
                dropoffLocation: !!data.dropoffLocation,
                date: !!data.date,
                time: !!data.time,
                adults: !!data.adults
            });
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

    function validateSouksForm(data) {
        if (!data.fullName || !data.email || !data.phoneNumber || !data.date || !data.duration || !data.adults) {
            showMessage('Please fill in all required fields for the souks adventure booking.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        if (new Date(data.date) < new Date()) {
            showMessage('Please select a future date for your souks adventure.', 'error');
            return false;
        }

        const totalParticipants = (parseInt(data.adults) || 0) + (parseInt(data.kids) || 0);
        if (totalParticipants < 1 || totalParticipants > 12) {
            showMessage('Total number of participants must be between 1 and 12.', 'error');
            return false;
        }

        if (parseInt(data.adults) < 1) {
            showMessage('At least one adult is required for the souks adventure.', 'error');
            return false;
        }

        return true;
    }

    function validateSurfForm(data) {
        if (!data.fullName || !data.email || !data.phoneNumber || !data.skillLevel || !data.date || !data.duration || !data.adults) {
            showMessage('Please fill in all required fields for the surf experience booking.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        if (new Date(data.date) < new Date()) {
            showMessage('Please select a future date for your surf experience.', 'error');
            return false;
        }

        const totalParticipants = (parseInt(data.adults) || 0) + (parseInt(data.teens) || 0);
        if (totalParticipants < 1 || totalParticipants > 8) {
            showMessage('Total number of participants must be between 1 and 8.', 'error');
            return false;
        }

        if (parseInt(data.adults) < 1) {
            showMessage('At least one adult is required for the surf experience.', 'error');
            return false;
        }

        return true;
    }

    function validateIftaneForm(data) {
        if (!data.fullName || !data.email || !data.phoneNumber || !data.skillLevel || !data.date || !data.adults) {
            showMessage('Please fill in all required fields for the surf & food experience booking.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        if (new Date(data.date) < new Date()) {
            showMessage('Please select a future date for your surf & food experience.', 'error');
            return false;
        }

        const totalParticipants = (parseInt(data.adults) || 0) + (parseInt(data.teens) || 0);
        if (totalParticipants < 1 || totalParticipants > 6) {
            showMessage('Total number of participants must be between 1 and 6.', 'error');
            return false;
        }

        if (parseInt(data.adults) < 1) {
            showMessage('At least one adult is required for the surf & food experience.', 'error');
            return false;
        }

        return true;
    }

    function validateTafednaForm(data) {
        if (!data.fullName || !data.email || !data.phoneNumber || !data.skillLevel || !data.date || !data.adults) {
            showMessage('Please fill in all required fields for the tafedna experience booking.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        if (new Date(data.date) < new Date()) {
            showMessage('Please select a future date for your tafedna experience.', 'error');
            return false;
        }

        if (parseInt(data.adults) < 1) {
            showMessage('At least one adult is required for the tafedna experience.', 'error');
            return false;
        }

        return true;
    }

    function validateFishingForm(data) {
        if (!data.fullName || !data.email || !data.phoneNumber || !data.experience || !data.date || !data.time || !data.adults) {
            showMessage('Please fill in all required fields for the fishing experience booking.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        if (new Date(data.date) < new Date()) {
            showMessage('Please select a future date for your fishing experience.', 'error');
            return false;
        }

        const totalParticipants = (parseInt(data.adults) || 0) + (parseInt(data.teens) || 0);
        if (totalParticipants < 1 || totalParticipants > 8) {
            showMessage('Total number of participants must be between 1 and 8.', 'error');
            return false;
        }

        if (parseInt(data.adults) < 1) {
            showMessage('At least one adult is required for the fishing experience.', 'error');
            return false;
        }

        return true;
    }

    function validateVillagesForm(data) {
        if (!data.fullName || !data.email || !data.phoneNumber || !data.date || !data.focus || !data.adults) {
            showMessage('Please fill in all required fields for the coastal villages tour booking.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        if (new Date(data.date) < new Date()) {
            showMessage('Please select a future date for your coastal villages tour.', 'error');
            return false;
        }

        const totalParticipants = (parseInt(data.adults) || 0) + (parseInt(data.kids) || 0);
        if (totalParticipants < 1 || totalParticipants > 10) {
            showMessage('Total number of participants must be between 1 and 10.', 'error');
            return false;
        }

        if (parseInt(data.adults) < 1) {
            showMessage('At least one adult is required for the coastal villages tour.', 'error');
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
