// Function to update all totals (cost, wattage, amperage)
function updateTotals() {
    updateTotalCost();
    updateTotalWattage();
    updateTotalAmperage();
    updateCompatibilityWarning();
    clearDropdown();
    saveURL() //Get rid of if the page reloads after every refresh
}

// Function to update the total cost
function updateTotalCost() {
    let total = selectedModules.reduce((sum, item) => sum + item.upfrontCost * item.quantity, 0);
    
    // Select all elements with the class 'total-amount' and update their text content
    document.querySelectorAll('.total-amount').forEach(el => {
        el.textContent = total.toFixed(2);
    });
}

// Function to update the total wattage
function updateTotalWattage() {
    let totalWattage = selectedModules.reduce((sum, item) => sum + item.watts * item.quantity, 0);
    
    // Update all elements with the class 'total-wattage'
    document.querySelectorAll('.total-wattage').forEach(el => {
        el.textContent = totalWattage;
    });
}

// Function to update the total amperage
function updateTotalAmperage() {
    const voltage = document.getElementById('voltage').value;
    let totalAmperage = 0;
    let incompatibleModules = [];

    selectedModules.forEach(item => {
        if (item.watts > 0) {
            if ((voltage === '120' && item.amperage120v !== 0) || (voltage === '240' && item.amperage240v !== 0)) {
                totalAmperage += (voltage === '120' ? item.amperage120v : item.amperage240v) * item.quantity;
            } else {
                incompatibleModules.push(item.module);
            }
        }
    });

    // Update all elements with the class 'total-amperage'
    document.querySelectorAll('.total-amperage').forEach(el => {
        el.textContent = totalAmperage.toFixed(2);
    });

    displayCompatibilityWarning(incompatibleModules, voltage);
}


// Function to display compatibility warnings
function displayCompatibilityWarning(incompatibleModules, voltage) {
    const warningElement = document.getElementById('compatibility-warning');
    const ShortwarningElement = document.getElementById('short compatibility-warning');
    if (incompatibleModules.length > 0) {
        warningElement.textContent = `Warning: The following modules are not compatible with ${voltage}V: ${incompatibleModules.join(', ')}`;
        ShortwarningElement.textContent = `Voltage Problem `;
    } else {
        warningElement.textContent = '';
        ShortwarningElement.textContent = ``;
    }
}

// Function to update the compatibility warning for computer requirements
function updateCompatibilityWarning() {
    const computerLabSelected = selectedModules.some(item => item.module === 'Computer Lab');
    const modulesNeedingComputer = selectedModules.filter(item => item.needsComputer && item.module !== 'Computer Lab');

    const warningElement = document.getElementById('compatibility-warning');
    const ShortwarningElement = document.getElementById('short compatibility-warning');
    if (modulesNeedingComputer.length > 0 && !computerLabSelected) {
        ShortwarningElement.textContent = `Needs computer `;
        warningElement.textContent = `Warning: The following modules require a computer but the Computer Lab is not selected: ${modulesNeedingComputer.map(item => item.module).join(', ')}`;
    }
}
