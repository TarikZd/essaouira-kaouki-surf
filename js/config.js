// Configuration - JSON Storage Only
const STORAGE_METHOD = 'json'; // JSON storage for all forms

// JSON Storage Functions - Save to localStorage and update JSON files
window.saveToJSON = async function(formType, data) {
    try {
        console.log(`Saving ${formType} data...`);

        // Add timestamp and ID
        const entryData = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...data
        };

        // Save to localStorage as primary storage
        let existingData = [];
        try {
            const storedData = localStorage.getItem(`${formType}_backup`);
            if (storedData) {
                existingData = JSON.parse(storedData);
            }
        } catch (e) {
            console.log('No existing localStorage data');
        }

        // Ensure existingData is an array
        if (!Array.isArray(existingData)) {
            existingData = [];
        }

        existingData.push(entryData);
        localStorage.setItem(`${formType}_backup`, JSON.stringify(existingData));

        // Try to update the corresponding JSON file in the data folder
        try {
            // Check if File System Access API is supported
            if ('showSaveFilePicker' in window) {
                console.log(`Attempting to update ${formType}.json file...`);

                // Create properly formatted JSON data as dictionary
                const jsonData = JSON.stringify({ [formType]: existingData }, null, 2);
                const blob = new Blob([jsonData], { type: 'application/json' });

                // Prompt user to save/update the JSON file
                const handle = await window.showSaveFilePicker({
                    suggestedName: `${formType}.json`,
                    types: [{
                        description: 'JSON File',
                        accept: { 'application/json': ['.json'] }
                    }]
                });

                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();

                console.log(`✅ ${formType} data saved to localStorage and JSON file updated:`, entryData);
                return { success: true, data: entryData, fileUpdated: true };
            } else {
                console.log('File System Access API not supported, data saved to localStorage only');
            }
        } catch (fileError) {
            console.log('File save cancelled or not supported, data saved to localStorage only');
        }

        // Always return success since localStorage worked
        console.log(`✅ ${formType} data saved to localStorage:`, entryData);
        return { success: true, data: entryData, localStorageOnly: true };

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
