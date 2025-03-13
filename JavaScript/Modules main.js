let items = []; // Array to store parsed items from CSV
let selectedModules = []; // Array to store selected modules
let selectedModule = null; // Currently selected module from the dropdown

// Function to load and parse the CSV file
async function loadCSV() {
    const response = await fetch('V1.1 - For Spencer. No touchy.csv'); // Fetch the CSV file
    const data = await response.text(); // Get the text content of the CSV
    const rows = data.split('\n').slice(1); // Split into rows and remove the header

    // Loop through each row in the CSV
    rows.forEach(row => {
        const columns = row.split(','); // Split the row into columns
        if (columns.length > 1) { // Ensure the row is not empty
            // Map columns to an object with meaningful properties
            items.push({
                module: columns[0]
            });
        }
    });
    console.log('CSV Data:', data);
    populateList(); // Populate the dropdown with items
}

// Load the CSV
loadCSV();

function populateList() {
    const moduleListContainer = document.getElementById('Links');

    if (!moduleListContainer) return; // Ensure the container exists

    // Clear any existing content in the container
    moduleListContainer.innerHTML = '';

    // Loop through the items array (assuming it contains the module names)
    items.forEach(item => {
        console.log('Parsed Items:');
        // Generate the URL by replacing spaces with underscores and adding .html
        const moduleName = item.module.replace(/\s+/g, '_'); // Replace spaces with underscores
        const moduleURL = `modules/${moduleName}.html`; // Create the URL

        // Create an anchor element for the module
        const moduleLink = document.createElement('a');
        moduleLink.href = moduleURL; // Set the href to the generated URL
        moduleLink.textContent = item.module; // Set the text to the module name
        moduleLink.style.display = 'block'; // Display each link on a new line

        // Append the link to the container
        moduleListContainer.appendChild(moduleLink);
    });
}