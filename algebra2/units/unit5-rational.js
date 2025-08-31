// Unit 5: Rational Functions
// Rational Functions, Asymptotes, and Operations

// Create Unit 5 namespace
window.Unit5 = {
    
    // Rational Functions
    updateRationalFunc: function() {
        const canvas = document.getElementById('rationalFuncCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['rationalFuncCanvas'];
        drawGrid(ctx, canvas);
        
        const type = document.getElementById('rationalType').value;
        
        // Draw based on selected function type
        switch(type) {
            case 'simple':
                this.drawSimpleRationalFunction(ctx, canvas);
                break;
            case 'shifted':
                this.drawShiftedRationalFunction(ctx, canvas, 2, 1);
                break;
            case 'complex':
                this.drawComplexRationalFunction(ctx, canvas, 1, 2, 1, 1);
                break;
        }
        
        const infoDiv = document.getElementById('rationalFuncResults');
        if (infoDiv) {
            let info = "";
            switch(type) {
                case 'simple':
                    info = `
                        <div><strong>Simple Rational Function: f(x) = 1/x</strong></div>
                        <div>Domain: (-∞, 0) ∪ (0, ∞)</div>
                        <div>Range: (-∞, 0) ∪ (0, ∞)</div>
                        <div>Vertical Asymptote: x = 0</div>
                        <div>Horizontal Asymptote: y = 0</div>
                    `;
                    break;
                case 'shifted':
                    info = `
                        <div><strong>Shifted Rational Function: f(x) = 1/(x-2) + 1</strong></div>
                        <div>Domain: (-∞, 2) ∪ (2, ∞)</div>
                        <div>Range: (-∞, 1) ∪ (1, ∞)</div>
                        <div>Vertical Asymptote: x = 2</div>
                        <div>Horizontal Asymptote: y = 1</div>
                    `;
                    break;
                case 'complex':
                    info = `
                        <div><strong>Complex Rational Function: f(x) = (x+2)/(x+1)</strong></div>
                        <div>Domain: (-∞, -1) ∪ (-1, ∞)</div>
                        <div>Range: (-∞, 1) ∪ (1, ∞)</div>
                        <div>Vertical Asymptote: x = -1</div>
                        <div>Horizontal Asymptote: y = 1</div>
                    `;
                    break;
            }
            infoDiv.innerHTML = info;
        }
    },
    
    drawSimpleRationalFunction: function(ctx, canvas) {
        const scale = 40;
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        
        // Draw left branch
        ctx.beginPath();
        let first = true;
        for (let x = -width/(2*scale); x < -0.1; x += 0.1) {
            const y = 1 / x;
            
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
        for (let x = 0.1; x < width/(2*scale); x += 0.1) {
            const y = 1 / x;
            
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
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        // Vertical asymptote
        ctx.beginPath();
        ctx.moveTo(0, -height/2);
        ctx.lineTo(0, height/2);
        ctx.stroke();
        
        // Horizontal asymptote
        ctx.beginPath();
        ctx.moveTo(-width/2, 0);
        ctx.lineTo(width/2, 0);
        ctx.stroke();
        
        ctx.setLineDash([]);
    },
    
    drawShiftedRationalFunction: function(ctx, canvas, h, k) {
        const scale = 40;
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        
        // Draw left branch
        ctx.beginPath();
        let first = true;
        for (let x = -width/(2*scale); x < h - 0.1; x += 0.1) {
            const y = 1 / (x - h) + k;
            
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
        for (let x = h + 0.1; x < width/(2*scale); x += 0.1) {
            const y = 1 / (x - h) + k;
            
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
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        // Vertical asymptote
        ctx.beginPath();
        ctx.moveTo(h * scale, -height/2);
        ctx.lineTo(h * scale, height/2);
        ctx.stroke();
        
        // Horizontal asymptote
        ctx.beginPath();
        ctx.moveTo(-width/2, k * scale);
        ctx.lineTo(width/2, k * scale);
        ctx.stroke();
        
        ctx.setLineDash([]);
    },
    
    drawComplexRationalFunction: function(ctx, canvas, a, b, c, d) {
        const scale = 40;
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        
        // Calculate vertical asymptote where denominator = 0
        const vertAsymptote = -d/c;
        
        // Draw left branch
        ctx.beginPath();
        let first = true;
        for (let x = -width/(2*scale); x < vertAsymptote - 0.1; x += 0.1) {
            const y = (a*x + b) / (c*x + d);
            
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
        for (let x = vertAsymptote + 0.1; x < width/(2*scale); x += 0.1) {
            const y = (a*x + b) / (c*x + d);
            
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
        
        // Calculate horizontal asymptote
        const horizontalAsymptote = a/c;
        
        // Draw asymptotes
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        // Vertical asymptote
        ctx.beginPath();
        ctx.moveTo(vertAsymptote * scale, -height/2);
        ctx.lineTo(vertAsymptote * scale, height/2);
        ctx.stroke();
        
        // Horizontal asymptote
        ctx.beginPath();
        ctx.moveTo(-width/2, horizontalAsymptote * scale);
        ctx.lineTo(width/2, horizontalAsymptote * scale);
        ctx.stroke();
        
        ctx.setLineDash([]);
    },

    analyzeRationalFunc: function() {
        const typeElement = document.getElementById('rationalType');
        if (!typeElement) {
            console.error('Element with ID "rationalType" not found');
            return;
        }
        
        const type = typeElement.value;
        let result = '<strong>Rational Function Analysis:</strong><br><br>';
        
        switch(type) {
            case 'simple':
                result += '<strong>Simple Rational Function: f(x) = 1/x</strong><br>';
                result += '• Domain: (-∞, 0) ∪ (0, ∞)<br>';
                result += '• Range: (-∞, 0) ∪ (0, ∞)<br>';
                result += '• Vertical Asymptote: x = 0<br>';
                result += '• Horizontal Asymptote: y = 0<br>';
                result += '• Symmetry: Odd function (symmetric about origin)<br>';
                break;
            case 'shifted':
                result += '<strong>Shifted Rational Function: f(x) = 1/(x-h) + k</strong><br>';
                result += '• Domain: (-∞, h) ∪ (h, ∞)<br>';
                result += '• Range: (-∞, k) ∪ (k, ∞)<br>';
                result += '• Vertical Asymptote: x = h<br>';
                result += '• Horizontal Asymptote: y = k<br>';
                result += '• Transformation: Shifted h units horizontally and k units vertically<br>';
                break;
            case 'complex':
                result += '<strong>Complex Rational Function: f(x) = (ax+b)/(cx+d)</strong><br>';
                result += '• Domain: All real numbers except where denominator = 0<br>';
                result += '• Range: Depends on degrees of numerator and denominator<br>';
                result += '• Vertical Asymptotes: Where denominator = 0 (if not canceled)<br>';
                result += '• Horizontal Asymptotes: Based on degree comparison<br>';
                result += '• Holes: Where factors cancel from numerator and denominator<br>';
                break;
            default:
                result += 'Please select a function type to analyze.';
        }
        
        const infoDiv = document.getElementById('rationalFuncResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    // Asymptotes functionality
    updateAsymptotes: function() {
        const canvas = document.getElementById('asymptotesCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['asymptotesCanvas'];
        drawGrid(ctx, canvas);
        
        // Draw example function with asymptotes
        this.drawAsymptotesExample(ctx, canvas);
        
        const infoDiv = document.getElementById('asymptotesResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Asymptote Types</strong></div>
                <div><strong>Vertical Asymptotes:</strong> Set denominator = 0</div>
                <div><strong>Horizontal Asymptotes:</strong> Compare degrees of numerator and denominator</div>
                <div>• If deg(num) < deg(den): y = 0</div>
                <div>• If deg(num) = deg(den): y = ratio of leading coefficients</div>
                <div>• If deg(num) > deg(den): no horizontal asymptote (possible slant asymptote)</div>
            `;
        }
    },
    
    drawAsymptotesExample: function(ctx, canvas) {
        // Draw (x²-1)/(x-1) which has a hole at x=1 and a slant asymptote
        const scale = 40;
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        
        // Draw function
        ctx.beginPath();
        let first = true;
        for (let x = -width/(2*scale); x < 0.9; x += 0.1) {
            // For (x²-1)/(x-1) = x+1 when x≠1
            const y = x + 1;
            
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
        
        // Draw right part after the hole
        ctx.beginPath();
        first = true;
        for (let x = 1.1; x < width/(2*scale); x += 0.1) {
            // For (x²-1)/(x-1) = x+1 when x≠1
            const y = x + 1;
            
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
        
        // Draw hole at x=1
        ctx.fillStyle = 'white';
        ctx.strokeStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(1 * scale, 2 * scale, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        
        // Draw slant asymptote y = x + 1
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(-width/2, (-width/(2*scale) + 1) * scale);
        ctx.lineTo(width/2, (width/(2*scale) + 1) * scale);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Hole at (1,2)', 1 * scale + 10, 2 * scale);
        ctx.fillText('Slant asymptote: y = x + 1', width/4, height/4);
    },
    
    analyzeAsymptotes: function() {
        const infoDiv = document.getElementById('asymptotesResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Finding Asymptotes</strong></div>
                <div><strong>Vertical Asymptotes:</strong></div>
                <div>1. Set denominator equal to zero</div>
                <div>2. Solve for x</div>
                <div>3. Check for cancellations with numerator</div>
                <div><br></div>
                <div><strong>Horizontal Asymptotes:</strong></div>
                <div>1. Compare degree of numerator and denominator</div>
                <div>2. If deg(num) < deg(den): y = 0</div>
                <div>3. If deg(num) = deg(den): y = ratio of leading coefficients</div>
                <div>4. If deg(num) > deg(den): no horizontal asymptote</div>
                <div><br></div>
                <div><strong>Slant Asymptotes:</strong></div>
                <div>1. If deg(num) = deg(den) + 1, perform polynomial division</div>
                <div>2. Slant asymptote is the quotient (without remainder)</div>
            `;
        }
    },
    
    // Rational Operations functionality
    updateRationalOperations: function() {
        const canvas = document.getElementById('rationalOperationsCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['rationalOperationsCanvas'];
        drawGrid(ctx, canvas);
        
        const infoDiv = document.getElementById('rationalOperationsResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Rational Expression Operations</strong></div>
                <div><strong>Addition/Subtraction:</strong> Find common denominator</div>
                <div><strong>Multiplication:</strong> Multiply numerators, multiply denominators</div>
                <div><strong>Division:</strong> Multiply by reciprocal of divisor</div>
                <div><strong>Simplifying:</strong> Factor and cancel common terms</div>
            `;
        }
    },
    
    performRationalOperation: function() {
        const operationType = document.getElementById('operationType')?.value || 'add';
        
        const infoDiv = document.getElementById('rationalOperationsResults');
        if (infoDiv) {
            let result = '<strong>Rational Expression Operations</strong><br><br>';
            
            switch(operationType) {
                case 'add':
                    result += '<strong>Addition Example:</strong><br>';
                    result += 'To add 1/(x-1) + 2/(x+1):<br>';
                    result += '1. Find LCD: (x-1)(x+1)<br>';
                    result += '2. Convert fractions: [1(x+1)]/[(x-1)(x+1)] + [2(x-1)]/[(x+1)(x-1)]<br>';
                    result += '3. Add numerators: [1(x+1) + 2(x-1)]/[(x-1)(x+1)]<br>';
                    result += '4. Simplify: [(x+1) + 2(x-1)]/[(x-1)(x+1)]<br>';
                    result += '5. Expand: [x+1 + 2x-2]/[(x-1)(x+1)]<br>';
                    result += '6. Simplify: [3x-1]/[(x-1)(x+1)]<br>';
                    break;
                case 'subtract':
                    result += '<strong>Subtraction Example:</strong><br>';
                    result += 'To subtract 3/x - 2/(x²):<br>';
                    result += '1. Find LCD: x²<br>';
                    result += '2. Convert fractions: [3x]/[x²] - 2/x²<br>';
                    result += '3. Subtract numerators: [3x - 2]/x²<br>';
                    result += '4. Simplify: (3x - 2)/x²<br>';
                    break;
                case 'multiply':
                    result += '<strong>Multiplication Example:</strong><br>';
                    result += 'To multiply (x+2)/(x-3) × (x-1)/(x+4):<br>';
                    result += '1. Multiply numerators: (x+2)(x-1)<br>';
                    result += '2. Multiply denominators: (x-3)(x+4)<br>';
                    result += '3. Result: [(x+2)(x-1)]/[(x-3)(x+4)]<br>';
                    result += '4. Expand: (x² + x - 2)/(x² + x - 12)<br>';
                    result += '5. Factor and simplify if possible<br>';
                    break;
                case 'divide':
                    result += '<strong>Division Example:</strong><br>';
                    result += 'To divide (2x-1)/(x+3) ÷ (x-2)/(x²-9):<br>';
                    result += '1. Multiply by reciprocal: (2x-1)/(x+3) × (x²-9)/(x-2)<br>';
                    result += '2. Note that x²-9 = (x+3)(x-3)<br>';
                    result += '3. Result: [(2x-1)(x+3)(x-3)]/[(x+3)(x-2)]<br>';
                    result += '4. Cancel (x+3): [(2x-1)(x-3)]/(x-2)<br>';
                    result += '5. Expand: [(2x-1)(x-3)]/(x-2)<br>';
                    break;
            }
            
            infoDiv.innerHTML = result;
        }
    },
    
    // Rational Equations functionality
    updateRationalEquations: function() {
        const canvas = document.getElementById('rationalEquationsCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['rationalEquationsCanvas'];
        drawGrid(ctx, canvas);
        
        const infoDiv = document.getElementById('rationalEquationsResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Solving Rational Equations</strong></div>
                <div>1. Find the least common denominator (LCD)</div>
                <div>2. Multiply both sides by LCD to eliminate fractions</div>
                <div>3. Solve the resulting equation</div>
                <div>4. Check all solutions for domain restrictions</div>
                <div>5. Reject any extraneous solutions</div>
            `;
        }
    },
    
    solveRationalEquation: function() {
        const infoDiv = document.getElementById('rationalEquationsResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Example: Solving 1/(x-3) + 2/(x+1) = 1</strong></div>
                <div>Step 1: Find LCD = (x-3)(x+1)</div>
                <div>Step 2: Multiply all terms by LCD</div>
                <div>(x+1) + 2(x-3) = (x-3)(x+1)</div>
                <div>Step 3: Expand</div>
                <div>x + 1 + 2x - 6 = x² - 2x - 3</div>
                <div>3x - 5 = x² - 2x - 3</div>
                <div>0 = x² - 5x + 2</div>
                <div>Step 4: Solve the quadratic</div>
                <div>0 = (x - 2)(x - 1)</div>
                <div>x = 2 or x = 1</div>
                <div>Step 5: Check for domain restrictions</div>
                <div>x ≠ 3 and x ≠ -1</div>
                <div>Step 6: Both solutions are valid</div>
                <div>Answer: x = 1 or x = 2</div>
            `;
        }
    }
};

console.log('Unit 5 (Rational Functions) module loaded successfully');