export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const fs = require('fs');
    const path = require('path');
    const file = path.join('/tmp', 'data.json');
    
    let data = { dates: [], bookings: [] };
    try { if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file)); } catch(e) {}
    
    if (req.method === 'GET') return res.json(data);
    
    if (req.method === 'POST') {
        const { name, phone, date, time } = req.body;
        if (!data.dates.includes(date)) data.dates.push(date);
        data.bookings.push({ name, phone, date, time });
        fs.writeFileSync(file, JSON.stringify(data));
        return res.json(data);
    }
}
