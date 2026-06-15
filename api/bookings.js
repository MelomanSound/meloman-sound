const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join('/tmp', 'bookings.json');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    
    let data = { dates: [], bookings: [] };
    try { if (fs.existsSync(DATA_FILE)) data = JSON.parse(fs.readFileSync(DATA_FILE)); } catch(e) {}
    
    if (req.method === 'GET') {
        return res.json(data);
    }
    
    if (req.method === 'POST') {
        const { name, phone, date, time } = req.body;
        if (data.dates.indexOf(date) === -1) data.dates.push(date);
        data.bookings.push({ name, phone, date, time });
        fs.writeFileSync(DATA_FILE, JSON.stringify(data));
        return res.json(data);
    }
    
    res.status(405).json({ error: 'Method not allowed' });
};
