const fs = require('fs');
const path = require('path');

const jsonPath = path.join(process.cwd(), 'data', 'clients.json');
const clients = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const usedLogos = new Set(clients.map(c => c.logo.toLowerCase().trim()));

const duplicates = [
    { name: 'afro france.jpg', matches: 'Afro France.jpeg' },
    { name: 'ambassador hotel.jpg', matches: 'Ambassador Hotel.jpeg' },
    { name: 'GENIUS-WATTER.png', matches: 'genius-watter.jpg' },
    { name: 'GSG.jpg', matches: 'GSG..jpeg' },
    { name: 'Las gas.jpg', matches: 'Las Gas.jpeg' },
    { name: 'maandeeq university.jpg', matches: 'Maandeeq University.jpeg' },
    { name: 'Mobile Fuundi.png', matches: 'Mobile Fuundi.jpg' }
];

const dir = path.join(process.cwd(), 'public', 'clients');

duplicates.forEach(d => {
    const p1 = `/clients/${d.name}`.toLowerCase();
    const p2 = `/clients/${d.matches}`.toLowerCase();
    
    let toDelete = null;
    if (usedLogos.has(p1)) {
        toDelete = d.matches;
    } else if (usedLogos.has(p2)) {
        toDelete = d.name;
    } else {
        // Neither or both? Let's just pick one if they are both in the folder
        toDelete = d.name;
    }

    const fullPath = path.join(dir, toDelete);
    if (fs.existsSync(fullPath)) {
        console.log(`Deleting redundant file: ${toDelete}`);
        fs.unlinkSync(fullPath);
    }
});
