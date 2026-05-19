const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'clients');
const files = fs.readdirSync(dir);

const seenBaseNames = new Map();
const duplicates = [];

for (const file of files) {
    if (file === 'desktop.ini') continue;
    const stats = fs.statSync(path.join(dir, file));
    if (stats.isDirectory()) continue;

    const baseName = file.split('.')[0].toLowerCase().trim().replace(/[-_]/g, ' ');
    
    if (seenBaseNames.has(baseName)) {
        duplicates.push({
            original: seenBaseNames.get(baseName),
            duplicate: file
        });
    } else {
        seenBaseNames.set(baseName, file);
    }
}

console.log('Potential duplicate files in public/clients:');
duplicates.forEach(d => {
    console.log(`- ${d.duplicate} (matches base of ${d.original})`);
});
