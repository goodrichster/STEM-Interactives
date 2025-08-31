// Unit 7: Trigonometric Functions
// Unit Circle, Trigonometric Functions, Graphs, and Identities

// Create Unit 7 namespace
window.Unit7 = {
    
    formatRadians: function(radians) {
        const pi = Math.PI;
        
        // Check for common fractions of π
        const commonAngles = [
            {rad: 0, display: '0'},
            {rad: pi/6, display: 'π/6'},
            {rad: pi/4, display: 'π/4'},
            {rad: pi/3, display: 'π/3'},
            {rad: pi/2, display: 'π/2'},
            {rad: 2*pi/3, display: '2π/3'},
            {rad: 3*pi/4, display: '3π/4'},
            {rad: 5*pi/6, display: '5π/6'},
            {rad: pi, display: 'π'},
            {rad: 7*pi/6, display: '7π/6'},
            {rad: 5*pi/4, display: '5π/4'},
            {rad: 4*pi/3, display: '4π/3'},
            {rad: 3*pi/2, display: '3π/2'},
            {rad: 5*pi/3, display: '5π/3'},
            {rad: 7*pi/4, display: '7π/4'},
            {rad: 11*pi/6, display: '11π/6'},
            {rad: 2*pi, display: '2π'}
        ];
        
        // Find closest match (within 0.01 radians)
        for (let angle of commonAngles) {
            if (Math.abs(radians - angle.rad) < 0.01) {
                return angle.display;
            }
        }
        
        // Default to decimal representation
        return radians.toFixed(3) + ' rad';
    },

    drawUnitCircleWithAngle: function(ctx, canvas, angleRad, angleDeg) {
        const scale = 100;
        const radius = scale;
        
        // Draw circle
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Calculate point on circle (using standard mathematical convention)
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius; // Positive for standard mathematical convention
        
        // Draw angle arc
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, angleRad);
        ctx.stroke();
        
        // Draw angle line
        ctx.strokeStyle = '#F44336';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y); // Use y directly since canvas is already flipped
        ctx.stroke();
        
        // Draw point on circle
        ctx.fillStyle = '#F44336';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI); // Use y directly since canvas is already flipped
        ctx.fill();
        
        // Draw projection lines
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        // Vertical line (sin)
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, y); // Use y directly since canvas is already flipped
        ctx.stroke();
        
        // Horizontal line (cos)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, 0);
        ctx.stroke();
        
        ctx.setLineDash([]);
        
        // Label the axes
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // Mark special angle positions - moved labels further from circle for better visibility
        ctx.fillStyle = '#666';
        const specialAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
        specialAngles.forEach(deg => {
            const rad = deg * Math.PI / 180;
            const px = Math.cos(rad) * (radius + 25);  // Increased distance from circle
            const py = Math.sin(rad) * (radius + 25);  // Increased distance from circle
            ctx.fillText(deg + '°', px, py + 4);
        });
    },

    showTrigValues: function() {
        const angle = parseFloat(document.getElementById('angleSlider').value) || 0;
        const angleRad = angle * Math.PI / 180;
        
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const tan = Math.abs(cos) < 0.0001 ? 'undefined' : (sin / cos).toFixed(3);
        
        let result = `<div><strong>Trigonometric Values for ${angle}°:</strong></div><br>`;
        result += `<div><strong>Angle in radians:</strong> ${angleRad.toFixed(3)}</div><br>`;
        result += `<div><strong>cos(${angle}°) = ${cos.toFixed(3)}</strong></div>`;
        result += `<div><strong>sin(${angle}°) = ${sin.toFixed(3)}</strong></div>`;
        result += `<div><strong>tan(${angle}°) = ${tan}</strong></div><br>`;
        result += `<div><strong>Coordinate:</strong> (${cos.toFixed(3)}, ${sin.toFixed(3)})</div>`;
        
        const infoDiv = document.getElementById('unitCircleResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    drawUnitCircle: function(ctx, canvas) {
        const scale = 100; // Larger scale for unit circle
        const radius = scale;
        
        // Draw circle
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Mark special angles
        const angles = [0, Math.PI/6, Math.PI/4, Math.PI/3, Math.PI/2, 
                       2*Math.PI/3, 3*Math.PI/4, 5*Math.PI/6, Math.PI];
        
        ctx.fillStyle = '#F44336';
        
        angles.forEach(angle => {
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI); // Use y directly since canvas is already flipped
            ctx.fill();
        });
    },

    showSpecialAngles: function() {
        const infoDiv = document.getElementById('unitCircleResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Special Angles on Unit Circle</strong></div>
                <div><strong>0°/0 rad:</strong> (1, 0)</div>
                <div><strong>30°/π/6:</strong> (√3/2, 1/2)</div>
                <div><strong>45°/π/4:</strong> (√2/2, √2/2)</div>
                <div><strong>60°/π/3:</strong> (1/2, √3/2)</div>
                <div><strong>90°/π/2:</strong> (0, 1)</div>
                <div><strong>180°/π:</strong> (-1, 0)</div>
                <div><strong>270°/3π/2:</strong> (0, -1)</div>
            `;
        }
    },

    convertAngle: function() {
        const degrees = parseFloat(document.getElementById('angleInput').value) || 45;
        const radians = (degrees * Math.PI / 180).toFixed(4);
        
        const infoDiv = document.getElementById('unitCircleResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Angle Conversion</strong></div>
                <div>Degrees: ${degrees}°</div>
                <div>Radians: ${radians}</div>
                <div><strong>Formula:</strong> radians = degrees × π/180</div>
            `;
        }
    },

    // Trigonometric Functions
    updateTrigFunction: function() {
        const canvas = document.getElementById('trigFuncCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['trigFuncCanvas'];
        drawGrid(ctx, canvas);
        
        const funcType = document.getElementById('trigFuncType').value;
        const amplitude = parseFloat(document.getElementById('amplitude').value) || 1;
        const period = parseFloat(document.getElementById('period').value) || 1;
        const phaseShift = parseFloat(document.getElementById('phaseShift').value) || 0;
        const verticalShift = parseFloat(document.getElementById('verticalShift').value) || 0;
        
        // Draw the function
        this.drawTrigFunction(ctx, canvas, funcType, amplitude, period, phaseShift, verticalShift);
        
        // Update info panel
        const infoDiv = document.getElementById('trigFuncResults');
        if (infoDiv) {
            const funcNames = {
                'sin': 'sine',
                'cos': 'cosine',
                'tan': 'tangent',
                'csc': 'cosecant',
                'sec': 'secant',
                'cot': 'cotangent'
            };
            
            infoDiv.innerHTML = `
                <div><strong>${funcNames[funcType].charAt(0).toUpperCase() + funcNames[funcType].slice(1)} Function</strong></div>
                <div>f(x) = ${amplitude !== 1 ? amplitude : ''}${funcType}(x${period !== 1 ? '/' + period.toFixed(1) : ''}${phaseShift !== 0 ? (phaseShift > 0 ? ' - ' + phaseShift : ' + ' + Math.abs(phaseShift)) : ''})${verticalShift !== 0 ? ' + ' + verticalShift : ''}</div>
                <div>Amplitude: ${Math.abs(amplitude)}</div>
                <div>Period: ${funcType === 'tan' || funcType === 'cot' ? 'π' : (2 * Math.PI / period).toFixed(2)}</div>
                <div>Phase Shift: ${phaseShift}</div>
                <div>Vertical Shift: ${verticalShift}</div>
            `;
        }
    },

    drawTrigFunction: function(ctx, canvas, funcType, amplitude, period, phaseShift, verticalShift) {
        const scale = 40;
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = -width/2; x <= width/2; x += 0.5) {
            const xVal = (x / scale) * period + phaseShift;
            let yVal = 0;
            
            try {
                switch(funcType) {
                    case 'sin':
                        yVal = amplitude * Math.sin(xVal);
                        break;
                    case 'cos':
                        yVal = amplitude * Math.cos(xVal);
                        break;
                    case 'tan':
                        yVal = amplitude * Math.tan(xVal);
                        break;
                    case 'csc':
                        yVal = amplitude / Math.sin(xVal);
                        break;
                    case 'sec':
                        yVal = amplitude / Math.cos(xVal);
                        break;
                    case 'cot':
                        yVal = amplitude / Math.tan(xVal);
                        break;
                }
                
                // Apply the Y coordinate transformation (canvas already flipped)
                const y = (yVal * scale) + (verticalShift * scale);
                
                if (x === -width/2) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            } catch (e) {
                // Skip undefined values
                continue;
            }
        }
        
        ctx.stroke();
    },

    analyzeTrigFunction: function() {
        const funcType = document.getElementById('trigFuncType').value;
        const amplitude = parseFloat(document.getElementById('amplitude').value) || 1;
        const period = parseFloat(document.getElementById('period').value) || 1;
        
        const infoDiv = document.getElementById('trigFuncResults');
        if (infoDiv) {
            let analysis = `<div><strong>Function Analysis</strong></div>`;
            
            switch(funcType) {
                case 'sin':
                case 'cos':
                    analysis += `
                        <div><strong>Domain:</strong> All real numbers</div>
                        <div><strong>Range:</strong> [-${Math.abs(amplitude)}, ${Math.abs(amplitude)}]</div>
                        <div><strong>Period:</strong> ${(2 * Math.PI / period).toFixed(2)}</div>
                        <div><strong>Amplitude:</strong> ${Math.abs(amplitude)}</div>
                    `;
                    break;
                case 'tan':
                    analysis += `
                        <div><strong>Domain:</strong> All real numbers except odd multiples of π/2</div>
                        <div><strong>Range:</strong> All real numbers</div>
                        <div><strong>Period:</strong> π</div>
                        <div><strong>Vertical Asymptotes:</strong> At odd multiples of π/2</div>
                    `;
                    break;
                case 'csc':
                    analysis += `
                        <div><strong>Domain:</strong> All real numbers except multiples of π</div>
                        <div><strong>Range:</strong> (-∞, -${Math.abs(amplitude)}] ∪ [${Math.abs(amplitude)}, ∞)</div>
                        <div><strong>Period:</strong> 2π</div>
                        <div><strong>Vertical Asymptotes:</strong> At multiples of π</div>
                    `;
                    break;
                case 'sec':
                    analysis += `
                        <div><strong>Domain:</strong> All real numbers except odd multiples of π/2</div>
                        <div><strong>Range:</strong> (-∞, -${Math.abs(amplitude)}] ∪ [${Math.abs(amplitude)}, ∞)</div>
                        <div><strong>Period:</strong> 2π</div>
                        <div><strong>Vertical Asymptotes:</strong> At odd multiples of π/2</div>
                    `;
                    break;
                case 'cot':
                    analysis += `
                        <div><strong>Domain:</strong> All real numbers except multiples of π</div>
                        <div><strong>Range:</strong> All real numbers</div>
                        <div><strong>Period:</strong> π</div>
                        <div><strong>Vertical Asymptotes:</strong> At multiples of π</div>
                    `;
                    break;
            }
            
            infoDiv.innerHTML = analysis;
        }
    },

    // Trigonometric Graphs
    updateTrigGraph: function() {
        const canvas = document.getElementById('trigGraphCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['trigGraphCanvas'];
        drawGrid(ctx, canvas);
        
        const graphType = document.getElementById('graphType').value;
        const frequency = parseFloat(document.getElementById('frequencySlider').value) || 1;
        const amplitude = parseFloat(document.getElementById('graphAmplitudeSlider').value) || 1;
        
        // Update slider value displays
        document.getElementById('frequencyValue').textContent = frequency.toFixed(1);
        document.getElementById('graphAmplitudeValue').textContent = amplitude.toFixed(1);
        
        // Draw the graph
        this.drawTrigGraph(ctx, canvas, graphType, frequency, amplitude);
        
        // Update info panel
        const infoDiv = document.getElementById('trigGraphResults');
        if (infoDiv) {
            const graphNames = {
                'sine': 'Sine Wave',
                'cosine': 'Cosine Wave',
                'tangent': 'Tangent Curve',
                'comparison': 'Function Comparison'
            };
            
            infoDiv.innerHTML = `
                <div><strong>${graphNames[graphType]}</strong></div>
                <div>Amplitude: ${amplitude}</div>
                <div>Frequency: ${frequency}</div>
            `;
        }
    },

    drawTrigGraph: function(ctx, canvas, graphType, frequency, amplitude) {
        const scale = 40;
        const width = canvas.width;
        const height = canvas.height;
        
        switch(graphType) {
            case 'sine':
                this.drawSingleFunction(ctx, canvas, 'sin', amplitude, frequency);
                break;
            case 'cosine':
                this.drawSingleFunction(ctx, canvas, 'cos', amplitude, frequency);
                break;
            case 'tangent':
                this.drawSingleFunction(ctx, canvas, 'tan', amplitude, frequency);
                break;
            case 'comparison':
                this.drawFunctionComparison(ctx, canvas, amplitude, frequency);
                break;
        }
    },

    drawSingleFunction: function(ctx, canvas, funcType, amplitude, frequency) {
        const scale = 40;
        const width = canvas.width;
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = -width/2; x <= width/2; x += 0.5) {
            const xVal = (x / scale) * frequency;
            let yVal = 0;
            
            try {
                switch(funcType) {
                    case 'sin':
                        yVal = amplitude * Math.sin(xVal);
                        break;
                    case 'cos':
                        yVal = amplitude * Math.cos(xVal);
                        break;
                    case 'tan':
                        yVal = amplitude * Math.tan(xVal);
                        break;
                }
                
                // Apply the Y coordinate transformation (canvas already flipped)
                const y = (yVal * scale);
                
                if (x === -width/2) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            } catch (e) {
                // Skip undefined values
                continue;
            }
        }
        
        ctx.stroke();
    },

    drawFunctionComparison: function(ctx, canvas, amplitude, frequency) {
        const scale = 40;
        const width = canvas.width;
        
        // Draw sine in blue
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = -width/2; x <= width/2; x += 0.5) {
            const xVal = (x / scale) * frequency;
            const yVal = amplitude * Math.sin(xVal);
            // Apply the Y coordinate transformation (canvas already flipped)
            const y = (yVal * scale);
            
            if (x === -width/2) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw cosine in red
        ctx.strokeStyle = '#F44336';
        ctx.beginPath();
        
        for (let x = -width/2; x <= width/2; x += 0.5) {
            const xVal = (x / scale) * frequency;
            const yVal = amplitude * Math.cos(xVal);
            // Apply the Y coordinate transformation (canvas already flipped)
            const y = (yVal * scale);
            
            if (x === -width/2) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw tangent in green
        ctx.strokeStyle = '#4CAF50';
        ctx.beginPath();
        
        for (let x = -width/2; x <= width/2; x += 0.5) {
            const xVal = (x / scale) * frequency;
            try {
                const yVal = amplitude * Math.tan(xVal);
                // Apply the Y coordinate transformation (canvas already flipped)
                const y = (yVal * scale);
                
                if (x === -width/2) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            } catch (e) {
                // Skip undefined values
                continue;
            }
        }
        ctx.stroke();
        
        // Add legend
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText('sin(x)', width/2 - 60, -height/2 + 20);
        ctx.fillText('cos(x)', width/2 - 60, -height/2 + 40);
        ctx.fillText('tan(x)', width/2 - 60, -height/2 + 60);
        
        // Add colored dots for legend
        ctx.fillStyle = '#2196F3';
        ctx.beginPath();
        ctx.arc(width/2 - 70, -height/2 + 16, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#F44336';
        ctx.beginPath();
        ctx.arc(width/2 - 70, -height/2 + 36, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(width/2 - 70, -height/2 + 56, 4, 0, 2 * Math.PI);
        ctx.fill();
    },

    showGraphProperties: function() {
        const graphType = document.getElementById('graphType').value;
        
        const infoDiv = document.getElementById('trigGraphResults');
        if (infoDiv) {
            let properties = `<div><strong>Graph Properties</strong></div>`;
            
            switch(graphType) {
                case 'sine':
                    properties += `
                        <div><strong>Sine Wave Properties:</strong></div>
                        <div>• Smooth, periodic oscillation</div>
                        <div>• Starts at 0, peaks at π/2</div>
                        <div>• Period: 2π</div>
                        <div>• Amplitude: 1 (default)</div>
                        <div>• Symmetric about origin (odd function)</div>
                    `;
                    break;
                case 'cosine':
                    properties += `
                        <div><strong>Cosine Wave Properties:</strong></div>
                        <div>• Smooth, periodic oscillation</div>
                        <div>• Starts at 1, peaks at 0</div>
                        <div>• Period: 2π</div>
                        <div>• Amplitude: 1 (default)</div>
                        <div>• Symmetric about y-axis (even function)</div>
                    `;
                    break;
                case 'tangent':
                    properties += `
                        <div><strong>Tangent Curve Properties:</strong></div>
                        <div>• Periodic with vertical asymptotes</div>
                        <div>• Period: π</div>
                        <div>• Undefined at odd multiples of π/2</div>
                        <div>• Passes through origin</div>
                        <div>• Symmetric about origin (odd function)</div>
                    `;
                    break;
                case 'comparison':
                    properties += `
                        <div><strong>Function Comparison:</strong></div>
                        <div>• Sine and cosine have the same shape</div>
                        <div>• Cosine is a phase shift of sine</div>
                        <div>• Tangent has different behavior with asymptotes</div>
                        <div>• All are periodic functions</div>
                    `;
                    break;
            }
            
            infoDiv.innerHTML = properties;
        }
    },

    // Initialize and populate the identities table
    initializeIdentities: function() {
        const tableBody = document.getElementById('identitiesTableBody');
        if (!tableBody) return;

        // Define the trigonometric identities
        const identities = [
            {
                name: "Pythagorean Identity",
                formula: "sin²θ + cos²θ = 1",
                description: "Fundamental identity relating sine and cosine"
            },
            {
                name: "Pythagorean Identity",
                formula: "1 + tan²θ = sec²θ",
                description: "Identity relating tangent and secant"
            },
            {
                name: "Pythagorean Identity",
                formula: "1 + cot²θ = csc²θ",
                description: "Identity relating cotangent and cosecant"
            },
            {
                name: "Reciprocal Identity",
                formula: "csc θ = 1/sin θ",
                description: "Cosecant is reciprocal of sine"
            },
            {
                name: "Reciprocal Identity",
                formula: "sec θ = 1/cos θ",
                description: "Secant is reciprocal of cosine"
            },
            {
                name: "Reciprocal Identity",
                formula: "cot θ = 1/tan θ",
                description: "Cotangent is reciprocal of tangent"
            },
            {
                name: "Quotient Identity",
                formula: "tan θ = sin θ/cos θ",
                description: "Tangent is sine divided by cosine"
            },
            {
                name: "Quotient Identity",
                formula: "cot θ = cos θ/sin θ",
                description: "Cotangent is cosine divided by sine"
            },
            {
                name: "Cofunction Identity",
                formula: "sin(π/2 - θ) = cos θ",
                description: "Sine of complement equals cosine"
            },
            {
                name: "Cofunction Identity",
                formula: "cos(π/2 - θ) = sin θ",
                description: "Cosine of complement equals sine"
            },
            {
                name: "Cofunction Identity",
                formula: "tan(π/2 - θ) = cot θ",
                description: "Tangent of complement equals cotangent"
            },
            {
                name: "Even-Odd Identity",
                formula: "sin(-θ) = -sin θ",
                description: "Sine is an odd function"
            },
            {
                name: "Even-Odd Identity",
                formula: "cos(-θ) = cos θ",
                description: "Cosine is an even function"
            },
            {
                name: "Even-Odd Identity",
                formula: "tan(-θ) = -tan θ",
                description: "Tangent is an odd function"
            },
            {
                name: "Sum Formula",
                formula: "sin(A + B) = sin A cos B + cos A sin B",
                description: "Sine of sum of two angles"
            },
            {
                name: "Sum Formula",
                formula: "cos(A + B) = cos A cos B - sin A sin B",
                description: "Cosine of sum of two angles"
            },
            {
                name: "Difference Formula",
                formula: "sin(A - B) = sin A cos B - cos A sin B",
                description: "Sine of difference of two angles"
            },
            {
                name: "Difference Formula",
                formula: "cos(A - B) = cos A cos B + sin A sin B",
                description: "Cosine of difference of two angles"
            }
        ];

        // Populate the table
        tableBody.innerHTML = '';
        identities.forEach(identity => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="identity-name">${identity.name}</td>
                <td class="identity-formula">${identity.formula}</td>
                <td class="identity-description">${identity.description}</td>
            `;
            tableBody.appendChild(row);
        });
    },

    // Refresh the identities table
    refreshIdentities: function() {
        this.initializeIdentities();
    }
};

console.log('Unit 7 (Trigonometry) module loaded successfully');