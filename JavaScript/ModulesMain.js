let items = []; // Array to store parsed items from CSV

async function loadTSV() {
    const response = await fetch('V1.1 - For Spencer. No touchy.tsv'); // Fetch the CSV file
    const data = await response.text(); // Get the text content of the CSV
    const rows = data.split('\n').slice(1); // Split into rows and remove the header

    // Loop through each row in the CSV
    rows.forEach(row => {
        const columns = row.split('\t'); // Split the row into columns
        if (columns.length > 1) { // Ensure the row is not empty
            // Map columns to an object with meaningful properties
            items.push({
                number: columns[12],
                module: columns[0],
                what: columns[16],
                HowToUse: columns[17],
                make: columns[18]
            });
        }
    });
    populateList(); // Populate the url items
    loadInformation(); // Loads the parahraphs
}

// Load the TSV
loadTSV();

function populateList() {
    const moduleListContainer = document.getElementById('Links');

    // Clear any existing content in the container
    moduleListContainer.innerHTML = '';

    // Loop through the items array (assuming it contains the module names)
    items.forEach(item => {
        console.log('Parsed Items:');
        // Generate the URL by replacing spaces with underscores and adding .html
        const moduleURL = `Modules.html?${item.number}`; // Create the URL

        // Create an anchor element for the module
        const moduleLink = document.createElement('a');
        moduleLink.href = moduleURL; // Set the href to the generated URL
        moduleLink.textContent = item.module; // Set the text to the module name
        moduleLink.style.display = 'block'; // Display each link on a new line

        // Append the link to the container
        moduleListContainer.appendChild(moduleLink);
    });
}

function loadInformation() {
    // Get the query string from the URL
    const queryString = window.location.search;

    // Extract the value after the '?' (e.g., "123" from "Modules.html?123")
    const moduleNumber = queryString.slice(1); // Remove the '?'

    // Log the extracted module number for debugging
    console.log('Extracted module number:', moduleNumber);

    // Find the corresponding module in the items array
    let module = items.find(item => item.number.trim() === moduleNumber.trim());

    if (!module || parseInt(moduleNumber) > items.length) {
        console.warn('Module not found or invalid module number. Defaulting to module 1.');
        module = items[0]; // Default to the first module
    }

    // If the module is found, update the HTML element with id="name"
    if (module) {
        document.getElementById('name').innerHTML = module.module;
        document.getElementById('what').innerHTML = module.what;
        document.getElementById('HowToUse').innerHTML = module.HowToUse;
        document.getElementById('make').innerHTML = module.make;
        
    } else {
        console.error('Module not found for number:', moduleNumber);
        document.getElementById('name').innerHTML = 'Module not found';
    }
}