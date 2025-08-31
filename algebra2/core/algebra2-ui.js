// Algebra 2 UI Management
// Navigation, topic switching, and user interface controls

// Module registry for dynamic loading
const moduleRegistry = {
    'unit1': null,
    'unit2': null,
    'unit3': null,
    'unit4': null,
    'unit5': null,
    'unit6': null,
    'unit7': null,
    'unit8': null,
    'unit9': null
};

// Navigation Functions
function switchUnit(unitId, event) {
    // Hide all unit contents
    const units = document.querySelectorAll('.unit-content');
    units.forEach(unit => {
        unit.classList.remove('active');
    });
    
    // Remove active class from all unit cards
    const unitCards = document.querySelectorAll('.unit-card');
    unitCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Show selected unit
    const selectedUnit = document.getElementById(unitId);
    if (selectedUnit) {
        selectedUnit.classList.add('active');
    }
    
    // Add active class to clicked unit card
    if (event && event.target) {
        const clickedCard = event.target.closest('.unit-card');
        if (clickedCard) {
            clickedCard.classList.add('active');
        }
    }
    
    // Load module dynamically if not already loaded
    loadUnitModule(unitId).then(() => {
        // Initialize the first topic for the unit
        const defaultTopics = {
            'unit1': 'domain-range',
            'unit2': 'polynomial-graphs',
            'unit3': 'rational-expressions',
            'unit4': 'exponential-functions',
            'unit5': 'rational-functions',
            'unit6': 'arithmetic-sequences',
            'unit7': 'unit-circle-review',
            'unit8': 'basic-probability',
            'unit9': 'data-distributions'
        };
        
        if (defaultTopics[unitId]) {
            switchTopic(defaultTopics[unitId]);
        }
    });
}

function switchTopic(topicId) {
    // Hide all topic contents
    const topics = document.querySelectorAll('.topic-content');
    topics.forEach(topic => {
        topic.classList.remove('active');
    });
    
    // Remove active class from all topic buttons
    const topicButtons = document.querySelectorAll('.topic-button');
    topicButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected topic
    const selectedTopic = document.getElementById(topicId);
    if (selectedTopic) {
        selectedTopic.classList.add('active');
    }
    
    // Add active class to clicked topic button
    const clickedButton = event.target;
    if (clickedButton && clickedButton.classList.contains('topic-button')) {
        clickedButton.classList.add('active');
    }
    
    // Call the appropriate topic function
    const topicFunctions = {
        // Unit 1 topics
        'domain-range': () => window.Unit1?.updateDomainRange?.(),
        'function-characteristics': () => window.Unit1?.updateCharacteristics?.(),
        'transformations': () => window.Unit1?.updateTransformations?.(),
        'complex-numbers': () => window.Unit1?.updateComplexPlane?.(),
        'quadratic-formula': () => window.Unit1?.updateQuadraticFormula?.(),
        'quadratic-systems': () => window.Unit1?.updateSystemsGraph?.(),
        
        // Unit 2 topics
        'polynomial-graphs': () => window.Unit2?.updatePolynomial?.(),
        'polynomial-operations': () => window.Unit2?.updateOperations?.(),
        'factoring': () => window.Unit2?.updateFactoring?.(),
        'polynomial-division': () => window.Unit2?.updateDivision?.(),
        'polynomial-equations': () => window.Unit2?.updateEquations?.(),
        
        // Unit 3 topics
        'rational-expressions': () => window.Unit3?.updateRationalExp?.(),
        'radical-functions': () => window.Unit3?.updateRadical?.(),
        'inverse-functions': () => window.Unit3?.updateInverse?.(),
        'radical-equations': () => window.Unit3?.updateRadicalEq?.(),
        'rational-exponents': () => window.Unit3?.updateRationalExpUnit3?.(),
        
        // Unit 4 topics
        'exponential-functions': () => window.Unit4?.updateExponential?.(),
        'logarithmic-functions': () => window.Unit4?.updateLogarithmic?.(),
        'exponential-equations': () => window.Unit4?.updateExpEq?.(),
        'logarithmic-equations': () => window.Unit4?.updateLogEq?.(),
        'applications': () => window.Unit4?.updateApplications?.(),
        
        // Unit 5 topics
        'rational-functions': () => window.Unit5?.updateRationalFunc?.(),
        'asymptotes': () => window.Unit5?.updateAsymptotes?.(),
        'rational-operations': () => window.Unit5?.updateRationalOperations?.(),
        'rational-equations': () => window.Unit5?.updateRationalEquations?.(),
        
        // Unit 6 topics
        'arithmetic-sequences': () => window.Unit6?.updateArithmetic?.(),
        'geometric-sequences': () => window.Unit6?.updateGeometric?.(),
        'series': () => window.Unit6?.updateSeries?.(),
        
        // Unit 7 topics
        'unit-circle-review': () => window.Unit7?.updateUnitCircle?.(),
        'trig-functions': () => window.Unit7?.updateTrigFunction?.(),
        'trig-graphs': () => window.Unit7?.updateTrigGraph?.(),
        'trig-identities': () => { 
            // Initialize the new identities table
            if (window.Unit7?.initializeIdentities) {
                window.Unit7.initializeIdentities();
            }
        },
        
        // Unit 8 topics
        'basic-probability': () => window.Unit8?.updateProbability?.(),
        'permutations-combinations': () => window.Unit8?.calculatePermutationsCombinations?.(),
        'birthday-paradox': () => window.Unit8?.calculateBirthdayParadox?.(),
        'conditional-probability': () => window.Unit8?.showConditionalProbability?.(),
        'bayes-theorem': () => window.Unit8?.showConditionalProbability?.(),
        
        // Unit 9 topics
        'data-distributions': () => window.Unit9?.updateDistribution?.(),
        'binomial-probability': () => window.Unit9?.calculateBinomial?.(),
        'normal-distribution': () => window.Unit9?.calculateZScore?.()
    };

    const topicFunction = topicFunctions[topicId];
    if (topicFunction) {
        topicFunction();
    }
}

// Dynamic Module Loading
async function loadUnitModule(unitId) {
    if (moduleRegistry[unitId]) {
        return moduleRegistry[unitId];
    }
    
    try {
        const moduleMap = {
            'unit1': './units/unit1-functions.js',
            'unit2': './units/unit2-polynomials.js',
            'unit3': './units/unit3-radicals.js',
            'unit4': './units/unit4-exponentials.js',
            'unit5': './units/unit5-rational.js',
            'unit6': './units/unit6-sequences.js',
            'unit7': './units/unit7-trigonometry.js',
            'unit8': './units/unit8-probability.js',
            'unit9': './units/unit9-statistics.js'
        };
        
        if (moduleMap[unitId]) {
            // Create script element for dynamic loading
            const script = document.createElement('script');
            script.src = moduleMap[unitId];
            script.onload = () => {
                console.log(`Loaded module: ${unitId}`);
                moduleRegistry[unitId] = true;
            };
            script.onerror = () => {
                console.error(`Failed to load module: ${unitId}`);
            };
            
            document.head.appendChild(script);
            
            // Wait for script to load
            return new Promise((resolve) => {
                script.onload = () => {
                    moduleRegistry[unitId] = true;
                    resolve(true);
                };
            });
        }
    } catch (error) {
        console.error(`Error loading module ${unitId}:`, error);
    }
    
    return false;
}

// UI Utility Functions
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
    }
}

function hideLoading(elementId) {
    const loadingElement = document.querySelector(`#${elementId} .loading`);
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Form Handling Utilities
function handleFormSubmit(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            callback(data);
        });
    }
}

// Input Validation
function validateNumericInput(value, min = -Infinity, max = Infinity) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
}

function getNumericValue(elementId, defaultValue = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const value = parseFloat(element.value);
        return isNaN(value) ? defaultValue : value;
    }
    return defaultValue;
}

// Event Delegation for Dynamic Content
function setupEventDelegation() {
    document.addEventListener('click', (e) => {
        // Handle unit card clicks
        if (e.target.closest('.unit-card')) {
            const unitCard = e.target.closest('.unit-card');
            const unitId = unitCard.dataset.unit;
            if (unitId) {
                switchUnit(unitId, e);
            }
        }
        
        // Handle topic button clicks
        if (e.target.classList.contains('topic-button')) {
            const topicId = e.target.dataset.topic;
            if (topicId) {
                switchTopic(topicId);
            }
        }
    });
    
    // Handle input changes for real-time updates
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('real-time-update')) {
            const topicId = e.target.closest('.topic-content')?.id;
            if (topicId) {
                // Trigger update for current topic
                switchTopic(topicId);
            }
        }
    });
}

// Initialize UI when DOM is loaded
function initializeUI() {
    setupEventDelegation();
    
    // Set default active unit
    const defaultUnit = document.querySelector('.unit-card[data-unit="unit1"]');
    if (defaultUnit) {
        defaultUnit.classList.add('active');
        switchUnit('unit1');
    }
}

// Error Handling
function displayError(message, elementId = null) {
    console.error(message);
    
    if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<div class="error">${message}</div>`;
        }
    }
}

// Success Messaging
function displaySuccess(message, elementId = null) {
    if (elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<div class="success">${message}</div>`;
            setTimeout(() => {
                const successElement = element.querySelector('.success');
                if (successElement) {
                    successElement.remove();
                }
            }, 3000);
        }
    }
}

// Responsive Utilities
function updateCanvasSize(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas && canvasContexts[canvasId]) {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Reinitialize context
        const ctx = canvasContexts[canvasId];
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(1, -1);
        
        drawGrid(ctx, canvas);
    }
}

// Window resize handler
window.addEventListener('resize', () => {
    // Update all visible canvases
    const visibleCanvases = document.querySelectorAll('.topic-content.active .algebra-canvas');
    visibleCanvases.forEach(canvas => {
        updateCanvasSize(canvas.id);
    });
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchUnit,
        switchTopic,
        loadUnitModule,
        initializeUI,
        handleFormSubmit,
        validateNumericInput,
        getNumericValue,
        displayError,
        displaySuccess,
        updateCanvasSize
    };
}