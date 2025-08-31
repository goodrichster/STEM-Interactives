// Algebra 2 Interactive Simulations
// Comprehensive implementation for 32-week curriculum

// Global variables for canvas contexts
let canvasContexts = {};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvases();
    initializeDomainRange();
});

// Navigation Functions
function switchUnit(unitId) {
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
    const clickedCard = event.target.closest('.unit-card');
    if (clickedCard) {
        clickedCard.classList.add('active');
    }
    
    // Initialize the first topic for the unit
    if (unitId === 'unit1') {
        switchTopic('domain-range');
    } else if (unitId === 'unit2') {
        switchTopic('polynomial-graphs');
    } else if (unitId === 'unit3') {
        switchTopic('rational-expressions');
    } else if (unitId === 'unit4') {
        switchTopic('exponential-functions');
    } else if (unitId === 'unit5') {
        switchTopic('rational-functions');
    } else if (unitId === 'unit6') {
        switchTopic('arithmetic-sequences');
    } else if (unitId === 'unit7') {
        switchTopic('unit-circle-review');
    } else if (unitId === 'unit8') {
        switchTopic('basic-probability');
    } else if (unitId === 'unit9') {
        switchTopic('data-distributions');
    }
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
    
    // Initialize the selected topic
    switch(topicId) {
        // Unit 1 topics
        case 'domain-range':
            updateDomainRange();
            break;
        case 'function-characteristics':
            updateCharacteristics();
            break;
        case 'transformations':
            updateTransformations();
            break;
        case 'complex-numbers':
            updateComplexPlane();
            break;
        case 'quadratic-formula':
            updateQuadraticFormula();
            break;
        case 'quadratic-systems':
            updateSystemsGraph();
            break;
        // Unit 2 topics
        case 'polynomial-graphs':
            updatePolynomial();
            break;
        case 'polynomial-operations':
            updateOperations();
            break;
        case 'factoring':
            updateFactoring();
            break;
        case 'polynomial-division':
            updateDivision();
            break;
        case 'polynomial-equations':
            updateEquations();
            break;
        // Unit 3 topics
        case 'rational-expressions':
            updateRationalExp();
            break;
        case 'radical-functions':
            updateRadical();
            break;
        case 'inverse-functions':
            updateInverse();
            break;
        case 'radical-equations':
            updateRadicalEq();
            break;
        case 'rational-exponents':
            updateRationalExpUnit3();
            break;
        // Unit 4 topics
        case 'exponential-functions':
            updateExponential();
            break;
        case 'logarithmic-functions':
            updateLogarithmic();
            break;
        case 'exponential-equations':
            updateExpEq();
            break;
        case 'logarithmic-equations':
            updateLogEq();
            break;
        case 'applications':
            updateApplications();
            break;
        // Unit 5 topics
        case 'rational-functions':
            updateRationalFunc();
            break;
        // Unit 6 topics
        case 'arithmetic-sequences':
            updateArithmetic();
            break;
        // Unit 7 topics
        case 'unit-circle-review':
            updateUnitCircle();
            break;
        // Unit 8 topics
        case 'basic-probability':
            updateProbability();
            break;
        // Unit 9 topics
        case 'data-distributions':
            window.Unit9?.updateDistribution?.();
            break;
    }
}

// Initialize all canvas elements
function initializeCanvases() {
    const canvases = document.querySelectorAll('.algebra-canvas');
    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        canvasContexts[canvas.id] = ctx;
        
        // Set canvas size
        canvas.width = 600;
        canvas.height = 400;
        
        // Set up coordinate system
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(1, -1); // Flip Y axis for mathematical coordinates
        
        drawGrid(ctx, canvas);
    });
}

// Draw coordinate grid
function drawGrid(ctx, canvas) {
    const width = canvas.width;
    const height = canvas.height;
    const scale = 40;
    
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    
    // Reset transform for grid drawing
    ctx.translate(width / 2, height / 2);
    ctx.scale(1, -1);
    
    // Grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Vertical lines
    for (let x = -width/2; x <= width/2; x += scale) {
        ctx.moveTo(x, -height/2);
        ctx.lineTo(x, height/2);
    }
    
    // Horizontal lines
    for (let y = -height/2; y <= height/2; y += scale) {
        ctx.moveTo(-width/2, y);
        ctx.lineTo(width/2, y);
    }
    
    ctx.stroke();
    
    // Axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // X-axis
    ctx.moveTo(-width/2, 0);
    ctx.lineTo(width/2, 0);
    
    // Y-axis
    ctx.moveTo(0, -height/2);
    ctx.lineTo(0, height/2);
    
    ctx.stroke();
    ctx.restore();
}

// Domain and Range Functions
function initializeDomainRange() {
    updateDomainRange();
}

function updateDomainRange() {
    const canvas = document.getElementById('domainRangeCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['domainRangeCanvas'];
    drawGrid(ctx, canvas);
    
    const functionType = document.getElementById('domainFunction').value;
    
    switch(functionType) {
        case 'linear':
            drawLinearFunction(ctx, canvas);
            updateDomainRangeInfo('Linear Function: f(x) = 2x + 1', 'Domain: All real numbers', 'Range: All real numbers');
            break;
        case 'quadratic':
            drawQuadraticFunction(ctx, canvas, 1, 0, -4);
            updateDomainRangeInfo('Quadratic Function: f(x) = x² - 4', 'Domain: All real numbers', 'Range: [-4, ∞)');
            break;
        case 'absolute':
            drawAbsoluteFunction(ctx, canvas);
            updateDomainRangeInfo('Absolute Value: f(x) = |x - 2| + 1', 'Domain: All real numbers', 'Range: [1, ∞)');
            break;
        case 'rational':
            drawRationalFunction(ctx, canvas);
            updateDomainRangeInfo('Rational Function: f(x) = 1/(x-2)', 'Domain: x ≠ 2', 'Range: y ≠ 0');
            break;
        case 'radical':
            drawRadicalFunction(ctx, canvas);
            updateDomainRangeInfo('Radical Function: f(x) = √x', 'Domain: [0, ∞)', 'Range: [0, ∞)');
            break;
        case 'exponential':
            drawExponentialFunction(ctx, canvas);
            updateDomainRangeInfo('Exponential Function: f(x) = 2^x', 'Domain: All real numbers', 'Range: (0, ∞)');
            break;
        case 'logarithmic':
            drawLogarithmicFunction(ctx, canvas);
            updateDomainRangeInfo('Logarithmic Function: f(x) = log(x)', 'Domain: (0, ∞)', 'Range: All real numbers');
            break;
    }
}

function drawRadicalFunction(ctx, canvas) {
    const scale = 40;
    const startX = 0;
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = Math.sqrt(x);
        
        const canvasX = x * scale;
        const canvasY = y * scale;
        
        if (first) {
            ctx.moveTo(canvasX, canvasY);
            first = false;
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    
    ctx.stroke();
}

function drawExponentialFunction(ctx, canvas) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = Math.pow(2, x);
        
        if (y < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
}

function drawLogarithmicFunction(ctx, canvas) {
    const scale = 40;
    const startX = 0.1;
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = Math.log10(x);
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
}

function analyzeDomainRange() {
    const functionType = document.getElementById('domainFunction').value;
    let analysis = '';
    
    switch(functionType) {
        case 'linear':
            analysis = '<strong>Linear Function Analysis:</strong><br>Linear functions have no restrictions.<br><strong>Domain:</strong> (-∞, ∞)<br><strong>Range:</strong> (-∞, ∞)';
            break;
        case 'quadratic':
            analysis = '<strong>Quadratic Function Analysis:</strong><br>Quadratic functions have no domain restrictions.<br><strong>Domain:</strong> (-∞, ∞)<br><strong>Range:</strong> Depends on vertex and opening direction';
            break;
        case 'rational':
            analysis = '<strong>Rational Function Analysis:</strong><br>Rational functions are undefined where denominator = 0.<br><strong>Domain:</strong> x ≠ values that make denominator zero<br><strong>Range:</strong> y ≠ horizontal asymptote value';
            break;
        case 'radical':
            analysis = '<strong>Radical Function Analysis:</strong><br>Square root functions require non-negative radicand.<br><strong>Domain:</strong> [0, ∞)<br><strong>Range:</strong> [0, ∞)';
            break;
        case 'exponential':
            analysis = '<strong>Exponential Function Analysis:</strong><br>Exponential functions are defined for all real numbers.<br><strong>Domain:</strong> (-∞, ∞)<br><strong>Range:</strong> (0, ∞)';
            break;
        case 'logarithmic':
            analysis = '<strong>Logarithmic Function Analysis:</strong><br>Logarithmic functions require positive arguments.<br><strong>Domain:</strong> (0, ∞)<br><strong>Range:</strong> (-∞, ∞)';
            break;
    }
    
    const infoDiv = document.getElementById('domainRangeResults');
    if (infoDiv) {
        infoDiv.innerHTML = analysis;
    }
}

function showIntervalNotation() {
    const functionType = document.getElementById('domainFunction').value;
    let notation = '';
    
    switch(functionType) {
        case 'linear':
            notation = '<strong>Interval Notation:</strong><br><strong>Domain:</strong> (-∞, ∞)<br><strong>Range:</strong> (-∞, ∞)';
            break;
        case 'quadratic':
            notation = '<strong>Interval Notation:</strong><br><strong>Domain:</strong> (-∞, ∞)<br><strong>Range:</strong> [-4, ∞) for f(x) = x² - 4';
            break;
        case 'rational':
            notation = '<strong>Interval Notation:</strong><br><strong>Domain:</strong> (-∞, 2) ∪ (2, ∞)<br><strong>Range:</strong> (-∞, 0) ∪ (0, ∞)';
            break;
        case 'radical':
            notation = '<strong>Interval Notation:</strong><br><strong>Domain:</strong> [0, ∞)<br><strong>Range:</strong> [0, ∞)';
            break;
        case 'exponential':
            notation = '<strong>Interval Notation:</strong><br><strong>Domain:</strong> (-∞, ∞)<br><strong>Range:</strong> (0, ∞)';
            break;
        case 'logarithmic':
            notation = '<strong>Interval Notation:</strong><br><strong>Domain:</strong> (0, ∞)<br><strong>Range:</strong> (-∞, ∞)';
            break;
    }
    
    const infoDiv = document.getElementById('domainRangeResults');
    if (infoDiv) {
        infoDiv.innerHTML = notation;
    }
}

function drawLinearFunction(ctx, canvas) {
    const scale = 40;
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.moveTo(startX * scale, (2 * startX + 1) * scale);
    ctx.lineTo(endX * scale, (2 * endX + 1) * scale);
    ctx.stroke();
}

function drawQuadraticFunction(ctx, canvas, a = 1, b = 0, c = -4) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = a * x * x + b * x + c;
        
        if (!isNaN(y) && isFinite(y) && Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
    
    // Mark vertex if within reasonable bounds
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
    
    if (Math.abs(vertexX) < 10 && Math.abs(vertexY) < 10) {
        ctx.fillStyle = '#F44336';
        ctx.beginPath();
        ctx.arc(vertexX * scale, vertexY * scale, 6, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function drawAbsoluteFunction(ctx, canvas) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = Math.abs(x - 2) + 1;
        
        const canvasX = x * scale;
        const canvasY = y * scale;
        
        if (first) {
            ctx.moveTo(canvasX, canvasY);
            first = false;
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    
    ctx.stroke();
}

function drawRationalFunction(ctx, canvas) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    
    // Draw left branch
    ctx.beginPath();
    let first = true;
    for (let x = startX; x < 1.8; x += 0.1) {
        const y = 1 / (x - 2);
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    ctx.stroke();
    
    // Draw right branch
    ctx.beginPath();
    first = true;
    for (let x = 2.2; x <= endX; x += 0.1) {
        const y = 1 / (x - 2);
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    ctx.stroke();
    
    // Draw asymptotes
    ctx.strokeStyle = '#ff4444';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    
    // Vertical asymptote at x = 2
    ctx.beginPath();
    ctx.moveTo(2 * scale, -canvas.height/2);
    ctx.lineTo(2 * scale, canvas.height/2);
    ctx.stroke();
    
    // Horizontal asymptote at y = 0
    ctx.beginPath();
    ctx.moveTo(-canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, 0);
    ctx.stroke();
    
    ctx.setLineDash([]);
}

function updateDomainRangeInfo(func, domain, range) {
    const infoDiv = document.getElementById('domainRangeResults');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <div><strong>${func}</strong></div>
            <div>${domain}</div>
            <div>${range}</div>
        `;
    }
}

// Function Characteristics
function updateCharacteristics() {
    const canvas = document.getElementById('characteristicsCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['characteristicsCanvas'];
    drawGrid(ctx, canvas);
    
    const functionType = document.getElementById('characteristicsFunction').value;
    
    if (functionType === 'quadratic') {
        drawQuadraticFunction(ctx, canvas, 1, 0, 0);
        updateCharacteristicsInfo('f(x) = x²', 'Vertex: (0, 0)', 'Decreasing: (-∞, 0)', 'Increasing: (0, ∞)');
    } else if (functionType === 'cubic') {
        drawCubicFunction(ctx, canvas);
        updateCharacteristicsInfo('f(x) = x³ - 3x', 'Critical points: x = ±1', 'Local max at (-1, 2)', 'Local min at (1, -2)');
    }
}

function drawCubicFunction(ctx, canvas) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.05) {
        const y = x * x * x - 3 * x;
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
    
    // Mark critical points
    ctx.fillStyle = '#F44336';
    
    // Local maximum at (-1, 2)
    ctx.beginPath();
    ctx.arc(-1 * scale, 2 * scale, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Local minimum at (1, -2)
    ctx.beginPath();
    ctx.arc(1 * scale, -2 * scale, 6, 0, 2 * Math.PI);
    ctx.fill();
}

function updateCharacteristicsInfo(func, info1, info2, info3) {
    const infoDiv = document.getElementById('characteristicsResults');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <div><strong>${func}</strong></div>
            <div>${info1}</div>
            <div>${info2}</div>
            <div>${info3}</div>
        `;
    }
}

function findPositiveNegative() {
    const functionType = document.getElementById('characteristicsFunction').value;
    let result = '';
    
    if (functionType === 'quadratic') {
        result = '<strong>For f(x) = x²:</strong><br>• <strong>Positive on:</strong> (-∞, 0) ∪ (0, ∞)<br>• <strong>Zero at:</strong> x = 0<br>• <strong>Never negative</strong>';
    } else if (functionType === 'cubic') {
        result = '<strong>For f(x) = x³ - 3x:</strong><br>• <strong>Positive on:</strong> (-√3, 0) ∪ (√3, ∞)<br>• <strong>Negative on:</strong> (-∞, -√3) ∪ (0, √3)<br>• <strong>Zeros at:</strong> x = 0, ±√3';
    }
    
    const infoDiv = document.getElementById('characteristicsResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function findExtrema() {
    const functionType = document.getElementById('characteristicsFunction').value;
    let result = '';
    
    if (functionType === 'quadratic') {
        result = '<strong>For f(x) = x²:</strong><br>• <strong>Global minimum at:</strong> (0, 0)<br>• <strong>No maximum</strong> (approaches ∞)';
    } else if (functionType === 'cubic') {
        result = '<strong>For f(x) = x³ - 3x:</strong><br>• <strong>Local maximum at:</strong> (-1, 2)<br>• <strong>Local minimum at:</strong> (1, -2)<br>• <strong>No global extrema</strong>';
    }
    
    const infoDiv = document.getElementById('characteristicsResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function findIncreasingDecreasing() {
    const functionType = document.getElementById('characteristicsFunction').value;
    let result = '';
    
    if (functionType === 'quadratic') {
        result = '<strong>For f(x) = x²:</strong><br>• <strong>Decreasing on:</strong> (-∞, 0)<br>• <strong>Increasing on:</strong> (0, ∞)<br>• <strong>Vertex at:</strong> (0, 0)';
    } else if (functionType === 'cubic') {
        result = '<strong>For f(x) = x³ - 3x:</strong><br>• <strong>Increasing on:</strong> (-∞, -1)<br>• <strong>Decreasing on:</strong> (-1, 1)<br>• <strong>Increasing on:</strong> (1, ∞)<br>• <strong>Critical points at:</strong> x = ±1';
    }
    
    const infoDiv = document.getElementById('characteristicsResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Function Transformations
function updateTransformations() {
    const canvas = document.getElementById('transformationsCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['transformationsCanvas'];
    drawGrid(ctx, canvas);
    
    const h = parseFloat(document.getElementById('transformH').value) || 0;
    const k = parseFloat(document.getElementById('transformK').value) || 0;
    const a = parseFloat(document.getElementById('transformA').value) || 1;
    
    // Update display values
    document.getElementById('transformAValue').textContent = a;
    document.getElementById('transformHValue').textContent = h;
    document.getElementById('transformKValue').textContent = k;
    
    // Draw original function f(x) = x²
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 2;
    drawQuadraticFunction(ctx, canvas, 1, 0, 0);
    
    // Draw transformed function f(x) = a(x - h)² + k
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    drawTransformedQuadratic(ctx, canvas, a, h, k);
    
    updateTransformationInfo(a, h, k);
}

function drawTransformedQuadratic(ctx, canvas, a, h, k) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.beginPath();
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = a * (x - h) * (x - h) + k;
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
    
    // Mark vertex
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.arc(h * scale, k * scale, 6, 0, 2 * Math.PI);
    ctx.fill();
}

function updateTransformationInfo(a, h, k) {
    const infoDiv = document.getElementById('transformationResults');
    if (infoDiv) {
        const stretchDesc = Math.abs(a) > 1 ? `stretched by factor ${Math.abs(a)}` : 
                           Math.abs(a) < 1 ? `compressed by factor ${Math.abs(a)}` : 'no stretch';
        const reflectDesc = a < 0 ? ', reflected over x-axis' : '';
        const hShiftDesc = h > 0 ? `right ${h} units` : h < 0 ? `left ${Math.abs(h)} units` : 'no horizontal shift';
        const vShiftDesc = k > 0 ? `up ${k} units` : k < 0 ? `down ${Math.abs(k)} units` : 'no vertical shift';
        
        infoDiv.innerHTML = `
            <div><strong>f(x) = ${a}(x - ${h})² + ${k}</strong></div>
            <div>Vertex: (${h}, ${k})</div>
            <div>Vertical: ${stretchDesc}${reflectDesc}</div>
            <div>Horizontal: ${hShiftDesc}</div>
            <div>Vertical: ${vShiftDesc}</div>
        `;
    }
}

// Complex Numbers
function updateComplexPlane() {
    const canvas = document.getElementById('complexCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['complexCanvas'];
    drawGrid(ctx, canvas);
    
    const real1 = parseFloat(document.getElementById('complexReal1').value) || 0;
    const imag1 = parseFloat(document.getElementById('complexImag1').value) || 0;
    const real2 = parseFloat(document.getElementById('complexReal2').value) || 0;
    const imag2 = parseFloat(document.getElementById('complexImag2').value) || 0;
    
    drawComplexNumber(ctx, real1, imag1, '#667eea', 'z₁');
    drawComplexNumber(ctx, real2, imag2, '#f093fb', 'z₂');
    
    updateComplexInfo(real1, imag1, real2, imag2);
}

function updateComplex() {
    updateComplexPlane();
}

function drawComplexNumber(ctx, real, imag, color, label) {
    const scale = 40;
    
    // Draw vector from origin
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(real * scale, imag * scale);
    ctx.stroke();
    
    // Draw point
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(real * scale, imag * scale, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add label
    ctx.save();
    ctx.scale(1, -1);
    ctx.fillStyle = color;
    ctx.font = '14px Arial';
    ctx.fillText(label, real * scale + 10, -imag * scale + 5);
    ctx.restore();
}

function updateComplexInfo(real1, imag1, real2, imag2) {
    const infoDiv = document.getElementById('complexResults');
    if (infoDiv) {
        const mag1 = Math.sqrt(real1 * real1 + imag1 * imag1);
        const mag2 = Math.sqrt(real2 * real2 + imag2 * imag2);
        
        infoDiv.innerHTML = `
            <div><strong>z₁ = ${real1} + ${imag1}i</strong></div>
            <div>|z₁| = ${mag1.toFixed(2)}</div>
            <div><strong>z₂ = ${real2} + ${imag2}i</strong></div>
            <div>|z₂| = ${mag2.toFixed(2)}</div>
        `;
    }
}

function performComplexOperation() {
    const operation = document.getElementById('complexOperation').value;
    const real1 = parseFloat(document.getElementById('complexReal1').value) || 0;
    const imag1 = parseFloat(document.getElementById('complexImag1').value) || 0;
    const real2 = parseFloat(document.getElementById('complexReal2').value) || 0;
    const imag2 = parseFloat(document.getElementById('complexImag2').value) || 0;
    
    let resultReal, resultImag, resultText;
    
    switch(operation) {
        case 'add':
            resultReal = real1 + real2;
            resultImag = imag1 + imag2;
            resultText = `<strong>Addition:</strong><br>(${real1} + ${imag1}i) + (${real2} + ${imag2}i) = <strong>${resultReal} + ${resultImag}i</strong>`;
            break;
        case 'subtract':
            resultReal = real1 - real2;
            resultImag = imag1 - imag2;
            resultText = `<strong>Subtraction:</strong><br>(${real1} + ${imag1}i) - (${real2} + ${imag2}i) = <strong>${resultReal} + ${resultImag}i</strong>`;
            break;
        case 'multiply':
            resultReal = real1 * real2 - imag1 * imag2;
            resultImag = real1 * imag2 + imag1 * real2;
            resultText = `<strong>Multiplication:</strong><br>(${real1} + ${imag1}i) × (${real2} + ${imag2}i) = <strong>${resultReal} + ${resultImag}i</strong>`;
            break;
        case 'divide':
            const denominator = real2 * real2 + imag2 * imag2;
            if (denominator === 0) {
                resultText = '<strong>Error:</strong><br>Division by zero is undefined';
                const infoDiv = document.getElementById('complexResults');
                if (infoDiv) {
                    infoDiv.innerHTML = resultText;
                }
                return;
            }
            resultReal = (real1 * real2 + imag1 * imag2) / denominator;
            resultImag = (imag1 * real2 - real1 * imag2) / denominator;
            resultText = `<strong>Division:</strong><br>(${real1} + ${imag1}i) ÷ (${real2} + ${imag2}i) = <strong>${resultReal.toFixed(3)} + ${resultImag.toFixed(3)}i</strong>`;
            break;
    }
    
    const infoDiv = document.getElementById('complexResults');
    if (infoDiv) {
        infoDiv.innerHTML = resultText;
    }
    
    // Draw result if it's not division error
    if (operation !== 'divide' || (real2 * real2 + imag2 * imag2 !== 0)) {
        const canvas = document.getElementById('complexCanvas');
        const ctx = canvasContexts['complexCanvas'];
        drawComplexNumber(ctx, resultReal, resultImag, '#4CAF50', 'result');
    }
}

// Quadratic Formula
function updateQuadraticFormula() {
    const canvas = document.getElementById('quadraticCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['quadraticCanvas'];
    drawGrid(ctx, canvas);
    
    const a = parseFloat(document.getElementById('quadraticA').value) || 1;
    const b = parseFloat(document.getElementById('quadraticB').value) || 0;
    const c = parseFloat(document.getElementById('quadraticC').value) || 0;
    
    drawQuadraticFunction(ctx, canvas, a, b, c);
    calculateQuadraticProperties(a, b, c);
}

function updateQuadratic() {
    updateQuadraticFormula();
}

function completeSquare() {
    const a = parseFloat(document.getElementById('quadraticA').value) || 1;
    const b = parseFloat(document.getElementById('quadraticB').value) || 0;
    const c = parseFloat(document.getElementById('quadraticC').value) || 0;
    
    const h = -b / (2 * a);
    const k = c - (b * b) / (4 * a);
    
    let message = `<strong>Completing the square for ${a}x² + ${b}x + ${c}:</strong><br><br>`;
    message += `<strong>Step 1:</strong> Factor out coefficient of x²<br>`;
    message += `${a}(x² + ${(b/a).toFixed(3)}x) + ${c}<br><br>`;
    message += `<strong>Step 2:</strong> Complete the square inside parentheses<br>`;
    message += `Half of ${(b/a).toFixed(3)} is ${(b/(2*a)).toFixed(3)}<br>`;
    message += `Square it: (${(b/(2*a)).toFixed(3)})² = ${(b*b/(4*a*a)).toFixed(3)}<br><br>`;
    message += `<strong>Step 3:</strong> Add and subtract inside<br>`;
    message += `${a}(x² + ${(b/a).toFixed(3)}x + ${(b*b/(4*a*a)).toFixed(3)} - ${(b*b/(4*a*a)).toFixed(3)}) + ${c}<br><br>`;
    message += `<strong>Step 4:</strong> Factor perfect square trinomial<br>`;
    message += `${a}(x + ${(b/(2*a)).toFixed(3)})² - ${(b*b/(4*a)).toFixed(3)} + ${c}<br><br>`;
    message += `<strong>Step 5:</strong> Simplify<br>`;
    message += `<strong>f(x) = ${a}(x - ${h.toFixed(3)})² + ${k.toFixed(3)}</strong>`;
    
    const infoDiv = document.getElementById('quadraticResults');
    if (infoDiv) {
        infoDiv.innerHTML = message;
    }
}

function calculateQuadraticProperties(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
    
    let rootsText = '';
    if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        rootsText = `Two real roots: x = ${root1.toFixed(3)}, x = ${root2.toFixed(3)}`;
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        rootsText = `One real root: x = ${root.toFixed(3)}`;
    } else {
        rootsText = 'No real roots (complex roots)';
    }
    
    const infoDiv = document.getElementById('quadraticInfo');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <div><strong>f(x) = ${a}x² + ${b}x + ${c}</strong></div>
            <div>Discriminant: ${discriminant}</div>
            <div>Vertex: (${vertexX.toFixed(3)}, ${vertexY.toFixed(3)})</div>
            <div>${rootsText}</div>
        `;
    }
}

function solveQuadratic() {
    const a = parseFloat(document.getElementById('quadraticA').value) || 1;
    const b = parseFloat(document.getElementById('quadraticB').value) || 0;
    const c = parseFloat(document.getElementById('quadraticC').value) || 0;
    
    const discriminant = b * b - 4 * a * c;
    
    let message = `<strong>Solving ${a}x² + ${b}x + ${c} = 0:</strong><br><br>`;
    message += `<strong>Discriminant:</strong> b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}<br><br>`;
    
    if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        message += `<strong>Two real solutions:</strong><br>`;
        message += `x₁ = ${root1.toFixed(6)}<br>`;
        message += `x₂ = ${root2.toFixed(6)}`;
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        message += `<strong>One real solution:</strong><br>`;
        message += `x = ${root.toFixed(6)}`;
    } else {
        const realPart = -b / (2 * a);
        const imagPart = Math.sqrt(-discriminant) / (2 * a);
        message += `<strong>Two complex solutions:</strong><br>`;
        message += `x₁ = ${realPart.toFixed(6)} + ${imagPart.toFixed(6)}i<br>`;
        message += `x₂ = ${realPart.toFixed(6)} - ${imagPart.toFixed(6)}i`;
    }
    
    const infoDiv = document.getElementById('quadraticResults');
    if (infoDiv) {
        infoDiv.innerHTML = message;
    }
}

// Systems of Equations
function updateSystemsGraph() {
    const canvas = document.getElementById('systemsCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['systemsCanvas'];
    drawGrid(ctx, canvas);
    
    const a1 = parseFloat(document.getElementById('systemA1').value) || 1;
    const b1 = parseFloat(document.getElementById('systemB1').value) || 1;
    const c1 = parseFloat(document.getElementById('systemC1').value) || 0;
    const a2 = parseFloat(document.getElementById('systemA2').value) || 1;
    const b2 = parseFloat(document.getElementById('systemB2').value) || -1;
    const c2 = parseFloat(document.getElementById('systemC2').value) || 0;
    
    drawLinearEquation(ctx, canvas, a1, b1, c1, '#667eea');
    drawLinearEquation(ctx, canvas, a2, b2, c2, '#f093fb');
    
    const solution = solveLinearSystem(a1, b1, c1, a2, b2, c2);
    if (solution) {
        drawIntersectionPoint(ctx, solution.x, solution.y);
        updateSystemsInfo(a1, b1, c1, a2, b2, c2, solution);
    } else {
        updateSystemsInfo(a1, b1, c1, a2, b2, c2, null);
    }
}

function updateSystems() {
    updateSystemsGraph();
}

function solveSystem() {
    solveSystemAlgebraically();
}

function drawLinearEquation(ctx, canvas, a, b, c, color) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    if (Math.abs(b) > 0.0001) {
        // Line is not vertical: y = (-a*x + c) / b
        const y1 = (-a * startX + c) / b;
        const y2 = (-a * endX + c) / b;
        
        ctx.moveTo(startX * scale, y1 * scale);
        ctx.lineTo(endX * scale, y2 * scale);
    } else if (Math.abs(a) > 0.0001) {
        // Vertical line: x = c / a
        const x = c / a;
        ctx.moveTo(x * scale, -canvas.height / 2);
        ctx.lineTo(x * scale, canvas.height / 2);
    }
    
    ctx.stroke();
}

function drawIntersectionPoint(ctx, x, y) {
    const scale = 40;
    
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(x * scale, y * scale, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add coordinates label
    ctx.save();
    ctx.scale(1, -1);
    ctx.fillStyle = '#4CAF50';
    ctx.font = '12px Arial';
    ctx.fillText(`(${x.toFixed(2)}, ${y.toFixed(2)})`, x * scale + 10, -y * scale - 10);
    ctx.restore();
}

function solveLinearSystem(a1, b1, c1, a2, b2, c2) {
    const determinant = a1 * b2 - a2 * b1;
    
    if (Math.abs(determinant) < 0.0001) {
        return null; // No unique solution
    }
    
    const x = (c1 * b2 - c2 * b1) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;
    
    return { x, y };
}

function updateSystemsInfo(a1, b1, c1, a2, b2, c2, solution) {
    const infoDiv = document.getElementById('systemsResults');
    if (infoDiv) {
        let solutionText = '';
        if (solution) {
            solutionText = `Solution: (${solution.x.toFixed(3)}, ${solution.y.toFixed(3)})`;
        } else {
            solutionText = 'No unique solution (parallel or coincident lines)';
        }
        
        infoDiv.innerHTML = `
            <div><strong>Equation 1: ${a1}x + ${b1}y = ${c1}</strong></div>
            <div><strong>Equation 2: ${a2}x + ${b2}y = ${c2}</strong></div>
            <div>${solutionText}</div>
        `;
    }
}

function solveSystemAlgebraically() {
    const a1 = parseFloat(document.getElementById('systemA1').value) || 1;
    const b1 = parseFloat(document.getElementById('systemB1').value) || 1;
    const c1 = parseFloat(document.getElementById('systemC1').value) || 0;
    const a2 = parseFloat(document.getElementById('systemA2').value) || 1;
    const b2 = parseFloat(document.getElementById('systemB2').value) || -1;
    const c2 = parseFloat(document.getElementById('systemC2').value) || 0;
    
    const determinant = a1 * b2 - a2 * b1;
    
    let message = `System of equations:\n`;
    message += `${a1}x + ${b1}y = ${c1}\n`;
    message += `${a2}x + ${b2}y = ${c2}\n\n`;
    
    if (Math.abs(determinant) < 0.0001) {
        message += 'No unique solution.\n';
        if (a1 * c2 === a2 * c1 && b1 * c2 === b2 * c1) {
            message += 'The lines are coincident (infinite solutions).';
        } else {
            message += 'The lines are parallel (no solution).';
        }
    } else {
        const x = (c1 * b2 - c2 * b1) / determinant;
        const y = (a1 * c2 - a2 * c1) / determinant;
        
        message += `Using Cramer's rule:\n`;
        message += `Determinant = ${determinant}\n`;
        message += `x = ${x.toFixed(6)}\n`;
        message += `y = ${y.toFixed(6)}`;
    }
    
    alert(message);
}

// ========================================
// UNIT 2: POLYNOMIALS
// ========================================

// Polynomial Graphs
function updatePolynomial() {
    const canvas = document.getElementById('polynomialCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['polynomialCanvas'];
    drawGrid(ctx, canvas);
    
    const degree = document.getElementById('polynomialDegree').value;
    const leadingCoeff = parseFloat(document.getElementById('leadingCoeff').value) || 1;
    
    // Draw polynomial based on degree
    if (degree === '2') {
        drawQuadraticFunction(ctx, canvas, leadingCoeff, 0, 0);
    } else if (degree === '3') {
        drawCubicPolynomial(ctx, canvas, leadingCoeff);
    } else if (degree === '4') {
        drawQuarticPolynomial(ctx, canvas, leadingCoeff);
    }
    
    updatePolynomialInfo(degree, leadingCoeff);
}

function drawCubicPolynomial(ctx, canvas, a) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = a * x * x * x;
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
}

function drawQuarticPolynomial(ctx, canvas, a) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = a * x * x * x * x;
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
}

function updatePolynomialInfo(degree, leadingCoeff) {
    const infoDiv = document.getElementById('polynomialResults');
    if (infoDiv) {
        let endBehavior = '';
        if (degree === '2') {
            endBehavior = leadingCoeff > 0 ? 'Both ends up' : 'Both ends down';
        } else if (degree === '3') {
            endBehavior = leadingCoeff > 0 ? 'Left down, Right up' : 'Left up, Right down';
        } else if (degree === '4') {
            endBehavior = leadingCoeff > 0 ? 'Both ends up' : 'Both ends down';
        }
        
        infoDiv.innerHTML = `
            <div><strong>Degree ${degree} polynomial</strong></div>
            <div>Leading coefficient: ${leadingCoeff}</div>
            <div>End behavior: ${endBehavior}</div>
        `;
    }
}

function analyzeEndBehavior() {
    const degree = document.getElementById('polynomialDegree').value;
    const leadingCoeff = parseFloat(document.getElementById('leadingCoeff').value) || 1;
    
    let analysis = '';
    if (degree === '2') {
        analysis = `<strong>Degree 2 (Even):</strong><br>`;
        analysis += leadingCoeff > 0 ? 'As x → -∞, f(x) → +∞<br>As x → +∞, f(x) → +∞' : 'As x → -∞, f(x) → -∞<br>As x → +∞, f(x) → -∞';
    } else if (degree === '3') {
        analysis = `<strong>Degree 3 (Odd):</strong><br>`;
        analysis += leadingCoeff > 0 ? 'As x → -∞, f(x) → -∞<br>As x → +∞, f(x) → +∞' : 'As x → -∞, f(x) → +∞<br>As x → +∞, f(x) → -∞';
    } else if (degree === '4') {
        analysis = `<strong>Degree 4 (Even):</strong><br>`;
        analysis += leadingCoeff > 0 ? 'As x → -∞, f(x) → +∞<br>As x → +∞, f(x) → +∞' : 'As x → -∞, f(x) → -∞<br>As x → +∞, f(x) → -∞';
    }
    
    const infoDiv = document.getElementById('polynomialResults');
    if (infoDiv) {
        infoDiv.innerHTML = analysis;
    }
}

function findTurningPoints() {
    const degree = parseInt(document.getElementById('polynomialDegree').value);
    
    let analysis = `<strong>Turning Points Analysis:</strong><br>`;
    analysis += `A polynomial of degree ${degree} has at most ${degree - 1} turning points.<br><br>`;
    
    if (degree === 2) {
        analysis += 'Quadratic: exactly 1 turning point (vertex)';
    } else if (degree === 3) {
        analysis += 'Cubic: at most 2 turning points (local max and min)';
    } else if (degree === 4) {
        analysis += 'Quartic: at most 3 turning points';
    }
    
    const infoDiv = document.getElementById('polynomialResults');
    if (infoDiv) {
        infoDiv.innerHTML = analysis;
    }
}

// Polynomial Operations
function updateOperations() {
    // Initialize polynomial operations display
    const infoDiv = document.getElementById('operationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = '<div>Enter polynomials and select an operation to see results.</div>';
    }
}

function performOperation() {
    const poly1 = document.getElementById('polynomial1').value.trim();
    const poly2 = document.getElementById('polynomial2').value.trim();
    const operation = document.getElementById('operation').value;
    
    if (!poly1 || !poly2) {
        const infoDiv = document.getElementById('operationsResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div><strong>Error:</strong> Please enter both polynomials</div>';
        }
        return;
    }
    
    let result = '';
    
    switch(operation) {
        case 'add':
            result = `<strong>Addition:</strong><br>(${poly1}) + (${poly2})<br><br>`;
            result += 'Combine like terms to get the sum.';
            break;
        case 'subtract':
            result = `<strong>Subtraction:</strong><br>(${poly1}) - (${poly2})<br><br>`;
            result += 'Distribute the negative and combine like terms.';
            break;
        case 'multiply':
            result = `<strong>Multiplication:</strong><br>(${poly1}) × (${poly2})<br><br>`;
            result += 'Use FOIL or distribution to multiply all terms.';
            break;
    }
    
    const infoDiv = document.getElementById('operationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Factoring
function updateFactoring() {
    const infoDiv = document.getElementById('factoringResults');
    if (infoDiv) {
        infoDiv.innerHTML = '<div>Enter a polynomial to factor it.</div>';
    }
}

function factorPolynomial() {
    const polynomial = document.getElementById('factorInput').value.trim();
    
    if (!polynomial) {
        const infoDiv = document.getElementById('factoringResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div><strong>Error:</strong> Please enter a polynomial</div>';
        }
        return;
    }
    
    let result = `<strong>Factoring: ${polynomial}</strong><br><br>`;
    
    // Simple factoring examples
    if (polynomial.includes('x²')) {
        result += '<strong>Steps:</strong><br>';
        result += '1. Look for common factors<br>';
        result += '2. Check if it\'s a perfect square trinomial<br>';
        result += '3. Try factoring by grouping<br>';
        result += '4. Use quadratic formula if needed';
    } else {
        result += 'Factor out common terms and look for patterns.';
    }
    
    const infoDiv = document.getElementById('factoringResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function showFactoringMethods() {
    const method = document.getElementById('factoringMethod').value;
    let result = '';
    
    switch(method) {
        case 'gcf':
            result = '<strong>Greatest Common Factor (GCF):</strong><br>Factor out the largest common factor from all terms.<br>Example: 6x³ + 9x² = 3x²(2x + 3)';
            break;
        case 'grouping':
            result = '<strong>Factoring by Grouping:</strong><br>Group terms and factor each group.<br>Example: ax + bx + ay + by = x(a + b) + y(a + b) = (x + y)(a + b)';
            break;
        case 'trinomial':
            result = '<strong>Factoring Trinomials:</strong><br>Find two numbers that multiply to ac and add to b.<br>Example: x² + 5x + 6 = (x + 2)(x + 3)';
            break;
        case 'difference':
            result = '<strong>Difference of Squares:</strong><br>a² - b² = (a + b)(a - b)<br>Example: x² - 9 = (x + 3)(x - 3)';
            break;
    }
    
    const infoDiv = document.getElementById('factoringResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Polynomial Division
function updateDivision() {
    const infoDiv = document.getElementById('divisionResults');
    if (infoDiv) {
        infoDiv.innerHTML = '<div>Enter dividend and divisor to perform polynomial division.</div>';
    }
}

function performDivision() {
    const dividend = document.getElementById('dividend').value.trim();
    const divisor = document.getElementById('divisor').value.trim();
    
    if (!dividend || !divisor) {
        const infoDiv = document.getElementById('divisionResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div><strong>Error:</strong> Please enter both dividend and divisor</div>';
        }
        return;
    }
    
    let result = `<strong>Dividing:</strong> (${dividend}) ÷ (${divisor})<br><br>`;
    result += '<strong>Steps for Polynomial Long Division:</strong><br>';
    result += '1. Divide the leading term of dividend by leading term of divisor<br>';
    result += '2. Multiply the entire divisor by this quotient<br>';
    result += '3. Subtract from the dividend<br>';
    result += '4. Repeat with the new dividend<br>';
    result += '5. Continue until degree of remainder < degree of divisor';
    
    const infoDiv = document.getElementById('divisionResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function showSyntheticDivision() {
    const dividend = document.getElementById('dividend').value.trim();
    
    let result = '<strong>Synthetic Division:</strong><br>';
    result += 'Used when dividing by (x - c) where c is a constant.<br><br>';
    result += '<strong>Steps:</strong><br>';
    result += '1. Write coefficients of dividend<br>';
    result += '2. Use c as the synthetic divisor<br>';
    result += '3. Bring down first coefficient<br>';
    result += '4. Multiply by c, add to next coefficient<br>';
    result += '5. Repeat until complete';
    
    if (dividend) {
        result += `<br><br><strong>Example with:</strong> ${dividend}`;
    }
    
    const infoDiv = document.getElementById('divisionResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Polynomial Equations
function updateEquations() {
    const infoDiv = document.getElementById('equationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = '<div>Enter a polynomial equation to solve it.</div>';
    }
}

function solvePolynomialEquation() {
    const equation = document.getElementById('equationInput').value.trim();
    
    if (!equation) {
        const infoDiv = document.getElementById('equationsResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div><strong>Error:</strong> Please enter a polynomial equation</div>';
        }
        return;
    }
    
    let result = `<strong>Solving:</strong> ${equation}<br><br>`;
    result += '<strong>General Steps:</strong><br>';
    result += '1. Set the polynomial equal to zero<br>';
    result += '2. Factor the polynomial if possible<br>';
    result += '3. Use the Zero Product Property<br>';
    result += '4. Solve each factor for x<br><br>';
    result += 'For higher degree polynomials, use the Rational Root Theorem to find possible rational roots.';
    
    const infoDiv = document.getElementById('equationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function findRationalRoots() {
    const equation = document.getElementById('equationInput').value.trim();
    
    let result = '<strong>Rational Root Theorem:</strong><br>';
    result += 'If p/q is a rational root of a polynomial with integer coefficients,<br>';
    result += 'then p divides the constant term and q divides the leading coefficient.<br><br>';
    result += '<strong>Steps:</strong><br>';
    result += '1. List factors of constant term (p)<br>';
    result += '2. List factors of leading coefficient (q)<br>';
    result += '3. Form all possible p/q ratios<br>';
    result += '4. Test each ratio using synthetic division';
    
    if (equation) {
        result += `<br><br><strong>For equation:</strong> ${equation}`;
    }
    
    const infoDiv = document.getElementById('equationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// ========================================
// UNIT 4: EXPONENTIALS AND LOGARITHMS  
// ========================================

// Exponential Functions
function updateExponential() {
    const canvas = document.getElementById('exponentialCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['exponentialCanvas'];
    drawGrid(ctx, canvas);
    
    // Get values from correct element IDs (Unit 4 uses different IDs)
    const base = parseFloat(document.getElementById('expBase4').value) || 2;
    const vShift = parseFloat(document.getElementById('expK').value) || 0;
    
    // Update display values
    const baseValueSpan = document.getElementById('expBaseValue');
    if (baseValueSpan) {
        baseValueSpan.textContent = base.toFixed(1);
    }
    
    const kValueSpan = document.getElementById('expKValue');
    if (kValueSpan) {
        kValueSpan.textContent = vShift.toFixed(1);
    }
    
    drawExponentialGraph(ctx, canvas, base, 1, 0, vShift);
    updateExponentialInfo(base, 1, 0, vShift);
}

function drawExponentialGraph(ctx, canvas, base, amplitude, hShift, vShift) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = amplitude * Math.pow(base, x - hShift) + vShift;
        
        if (y > 0 && y < 20) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
    
    // Draw horizontal asymptote
    ctx.strokeStyle = '#ff4444';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-canvas.width/2, vShift * scale);
    ctx.lineTo(canvas.width/2, vShift * scale);
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateExponentialInfo(base, amplitude, hShift, vShift) {
    const infoDiv = document.getElementById('exponentialResults');
    if (infoDiv) {
        const growth = base > 1 ? 'Growth' : 'Decay';
        const domain = 'All real numbers';
        const range = vShift >= 0 ? `(${vShift}, ∞)` : `(-∞, ${vShift})`;
        
        infoDiv.innerHTML = `
            <div><strong>f(x) = ${amplitude} × ${base}^(x - ${hShift}) + ${vShift}</strong></div>
            <div>Type: ${growth}</div>
            <div>Domain: ${domain}</div>
            <div>Range: ${range}</div>
            <div>Horizontal Asymptote: y = ${vShift}</div>
        `;
    }
}

function analyzeGrowthDecay() {
    const base = parseFloat(document.getElementById('expBase4').value) || 2;
    
    let analysis = '';
    if (base > 1) {
        analysis = `<strong>Exponential Growth (b = ${base} > 1):</strong><br>`;
        analysis += '• Function increases as x increases<br>';
        analysis += '• y-intercept depends on other parameters<br>';
        analysis += '• Approaches horizontal asymptote as x → -∞<br>';
        analysis += '• Grows without bound as x → +∞';
    } else if (base < 1 && base > 0) {
        analysis = `<strong>Exponential Decay (b = ${base}, 0 < b < 1):</strong><br>`;
        analysis += '• Function decreases as x increases<br>';
        analysis += '• y-intercept depends on other parameters<br>';
        analysis += '• Grows without bound as x → -∞<br>';
        analysis += '• Approaches horizontal asymptote as x → +∞';
    } else {
        analysis = '<strong>Invalid base:</strong><br>Base must be positive and not equal to 1.';
    }
    
    const infoDiv = document.getElementById('exponentialResults');
    if (infoDiv) {
        infoDiv.innerHTML = analysis;
    }
}

function findHalfLife() {
    const base = parseFloat(document.getElementById('expBase4').value) || 0.5;
    
    if (base >= 1) {
        const infoDiv = document.getElementById('exponentialResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<strong>Half-life applies only to decay functions (0 < b < 1)</strong>';
        }
        return;
    }
    
    const halfLife = Math.log(0.5) / Math.log(base);
    
    let result = '<strong>Half-life Calculation:</strong><br>';
    result += `For base b = ${base}:<br>`;
    result += `Half-life = log(0.5) / log(${base}) = ${halfLife.toFixed(3)} time units<br><br>`;
    result += 'This means the quantity reduces to half its value every ';
    result += `${halfLife.toFixed(3)} time units.`;
    
    const infoDiv = document.getElementById('exponentialResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function findHorizontalAsymptote() {
    const vShift = parseFloat(document.getElementById('expK').value) || 0;
    
    let result = '<strong>Horizontal Asymptote Analysis:</strong><br><br>';
    result += `For the exponential function f(x) = a · b^x + k:<br>`;
    result += `The horizontal asymptote is y = k = ${vShift}<br><br>`;
    result += '<strong>Explanation:</strong><br>';
    result += 'As x approaches negative infinity, b^x approaches 0,<br>';
    result += `so f(x) approaches 0 + ${vShift} = ${vShift}.<br>`;
    result += 'The function gets arbitrarily close to this line<br>';
    result += 'but never actually reaches it.';
    
    const infoDiv = document.getElementById('exponentialResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Logarithmic Functions
function updateLogarithmic() {
    const canvas = document.getElementById('logarithmicCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['logarithmicCanvas'];
    drawGrid(ctx, canvas);
    
    const base = parseFloat(document.getElementById('logBase').value) || 10;
    const amplitude = parseFloat(document.getElementById('logAmplitude').value) || 1;
    const hShift = parseFloat(document.getElementById('logHShift').value) || 0;
    const vShift = parseFloat(document.getElementById('logVShift').value) || 0;
    
    drawLogarithmicGraph(ctx, canvas, base, amplitude, hShift, vShift);
    updateLogarithmicInfo(base, amplitude, hShift, vShift);
}

function drawLogarithmicGraph(ctx, canvas, base, amplitude, hShift, vShift) {
    const scale = 40;
    const startX = 0.01;
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const adjustedX = x - hShift;
        if (adjustedX > 0) {
            const y = amplitude * (Math.log(adjustedX) / Math.log(base)) + vShift;
            
            if (Math.abs(y) < 15) {
                const canvasX = x * scale;
                const canvasY = y * scale;
                
                if (first) {
                    ctx.moveTo(canvasX, canvasY);
                    first = false;
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            }
        }
    }
    
    ctx.stroke();
    
    // Draw vertical asymptote
    ctx.strokeStyle = '#ff4444';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(hShift * scale, -canvas.height/2);
    ctx.lineTo(hShift * scale, canvas.height/2);
    ctx.stroke();
    ctx.setLineDash([]);
}

function updateLogarithmicInfo(base, amplitude, hShift, vShift) {
    const infoDiv = document.getElementById('logarithmicResults');
    if (infoDiv) {
        const domain = hShift >= 0 ? `(${hShift}, ∞)` : `(${hShift}, ∞)`;
        const range = 'All real numbers';
        
        infoDiv.innerHTML = `
            <div><strong>f(x) = ${amplitude} × log₍${base}₎(x - ${hShift}) + ${vShift}</strong></div>
            <div>Domain: ${domain}</div>
            <div>Range: ${range}</div>
            <div>Vertical Asymptote: x = ${hShift}</div>
        `;
    }
}

function convertLogarithms() {
    const base = parseFloat(document.getElementById('logBase').value) || 10;
    
    let result = '<strong>Logarithm Properties and Conversions:</strong><br><br>';
    result += `<strong>Base ${base} to Natural Log:</strong><br>`;
    result += `log₍${base}₎(x) = ln(x) / ln(${base})<br><br>`;
    result += '<strong>Change of Base Formula:</strong><br>';
    result += 'logₐ(x) = logb(x) / logb(a)<br><br>';
    result += '<strong>Common Bases:</strong><br>';
    result += '• log₁₀(x) = common logarithm<br>';
    result += '• ln(x) = log_e(x) = natural logarithm<br>';
    result += '• log₂(x) = binary logarithm';
    
    const infoDiv = document.getElementById('logarithmicResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function solveLogProperties() {
    let result = '<strong>Logarithm Properties:</strong><br><br>';
    result += '<strong>Product Rule:</strong><br>';
    result += 'log(xy) = log(x) + log(y)<br><br>';
    result += '<strong>Quotient Rule:</strong><br>';
    result += 'log(x/y) = log(x) - log(y)<br><br>';
    result += '<strong>Power Rule:</strong><br>';
    result += 'log(x^n) = n × log(x)<br><br>';
    result += '<strong>Inverse Property:</strong><br>';
    result += 'log_b(b^x) = x and b^(log_b(x)) = x';
    
    const infoDiv = document.getElementById('logarithmicResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Exponential Equations
function updateExpEq() {
    const infoDiv = document.getElementById('expEqResults');
    if (infoDiv) {
        infoDiv.innerHTML = '<div>Enter an exponential equation to solve it.</div>';
    }
}

function solveExpEquation() {
    const equation = document.getElementById('expEquation').value.trim();
    
    if (!equation) {
        const infoDiv = document.getElementById('expEqResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div><strong>Error:</strong> Please enter an exponential equation</div>';
        }
        return;
    }
    
    let result = `<strong>Solving:</strong> ${equation}<br><br>`;
    result += '<strong>Methods for Exponential Equations:</strong><br>';
    result += '1. <strong>Same base:</strong> If b^x = b^y, then x = y<br>';
    result += '2. <strong>Take logarithm:</strong> If b^x = c, then x = log_b(c)<br>';
    result += '3. <strong>Natural log:</strong> ln(b^x) = x × ln(b)<br>';
    result += '4. <strong>Substitution:</strong> For equations like (b^x)² - 5(b^x) + 6 = 0';
    
    const infoDiv = document.getElementById('expEqResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function showExpMethods() {
    const method = document.getElementById('expMethod').value;
    let result = '';
    
    switch(method) {
        case 'same-base':
            result = '<strong>Same Base Method:</strong><br>';
            result += 'When both sides have the same base:<br>';
            result += 'Example: 2^x = 2^5, therefore x = 5<br>';
            result += 'Example: 3^(x+1) = 3^7, therefore x + 1 = 7, so x = 6';
            break;
        case 'logarithm':
            result = '<strong>Taking Logarithms:</strong><br>';
            result += 'When bases are different:<br>';
            result += 'Example: 2^x = 8 → x = log₂(8) = 3<br>';
            result += 'Example: 5^x = 20 → x = log₅(20) = ln(20)/ln(5)';
            break;
        case 'substitution':
            result = '<strong>Substitution Method:</strong><br>';
            result += 'For quadratic-type exponential equations:<br>';
            result += 'Example: 4^x - 6(2^x) + 8 = 0<br>';
            result += 'Let u = 2^x, then u² - 6u + 8 = 0';
            break;
    }
    
    const infoDiv = document.getElementById('expEqResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Logarithmic Equations
function updateLogEq() {
    const infoDiv = document.getElementById('logEqResults');
    if (infoDiv) {
        infoDiv.innerHTML = '<div>Enter a logarithmic equation to solve it.</div>';
    }
}

function solveLogEquation() {
    const equation = document.getElementById('logEquation').value.trim();
    
    if (!equation) {
        const infoDiv = document.getElementById('logEqResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div><strong>Error:</strong> Please enter a logarithmic equation</div>';
        }
        return;
    }
    
    let result = `<strong>Solving:</strong> ${equation}<br><br>`;
    result += '<strong>Methods for Logarithmic Equations:</strong><br>';
    result += '1. <strong>One-to-One Property:</strong> If log_b(x) = log_b(y), then x = y<br>';
    result += '2. <strong>Convert to exponential:</strong> If log_b(x) = y, then x = b^y<br>';
    result += '3. <strong>Properties of logs:</strong> Use product, quotient, and power rules<br>';
    result += '4. <strong>Check domain:</strong> Arguments must be positive';
    
    const infoDiv = document.getElementById('logEqResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function showLogMethods() {
    const method = document.getElementById('logMethod').value;
    let result = '';
    
    switch(method) {
        case 'one-to-one':
            result = '<strong>One-to-One Property:</strong><br>';
            result += 'If log_b(M) = log_b(N), then M = N<br>';
            result += 'Example: log(x + 3) = log(2x - 1)<br>';
            result += 'Therefore: x + 3 = 2x - 1, so x = 4';
            break;
        case 'exponential':
            result = '<strong>Convert to Exponential Form:</strong><br>';
            result += 'If log_b(x) = y, then x = b^y<br>';
            result += 'Example: log₂(x) = 3<br>';
            result += 'Therefore: x = 2³ = 8';
            break;
        case 'properties':
            result = '<strong>Using Logarithm Properties:</strong><br>';
            result += 'Combine multiple logs using properties<br>';
            result += 'Example: log(x) + log(x-3) = 1<br>';
            result += 'log(x(x-3)) = 1, so x(x-3) = 10';
            break;
    }
    
    const infoDiv = document.getElementById('logEqResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Applications
function updateApplications() {
    const infoDiv = document.getElementById('applicationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = '<div>Select an application type to explore exponential and logarithmic models.</div>';
    }
}

function solveApplication() {
    const appType = document.getElementById('applicationType').value;
    let result = '';
    
    switch(appType) {
        case 'compound':
            result = '<strong>Compound Interest:</strong><br>';
            result += 'Formula: A = P(1 + r/n)^(nt)<br>';
            result += 'Where:<br>';
            result += '• A = final amount<br>';
            result += '• P = principal<br>';
            result += '• r = annual interest rate<br>';
            result += '• n = times compounded per year<br>';
            result += '• t = time in years';
            break;
        case 'population':
            result = '<strong>Population Growth:</strong><br>';
            result += 'Formula: P(t) = P₀ × e^(rt)<br>';
            result += 'Where:<br>';
            result += '• P(t) = population at time t<br>';
            result += '• P₀ = initial population<br>';
            result += '• r = growth rate<br>';
            result += '• t = time<br>';
            result += '• e ≈ 2.718 (natural base)';
            break;
        case 'radioactive':
            result = '<strong>Radioactive Decay:</strong><br>';
            result += 'Formula: N(t) = N₀ × e^(-λt)<br>';
            result += 'Or: N(t) = N₀ × (1/2)^(t/h)<br>';
            result += 'Where:<br>';
            result += '• N(t) = amount at time t<br>';
            result += '• N₀ = initial amount<br>';
            result += '• λ = decay constant<br>';
            result += '• h = half-life<br>';
            result += '• t = time';
            break;
        case 'ph':
            result = '<strong>pH Scale:</strong><br>';
            result += 'Formula: pH = -log₁₀[H⁺]<br>';
            result += 'Where [H⁺] is hydrogen ion concentration<br><br>';
            result += 'pH Scale:<br>';
            result += '• pH < 7: acidic<br>';
            result += '• pH = 7: neutral<br>';
            result += '• pH > 7: basic/alkaline<br>';
            result += '• Each unit represents 10× change in acidity';
            break;
    }
    
    const infoDiv = document.getElementById('applicationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// ========================================
// UNIT 5: RATIONAL FUNCTIONS
// ========================================

function updateRationalFunc() {
    const canvas = document.getElementById('rationalFuncCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['rationalFuncCanvas'];
    drawGrid(ctx, canvas);
    
    // Example rational function: f(x) = (x+1)/(x-2)
    drawAdvancedRationalFunction(ctx, canvas);
    updateRationalFuncInfo();
}

function drawAdvancedRationalFunction(ctx, canvas) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    
    // Draw left branch
    ctx.beginPath();
    let first = true;
    for (let x = startX; x < 1.8; x += 0.1) {
        const y = (x + 1) / (x - 2);
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    ctx.stroke();
    
    // Draw right branch
    ctx.beginPath();
    first = true;
    for (let x = 2.2; x <= endX; x += 0.1) {
        const y = (x + 1) / (x - 2);
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    ctx.stroke();
    
    // Draw asymptotes
    ctx.strokeStyle = '#ff4444';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    
    // Vertical asymptote at x = 2
    ctx.beginPath();
    ctx.moveTo(2 * scale, -canvas.height/2);
    ctx.lineTo(2 * scale, canvas.height/2);
    ctx.stroke();
    
    // Horizontal asymptote at y = 1
    ctx.beginPath();
    ctx.moveTo(-canvas.width/2, 1 * scale);
    ctx.lineTo(canvas.width/2, 1 * scale);
    ctx.stroke();
    
    ctx.setLineDash([]);
}

function updateRationalFuncInfo() {
    const infoDiv = document.getElementById('rationalFuncResults');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <div><strong>f(x) = (x + 1)/(x - 2)</strong></div>
            <div>Domain: x ≠ 2</div>
            <div>Vertical Asymptote: x = 2</div>
            <div>Horizontal Asymptote: y = 1</div>
            <div>x-intercept: (-1, 0)</div>
            <div>y-intercept: (0, -1/2)</div>
        `;
    }
}

// ========================================
// UNIT 6: SEQUENCES AND SERIES
// ========================================

function updateArithmetic() {
    const canvas = document.getElementById('arithmeticCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['arithmeticCanvas'];
    drawGrid(ctx, canvas);
    
    const firstTerm = parseFloat(document.getElementById('arithFirst').value) || 3;
    const commonDiff = parseFloat(document.getElementById('arithDiff').value) || 2;
    
    drawArithmeticSequence(ctx, canvas, firstTerm, commonDiff);
    
    // Show basic sequence info
    let result = `<strong>Arithmetic Sequence:</strong><br>`;
    result += `First term (a₁) = ${firstTerm}<br>`;
    result += `Common difference (d) = ${commonDiff}<br>`;
    result += `General term: aₙ = ${firstTerm} + (n-1)(${commonDiff})`;
    
    const infoDiv = document.getElementById('arithmeticResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function calculateArithmetic() {
    const firstTerm = parseFloat(document.getElementById('arithFirst').value) || 0;
    const commonDiff = parseFloat(document.getElementById('arithDiff').value) || 1;
    const numTerms = parseInt(document.getElementById('numTerms').value) || 10;
    
    let result = `<strong>Arithmetic Sequence:</strong><br>`;
    result += `First term (a₁) = ${firstTerm}<br>`;
    result += `Common difference (d) = ${commonDiff}<br><br>`;
    
    result += `<strong>General term:</strong> aₙ = a₁ + (n-1)d<br>`;
    result += `aₙ = ${firstTerm} + (n-1)(${commonDiff})<br><br>`;
    
    result += `<strong>First ${numTerms} terms:</strong><br>`;
    for (let i = 1; i <= Math.min(numTerms, 10); i++) {
        const term = firstTerm + (i - 1) * commonDiff;
        result += `a${i} = ${term}, `;
    }
    result = result.slice(0, -2); // Remove last comma
    
    const sum = (numTerms / 2) * (2 * firstTerm + (numTerms - 1) * commonDiff);
    result += `<br><br><strong>Sum of first ${numTerms} terms:</strong> S${numTerms} = ${sum}`;
    
    const infoDiv = document.getElementById('arithmeticResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function findNthTerm() {
    const firstTerm = parseFloat(document.getElementById('arithFirst').value) || 0;
    const commonDiff = parseFloat(document.getElementById('arithDiff').value) || 1;
    const n = parseInt(prompt('Enter the term number (n):')) || 10;
    
    if (n <= 0) {
        alert('Please enter a positive integer for n.');
        return;
    }
    
    const nthTerm = firstTerm + (n - 1) * commonDiff;
    
    let result = `<strong>Finding the ${n}th Term:</strong><br>`;
    result += `Using formula: aₙ = a₁ + (n-1)d<br>`;
    result += `a${n} = ${firstTerm} + (${n}-1)(${commonDiff})<br>`;
    result += `a${n} = ${firstTerm} + ${(n-1) * commonDiff}<br>`;
    result += `<strong>a${n} = ${nthTerm}</strong>`;
    
    const infoDiv = document.getElementById('arithmeticResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function calculateSum() {
    const firstTerm = parseFloat(document.getElementById('arithFirst').value) || 0;
    const commonDiff = parseFloat(document.getElementById('arithDiff').value) || 1;
    const n = parseInt(prompt('Enter the number of terms:')) || 10;
    
    if (n <= 0) {
        alert('Please enter a positive integer for number of terms.');
        return;
    }
    
    const sum = (n / 2) * (2 * firstTerm + (n - 1) * commonDiff);
    const lastTerm = firstTerm + (n - 1) * commonDiff;
    
    let result = `<strong>Sum of First ${n} Terms:</strong><br>`;
    result += `Using formula: Sₙ = n/2 × (a₁ + aₙ)<br>`;
    result += `or Sₙ = n/2 × (2a₁ + (n-1)d)<br><br>`;
    result += `Last term: a${n} = ${lastTerm}<br>`;
    result += `S${n} = ${n}/2 × (${firstTerm} + ${lastTerm})<br>`;
    result += `<strong>S${n} = ${sum}</strong>`;
    
    const infoDiv = document.getElementById('arithmeticResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function calculateProbability() {
    const probType = document.getElementById('probType').value;
    
    let result = '<strong>Probability Calculation:</strong><br><br>';
    
    switch(probType) {
        case 'coin':
            result += '<strong>Coin Flip Experiment:</strong><br>';
            result += 'Sample space: {Heads, Tails}<br>';
            result += 'Total outcomes: 2<br><br>';
            result += 'P(Heads) = 1/2 = 0.5 = 50%<br>';
            result += 'P(Tails) = 1/2 = 0.5 = 50%';
            break;
        case 'dice':
            result += '<strong>Dice Roll Experiment:</strong><br>';
            result += 'Sample space: {1, 2, 3, 4, 5, 6}<br>';
            result += 'Total outcomes: 6<br><br>';
            result += 'P(any number) = 1/6 ≈ 0.167 = 16.7%<br>';
            result += 'P(even) = 3/6 = 1/2 = 50%<br>';
            result += 'P(odd) = 3/6 = 1/2 = 50%';
            break;
        case 'cards':
            result += '<strong>Card Draw Experiment:</strong><br>';
            result += 'Standard deck: 52 cards<br>';
            result += 'Total outcomes: 52<br><br>';
            result += 'P(Heart) = 13/52 = 1/4 = 25%<br>';
            result += 'P(Face card) = 12/52 = 3/13 ≈ 23.1%<br>';
            result += 'P(Ace) = 4/52 = 1/13 ≈ 7.7%';
            break;
    }
    
    const infoDiv = document.getElementById('probabilityResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function drawArithmeticSequence(ctx, canvas, firstTerm, commonDiff) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 20;
    
    // Draw sequence points
    ctx.fillStyle = '#667eea';
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    
    const numPoints = Math.min(10, Math.floor(canvas.width / 40));
    
    for (let n = 1; n <= numPoints; n++) {
        const term = firstTerm + (n - 1) * commonDiff;
        const x = centerX + (n - numPoints/2) * 40;
        const y = centerY - term * scale;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw label
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`a${n}`, x, y - 10);
        ctx.fillText(`${term}`, x, y + 20);
        
        // Connect points
        if (n > 1) {
            const prevX = centerX + (n - 1 - numPoints/2) * 40;
            const prevTerm = firstTerm + (n - 2) * commonDiff;
            const prevY = centerY - prevTerm * scale;
            
            ctx.strokeStyle = '#667eea';
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        
        ctx.fillStyle = '#667eea';
    }
    
    // Add title
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Arithmetic Sequence: aₙ = ${firstTerm} + (n-1)(${commonDiff})`, centerX, 30);
}

function showTrigValues() {
    const angle = parseFloat(document.getElementById('angleSlider').value) || 0;
    const angleRad = angle * Math.PI / 180;
    
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const tan = Math.abs(cos) < 0.0001 ? 'undefined' : (sin / cos).toFixed(3);
    
    let result = `<strong>Trigonometric Values for ${angle}°:</strong><br><br>`;
    result += `<strong>Angle in radians:</strong> ${angleRad.toFixed(3)}<br><br>`;
    result += `<strong>cos(${angle}°) = ${cos.toFixed(3)}</strong><br>`;
    result += `<strong>sin(${angle}°) = ${sin.toFixed(3)}</strong><br>`;
    result += `<strong>tan(${angle}°) = ${tan}</strong><br><br>`;
    result += `<strong>Coordinate:</strong> (${cos.toFixed(3)}, ${sin.toFixed(3)})`;
    
    const infoDiv = document.getElementById('unitCircleResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function calculateZScore() {
    const mean = parseFloat(document.getElementById('meanSlider').value) || 0;
    const std = parseFloat(document.getElementById('stdSlider').value) || 1;
    const value = parseFloat(prompt('Enter a data value to find its z-score:')) || 0;
    
    const zScore = (value - mean) / std;
    
    let result = `<strong>Z-Score Calculation:</strong><br><br>`;
    result += `Data value (x): ${value}<br>`;
    result += `Mean (μ): ${mean}<br>`;
    result += `Standard deviation (σ): ${std}<br><br>`;
    result += `<strong>Formula:</strong> z = (x - μ) / σ<br>`;
    result += `z = (${value} - ${mean}) / ${std}<br>`;
    result += `<strong>z = ${zScore.toFixed(3)}</strong><br><br>`;
    result += `This means the value is ${Math.abs(zScore).toFixed(3)} standard deviations `;
    result += `${zScore >= 0 ? 'above' : 'below'} the mean.`;
    
    const infoDiv = document.getElementById('distributionResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function applyEmpiricalRule() {
    const mean = parseFloat(document.getElementById('meanSlider').value) || 0;
    const std = parseFloat(document.getElementById('stdSlider').value) || 1;
    
    const oneStd = [mean - std, mean + std];
    const twoStd = [mean - 2*std, mean + 2*std];
    const threeStd = [mean - 3*std, mean + 3*std];
    
    let result = `<strong>Empirical Rule (68-95-99.7 Rule):</strong><br><br>`;
    result += `For a normal distribution with:<br>`;
    result += `Mean (μ) = ${mean}<br>`;
    result += `Standard deviation (σ) = ${std}<br><br>`;
    result += `<strong>68%</strong> of data falls within 1 standard deviation:<br>`;
    result += `[${oneStd[0].toFixed(2)}, ${oneStd[1].toFixed(2)}]<br><br>`;
    result += `<strong>95%</strong> of data falls within 2 standard deviations:<br>`;
    result += `[${twoStd[0].toFixed(2)}, ${twoStd[1].toFixed(2)}]<br><br>`;
    result += `<strong>99.7%</strong> of data falls within 3 standard deviations:<br>`;
    result += `[${threeStd[0].toFixed(2)}, ${threeStd[1].toFixed(2)}]`;
    
    const infoDiv = document.getElementById('distributionResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// ========================================
// UNIT 7: TRIGONOMETRY REVIEW
// ========================================

function updateUnitCircle() {
    const canvas = document.getElementById('unitCircleCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['unitCircleCanvas'];
    drawGrid(ctx, canvas);
    
    const angle = parseFloat(document.getElementById('angle').value) || 0;
    const angleRad = angle * Math.PI / 180;
    
    drawUnitCircleWithAngle(ctx, canvas, angleRad);
    updateUnitCircleInfo(angle, angleRad);
}

function drawUnitCircleWithAngle(ctx, canvas, angleRad) {
    const scale = 40;
    const radius = 4 * scale; // Unit circle with radius 4 units on display
    
    // Draw unit circle
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw angle line
    const x = Math.cos(angleRad) * radius;
    const y = Math.sin(angleRad) * radius;
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Draw point on circle
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw coordinates
    ctx.save();
    ctx.scale(1, -1);
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText(`(${Math.cos(angleRad).toFixed(2)}, ${Math.sin(angleRad).toFixed(2)})`, x + 10, -y - 10);
    ctx.restore();
}

function updateUnitCircleInfo(angle, angleRad) {
    const infoDiv = document.getElementById('unitCircleResults');
    if (infoDiv) {
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const tan = Math.tan(angleRad);
        
        infoDiv.innerHTML = `
            <div><strong>Angle: ${angle}° = ${angleRad.toFixed(3)} radians</strong></div>
            <div>cos(${angle}°) = ${cos.toFixed(3)}</div>
            <div>sin(${angle}°) = ${sin.toFixed(3)}</div>
            <div>tan(${angle}°) = ${isFinite(tan) ? tan.toFixed(3) : 'undefined'}</div>
        `;
    }
}

// ========================================
// UNIT 8: PROBABILITY
// ========================================

function updateProbability() {
    const infoDiv = document.getElementById('probabilityResults');
    if (infoDiv) {
        infoDiv.innerHTML = '<div>Enter probability parameters to calculate basic probability.</div>';
    }
}

function calculateBasicProbability() {
    const favorable = parseInt(document.getElementById('favorable').value) || 0;
    const total = parseInt(document.getElementById('total').value) || 1;
    
    if (total <= 0 || favorable < 0 || favorable > total) {
        const infoDiv = document.getElementById('probabilityResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div><strong>Error:</strong> Invalid input values</div>';
        }
        return;
    }
    
    const probability = favorable / total;
    const percentage = probability * 100;
    
    let result = `<strong>Basic Probability Calculation:</strong><br>`;
    result += `Favorable outcomes: ${favorable}<br>`;
    result += `Total outcomes: ${total}<br><br>`;
    result += `P(Event) = ${favorable}/${total} = ${probability.toFixed(4)}<br>`;
    result += `Percentage: ${percentage.toFixed(2)}%<br><br>`;
    result += `P(Complement) = ${(1 - probability).toFixed(4)} = ${(100 - percentage).toFixed(2)}%`;
    
    const infoDiv = document.getElementById('probabilityResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// ========================================
// UNIT 2: POLYNOMIALS  
// ========================================

function updatePolynomial() {
    const canvas = document.getElementById('polynomialCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['polynomialCanvas'];
    drawGrid(ctx, canvas);
    
    const degree = document.getElementById('polynomialDegree').value;
    const leadingCoeff = parseFloat(document.getElementById('leadingCoeff').value) || 1;
    const constantTerm = parseFloat(document.getElementById('constantTerm').value) || 0;
    
    // Update display values
    document.getElementById('leadingCoeffValue').textContent = leadingCoeff;
    document.getElementById('constantTermValue').textContent = constantTerm;
    
    switch(degree) {
        case 'linear':
            drawLinearPolynomial(ctx, canvas, leadingCoeff, constantTerm);
            updatePolynomialInfo('Linear', `f(x) = ${leadingCoeff}x + ${constantTerm}`, 'Degree: 1', 'Continuous, straight line');
            break;
        case 'quadratic':
            drawQuadraticPolynomial(ctx, canvas, leadingCoeff, 0, constantTerm);
            updatePolynomialInfo('Quadratic', `f(x) = ${leadingCoeff}x² + ${constantTerm}`, 'Degree: 2', 'Parabola with 1 turning point');
            break;
        case 'cubic':
            drawCubicPolynomial(ctx, canvas, leadingCoeff, constantTerm);
            updatePolynomialInfo('Cubic', `f(x) = ${leadingCoeff}x³ + ${constantTerm}`, 'Degree: 3', 'Up to 2 turning points');
            break;
        case 'quartic':
            drawQuarticPolynomial(ctx, canvas, leadingCoeff, constantTerm);
            updatePolynomialInfo('Quartic', `f(x) = ${leadingCoeff}x⁴ + ${constantTerm}`, 'Degree: 4', 'Up to 3 turning points');
            break;
    }
}

function drawLinearPolynomial(ctx, canvas, a, b) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    ctx.moveTo(startX * scale, (a * startX + b) * scale);
    ctx.lineTo(endX * scale, (a * endX + b) * scale);
    ctx.stroke();
}

function drawQuadraticPolynomial(ctx, canvas, a, b, c) {
    drawQuadraticFunction(ctx, canvas, a, b, c);
}

function drawCubicPolynomial(ctx, canvas, a, d) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.05) {
        const y = a * x * x * x + d;
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
}

function drawQuarticPolynomial(ctx, canvas, a, e) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.05) {
        const y = a * x * x * x * x + e;
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
}

function updatePolynomialInfo(type, equation, degree, characteristics) {
    const infoDiv = document.getElementById('polynomialResults');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <div><strong>${type} Function</strong></div>
            <div>${equation}</div>
            <div>${degree}</div>
            <div>${characteristics}</div>
        `;
    }
}

function analyzePolynomial() {
    const degree = document.getElementById('polynomialDegree').value;
    const leadingCoeff = parseFloat(document.getElementById('leadingCoeff').value) || 1;
    
    let analysis = '';
    
    switch(degree) {
        case 'linear':
            analysis = `<strong>Linear Function End Behavior:</strong><br>`;
            analysis += leadingCoeff > 0 ? 
                'As x → -∞, f(x) → -∞<br>As x → +∞, f(x) → +∞' :
                'As x → -∞, f(x) → +∞<br>As x → +∞, f(x) → -∞';
            break;
        case 'quadratic':
            analysis = `<strong>Quadratic Function End Behavior:</strong><br>`;
            analysis += leadingCoeff > 0 ? 
                'As x → ±∞, f(x) → +∞<br><strong>Upward-opening parabola</strong>' :
                'As x → ±∞, f(x) → -∞<br><strong>Downward-opening parabola</strong>';
            break;
        case 'cubic':
            analysis = `<strong>Cubic Function End Behavior:</strong><br>`;
            analysis += leadingCoeff > 0 ? 
                'As x → -∞, f(x) → -∞<br>As x → +∞, f(x) → +∞' :
                'As x → -∞, f(x) → +∞<br>As x → +∞, f(x) → -∞';
            break;
        case 'quartic':
            analysis = `<strong>Quartic Function End Behavior:</strong><br>`;
            analysis += leadingCoeff > 0 ? 
                'As x → ±∞, f(x) → +∞<br><strong>Both ends go up</strong>' :
                'As x → ±∞, f(x) → -∞<br><strong>Both ends go down</strong>';
            break;
    }
    
    const infoDiv = document.getElementById('polynomialResults');
    if (infoDiv) {
        infoDiv.innerHTML = analysis;
    }
}

function findTurningPoints() {
    const degree = document.getElementById('polynomialDegree').value;
    
    let turningPoints = '';
    
    switch(degree) {
        case 'linear':
            turningPoints = '<strong>Linear Functions:</strong><br>No turning points.<br>They are monotonic (always increasing or decreasing).';
            break;
        case 'quadratic':
            turningPoints = '<strong>Quadratic Functions:</strong><br>Exactly <strong>1 turning point</strong><br>The vertex of the parabola.';
            break;
        case 'cubic':
            turningPoints = '<strong>Cubic Functions:</strong><br>At most <strong>2 turning points</strong><br>One local maximum and one local minimum (if they exist).';
            break;
        case 'quartic':
            turningPoints = '<strong>Quartic Functions:</strong><br>At most <strong>3 turning points</strong><br>Alternating between local maxima and minima.';
            break;
    }
    
    const infoDiv = document.getElementById('polynomialResults');
    if (infoDiv) {
        infoDiv.innerHTML = turningPoints;
    }
}

// Polynomial Operations
function updateOperations() {
    const canvas = document.getElementById('operationsCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['operationsCanvas'];
    drawGrid(ctx, canvas);
    
    // For simplicity, draw sample polynomials
    drawSamplePolynomials(ctx, canvas);
}

function drawSamplePolynomials(ctx, canvas) {
    // Draw P(x) = x^2 + 2x + 1 in blue
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    drawQuadraticFunction(ctx, canvas, 1, 2, 1);
    
    // Draw Q(x) = x - 1 in purple
    ctx.strokeStyle = '#f093fb';
    ctx.lineWidth = 2;
    drawLinearPolynomial(ctx, canvas, 1, -1);
}

function performPolynomialOperation() {
    const polyP = document.getElementById('polyP').value;
    const polyQ = document.getElementById('polyQ').value;
    const operation = document.getElementById('polyOperation').value;
    
    let result = '';
    
    // Simplified examples for common cases
    if (polyP === 'x^2 + 2x + 1' && polyQ === 'x - 1') {
        switch(operation) {
            case 'add':
                result = 'P(x) + Q(x) = (x² + 2x + 1) + (x - 1) = x² + 3x';
                break;
            case 'subtract':
                result = 'P(x) - Q(x) = (x² + 2x + 1) - (x - 1) = x² + x + 2';
                break;
            case 'multiply':
                result = 'P(x) × Q(x) = (x² + 2x + 1)(x - 1) = x³ + x² - x - 1';
                break;
        }
    } else {
        result = `Operation: ${operation}\nP(x) = ${polyP}\nQ(x) = ${polyQ}\n\nFor general polynomial operations:\n• Addition: Combine like terms\n• Subtraction: Distribute negative and combine\n• Multiplication: Use distributive property`;
    }
    
    const infoDiv = document.getElementById('operationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = `<div>${result}</div>`;
    }
}

// Factoring
function updateFactoring() {
    const canvas = document.getElementById('factoringCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['factoringCanvas'];
    drawGrid(ctx, canvas);
    
    // Draw the polynomial to be factored
    drawQuadraticFunction(ctx, canvas, 1, -5, 6); // x^2 - 5x + 6
    
    // Mark the roots
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.arc(2 * 40, 0, 6, 0, 2 * Math.PI); // Root at x = 2
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(3 * 40, 0, 6, 0, 2 * Math.PI); // Root at x = 3
    ctx.fill();
}

function factorPolynomial() {
    const poly = document.getElementById('factoringPoly').value;
    const method = document.getElementById('factoringMethod').value;
    
    let result = '';
    
    if (poly === 'x^2 - 5x + 6') {
        switch(method) {
            case 'trinomial':
                result = 'Factoring x² - 5x + 6:\nLook for two numbers that multiply to 6 and add to -5\nThose numbers are -2 and -3\nFactored form: (x - 2)(x - 3)';
                break;
            case 'gcf':
                result = 'No common factor other than 1 for x² - 5x + 6';
                break;
            default:
                result = 'x² - 5x + 6 = (x - 2)(x - 3)';
        }
    } else {
        result = `Factoring ${poly}:\nMethod: ${method}\n\nGeneral approach:\n1. Look for GCF first\n2. Check for special patterns\n3. Use appropriate factoring technique`;
    }
    
    const infoDiv = document.getElementById('factoringResults');
    if (infoDiv) {
        infoDiv.innerHTML = `<div>${result}</div>`;
    }
}

function showFactoringSteps() {
    const poly = document.getElementById('factoringPoly').value;
    let result = '';
    
    if (poly === 'x^2 - 5x + 6') {
        result = '<strong>Step-by-step factoring of x² - 5x + 6:</strong><br><br>';
        result += '<strong>1.</strong> Identify: ax² + bx + c where a=1, b=-5, c=6<br>';
        result += '<strong>2.</strong> Find factors of c (6): 1×6, 2×3<br>';
        result += '<strong>3.</strong> Which pair adds to b (-5)? -2 + (-3) = -5 ✓<br>';
        result += '<strong>4.</strong> Write as: (x - 2)(x - 3)<br>';
        result += '<strong>5.</strong> Verify: (x-2)(x-3) = x² - 3x - 2x + 6 = x² - 5x + 6 ✓';
    } else {
        result = '<strong>Factoring Steps:</strong><br>Enter a specific polynomial like "x^2 - 5x + 6" for detailed steps.';
    }
    
    const infoDiv = document.getElementById('factoringResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Polynomial Division
function updateDivision() {
    const canvas = document.getElementById('divisionCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['divisionCanvas'];
    drawGrid(ctx, canvas);
    
    // Draw dividend and divisor
    drawCubicPolynomial(ctx, canvas, 1, 0); // Simplified cubic
}

function dividePolynomials() {
    const dividend = document.getElementById('dividend').value;
    const divisor = document.getElementById('divisor').value;
    const method = document.getElementById('divisionMethod').value;
    
    let result = '';
    
    if (dividend === 'x^3 + 2x^2 - x - 2' && divisor === 'x + 1') {
        if (method === 'synthetic') {
            result = 'Synthetic Division (using x + 1, so c = -1):\n\n';
            result += '  -1 | 1   2  -1  -2\n';
            result += '     |    -1  -1   2\n';
            result += '     ________________\n';
            result += '       1   1  -2   0\n\n';
            result += 'Quotient: x² + x - 2\nRemainder: 0';
        } else {
            result = 'Long Division:\n\n';
            result += '(x³ + 2x² - x - 2) ÷ (x + 1)\n\n';
            result += 'Result: x² + x - 2\nRemainder: 0\n\n';
            result += 'Verification: (x + 1)(x² + x - 2) = x³ + 2x² - x - 2';
        }
    } else {
        result = `Division: (${dividend}) ÷ (${divisor})\nMethod: ${method}\n\nFor polynomial division:\n• Divide leading terms\n• Multiply and subtract\n• Repeat until degree of remainder < divisor`;
    }
    
    const infoDiv = document.getElementById('divisionResults');
    if (infoDiv) {
        infoDiv.innerHTML = `<pre>${result}</pre>`;
    }
}

function showDivisionSteps() {
    const method = document.getElementById('divisionMethod').value;
    let result = '';
    
    if (method === 'synthetic') {
        result = '<strong>Synthetic Division Steps:</strong><br><br>';
        result += '<strong>1.</strong> Write coefficients of dividend<br>';
        result += '<strong>2.</strong> Use opposite of divisor constant<br>';
        result += '<strong>3.</strong> Bring down first coefficient<br>';
        result += '<strong>4.</strong> Multiply and add down the column<br>';
        result += '<strong>5.</strong> Repeat for each coefficient<br>';
        result += '<strong>6.</strong> Last number is remainder';
    } else {
        result = '<strong>Long Division Steps:</strong><br><br>';
        result += '<strong>1.</strong> Divide leading term of dividend by leading term of divisor<br>';
        result += '<strong>2.</strong> Multiply entire divisor by this quotient term<br>';
        result += '<strong>3.</strong> Subtract from dividend<br>';
        result += '<strong>4.</strong> Repeat with new dividend<br>';
        result += '<strong>5.</strong> Continue until remainder degree < divisor degree';
    }
    
    const infoDiv = document.getElementById('divisionResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Polynomial Equations
function updateEquations() {
    const canvas = document.getElementById('equationsCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['equationsCanvas'];
    drawGrid(ctx, canvas);
    
    // Draw the cubic equation x^3 - 6x^2 + 11x - 6 = 0
    drawCubicEquation(ctx, canvas);
}

function drawCubicEquation(ctx, canvas) {
    const scale = 40;
    const startX = -1;
    const endX = 5;
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.05) {
        const y = x * x * x - 6 * x * x + 11 * x - 6;
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
    
    // Mark the roots at x = 1, 2, 3
    ctx.fillStyle = '#F44336';
    [1, 2, 3].forEach(root => {
        ctx.beginPath();
        ctx.arc(root * scale, 0, 6, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function solvePolynomialEquation() {
    const equation = document.getElementById('polyEquation').value;
    const method = document.getElementById('equationMethod').value;
    
    let result = '';
    
    if (equation === 'x^3 - 6x^2 + 11x - 6 = 0') {
        switch(method) {
            case 'factoring':
                result = 'Factoring x³ - 6x² + 11x - 6 = 0:\n\n';
                result += 'Try grouping or find rational roots\n';
                result += 'Testing x = 1: 1 - 6 + 11 - 6 = 0 ✓\n';
                result += 'Factor: (x - 1)(x² - 5x + 6) = 0\n';
                result += 'Further factor: (x - 1)(x - 2)(x - 3) = 0\n';
                result += 'Solutions: x = 1, 2, 3';
                break;
            case 'rational-root':
                result = 'Rational Root Theorem:\n\n';
                result += 'Possible rational roots: ±factors of 6 / ±factors of 1\n';
                result += 'Candidates: ±1, ±2, ±3, ±6\n';
                result += 'Testing: f(1) = 0, f(2) = 0, f(3) = 0\n';
                result += 'Roots: x = 1, 2, 3';
                break;
            case 'graphical':
                result = 'Graphical Method:\n\n';
                result += 'Plot y = x³ - 6x² + 11x - 6\n';
                result += 'Find x-intercepts (where y = 0)\n';
                result += 'Solutions: x = 1, 2, 3';
                break;
        }
    } else {
        result = `Solving: ${equation}\nMethod: ${method}\n\nGeneral approach:\n• Set polynomial equal to zero\n• Factor if possible\n• Use appropriate theorem or method\n• Verify solutions`;
    }
    
    const infoDiv = document.getElementById('equationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = `<div>${result}</div>`;
    }
}

function verifyRoots() {
    const equation = document.getElementById('polyEquation').value;
    let result = '';
    
    if (equation === 'x^3 - 6x^2 + 11x - 6 = 0') {
        result = '<strong>Verifying roots for x³ - 6x² + 11x - 6 = 0:</strong><br><br>';
        
        const roots = [1, 2, 3];
        roots.forEach(root => {
            const calculation = Math.pow(root, 3) - 6 * Math.pow(root, 2) + 11 * root - 6;
            result += `<strong>x = ${root}:</strong> ${root}³ - 6(${root})² + 11(${root}) - 6 = ${calculation}<br>`;
        });
        
        result += '<br><strong>All roots verified! ✓</strong>';
    } else {
        result = '<strong>Root Verification:</strong><br>Enter the equation "x^3 - 6x^2 + 11x - 6 = 0" to see verification.';
    }
    
    const infoDiv = document.getElementById('equationsResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// ========================================
// UNIT 3: RATIONAL & RADICAL FUNCTIONS
// ========================================

// Rational Expressions
function updateRationalExp() {
    const canvas = document.getElementById('rationalExpCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['rationalExpCanvas'];
    drawGrid(ctx, canvas);
    
    // Draw a basic rational function for visualization
    drawRationalFunction(ctx, canvas);
}

function findAsymptotes() {
    const numerator = document.getElementById('numerator').value;
    const denominator = document.getElementById('denominator').value;
    
    let result = '<strong>Asymptote Analysis:</strong><br><br>';
    
    if (denominator === 'x - 2') {
        result += '<strong>Vertical Asymptote:</strong> x = 2<br>';
        result += '<strong>Horizontal Asymptote:</strong> y = 0 (degree of numerator < degree of denominator)<br>';
        result += '<strong>Domain:</strong> (-∞, 2) ∪ (2, ∞)<br>';
        result += '<strong>Range:</strong> (-∞, 0) ∪ (0, ∞)';
    } else {
        result += `For f(x) = (${numerator})/(${denominator}):<br>`;
        result += 'Set denominator = 0 to find vertical asymptotes<br>';
        result += 'Compare degrees of numerator and denominator for horizontal asymptotes';
    }
    
    const infoDiv = document.getElementById('rationalExpResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function simplifyRational() {
    const numerator = document.getElementById('numerator').value;
    const denominator = document.getElementById('denominator').value;
    
    let result = '<strong>Rational Expression Simplification:</strong><br><br>';
    result += `Original: (${numerator})/(${denominator})<br><br>`;
    result += '<strong>Steps:</strong><br>';
    result += '1. Factor numerator and denominator<br>';
    result += '2. Cancel common factors<br>';
    result += '3. State restrictions on domain<br><br>';
    result += '<strong>Note:</strong> Always check for common factors before simplifying';
    
    const infoDiv = document.getElementById('rationalExpResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Radical Functions
function updateRadical() {
    const canvas = document.getElementById('radicalCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['radicalCanvas'];
    drawGrid(ctx, canvas);
    
    const type = document.getElementById('radicalType').value;
    const h = parseFloat(document.getElementById('radicalH').value) || 0;
    const k = parseFloat(document.getElementById('radicalK').value) || 0;
    
    // Update display values
    document.getElementById('radicalHValue').textContent = h;
    document.getElementById('radicalKValue').textContent = k;
    
    drawRadicalFunction(ctx, canvas, type, h, k);
    updateRadicalInfo(type, h, k);
}

function drawRadicalFunction(ctx, canvas, type, h, k) {
    const scale = 40;
    const startX = Math.max(-canvas.width / (2 * scale), -h);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        let y;
        
        switch(type) {
            case 'square':
                if (x + h >= 0) {
                    y = Math.sqrt(x + h) + k;
                } else {
                    continue;
                }
                break;
            case 'cube':
                y = Math.cbrt(x + h) + k;
                break;
            case 'fourth':
                if (x + h >= 0) {
                    y = Math.pow(x + h, 1/4) + k;
                } else {
                    continue;
                }
                break;
        }
        
        if (Math.abs(y) < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    
    ctx.stroke();
}

function updateRadicalInfo(type, h, k) {
    const infoDiv = document.getElementById('radicalResults');
    if (infoDiv) {
        let equation, domain, range;
        
        switch(type) {
            case 'square':
                equation = `f(x) = √(x + ${h}) + ${k}`;
                domain = `[${-h}, ∞)`;
                range = `[${k}, ∞)`;
                break;
            case 'cube':
                equation = `f(x) = ∛(x + ${h}) + ${k}`;
                domain = '(-∞, ∞)';
                range = '(-∞, ∞)';
                break;
            case 'fourth':
                equation = `f(x) = ∜(x + ${h}) + ${k}`;
                domain = `[${-h}, ∞)`;
                range = `[${k}, ∞)`;
                break;
        }
        
        infoDiv.innerHTML = `
            <div><strong>${equation}</strong></div>
            <div><strong>Domain:</strong> ${domain}</div>
            <div><strong>Range:</strong> ${range}</div>
        `;
    }
}

function analyzeDomain() {
    const type = document.getElementById('radicalType').value;
    const h = parseFloat(document.getElementById('radicalH').value) || 0;
    
    let result = '<strong>Domain Analysis:</strong><br><br>';
    
    switch(type) {
        case 'square':
        case 'fourth':
            result += 'For even roots, the radicand must be ≥ 0<br>';
            result += `x + ${h} ≥ 0<br>`;
            result += `x ≥ ${-h}<br>`;
            result += `<strong>Domain:</strong> [${-h}, ∞)`;
            break;
        case 'cube':
            result += 'For odd roots, the radicand can be any real number<br>';
            result += '<strong>Domain:</strong> (-∞, ∞)';
            break;
    }
    
    const infoDiv = document.getElementById('radicalResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Inverse Functions
function updateInverse() {
    const canvas = document.getElementById('inverseCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['inverseCanvas'];
    drawGrid(ctx, canvas);
    
    const funcType = document.getElementById('inverseFunction').value;
    
    // Draw original function and its inverse
    drawOriginalAndInverse(ctx, canvas, funcType);
}

function drawOriginalAndInverse(ctx, canvas, funcType) {
    const scale = 40;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    // Draw y = x line (for reflection)
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX + startX * scale, centerY - startX * scale);
    ctx.lineTo(centerX + endX * scale, centerY - endX * scale);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw original function
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    
    switch(funcType) {
        case 'linear':
            // f(x) = 2x + 3
            ctx.beginPath();
            ctx.moveTo(centerX + startX * scale, centerY - (2 * startX + 3) * scale);
            ctx.lineTo(centerX + endX * scale, centerY - (2 * endX + 3) * scale);
            ctx.stroke();
            
            // Inverse: f⁻¹(x) = (x - 3)/2
            ctx.strokeStyle = '#f093fb';
            ctx.beginPath();
            ctx.moveTo(centerX + startX * scale, centerY - ((startX - 3) / 2) * scale);
            ctx.lineTo(centerX + endX * scale, centerY - ((endX - 3) / 2) * scale);
            ctx.stroke();
            break;
            
        case 'quadratic':
            // f(x) = x² (x ≥ 0)
            ctx.beginPath();
            let first = true;
            for (let x = 0; x <= endX; x += 0.1) {
                const y = x * x;
                const canvasX = centerX + x * scale;
                const canvasY = centerY - y * scale;
                if (canvasY >= 0 && canvasY <= canvas.height) {
                    if (first) {
                        ctx.moveTo(canvasX, canvasY);
                        first = false;
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                }
            }
            ctx.stroke();
            
            // Inverse: f⁻¹(x) = √x
            ctx.strokeStyle = '#f093fb';
            ctx.beginPath();
            first = true;
            for (let x = 0; x <= endX; x += 0.1) {
                const y = Math.sqrt(x);
                const canvasX = centerX + x * scale;
                const canvasY = centerY - y * scale;
                if (canvasY >= 0 && canvasY <= canvas.height) {
                    if (first) {
                        ctx.moveTo(canvasX, canvasY);
                        first = false;
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                }
            }
            ctx.stroke();
            break;
            
        case 'exponential':
            // f(x) = 2^x
            ctx.beginPath();
            first = true;
            for (let x = startX; x <= endX; x += 0.1) {
                const y = Math.pow(2, x);
                const canvasX = centerX + x * scale;
                const canvasY = centerY - y * scale;
                if (canvasY >= 0 && canvasY <= canvas.height && y <= 10) {
                    if (first) {
                        ctx.moveTo(canvasX, canvasY);
                        first = false;
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                }
            }
            ctx.stroke();
            
            // Inverse: f⁻¹(x) = log₂(x)
            ctx.strokeStyle = '#f093fb';
            ctx.beginPath();
            first = true;
            for (let x = 0.1; x <= endX; x += 0.1) {
                const y = Math.log2(x);
                const canvasX = centerX + x * scale;
                const canvasY = centerY - y * scale;
                if (canvasY >= 0 && canvasY <= canvas.height && y >= startX && y <= endX) {
                    if (first) {
                        ctx.moveTo(canvasX, canvasY);
                        first = false;
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                }
            }
            ctx.stroke();
            break;
            
        case 'logarithmic':
            // f(x) = log(x)
            ctx.beginPath();
            first = true;
            for (let x = 0.1; x <= endX; x += 0.1) {
                const y = Math.log10(x);
                const canvasX = centerX + x * scale;
                const canvasY = centerY - y * scale;
                if (canvasY >= 0 && canvasY <= canvas.height && y >= startX && y <= endX) {
                    if (first) {
                        ctx.moveTo(canvasX, canvasY);
                        first = false;
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                }
            }
            ctx.stroke();
            
            // Inverse: f⁻¹(x) = 10^x
            ctx.strokeStyle = '#f093fb';
            ctx.beginPath();
            first = true;
            for (let x = startX; x <= endX; x += 0.1) {
                const y = Math.pow(10, x);
                const canvasX = centerX + x * scale;
                const canvasY = centerY - y * scale;
                if (canvasY >= 0 && canvasY <= canvas.height && y <= 10) {
                    if (first) {
                        ctx.moveTo(canvasX, canvasY);
                        first = false;
                    } else {
                        ctx.lineTo(canvasX, canvasY);
                    }
                }
            }
            ctx.stroke();
            break;
    }
    
    // Add legend
    ctx.fillStyle = '#667eea';
    ctx.font = '12px Arial';
    ctx.fillText('Original Function', 10, 20);
    ctx.fillStyle = '#f093fb';
    ctx.fillText('Inverse Function', 10, 35);
    ctx.fillStyle = '#cccccc';
    ctx.fillText('y = x (reflection line)', 10, 50);
}

function findInverse() {
    const funcType = document.getElementById('inverseFunction').value;
    let result = '<strong>Finding Inverse Function:</strong><br><br>';
    
    switch(funcType) {
        case 'linear':
            result += '<strong>Original:</strong> f(x) = 2x + 3<br><br>';
            result += '<strong>Steps:</strong><br>';
            result += '1. Replace f(x) with y: y = 2x + 3<br>';
            result += '2. Swap x and y: x = 2y + 3<br>';
            result += '3. Solve for y: x - 3 = 2y<br>';
            result += '4. y = (x - 3)/2<br>';
            result += '<strong>Inverse:</strong> f⁻¹(x) = (x - 3)/2';
            break;
        case 'quadratic':
            result += '<strong>Original:</strong> f(x) = x² (x ≥ 0)<br><br>';
            result += '<strong>Steps:</strong><br>';
            result += '1. Replace f(x) with y: y = x²<br>';
            result += '2. Swap x and y: x = y²<br>';
            result += '3. Solve for y: y = ±√x<br>';
            result += '4. Choose positive: y = √x<br>';
            result += '<strong>Inverse:</strong> f⁻¹(x) = √x';
            break;
        case 'exponential':
            result += '<strong>Original:</strong> f(x) = 2^x<br><br>';
            result += '<strong>Steps:</strong><br>';
            result += '1. Replace f(x) with y: y = 2^x<br>';
            result += '2. Swap x and y: x = 2^y<br>';
            result += '3. Take log base 2 of both sides: log₂(x) = y<br>';
            result += '4. Therefore: y = log₂(x)<br>';
            result += '<strong>Inverse:</strong> f⁻¹(x) = log₂(x)';
            break;
        case 'logarithmic':
            result += '<strong>Original:</strong> f(x) = log(x)<br><br>';
            result += '<strong>Steps:</strong><br>';
            result += '1. Replace f(x) with y: y = log(x)<br>';
            result += '2. Swap x and y: x = log(y)<br>';
            result += '3. Convert to exponential form: y = 10^x<br>';
            result += '4. Therefore: y = 10^x<br>';
            result += '<strong>Inverse:</strong> f⁻¹(x) = 10^x';
            break;
        default:
            result += 'Please select a function type.';
            break;
    }
    
    const infoDiv = document.getElementById('inverseResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function verifyInverse() {
    const funcType = document.getElementById('inverseFunction').value;
    let result = '<strong>Verifying Inverse:</strong><br><br>';
    
    switch(funcType) {
        case 'linear':
            result += 'f(x) = 2x + 3, f⁻¹(x) = (x - 3)/2<br><br>';
            result += '<strong>Check f(f⁻¹(x)):</strong><br>';
            result += 'f(f⁻¹(x)) = f((x - 3)/2) = 2((x - 3)/2) + 3 = x - 3 + 3 = x ✓<br><br>';
            result += '<strong>Check f⁻¹(f(x)):</strong><br>';
            result += 'f⁻¹(f(x)) = f⁻¹(2x + 3) = ((2x + 3) - 3)/2 = 2x/2 = x ✓';
            break;
        case 'quadratic':
            result += 'f(x) = x² (x ≥ 0), f⁻¹(x) = √x<br><br>';
            result += '<strong>Check f(f⁻¹(x)):</strong><br>';
            result += 'f(f⁻¹(x)) = f(√x) = (√x)² = x ✓<br><br>';
            result += '<strong>Check f⁻¹(f(x)):</strong><br>';
            result += 'f⁻¹(f(x)) = f⁻¹(x²) = √(x²) = |x| = x (since x ≥ 0) ✓';
            break;
        case 'exponential':
            result += 'f(x) = 2^x, f⁻¹(x) = log₂(x)<br><br>';
            result += '<strong>Check f(f⁻¹(x)):</strong><br>';
            result += 'f(f⁻¹(x)) = f(log₂(x)) = 2^(log₂(x)) = x ✓<br><br>';
            result += '<strong>Check f⁻¹(f(x)):</strong><br>';
            result += 'f⁻¹(f(x)) = f⁻¹(2^x) = log₂(2^x) = x ✓';
            break;
        case 'logarithmic':
            result += 'f(x) = log(x), f⁻¹(x) = 10^x<br><br>';
            result += '<strong>Check f(f⁻¹(x)):</strong><br>';
            result += 'f(f⁻¹(x)) = f(10^x) = log(10^x) = x ✓<br><br>';
            result += '<strong>Check f⁻¹(f(x)):</strong><br>';
            result += 'f⁻¹(f(x)) = f⁻¹(log(x)) = 10^(log(x)) = x ✓';
            break;
        default:
            result += 'Please select a function type.';
            break;
    }
    
    const infoDiv = document.getElementById('inverseResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Radical Equations  
function updateRadicalEq() {
    const canvas = document.getElementById('radicalEqCanvas');
    if (!canvas) return;
    
    const ctx = canvasContexts['radicalEqCanvas'];
    drawGrid(ctx, canvas);
    
    // Draw visualization of radical equation
    drawRadicalEquation(ctx, canvas);
}

function drawRadicalEquation(ctx, canvas) {
    // Draw √x + 3 = 7 graphically
    const scale = 40;
    
    // Draw y = √x + 3
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    for (let x = 0; x <= 10; x += 0.1) {
        const y = Math.sqrt(x) + 3;
        
        if (y < 15) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    ctx.stroke();
    
    // Draw y = 7 (horizontal line)
    ctx.strokeStyle = '#f093fb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-canvas.width/2, 7 * scale);
    ctx.lineTo(canvas.width/2, 7 * scale);
    ctx.stroke();
    
    // Mark intersection point
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(4 * scale, 7 * scale, 6, 0, 2 * Math.PI); // Solution x = 16
    ctx.fill();
}

function solveRadicalEq() {
    const equation = document.getElementById('radicalEquation').value;
    let result = '<strong>Solving Radical Equation:</strong><br><br>';
    
    if (equation === '√x + 3 = 7') {
        result += '<strong>Equation:</strong> √x + 3 = 7<br><br>';
        result += '<strong>Steps:</strong><br>';
        result += '1. Isolate the radical: √x = 7 - 3 = 4<br>';
        result += '2. Square both sides: (√x)² = 4²<br>';
        result += '3. Simplify: x = 16<br><br>';
        result += '<strong>Check:</strong> √16 + 3 = 4 + 3 = 7 ✓<br>';
        result += '<strong>Solution:</strong> x = 16';
    } else {
        result += `Equation: ${equation}<br><br>`;
        result += '<strong>General Steps:</strong><br>';
        result += '1. Isolate the radical term<br>';
        result += '2. Raise both sides to appropriate power<br>';
        result += '3. Solve resulting equation<br>';
        result += '4. Check for extraneous solutions';
    }
    
    const infoDiv = document.getElementById('radicalEqResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function checkExtraneous() {
    let result = '<strong>Checking for Extraneous Solutions:</strong><br><br>';
    result += '<strong>Why check?</strong> Squaring both sides can introduce false solutions<br><br>';
    result += '<strong>Process:</strong><br>';
    result += '1. Substitute each solution back into original equation<br>';
    result += '2. Verify that both sides are equal<br>';
    result += '3. Discard any solutions that don\'t satisfy original equation<br><br>';
    result += '<strong>Example:</strong> For √x + 3 = 7 with solution x = 16:<br>';
    result += 'Check: √16 + 3 = 4 + 3 = 7 ✓ (Valid solution)';
    
    const infoDiv = document.getElementById('radicalEqResults');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// Rational Exponents
function updateRationalExpUnit3() {
    const canvas = document.getElementById('rationalExpCanvas2');
    if (!canvas) return;
    
    const ctx = canvasContexts['rationalExpCanvas2'];
    drawGrid(ctx, canvas);
    
    // Visualize rational exponents
    drawRationalExponentGraph(ctx, canvas);
}

function drawRationalExponentGraph(ctx, canvas) {
    // Draw x^(2/3) as an example
    const scale = 40;
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    for (let x = 0; x <= 8; x += 0.1) {
        const y = Math.pow(x, 2/3);
        
        if (y < 10) {
            const canvasX = x * scale;
            const canvasY = y * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    ctx.stroke();
}

function convertToRadical() {
    const base = parseFloat(document.getElementById('expBase').value) || 8;
    const m = parseFloat(document.getElementById('expNum').value) || 2;
    const n = parseFloat(document.getElementById('expDen').value) || 3;
    
    let result = '<strong>Converting Rational Exponent to Radical:</strong><br><br>';
    result += `<strong>Expression:</strong> ${base}^(${m}/${n})<br><br>`;
    result += '<strong>Rule:</strong> a^(m/n) = ⁿ√(a^m) = (ⁿ√a)^m<br><br>';
    result += `<strong>Conversion:</strong> ${base}^(${m}/${n}) = ³√(${base}²) = ³√${Math.pow(base, m)}<br><br>`;
    result += `<strong>Alternative:</strong> ${base}^(${m}/${n}) = (³√${base})² = ${Math.pow(Math.pow(base, 1/n), m).toFixed(3)}`;
    
    const infoDiv = document.getElementById('rationalExpResults2');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

function evaluateExpression() {
    const base = parseFloat(document.getElementById('expBase').value) || 8;
    const m = parseFloat(document.getElementById('expNum').value) || 2;
    const n = parseFloat(document.getElementById('expDen').value) || 3;
    
    const result_val = Math.pow(base, m/n);
    
    let result = '<strong>Evaluating Rational Exponent:</strong><br><br>';
    result += `<strong>Expression:</strong> ${base}^(${m}/${n})<br><br>`;
    result += `<strong>Calculation:</strong><br>`;
    result += `${base}^(${m}/${n}) = ${result_val.toFixed(6)}<br><br>`;
    result += '<strong>Step-by-step:</strong><br>';
    result += `1. Find the ${n}th root of ${base}: ³√${base} = ${Math.pow(base, 1/n).toFixed(3)}<br>`;
    result += `2. Raise to the ${m} power: (${Math.pow(base, 1/n).toFixed(3)})² = ${result_val.toFixed(6)}`;
    
    const infoDiv = document.getElementById('rationalExpResults2');
    if (infoDiv) {
        infoDiv.innerHTML = result;
    }
}

// End of algebra2.js