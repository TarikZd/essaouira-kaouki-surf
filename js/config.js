// Configuration - JSON Storage Only
const STORAGE_METHOD = 'json'; // JSON storage for all forms

// JSON Storage Functions - Save directly to JSON files
window.saveToJSON = async function(formType, data) {
    try {
        console.log(`Saving ${formType} data to JSON file...`);

        // Get existing data from JSON file
        let existingData = [];
        try {
            const response = await fetch(`data/${formType}.json`);
            if (response.ok) {
                existingData = await response.json();
            }
        } catch (e) {
            console.log('No existing file, creating new one');
        }

        // Add new entry with timestamp
        data.id = Date.now().toString();
        data.timestamp = new Date().toISOString();
        existingData.push(data);

        // Save to localStorage as backup
        localStorage.setItem(`${formType}_backup`, JSON.stringify(existingData));

        // Save to JSON file (server-side operation)
        // In a real deployment, this would be handled by a server endpoint
        // For demo purposes, we simulate the save operation
        console.log(`${formType} data saved to localStorage:`, data);
        console.log(`JSON file would be updated with:`, JSON.stringify(existingData, null, 2));

        // Simulate server response
        return { success: true, data: data };

    } catch (error) {
        console.error('Error saving to JSON:', error);
        return { success: false, error: error };
    }
};

// Test storage connection
window.testStorageConnection = async function() {
    console.log('Using JSON storage method - no database required');
    return { success: true, method: 'json' };
};
