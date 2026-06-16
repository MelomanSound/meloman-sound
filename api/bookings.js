const JSONBIN_KEY = '$2a$10$/XrDXu7hAa3StIMwkt9aoe0vO57W05iiN.sgCnANHgYyYRBE.MPZm';
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/6a2f6b9bf5f4af5e29f2bc82';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const response = await fetch(JSONBIN_URL + '/latest', {
            headers: { 'X-Master-Key': JSONBIN_KEY }
        });
        const json = await response.json();
        let data = json.record || { dates: [], bookings: [] };

        if (req.method === 'GET') {
            return res.json(data);
        }

        if (req.method === 'POST') {
            const { name, phone, date, time } = req.body;
            if (!data.dates.includes(date)) data.dates.push(date);
            data.bookings.push({ name, phone, date, time });
            
            await fetch(JSONBIN_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSONBIN_KEY
                },
                body: JSON.stringify(data)
            });
            
            return res.json(data);
        }
    } catch(e) {
        return res.json({ dates: [], bookings: [] });
    }
}
