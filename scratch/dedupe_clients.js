const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'data', 'clients.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const normalize = (s) => s ? s.toLowerCase().trim().replace(/^\/+/, '').replace(/^uploads\//, '') : '';

const seenLogos = new Set();
const seenNames = new Set();
const uniqueClients = [];

for (const client of data) {
    const logoNorm = normalize(client.logo);
    const nameNorm = client.name.toLowerCase().trim();
    
    let isDuplicate = false;
    if (seenLogos.has(logoNorm)) {
        console.log(`Removing duplicate logo: ${client.name} (${client.logo}) - matches existing logo path`);
        isDuplicate = true;
    } else if (seenNames.has(nameNorm)) {
        console.log(`Removing duplicate name: ${client.name} (${client.logo}) - matches existing name`);
        isDuplicate = true;
    }

    if (!isDuplicate) {
        uniqueClients.push(client);
        seenLogos.add(logoNorm);
        seenNames.add(nameNorm);
    }
}

fs.writeFileSync(filePath, JSON.stringify(uniqueClients, null, 4), 'utf8');
console.log(`Deduplication complete. Total clients: ${uniqueClients.length}`);
