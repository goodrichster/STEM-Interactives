// Unit 3: Rational & Radical Functions
// Rational Expressions, Radical Functions, Inverse Functions, Radical Equations, Rational Exponents

// Create Unit 3 namespace
window.Unit3 = {
    
    // Rational Expressions
    updateRationalExp: function() {
        const canvas = document.getElementById('rationalExpCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['rationalExpCanvas'];
        drawGrid(ctx, canvas);
        
        // Draw a basic rational function for visualization
        drawRationalFunction(ctx, canvas);
    },

    findAsymptotes: function() {
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
    },

    simplifyRational: function() {
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
    },

    // Radical Functions
    updateRadical: function() {
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
        
        this.drawRadicalFunction(ctx, canvas, type, h, k);
        this.updateRadicalInfo(type, h, k);
    },

    drawRadicalFunction: function(ctx, canvas, type, h, k) {
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
    },

    updateRadicalInfo: function(type, h, k) {
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
    },

    analyzeDomain: function() {
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
    },

    // Inverse Functions
    updateInverse: function() {
        const canvas = document.getElementById('inverseCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['inverseCanvas'];
        drawGrid(ctx, canvas);
        
        const funcType = document.getElementById('inverseFunction').value;
        
        // Draw original function and its inverse
        this.drawOriginalAndInverse(ctx, canvas, funcType);
    },

    drawOriginalAndInverse: function(ctx, canvas, funcType) {
        const scale = 40;
        const startX = -canvas.width / (2 * scale);
        const endX = canvas.width / (2 * scale);
        
        // Draw y = x line (for reflection)
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(startX * scale, startX * scale);
        ctx.lineTo(endX * scale, endX * scale);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw original function
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        
        switch(funcType) {
            case 'linear':
                // f(x) = 2x + 3
                ctx.beginPath();
                ctx.moveTo(startX * scale, (2 * startX + 3) * scale);
                ctx.lineTo(endX * scale, (2 * endX + 3) * scale);
                ctx.stroke();
                
                // Inverse: f⁻¹(x) = (x - 3)/2
                ctx.strokeStyle = '#f093fb';
                ctx.beginPath();
                ctx.moveTo(startX * scale, ((startX - 3) / 2) * scale);
                ctx.lineTo(endX * scale, ((endX - 3) / 2) * scale);
                ctx.stroke();
                break;
                
            case 'quadratic':
                // f(x) = x² (x ≥ 0)
                ctx.beginPath();
                let first = true;
                for (let x = 0; x <= endX; x += 0.1) {
                    const y = x * x;
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
                
                // Inverse: f⁻¹(x) = √x
                ctx.strokeStyle = '#f093fb';
                ctx.beginPath();
                first = true;
                for (let x = 0; x <= endX; x += 0.1) {
                    const y = Math.sqrt(x);
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
                break;
        }
    },

    findInverse: function() {
        const funcType = document.getElementById('inverseFunction').value;
        let result = '<strong>Finding Inverse Function:</strong><br><br>';
        
        switch(funcType) {
            case 'linear':
                result += '<strong>For f(x) = 2x + 3:</strong><br>';
                result += '1. Replace f(x) with y: y = 2x + 3<br>';
                result += '2. Swap x and y: x = 2y + 3<br>';
                result += '3. Solve for y: x - 3 = 2y<br>';
                result += '4. y = (x - 3)/2<br>';
                result += '<strong>Therefore: f⁻¹(x) = (x - 3)/2</strong>';
                break;
            case 'quadratic':
                result += '<strong>For f(x) = x² (x ≥ 0):</strong><br>';
                result += '1. Replace f(x) with y: y = x²<br>';
                result += '2. Swap x and y: x = y²<br>';
                result += '3. Solve for y: y = ±√x<br>';
                result += '4. Since original domain is x ≥ 0, y ≥ 0<br>';
                result += '<strong>Therefore: f⁻¹(x) = √x</strong>';
                break;
        }
        
        const infoDiv = document.getElementById('inverseResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    verifyInverse: function() {
        const funcType = document.getElementById('inverseFunction').value;
        let result = '<strong>Verifying Inverse Functions:</strong><br><br>';
        
        switch(funcType) {
            case 'linear':
                result += '<strong>For f(x) = 2x + 3 and f⁻¹(x) = (x - 3)/2:</strong><br>';
                result += 'Check: f(f⁻¹(x)) = f((x - 3)/2) = 2((x - 3)/2) + 3 = x - 3 + 3 = x ✓<br>';
                result += 'Check: f⁻¹(f(x)) = f⁻¹(2x + 3) = ((2x + 3) - 3)/2 = 2x/2 = x ✓<br>';
                result += '<strong>Verification successful: f(f⁻¹(x)) = f⁻¹(f(x)) = x</strong>';
                break;
            case 'quadratic':
                result += '<strong>For f(x) = x² (x ≥ 0) and f⁻¹(x) = √x:</strong><br>';
                result += 'Check: f(f⁻¹(x)) = f(√x) = (√x)² = x (for x ≥ 0) ✓<br>';
                result += 'Check: f⁻¹(f(x)) = f⁻¹(x²) = √(x²) = |x| = x (since x ≥ 0) ✓<br>';
                result += '<strong>Verification successful: f(f⁻¹(x)) = f⁻¹(f(x)) = x</strong>';
                break;
        }
        
        const infoDiv = document.getElementById('inverseResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    // Radical Equations
    updateRadicalEq: function() {
        const infoDiv = document.getElementById('radicalEqResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div>Enter a radical equation to solve it.</div>';
        }
    },

    solveRadicalEquation: function() {
        const equation = document.getElementById('radicalEquation').value.trim();
        
        if (!equation) {
            const infoDiv = document.getElementById('radicalEqResults');
            if (infoDiv) {
                infoDiv.innerHTML = '<div><strong>Error:</strong> Please enter a radical equation</div>';
            }
            return;
        }
        
        let result = `<strong>Solving: ${equation}</strong><br><br>`;
        result += '<strong>General Steps:</strong><br>';
        result += '1. Isolate the radical term<br>';
        result += '2. Square both sides (if square root)<br>';
        result += '3. Solve the resulting equation<br>';
        result += '4. Check all solutions in original equation<br>';
        result += '5. Reject extraneous solutions<br><br>';
        result += '<strong>Note:</strong> Always check for extraneous solutions when squaring both sides';
        
        const infoDiv = document.getElementById('radicalEqResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    // Alias for backward compatibility
    solveRadicalEq: function() {
        this.solveRadicalEquation();
    },

    checkExtraneous: function() {
        const equation = document.getElementById('radicalEquation').value.trim();
        let result = '<strong>Checking for Extraneous Solutions:</strong><br><br>';
        
        if (equation === '√x + 3 = 7') {
            result += '<strong>For equation: √x + 3 = 7</strong><br>';
            result += '1. Isolate radical: √x = 4<br>';
            result += '2. Square both sides: x = 16<br>';
            result += '3. Check in original equation:<br>';
            result += '&nbsp;&nbsp;&nbsp;√(16) + 3 = 4 + 3 = 7 ✓<br>';
            result += '<strong>Solution x = 16 is valid (not extraneous)</strong>';
        } else {
            result += '<strong>General Process:</strong><br>';
            result += '1. Solve the equation algebraically<br>';
            result += '2. Substitute each solution back into the original equation<br>';
            result += '3. If the equation is satisfied, the solution is valid<br>';
            result += '4. If not, the solution is extraneous and must be rejected<br><br>';
            result += '<strong>Note:</strong> Extraneous solutions often occur when squaring both sides of an equation';
        }
        
        const infoDiv = document.getElementById('radicalEqResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    // Rational Exponents
    updateRationalExpUnit3: function() {
        const infoDiv = document.getElementById('rationalExpUnit3Results');
        if (infoDiv) {
            infoDiv.innerHTML = '<div>Explore rational exponents and their properties.</div>';
        }
    },

    convertToRadical: function() {
        const base = document.getElementById('expBase').value || 'x';
        const numerator = parseInt(document.getElementById('expNum').value) || 1;
        const denominator = parseInt(document.getElementById('expDen').value) || 2;
        
        let result = `<strong>Converting: ${base}^(${numerator}/${denominator})</strong><br><br>`;
        result += `${base}^(${numerator}/${denominator}) = `;
        
        if (numerator === 1) {
            if (denominator === 2) {
                result += `√${base}`;
            } else if (denominator === 3) {
                result += `∛${base}`;
            } else {
                result += `${denominator}√${base}`;
            }
        } else {
            if (denominator === 2) {
                result += `(√${base})^${numerator}`;
            } else if (denominator === 3) {
                result += `(∛${base})^${numerator}`;
            } else {
                result += `(${denominator}√${base})^${numerator}`;
            }
        }
        
        result += '<br><br><strong>Rule:</strong> a^(m/n) = (ⁿ√a)^m = ⁿ√(a^m)';
        
        const infoDiv = document.getElementById('rationalExpResults2');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    showExponentRules: function() {
        let result = '<strong>Rational Exponent Rules:</strong><br><br>';
        result += '• a^(m/n) = ⁿ√(a^m) = (ⁿ√a)^m<br>';
        result += '• a^(1/n) = ⁿ√a<br>';
        result += '• (a^m)^(1/n) = a^(m/n)<br>';
        result += '• a^(-m/n) = 1/(a^(m/n))<br>';
        result += '• (ab)^(m/n) = a^(m/n) · b^(m/n)<br>';
        result += '• (a/b)^(m/n) = a^(m/n) / b^(m/n)<br><br>';
        result += '<strong>Note:</strong> a > 0 for all rational exponents';
        
        const infoDiv = document.getElementById('rationalExpUnit3Results');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    }
};

console.log('Unit 3 (Rational & Radical Functions) module loaded successfully');