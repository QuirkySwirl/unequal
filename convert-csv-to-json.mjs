import fs from 'fs';
import Papa from 'papaparse';
import path from 'path';

const csvFilePath = path.resolve('Top 200 Richest Person in the World.csv');
const jsonFilePath = path.resolve('src/data/billionaires.json');

// Helper function to parse net worth string (e.g., "$233 B", "$99.5 B")
function parseNetWorth(netWorthStr) {
  if (!netWorthStr) return 0;
  // Remove '$' and ' B', then convert to number
  const numStr = netWorthStr.replace(/[\$ B]/g, '').trim();
  const num = parseFloat(numStr);
  return isNaN(num) ? 0 : num;
}

try {
  console.log(`Reading CSV file from: ${csvFilePath}`);
  const csvFileContent = fs.readFileSync(csvFilePath, 'utf8');

  console.log('Parsing CSV data...');
  const parseResult = Papa.parse(csvFileContent, {
    header: true, // Use the first row as headers
    skipEmptyLines: true,
  });

  if (parseResult.errors.length > 0) {
    console.error('Errors during CSV parsing:', parseResult.errors);
    process.exit(1);
  }

  console.log(`Parsed ${parseResult.data.length} rows.`);

  const billionairesJson = parseResult.data.map((row) => {
    // Map CSV columns to the Billionaire type structure
    return {
      id: row['S. No.'] || String(Math.random()).slice(2), // Use S. No. or generate random if missing
      name: row['Name']?.trim() || 'Unknown',
      netWorth: parseNetWorth(row['Networth']),
      company: row['Industry']?.trim() || 'Unknown', // Use Industry as placeholder
      image: '', // Default empty image URL
      country: row['Country']?.trim() || 'Unknown',
    };
  });

  console.log(`Writing JSON data to: ${jsonFilePath}`);
  fs.writeFileSync(jsonFilePath, JSON.stringify(billionairesJson, null, 2)); // Pretty print JSON

  console.log('Successfully converted CSV to JSON.');

} catch (error) {
  console.error('Error during CSV to JSON conversion:', error);
  process.exit(1);
}
