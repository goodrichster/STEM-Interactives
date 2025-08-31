// Unit 2: Polynomials
// Polynomial Graphs, Operations, Factoring, Division, and Equations

// Create Unit 2 namespace
window.Unit2 = {
    
    // Polynomial Graphs
    updatePolynomial: function() {
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
                this.drawLinearPolynomial(ctx, canvas, leadingCoeff, constantTerm);
                this.updatePolynomialInfo('Linear', `f(x) = ${leadingCoeff}x + ${constantTerm}`, 'Degree: 1', 'Continuous, straight line');
                break;
            case 'quadratic':
                this.drawQuadraticPolynomial(ctx, canvas, leadingCoeff, 0, constantTerm);
                this.updatePolynomialInfo('Quadratic', `f(x) = ${leadingCoeff}x² + ${constantTerm}`, 'Degree: 2', 'Parabola with 1 turning point');
                break;
            case 'cubic':
                this.drawCubicPolynomial(ctx, canvas, leadingCoeff, constantTerm);
                this.updatePolynomialInfo('Cubic', `f(x) = ${leadingCoeff}x³ + ${constantTerm}`, 'Degree: 3', 'Up to 2 turning points');
                break;
            case 'quartic':
                this.drawQuarticPolynomial(ctx, canvas, leadingCoeff, constantTerm);
                this.updatePolynomialInfo('Quartic', `f(x) = ${leadingCoeff}x⁴ + ${constantTerm}`, 'Degree: 4', 'Up to 3 turning points');
                break;
        }
    },

    drawLinearPolynomial: function(ctx, canvas, a, b) {
        const scale = 40;
        const startX = -canvas.width / (2 * scale);
        const endX = canvas.width / (2 * scale);
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        ctx.moveTo(startX * scale, (a * startX + b) * scale);
        ctx.lineTo(endX * scale, (a * endX + b) * scale);
        ctx.stroke();
    },

    drawQuadraticPolynomial: function(ctx, canvas, a, b, c) {
        drawQuadraticFunction(ctx, canvas, a, b, c);
    },

    drawCubicPolynomial: function(ctx, canvas, a, b = 0) {
        const scale = 40;
        const startX = -canvas.width / (2 * scale);
        const endX = canvas.width / (2 * scale);
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        let first = true;
        
        for (let x = startX; x <= endX; x += 0.1) {
            const y = a * x * x * x + b;
            
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

    drawQuarticPolynomial: function(ctx, canvas, a, b = 0) {
        const scale = 40;
        const startX = -canvas.width / (2 * scale);
        const endX = canvas.width / (2 * scale);
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        let first = true;
        
        for (let x = startX; x <= endX; x += 0.1) {
            const y = a * x * x * x * x + b;
            
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

    updatePolynomialInfo: function(degree, leadingCoeff) {
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
    },

    analyzePolynomial: function() {
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
    },

    findTurningPoints: function() {
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
    },

    // Polynomial Operations
    updateOperations: function() {
        const infoDiv = document.getElementById('operationsResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div>Enter polynomials and select an operation to see results.</div>';
        }
    },

    performOperation: function() {
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
    },

    // Factoring
    updateFactoring: function() {
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
    },

    factorPolynomial: function() {
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
    },

    showFactoringMethods: function() {
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
    },

    // Polynomial Division
    updateDivision: function() {
        const canvas = document.getElementById('divisionCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['divisionCanvas'];
        drawGrid(ctx, canvas);
        
        // Draw dividend and divisor
        this.drawCubicPolynomial(ctx, canvas, 1, 0); // Simplified cubic
    },

    performDivision: function() {
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
    },

    showSyntheticDivision: function() {
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
    },

    // Polynomial Equations
    updateEquations: function() {
        const canvas = document.getElementById('equationsCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['equationsCanvas'];
        drawGrid(ctx, canvas);
        
        // Draw the cubic equation x^3 - 6x^2 + 11x - 6 = 0
        this.drawCubicEquation(ctx, canvas);
    },

    drawCubicEquation: function(ctx, canvas) {
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
    },

    solvePolynomialEquation: function() {
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
    },

    verifyRoots: function() {
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
    },

    findRationalRoots: function() {
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
};

console.log('Unit 2 (Polynomials) module loaded successfully');