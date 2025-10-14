// Supabase Configuration
const SUPABASE_URL = 'https://sdgbcovywbaitxxoehrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZ2Jjb3Z5d2JhaXR4eG9laHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNjY3MTQsImV4cCI6MjA3NTk0MjcxNH0.Q4J2sLV5TgpXsE8CQlTTyfkv7ij_auHMmX4QF9ci7gg';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
window.supabaseClient = supabase;

// Test connection function
window.testSupabaseConnection = async function() {
    try {
        console.log('Testing Supabase connection...');

        // Test 1: Check if we can connect
        const { data: testData, error: testError } = await supabase
            .from('transfers')
            .select('id')
            .limit(1);

        if (testError) {
            console.error('Connection test failed:', testError);
            return { success: false, error: testError };
        }

        console.log('Connection test passed');
        return { success: true };

    } catch (error) {
        console.error('Connection error:', error);
        return { success: false, error: error };
    }
};
