/* Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to save the selected modules to a cookie
function saveSelectedModules() {
    const modulesJSON = JSON.stringify(selectedModules);
    setCookie("selectedModules", modulesJSON, 7); // Save for 7 days
}

// Function to load the selected modules from a cookie
function loadSelectedModules() {
    const modulesJSON = getCookie("selectedModules");
    if (modulesJSON) {
        selectedModules = JSON.parse(modulesJSON);
        renderItemList();
        updateTotals();
    }
}

// Function to clear the selected modules cookie
function clearSelectedModules() {
    setCookie("selectedModules", "", -1); // Expire the cookie immediately
    selectedModules = [];
    renderItemList();
    updateTotals();
}


// Modify the addSelectedModule function to save the selected modules to a cookie
function addSelectedModule() {
    if (selectedModule) {
        const existingModule = selectedModules.find(m => m.module === selectedModule.module);
        if (existingModule) {
            existingModule.quantity += 1;
        } else {
            selectedModules.push({ ...selectedModule, quantity: 1 });
        }
        renderItemList();
        updateTotals();
        saveSelectedModules(); // Save the selected modules to a cookie
    }
}

// Modify the deleteModule function to save the selected modules to a cookie
function deleteModule(index) {
    selectedModules.splice(index, 1);
    renderItemList();
    updateTotals();
    saveSelectedModules(); // Save the selected modules to a cookie
}

// Modify the quantity input event listener to save the selected modules to a cookie
document.querySelectorAll('.item-quantity').forEach(input => {
    input.addEventListener('input', () => {
        const index = input.dataset.index;
        selectedModules[index].quantity = parseInt(input.value) || 0;
        updateTotals();
        saveSelectedModules(); // Save the selected modules to a cookie
    });
});
*/
// Load the selected modules from a cookie when the page loads

function dataloaded() {
    //loadSelectedModules(); // Load from cookies if needed
    loadURL(); // Load from URL
}

function saveURL() {
    const modules = selectedModules.map(module => {
        const moduleIndex = items.findIndex(item => item.module === module.module);
        return `${moduleIndex}:${module.quantity}`;
    }).join(',');

    const url = new URL(window.location);
    url.searchParams.set('m', modules); // Use 'm' as the key for modules
    window.history.replaceState({}, '', url);
}

function loadURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const modulesParam = urlParams.get('m');
    if (modulesParam) {
        const modules = modulesParam.split(',');
        selectedModules = modules.map(module => {
            const [moduleIndex, quantity] = module.split(':');
            const item = items[parseInt(moduleIndex)]; // Get the module by index
            return { ...item, quantity: parseInt(quantity) };
        });
        renderItemList();
        updateTotals();
    }
}