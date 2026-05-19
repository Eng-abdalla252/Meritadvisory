const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'clients');
const files = fs.readdirSync(dir);

const seenSizes = new Map();
const duplicates = [];

for (const file of files) {
    if (file === 'desktop.ini') continue;
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) continue;

    const size = stats.size;
    
    if (seenSizes.has(size)) {
        duplicates.push({
            original: seenSizes.get(size),
            duplicate: file,
            size: size
        });
    } else {
        seenSizes.set(size, file);
    }
}

console.log('Files with identical size in public/clients:');
duplicates.forEach(d => {
    console.log(`- ${d.duplicate} matches ${d.original} (Size: ${d.size} bytes)`);
});
