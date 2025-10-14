// Configuration - JSON Storage Only
const STORAGE_METHOD = 'json'; // JSON storage for all forms

// JSON Storage Functions - Save to server API
window.saveToJSON = async function(formType, data) {
    try {
        console.log(`Saving ${formType} data to server...`);

        // Send data to server API
        const response = await fetch('/api/save-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formType: formType,
                data: data
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Server error');
        }

        if (result.success) {
            // Also save to localStorage as backup
            let existingData = [];
            try {
                const backupData = localStorage.getItem(`${formType}_backup`);
                if (backupData) {
                    existingData = JSON.parse(backupData);
                }
            } catch (e) {
                console.log('No existing localStorage backup');
            }

            existingData.push({
                id: result.data.id,
                timestamp: result.data.timestamp,
                ...data
            });

            localStorage.setItem(`${formType}_backup`, JSON.stringify(existingData));

            console.log(`✅ ${formType} data saved to server and localStorage:`, result.data);
            return { success: true, data: result.data };
        } else {
            throw new Error(result.error || 'Save failed');
        }

    } catch (error) {
        console.error('❌ Error saving to server:', error);

        // Fallback: save to localStorage only
        console.log('🔄 Falling back to localStorage only...');
        try {
            let existingData = [];
            try {
                const backupData = localStorage.getItem(`${formType}_backup`);
                if (backupData) {
                    existingData = JSON.parse(backupData);
                }
            } catch (e) {
                console.log('No existing localStorage backup');
            }

            const fallbackData = {
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...data
            };

            existingData.push(fallbackData);
            localStorage.setItem(`${formType}_backup`, JSON.stringify(existingData));

            console.log(`✅ ${formType} data saved to localStorage (fallback):`, fallbackData);
            return { success: true, data: fallbackData, fallback: true };

        } catch (fallbackError) {
            console.error('❌ Fallback save also failed:', fallbackError);
            return { success: false, error: fallbackError };
        }
    }
};

// Test storage connection
window.testStorageConnection = async function() {
    console.log('Using JSON storage method - no database required');
    return { success: true, method: 'json' };
};
