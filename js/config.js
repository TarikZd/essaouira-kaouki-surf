// Configuration - JSON Storage Only
const STORAGE_METHOD = 'json'; // JSON storage for all forms

// JSON Storage Functions - Save to localStorage (simplified approach)
window.saveToJSON = function(formType, data) {
    try {
        console.log(`Saving ${formType} data to localStorage...`);

        // Add timestamp and ID
        const entryData = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...data
        };

        console.log('entryData created:', entryData);

        // Get existing data from localStorage
        let existingData = JSON.parse(localStorage.getItem(formType)) || [];

        // Make sure it's really an array (as suggested)
        if (!Array.isArray(existingData)) {
            existingData = [];
        }

        console.log('existingData before push:', existingData);
        console.log('Type:', typeof existingData, 'Is array:', Array.isArray(existingData));

        existingData.push(entryData);

        console.log('existingData after push:', existingData);

        localStorage.setItem(formType, JSON.stringify(existingData));

        console.log(`✅ ${formType} data saved to localStorage:`, entryData);
        return { success: true, data: entryData };

    } catch (error) {
        console.error('❌ Error saving data:', error);
        return { success: false, error: error };
    }
};

// Test storage connection
window.testStorageConnection = async function() {
    console.log('Using JSON storage method - no database required');
    return { success: true, method: 'json' };
};
