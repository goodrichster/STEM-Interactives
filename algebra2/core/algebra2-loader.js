// Algebra 2 Module Loader
// Dynamic loading system for modular algebra2 units

class Algebra2ModuleLoader {
    constructor() {
        this.loadedModules = new Set();
        this.modulePromises = new Map();
        this.moduleConfigs = {
            'unit1': {
                file: './units/unit1-functions.js',
                name: 'Unit 1: Functions',
                topics: ['domain-range', 'function-characteristics', 'transformations', 'complex-numbers', 'quadratic-formula', 'quadratic-systems']
            },
            'unit2': {
                file: './units/unit2-polynomials.js', 
                name: 'Unit 2: Polynomials',
                topics: ['polynomial-graphs', 'polynomial-operations', 'factoring', 'polynomial-division', 'polynomial-equations']
            },
            'unit3': {
                file: './units/unit3-radicals.js',
                name: 'Unit 3: Radicals & Rationals', 
                topics: ['rational-expressions', 'radical-functions', 'inverse-functions', 'radical-equations', 'rational-exponents']
            },
            'unit4': {
                file: './units/unit4-exponentials.js',
                name: 'Unit 4: Exponentials & Logarithms',
                topics: ['exponential-functions', 'logarithmic-functions', 'exponential-equations', 'logarithmic-equations', 'applications']
            },
            'unit5': {
                file: './units/unit5-rational.js',
                name: 'Unit 5: Rational Functions',
                topics: ['rational-functions']
            },
            'unit6': {
                file: './units/unit6-sequences.js',
                name: 'Unit 6: Sequences',
                topics: ['arithmetic-sequences', 'geometric-sequences', 'series']
            },
            'unit7': {
                file: './units/unit7-trigonometry.js',
                name: 'Unit 7: Trigonometry',
                topics: ['unit-circle-review']
            },
            'unit8': {
                file: './units/unit8-probability.js',
                name: 'Unit 8: Probability',
                topics: ['basic-probability']
            },
            'unit9': {
                file: './units/unit9-statistics.js',
                name: 'Unit 9: Statistics',
                topics: ['data-distributions']
            }
        };
    }

    /**
     * Load a module dynamically
     * @param {string} unitId - The unit identifier (e.g., 'unit1')
     * @returns {Promise} - Promise that resolves when module is loaded
     */
    async loadModule(unitId) {
        // Return existing promise if module is already being loaded
        if (this.modulePromises.has(unitId)) {
            return this.modulePromises.get(unitId);
        }

        // Return immediately if already loaded
        if (this.loadedModules.has(unitId)) {
            return Promise.resolve(true);
        }

        const config = this.moduleConfigs[unitId];
        if (!config) {
            console.error(`Module configuration not found for: ${unitId}`);
            return Promise.resolve(false);
        }

        // Create and store the loading promise
        const loadPromise = this.createModuleScript(unitId, config);
        this.modulePromises.set(unitId, loadPromise);

        return loadPromise;
    }

    /**
     * Create and load module script
     * @param {string} unitId - The unit identifier
     * @param {Object} config - Module configuration
     * @returns {Promise} - Promise that resolves when script is loaded
     */
    createModuleScript(unitId, config) {
        return new Promise((resolve, reject) => {
            // Show loading indicator
            this.showLoadingIndicator(unitId);

            const script = document.createElement('script');
            script.src = config.file;
            script.async = true;

            script.onload = () => {
                this.loadedModules.add(unitId);
                this.hideLoadingIndicator(unitId);
                console.log(`✓ Loaded module: ${config.name}`);
                
                // Initialize module if it has an init function
                const moduleNamespace = window[this.getModuleNamespace(unitId)];
                if (moduleNamespace && typeof moduleNamespace.init === 'function') {
                    moduleNamespace.init();
                }
                
                resolve(true);
            };

            script.onerror = () => {
                this.hideLoadingIndicator(unitId);
                console.error(`✗ Failed to load module: ${config.name}`);
                reject(new Error(`Failed to load ${config.file}`));
            };

            // Add script to document head
            document.head.appendChild(script);
        });
    }

    /**
     * Get the global namespace for a module
     * @param {string} unitId - The unit identifier
     * @returns {string} - Namespace string (e.g., 'Unit1')
     */
    getModuleNamespace(unitId) {
        const unitNumber = unitId.replace('unit', '');
        return `Unit${unitNumber}`;
    }

    /**
     * Load multiple modules in parallel
     * @param {Array<string>} unitIds - Array of unit identifiers
     * @returns {Promise<Array>} - Promise that resolves when all modules are loaded
     */
    async loadModules(unitIds) {
        const loadPromises = unitIds.map(unitId => this.loadModule(unitId));
        return Promise.all(loadPromises);
    }

    /**
     * Preload commonly used modules
     * @returns {Promise} - Promise that resolves when preloading is complete
     */
    async preloadCommonModules() {
        const commonModules = ['unit1']; // Start with Unit 1 as it's most commonly accessed
        return this.loadModules(commonModules);
    }

    /**
     * Check if a module is loaded
     * @param {string} unitId - The unit identifier
     * @returns {boolean} - True if module is loaded
     */
    isModuleLoaded(unitId) {
        return this.loadedModules.has(unitId);
    }

    /**
     * Get module configuration
     * @param {string} unitId - The unit identifier
     * @returns {Object|null} - Module configuration or null if not found
     */
    getModuleConfig(unitId) {
        return this.moduleConfigs[unitId] || null;
    }

    /**
     * Get all available modules
     * @returns {Object} - All module configurations
     */
    getAllModules() {
        return this.moduleConfigs;
    }

    /**
     * Show loading indicator for a specific unit
     * @param {string} unitId - The unit identifier
     */
    showLoadingIndicator(unitId) {
        const unitElement = document.getElementById(unitId);
        if (unitElement) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'module-loading';
            loadingDiv.innerHTML = `
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading ${this.moduleConfigs[unitId]?.name || unitId}...</div>
            `;
            unitElement.appendChild(loadingDiv);
        }
    }

    /**
     * Hide loading indicator for a specific unit
     * @param {string} unitId - The unit identifier
     */
    hideLoadingIndicator(unitId) {
        const unitElement = document.getElementById(unitId);
        if (unitElement) {
            const loadingElement = unitElement.querySelector('.module-loading');
            if (loadingElement) {
                loadingElement.remove();
            }
        }
    }

    /**
     * Initialize the module loader
     */
    init() {
        console.log('Algebra 2 Module Loader initialized');
        
        // Preload common modules
        this.preloadCommonModules().catch(error => {
            console.error('Error preloading modules:', error);
        });

        // Add event listener for module loading errors
        window.addEventListener('error', (event) => {
            if (event.filename && event.filename.includes('/units/')) {
                console.error('Module loading error:', event.error);
            }
        });
    }

    /**
     * Reload a module (useful for development)
     * @param {string} unitId - The unit identifier
     * @returns {Promise} - Promise that resolves when module is reloaded
     */
    async reloadModule(unitId) {
        // Remove from loaded modules
        this.loadedModules.delete(unitId);
        this.modulePromises.delete(unitId);

        // Remove existing script if present
        const existingScript = document.querySelector(`script[src*="${unitId}"]`);
        if (existingScript) {
            existingScript.remove();
        }

        // Clear module namespace
        const namespace = this.getModuleNamespace(unitId);
        if (window[namespace]) {
            delete window[namespace];
        }

        // Load module again
        return this.loadModule(unitId);
    }

    /**
     * Get loading status of all modules
     * @returns {Object} - Object with module loading status
     */
    getLoadingStatus() {
        const status = {};
        Object.keys(this.moduleConfigs).forEach(unitId => {
            status[unitId] = {
                loaded: this.loadedModules.has(unitId),
                loading: this.modulePromises.has(unitId) && !this.loadedModules.has(unitId),
                config: this.moduleConfigs[unitId]
            };
        });
        return status;
    }
}

// Create global module loader instance
window.algebra2Loader = new Algebra2ModuleLoader();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.algebra2Loader.init();
    });
} else {
    window.algebra2Loader.init();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Algebra2ModuleLoader;
}