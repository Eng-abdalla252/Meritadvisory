const fs = require('fs');
const path = require('path');

const clientsJsonPath = 'data/clients.json';
const publicClientsDir = 'public/clients';

const existingClients = JSON.parse(fs.readFileSync(clientsJsonPath, 'utf8'));
const files = fs.readdirSync(publicClientsDir);

const industryMap = {
  'petroleum': 'Petroleum and Logistics',
  'logistics': 'Petroleum and Logistics',
  'gas': 'Petroleum and Logistics',
  'energy': 'Petroleum and Logistics',
  'construction': 'Construction',
  'building': 'Construction',
  'estate': 'Construction',
  'manafucture': 'Manufacturing',
  'manufucture': 'Manufacturing',
  'factory': 'Manufacturing',
  'foods': 'Manufacturing',
  'utility': 'Utility',
  'power': 'Utility',
  'electricity': 'Utility',
  'water': 'Utility',
  'hospital': 'Healthcare',
  'pharma': 'Healthcare',
  'clinic': 'Healthcare',
  'medicare': 'Healthcare',
  'medical': 'Healthcare',
  'medicine': 'Retailers & Wholesalers',
  'hotel': 'Hotel and Cafes',
  'cafe': 'Hotel and Cafes',
  'restuarent': 'Hotel and Cafes',
  'coffee': 'Hotel and Cafes',
  'government': 'Public Sectors',
  'goverment': 'Public Sectors',
  'ministry': 'Public Sectors',
  'university': 'Public Sectors',
  'institute': 'Public Sectors',
  'retail': 'Retailers & Wholesalers',
  'supermarket': 'Retailers & Wholesalers',
  'trade': 'Retailers & Wholesalers',
  'wholeseler': 'Retailers & Wholesalers',
  'wholesaler': 'Retailers & Wholesalers',
  'mart': 'Retailers & Wholesalers',
  'hospital': 'Healthcare',
};

const newClients = [];
const seenLogos = new Set();

// 1. First add existing clients, maintaining their manual categorization
existingClients.forEach(client => {
    // Check if file still exists
    const fullPath = path.join(process.cwd(), 'public', client.logo);
    if (fs.existsSync(fullPath)) {
        newClients.push(client);
        seenLogos.add(client.logo);
    }
});

// 2. Add new files from public/clients
files.forEach(file => {
  const logoPath = `/clients/${file}`;
  if (!seenLogos.has(logoPath)) {
    let name = file.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
    // Clean up name
    name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    
    let industry = 'General Services';
    const lowerFile = file.toLowerCase();
    
    // Priority: check industry map
    for (const [key, cat] of Object.entries(industryMap)) {
      if (lowerFile.includes(key)) {
        industry = cat;
        break;
      }
    }
    
    newClients.push({
      name,
      industry,
      logo: logoPath,
      country: 'Somalia'
    });
    seenLogos.add(logoPath);
  }
});

// Sort them by name for better organization
newClients.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(clientsJsonPath, JSON.stringify(newClients, null, 4));
console.log(`Successfully synced clients. Total clients: ${newClients.length}`);
