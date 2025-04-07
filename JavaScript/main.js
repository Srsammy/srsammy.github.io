let items = []; // Array to store parsed items from CSV
let selectedModules = []; // Array to store selected modules
let selectedModule = null; // Currently selected module from the dropdown

// Function to load and parse the CSV file
async function loadTSV() {
    const response = await fetch('../Data.tsv'); // Fetch the CSV file
    const data = await response.text(); // Get the text content of the CSV
    const rows = data.split('\n').slice(1); // Split into rows and remove the header

    // Loop through each row in the CSV
    rows.forEach(row => {
        const columns = row.split('\t'); // Split the row into columns
        if (columns.length > 1) { // Ensure the row is not empty
            // Map columns to an object with meaningful properties
            const module = columns[0];
            const moduleName = module.replace(/\s+/g, '_'); // Replace spaces with underscores
            const moduleURL = `modules/${moduleName}.html`; // Create the URL
            items.push({
                module: columns[0],
                finished: columns[1],
                upfrontCost: parseFloat(columns[2]),
                depth: parseFloat(columns[3]),
                width: parseFloat(columns[4]),
                area: parseFloat(columns[5]),
                position: columns[6],
                watts: parseFloat(columns[7]),
                voltage: columns[8],
                amperage120v: parseFloat(columns[9]),
                amperage240v: parseFloat(columns[10]),
                resourcePage: moduleURL,
                number: columns[12],
                needsComputer: columns[13].toLowerCase() === 'true', // Convert to boolean
                maintenance: columns[14],
                requirements: columns[15],
            });
        }
    });

    populateDropdown(); // Populate the dropdown with items
    dataloaded();
}

// Load the CSV and initialize the dropdown
loadTSV();

// Clear the search input when the page loads
document.getElementById('module-search').value = '';

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#module-search')) {
        hideDropdown();
    }
};