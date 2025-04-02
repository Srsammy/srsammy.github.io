function dataloaded() {
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