let items = []; // Array to store parsed items from CSV
    let selectedModules = []; // Array to store selected modules
    let selectedModule = null; // Currently selected module from the dropdown

    // Function to load and parse the CSV file
    async function loadCSV() {
        const response = await fetch('V1.1 - Module Info.csv'); // Fetch the CSV file
        const data = await response.text(); // Get the text content of the CSV
        const rows = data.split('\n').slice(1); // Split into rows and remove the header

        // Loop through each row in the CSV
        rows.forEach(row => {
            const columns = row.split(','); // Split the row into columns
            if (columns.length > 1) { // Ensure the row is not empty
                // Map columns to an object with meaningful properties
                items.push({
                    module: columns[0],
                    requirements: columns[1],
                    intro: columns[2],
                });
            }
        });

        populateDropdown(); // Populate the dropdown with items
    }

    // Load the CSV and initialize the dropdown
    loadCSV();

    // Clear the search input when the page loads
    document.getElementById('module-search').value = '';

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('#module-search')) {
            hideDropdown();
        }
    };
    
    // Have to actuallg get working
    function addSelectedModule() {
        if (selectedModule) {
            const existingModule = selectedModules.find(m => m.module === selectedModule.module);
        }
    }