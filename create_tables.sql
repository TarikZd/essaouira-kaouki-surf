-- SQL script to create the necessary tables in Supabase
-- Run this in your Supabase SQL Editor

-- Transfers table
CREATE TABLE transfers (
    id SERIAL PRIMARY KEY,
    fullName TEXT NOT NULL,
    countryCode TEXT,
    phoneNumber TEXT NOT NULL,
    type TEXT NOT NULL,
    pickupLocation TEXT NOT NULL,
    dropoffLocation TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    adults INTEGER NOT NULL,
    kids INTEGER DEFAULT 0,
    babies INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adventures table
CREATE TABLE adventures (
    id SERIAL PRIMARY KEY,
    fullName TEXT NOT NULL,
    countryCode TEXT,
    phoneNumber TEXT NOT NULL,
    type TEXT NOT NULL,
    date DATE NOT NULL,
    duration TEXT NOT NULL,
    adults INTEGER NOT NULL,
    kids INTEGER DEFAULT 0,
    babies INTEGER DEFAULT 0,
    specialRequests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for security
ALTER TABLE transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE adventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies to allow inserts (for the website forms)
-- Note: You may want to restrict these based on your security needs
CREATE POLICY "Allow public inserts on transfers" ON transfers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts on adventures" ON adventures FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts on contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Optional: Create policies for reading (if you want to allow the website to read data)
-- CREATE POLICY "Allow public reads on transfers" ON transfers FOR SELECT USING (true);
-- CREATE POLICY "Allow public reads on adventures" ON adventures FOR SELECT USING (true);
-- CREATE POLICY "Allow public reads on contacts" ON contacts FOR SELECT USING (true);
