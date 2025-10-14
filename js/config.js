// Configuration - Choose your storage method
const STORAGE_METHOD = 'json'; // Change to 'supabase' to use Supabase

// Supabase Configuration (if using Supabase)
const SUPABASE_URL = 'https://sdgbcovywbaitxxoehrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZ2Jjb3Z5d2JhaXR4eG9laHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNjY3MTQsImV4cCI6MjA3NTk0MjcxNH0.Q4J2sLV5TgpXsE8CQlTTyfkv7ij_auHMmX4QF9ci7gg';

// Initialize Supabase client (if using Supabase)
let supabase = null;
if (STORAGE_METHOD === 'supabase') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

window.supabaseClient = supabase;

// JSON Storage Functions
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

        // In a real application, this would be sent to a server to save to the JSON file
        // For now, we save to localStorage and log the data that would be saved
        console.log(`${formType} data saved to localStorage:`, data);
        console.log(`To save to JSON file, data would be:`, JSON.stringify(existingData, null, 2));

        return { success: true, data: data };

    } catch (error) {
        console.error('Error saving to JSON:', error);
        return { success: false, error: error };
    }
};

// Test storage connection
window.testStorageConnection = async function() {
    if (STORAGE_METHOD === 'supabase') {
        if (!supabase) {
            return { success: false, error: 'Supabase not initialized' };
        }

        try {
            console.log('Testing Supabase connection...');
            const { data: testData, error: testError } = await supabase
                .from('transfers')
                .select('id')
                .limit(1);

            if (testError) {
                console.error('Supabase connection test failed:', testError);
                return { success: false, error: testError };
            }

            console.log('Supabase connection test passed');
            return { success: true };

        } catch (error) {
            console.error('Supabase connection error:', error);
            return { success: false, error: error };
        }
    } else {
        console.log('Using JSON storage method');
        return { success: true, method: 'json' };
    }
};
