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

        console.log('entryData created:', entryData);

        // Read existing JSON file data
        let existingData = [];
        console.log('Initializing existingData as empty array');

        try {
            console.log(`Fetching data/${formType}.json...`);
            const response = await fetch(`data/${formType}.json`);
            console.log('Fetch response status:', response.status, response.ok);

            if (response.ok) {
                const jsonData = await response.json();
                console.log('Raw JSON data fetched:', jsonData);
                console.log('Type of jsonData:', typeof jsonData);
                console.log('jsonData keys:', Object.keys(jsonData));

                // Extract array from dictionary format
                if (jsonData && typeof jsonData === 'object' && jsonData[formType]) {
                    console.log(`Found ${formType} key in jsonData:`, jsonData[formType]);
                    console.log(`Type of jsonData[${formType}]:`, typeof jsonData[formType]);
                    console.log(`Is array:`, Array.isArray(jsonData[formType]));

                    if (Array.isArray(jsonData[formType])) {
                        existingData = jsonData[formType];
                        console.log('Successfully extracted existing data array:', existingData);
                    } else {
                        console.log('jsonData[formType] is not an array, using empty array');
                        existingData = [];
                    }
                } else {
                    console.log('JSON data does not have expected structure, using empty array');
                    existingData = [];
                }
            } else {
                console.log('JSON file not found or not accessible, using empty array');
                existingData = [];
            }
        } catch (e) {
            console.log('Error reading JSON file:', e, 'using empty array');
            existingData = [];
        }

        console.log('Final existingData before validation:', existingData);
        console.log('Type:', typeof existingData);
        console.log('Is array:', Array.isArray(existingData));
        console.log('Length:', existingData.length);

        // Ensure existingData is an array (triple check)
        if (!Array.isArray(existingData)) {
            console.log('CRITICAL: existingData is not an array, forcing empty array');
            console.log('existingData was:', existingData);
            existingData = [];
        }

        console.log('existingData after validation:', existingData);

        // Add new entry with error handling
        console.log('About to push entryData to existingData...');
        console.log('entryData:', entryData);

        const originalLength = existingData.length;
        existingData.push(entryData);

        console.log('Push successful!');
        console.log('Array length changed from', originalLength, 'to', existingData.length);
        console.log('Final existingData:', existingData);

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
