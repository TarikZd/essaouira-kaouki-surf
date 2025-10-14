// Configuration - JSON Storage Only
const STORAGE_METHOD = 'json'; // JSON storage for all forms

// JSON Storage Functions - Save directly to JSON files
window.saveToJSON = async function(formType, data) {
    try {
        console.log(`Saving ${formType} data to JSON file...`);

        // Add timestamp and ID
        const entryData = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...data
        };

        // Read existing JSON file data
        let existingData = [];
        try {
            const response = await fetch(`data/${formType}.json`);
            if (response.ok) {
                const jsonData = await response.json();
                console.log('Fetched JSON data:', jsonData);
                // Extract array from dictionary format
                if (jsonData && jsonData[formType] && Array.isArray(jsonData[formType])) {
                    existingData = jsonData[formType];
                    console.log('Extracted existing data array:', existingData);
                } else {
                    console.log('JSON data format unexpected, using empty array');
                }
            } else {
                console.log('JSON file not found or not accessible');
            }
        } catch (e) {
            console.log('Error reading JSON file:', e);
        }

        console.log('existingData before push:', existingData, 'Type:', typeof existingData, 'Is array:', Array.isArray(existingData));

        // Ensure existingData is an array
        if (!Array.isArray(existingData)) {
            console.log('existingData is not an array, resetting to empty array');
            existingData = [];
        }

        // Add new entry
        existingData.push(entryData);
        console.log('existingData after push:', existingData);

        // Create updated JSON data as dictionary
        const updatedJsonData = { [formType]: existingData };

        // Save to JSON file using File System Access API
        try {
            if ('showSaveFilePicker' in window) {
                console.log(`Saving to ${formType}.json file...`);

                const jsonString = JSON.stringify(updatedJsonData, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });

                // Prompt user to save the JSON file
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

                console.log(`✅ ${formType} data saved to JSON file:`, entryData);
                return { success: true, data: entryData, fileSaved: true };
            } else {
                console.log('File System Access API not supported');
                return { success: false, error: 'File System Access API not supported' };
            }
        } catch (fileError) {
            console.log('File save cancelled or failed');
            return { success: false, error: 'File save cancelled or failed' };
        }

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
