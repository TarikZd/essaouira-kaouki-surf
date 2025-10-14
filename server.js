const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Path to data directory
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// Save form data to JSON file
app.post('/api/save-form', async (req, res) => {
    try {
        const { formType, data } = req.body;

        if (!formType || !data) {
            return res.status(400).json({ success: false, error: 'Missing formType or data' });
        }

        await ensureDataDir();

        const filePath = path.join(DATA_DIR, `${formType}.json`);

        // Read existing data
        let existingData = [];
        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            existingData = JSON.parse(fileContent);
        } catch (error) {
            // File doesn't exist or is empty, start with empty array
            existingData = [];
        }

        // Add new entry with timestamp and ID
        const newEntry = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...data
        };

        existingData.push(newEntry);

        // Write back to file
        await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

        console.log(`✅ Data saved to ${formType}.json:`, newEntry);

        res.json({
            success: true,
            message: 'Data saved successfully',
            data: newEntry
        });

    } catch (error) {
        console.error('❌ Error saving data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save data',
            details: error.message
        });
    }
});

// Get form data from JSON file
app.get('/api/get-form-data/:formType', async (req, res) => {
    try {
        const { formType } = req.params;
        const filePath = path.join(DATA_DIR, `${formType}.json`);

        let data = [];
        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            data = JSON.parse(fileContent);
        } catch (error) {
            // File doesn't exist, return empty array
            data = [];
        }

        res.json({ success: true, data });

    } catch (error) {
        console.error('❌ Error reading data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to read data',
            details: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, async () => {
    await ensureDataDir();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Data directory: ${DATA_DIR}`);
    console.log(`💾 JSON files will be saved in: ${DATA_DIR}`);
});

module.exports = app;
