const dropdownContent = document.getElementById('dropdown-content');

function clearDropdown() {
    document.getElementById('module-search').value = ''; // Clear existing options
    selectModule(null);
}

function populateDropdown() {
    items.forEach(item => {
        const option = document.createElement('div');
        option.textContent = item.module;
        option.onclick = () => {
            document.getElementById('module-search').value = item.module; // Autofill search bar
            selectModule(item); // Select the module
        };
        dropdownContent.appendChild(option);
    });
}



// Function to filter the dropdown options based on search input
function filterDropdown() {
    const searchTerm = document.getElementById('module-search').value.toLowerCase();
    const options = document.querySelectorAll('#dropdown-content div');
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        // Check if the module name starts with the search term
        option.style.display = text.startsWith(searchTerm) ? 'block' : 'none';
    });
}

// Function to show the dropdown
function showDropdown() {
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.classList.add('show'); // Show the dropdown
}

// Function to hide the dropdown
function hideDropdown() {
    document.getElementById('dropdown-content').classList.remove('show');
}

// Function to select a module from the dropdown
function selectModule(item) {
    selectedModule = item; // Set the selected module
    hideDropdown(); // Hide the dropdown
}