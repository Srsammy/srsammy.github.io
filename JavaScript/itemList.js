// Function to add the selected module to the list
function addSelectedModule() {
    if (selectedModule) {
        const existingModule = selectedModules.find(m => m.module === selectedModule.module);
        if (existingModule) {
            // If the module already exists, increment its quantity
            existingModule.quantity += 1;
        } else {
            // If the module does not exist, add it to the list with a quantity of 1
            selectedModules.push({ ...selectedModule, quantity: 1 });
        }
        renderItemList(); // Update the displayed list
        updateTotals(); // Update the totals
        clearDropdown();
    }
}

// Function to render the list of selected modules
function renderItemList() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = ''; // Clear the existing list

    // Loop through selected modules and create their HTML
    selectedModules.forEach((item, index) => {
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-wrapper');

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');

        // Toggle icon for expanding/collapsing details
        const toggleIcon = document.createElement('img');
        toggleIcon.src = 'https://static-00.iconduck.com/assets.00/drop-down-list-icon-512x483-kbrwkv0u.png';
        toggleIcon.alt = 'Toggle';
        toggleIcon.classList.add('toggle-icon');
        toggleIcon.dataset.index = index;

        // Item name label
        const label = document.createElement('span');
        label.textContent = item.module;
        label.dataset.index = index;
        label.style.cursor = 'pointer';  
        label.style.userSelect = 'none';

        // Hidden details section
        const details = document.createElement('div');
        details.classList.add('details');

        // Add item details on different lines
        const detailsContent = [
            `Upfront Cost: $${item.upfrontCost.toFixed(2)}`,
            `Depth: ${item.depth}m`,
            `Width: ${item.width}m`,
            `Area: ${item.area}m²`,
            `Position: ${item.position}`,
        ];

        // Add power-related details only if watts is not 0
        if (item.watts !== 0) {
            detailsContent.push(`Watts: ${item.watts}W`);
            // Determine compatible voltages
            const compatibleVoltages = [];
            if (item.amperage120v > 0) compatibleVoltages.push('120V');
            if (item.amperage240v > 0) compatibleVoltages.push('240V');
            detailsContent.push(`Voltage: ${compatibleVoltages.join(' & ')}`);
            if (item.amperage120v > 0) detailsContent.push(`Amperage (120V): ${item.amperage120v.toFixed(2)}A`);
            if (item.amperage240v > 0) detailsContent.push(`Amperage (240V): ${item.amperage240v.toFixed(2)}A`);
        }

        // Add resources links
        let resourceUrl = item.resourcePage.split(':')[0].trim();
        if (!resourceUrl.endsWith('.html')) {
            resourceUrl += '.html';
        }

        const resourceLink = document.createElement('a');
        resourceLink.href = resourceUrl.startsWith('http') ? resourceUrl : `/${resourceUrl}`;
        resourceLink.textContent = 'Resource Page';
        resourceLink.target = '_blank';
        resourceLink.style.textDecoration = 'underline';

        const resourceLine = document.createElement('span');
        resourceLine.style.display = 'block';
        resourceLine.appendChild(resourceLink);

        details.appendChild(resourceLine);


        // Loop through the details content and add them to the details section
        detailsContent.forEach(detail => {
            const detailLine = document.createElement('span');
            detailLine.textContent = detail;
            detailLine.style.display = 'block';
            details.appendChild(detailLine);
        });

        details.dataset.index = index;

        // Quantity input field
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.classList.add('item-quantity');
        quantityInput.min = '0';
        quantityInput.value = item.quantity;
        quantityInput.dataset.index = index;

        // Delete button
        const deleteBtn = document.createElement('img');
        deleteBtn.src = 'https://img.icons8.com/material-outlined/24/plus--v1.png';
        deleteBtn.alt = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteModule(index);

        // Container for quantity input
        const quantityContainer = document.createElement('div');
        quantityContainer.classList.add('item-quantity-container');
        quantityContainer.appendChild(quantityInput);

        // Append elements to the container
        itemContainer.appendChild(toggleIcon);
        itemContainer.appendChild(label);

        itemDiv.appendChild(itemContainer);
        itemDiv.appendChild(quantityContainer);
        itemDiv.appendChild(deleteBtn);

        itemWrapper.appendChild(itemDiv);
        itemWrapper.appendChild(details);
        itemList.appendChild(itemWrapper);
    });

    // Function to toggle details
    function toggleDetails(index) {
        const details = document.querySelector(`.details[data-index='${index}']`);
        const icon = document.querySelector(`.toggle-icon[data-index='${index}']`);
        const isVisible = details.style.display === 'block';
        details.style.display = isVisible ? 'none' : 'block';
        if (icon) {
            icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }

    // Add click event to toggle icon
    document.querySelectorAll('.toggle-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDetails(icon.dataset.index);
        });
    });

    // Add click event to module name label
    document.querySelectorAll('.item-container > span').forEach(label => {
        label.addEventListener('click', () => {
            toggleDetails(label.dataset.index);
        });
    });

    // Optional: Add click event to entire item container if you want
    document.querySelectorAll('.item-container').forEach(container => {
        container.addEventListener('click', (e) => {
            // Only trigger if we didn't click on the icon directly
            if (!e.target.classList.contains('toggle-icon')) {
                toggleDetails(container.dataset.index);
            }
        });
    });

    // Add event listeners to quantity inputs to update the totals
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('input', () => {
            const index = input.dataset.index;
            selectedModules[index].quantity = parseInt(input.value) || 0;
            updateTotals();
        });
    });
}

// Function to delete a module
function deleteModule(index) {
    selectedModules.splice(index, 1); // Remove the module from the selected list
    renderItemList(); // Update the displayed list
    updateTotals(); // Update the totals
}