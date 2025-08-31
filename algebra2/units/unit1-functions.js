// Unit 1: Functions and Their Properties
// Domain & Range, Function Characteristics, Transformations, Complex Numbers, Quadratic Formula, Systems

// Create Unit 1 namespace
window.Unit1 = {
    
    // Domain and Range Functions
    updateDomainRange: function() {
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
                this.drawLogarithmicFunction(ctx, canvas);
                updateDomainRangeInfo('Logarithmic Function: f(x) = log(x)', 'Domain: (0, ∞)', 'Range: All real numbers');
                break;
        }
    },

    analyzeDomainRange: function() {
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
    },

    showIntervalNotation: function() {
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
    },

    drawLogarithmicFunction: function(ctx, canvas) {
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
    },

    // Function Characteristics
    updateCharacteristics: function() {
        const canvas = document.getElementById('characteristicsCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['characteristicsCanvas'];
        drawGrid(ctx, canvas);
        
        const functionType = document.getElementById('characteristicsFunction').value;
        
        if (functionType === 'quadratic') {
            drawQuadraticFunction(ctx, canvas, 1, 0, 0);
            this.updateCharacteristicsInfo('f(x) = x²', 'Vertex: (0, 0)', 'Decreasing: (-∞, 0)', 'Increasing: (0, ∞)');
        } else if (functionType === 'cubic') {
            this.drawCubicFunction(ctx, canvas);
            this.updateCharacteristicsInfo('f(x) = x³ - 3x', 'Critical points: x = ±1', 'Local max at (-1, 2)', 'Local min at (1, -2)');
        }
    },

    drawCubicFunction: function(ctx, canvas) {
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
        ctx.beginPath();
        ctx.arc(-1 * scale, 2 * scale, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(1 * scale, -2 * scale, 6, 0, 2 * Math.PI);
        ctx.fill();
    },

    updateCharacteristicsInfo: function(func, info1, info2, info3) {
        const infoDiv = document.getElementById('characteristicsResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>${func}</strong></div>
                <div>${info1}</div>
                <div>${info2}</div>
                <div>${info3}</div>
            `;
        }
    },

    // Function Transformations
    updateTransformations: function() {
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
        this.drawTransformedQuadratic(ctx, canvas, a, h, k);
        
        this.updateTransformationInfo(a, h, k);
    },

    drawTransformedQuadratic: function(ctx, canvas, a, h, k) {
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
    },

    updateTransformationInfo: function(a, h, k) {
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
    },

    // Complex Numbers
    updateComplexPlane: function() {
        const canvas = document.getElementById('complexCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['complexCanvas'];
        drawGrid(ctx, canvas);
        
        const real1 = parseFloat(document.getElementById('complexReal1').value) || 0;
        const imag1 = parseFloat(document.getElementById('complexImag1').value) || 0;
        const real2 = parseFloat(document.getElementById('complexReal2').value) || 0;
        const imag2 = parseFloat(document.getElementById('complexImag2').value) || 0;
        
        this.drawComplexNumber(ctx, real1, imag1, '#667eea', 'z₁');
        this.drawComplexNumber(ctx, real2, imag2, '#f093fb', 'z₂');
        
        this.updateComplexInfo(real1, imag1, real2, imag2);
    },

    updateComplex: function() {
        this.updateComplexPlane();
    },

    drawComplexNumber: function(ctx, real, imag, color, label) {
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
    },

    updateComplexInfo: function(real1, imag1, real2, imag2) {
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
    },

    performComplexOperation: function() {
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
            this.drawComplexNumber(ctx, resultReal, resultImag, '#4CAF50', 'result');
        }
    },

    // Quadratic Formula
    updateQuadraticFormula: function() {
        const canvas = document.getElementById('quadraticCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['quadraticCanvas'];
        drawGrid(ctx, canvas);
        
        const a = parseFloat(document.getElementById('quadraticA').value) || 1;
        const b = parseFloat(document.getElementById('quadraticB').value) || 0;
        const c = parseFloat(document.getElementById('quadraticC').value) || 0;
        
        drawQuadraticFunction(ctx, canvas, a, b, c);
        this.calculateQuadraticProperties(a, b, c);
    },

    calculateQuadraticProperties: function(a, b, c) {
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
    },

    solveQuadratic: function() {
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
    },

    completeSquare: function() {
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
    },

    // Systems of Equations
    updateSystemsGraph: function() {
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
        
        this.drawLinearEquation(ctx, canvas, a1, b1, c1, '#667eea');
        this.drawLinearEquation(ctx, canvas, a2, b2, c2, '#f093fb');
        
        const solution = this.solveLinearSystem(a1, b1, c1, a2, b2, c2);
        if (solution) {
            this.drawIntersectionPoint(ctx, solution.x, solution.y);
        }
    },

    drawLinearEquation: function(ctx, canvas, a, b, c, color) {
        const scale = 40;
        const startX = -canvas.width / (2 * scale);
        const endX = canvas.width / (2 * scale);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        if (Math.abs(b) > 0.0001) {
            const y1 = (-a * startX + c) / b;
            const y2 = (-a * endX + c) / b;
            
            ctx.moveTo(startX * scale, y1 * scale);
            ctx.lineTo(endX * scale, y2 * scale);
        } else if (Math.abs(a) > 0.0001) {
            const x = c / a;
            ctx.moveTo(x * scale, -canvas.height / 2);
            ctx.lineTo(x * scale, canvas.height / 2);
        }
        
        ctx.stroke();
    },

    drawIntersectionPoint: function(ctx, x, y) {
        const scale = 40;
        
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(x * scale, y * scale, 8, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.save();
        ctx.scale(1, -1);
        ctx.fillStyle = '#4CAF50';
        ctx.font = '12px Arial';
        ctx.fillText(`(${x.toFixed(2)}, ${y.toFixed(2)})`, x * scale + 10, -y * scale - 10);
        ctx.restore();
    },

    solveLinearSystem: function(a1, b1, c1, a2, b2, c2) {
        const determinant = a1 * b2 - a2 * b1;
        
        if (Math.abs(determinant) < 0.0001) {
            return null;
        }
        
        const x = (c1 * b2 - c2 * b1) / determinant;
        const y = (a1 * c2 - a2 * c1) / determinant;
        
        return { x, y };
    },

    solveSystem: function() {
        this.solveSystemAlgebraically();
    },

    solveSystemAlgebraically: function() {
        const a1 = parseFloat(document.getElementById('systemA1').value) || 1;
        const b1 = parseFloat(document.getElementById('systemB1').value) || 1;
        const c1 = parseFloat(document.getElementById('systemC1').value) || 0;
        const a2 = parseFloat(document.getElementById('systemA2').value) || 1;
        const b2 = parseFloat(document.getElementById('systemB2').value) || -1;
        const c2 = parseFloat(document.getElementById('systemC2').value) || 0;
        
        const determinant = a1 * b2 - a2 * b1;
        
        let message = `<strong>System of equations:</strong><br>`;
        message += `${a1}x + ${b1}y = ${c1}<br>`;
        message += `${a2}x + ${b2}y = ${c2}<br><br>`;
        
        if (Math.abs(determinant) < 0.0001) {
            message += '<strong>No unique solution.</strong><br>';
            if (a1 * c2 === a2 * c1 && b1 * c2 === b2 * c1) {
                message += 'The lines are coincident (infinite solutions).';
            } else {
                message += 'The lines are parallel (no solution).';
            }
        } else {
            const x = (c1 * b2 - c2 * b1) / determinant;
            const y = (a1 * c2 - a2 * c1) / determinant;
            
            message += `<strong>Using Cramer's rule:</strong><br>`;
            message += `Determinant = ${determinant}<br>`;
            message += `x = ${x.toFixed(6)}<br>`;
            message += `y = ${y.toFixed(6)}`;
        }
        
        const infoDiv = document.getElementById('systemsResults');
        if (infoDiv) {
            infoDiv.innerHTML = message;
        }
    }
};

console.log('Unit 1 (Functions) module loaded successfully');