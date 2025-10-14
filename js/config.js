// Configuration - JSON Storage Only
const STORAGE_METHOD = 'json'; // JSON storage for all forms

// JSON Storage Functions - Save directly to JSON files using File System Access API
window.saveToJSON = async function(formType, data) {
    try {
        console.log(`Saving ${formType} data to JSON file...`);

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

        existingData.push(entryData);
        localStorage.setItem(`${formType}_backup`, JSON.stringify(existingData));

        // Try to save to JSON file using File System Access API (if supported)
        try {
            // Check if File System Access API is supported
            if ('showSaveFilePicker' in window) {
                console.log('File System Access API supported, attempting to save to JSON file...');

                // Create a blob with the JSON data
                const jsonData = JSON.stringify(existingData, null, 2);
                const blob = new Blob([jsonData], { type: 'application/json' });

                // Try to save the file (this will prompt user for permission)
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

                console.log(`✅ ${formType} data saved to JSON file and localStorage:`, entryData);
                return { success: true, data: entryData, fileSaved: true };
            }
        } catch (fileError) {
            console.log('File System Access API not available or user cancelled, saving to localStorage only');
        }

        // Fallback: localStorage only
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
