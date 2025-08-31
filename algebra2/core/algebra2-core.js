// Algebra 2 Core Utilities
// Shared canvas management, mathematical functions, and drawing utilities

// Global canvas context registry
const canvasContexts = {};

// Initialize all canvas elements
function initializeCanvases() {
    const canvases = document.querySelectorAll('.algebra-canvas');
    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        canvasContexts[canvas.id] = ctx;
        
        // Set canvas size
        canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : 600;
        canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : 400;
        
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

// Common Mathematical Functions

// Draw linear function: f(x) = mx + b
function drawLinearFunction(ctx, canvas, m = 2, b = 1) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const startY = m * startX + b;
    const endY = m * endX + b;
    
    ctx.moveTo(startX * scale, startY * scale);
    ctx.lineTo(endX * scale, endY * scale);
    ctx.stroke();
}

// Draw quadratic function: f(x) = ax^2 + bx + c
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

// Draw absolute value function: f(x) = |x - h| + k
function drawAbsoluteFunction(ctx, canvas, h = 2, k = 1) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = Math.abs(x - h) + k;
        
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

// Draw rational function: f(x) = 1/(x - h) + k
function drawRationalFunction(ctx, canvas, h = 2, k = 0) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    
    // Draw left branch
    ctx.beginPath();
    let first = true;
    for (let x = startX; x < h - 0.1; x += 0.1) {
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
    for (let x = h + 0.1; x <= endX; x += 0.1) {
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
    ctx.moveTo(h * scale, -canvas.height/2);
    ctx.lineTo(h * scale, canvas.height/2);
    ctx.stroke();
    
    // Horizontal asymptote
    ctx.beginPath();
    ctx.moveTo(-canvas.width/2, k * scale);
    ctx.lineTo(canvas.width/2, k * scale);
    ctx.stroke();
    
    ctx.setLineDash([]);
}

// Draw radical function: f(x) = √(x - h) + k
function drawRadicalFunction(ctx, canvas, h = 0, k = 0) {
    const scale = 40;
    const startX = Math.max(h, -canvas.width / (2 * scale));
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        if (x >= h) {
            const y = Math.sqrt(x - h) + k;
            
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

// Draw exponential function: f(x) = a * b^x + k
function drawExponentialFunction(ctx, canvas, a = 1, b = 2, k = 0) {
    const scale = 40;
    const startX = -canvas.width / (2 * scale);
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        const y = a * Math.pow(b, x) + k;
        
        if (y < 15 && y > -15) {
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

// Draw logarithmic function: f(x) = a * log(x - h) + k
function drawLogarithmicFunction(ctx, canvas, a = 1, h = 0, k = 0) {
    const scale = 40;
    const startX = Math.max(h + 0.1, -canvas.width / (2 * scale));
    const endX = canvas.width / (2 * scale);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    let first = true;
    
    for (let x = startX; x <= endX; x += 0.1) {
        if (x > h) {
            const y = a * Math.log(x - h) + k;
            
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
}

// Utility Functions

// Update information display
function updateInfo(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = content;
    }
}

// Update domain and range information
function updateDomainRangeInfo(func, domain, range) {
    updateInfo('.function-info .function', func);
    updateInfo('.function-info .domain', domain);
    updateInfo('.function-info .range', range);
}

// Mathematical utility functions
function evaluateFunction(x, type, params = {}) {
    switch(type) {
        case 'linear':
            return (params.m || 2) * x + (params.b || 1);
        case 'quadratic':
            return (params.a || 1) * x * x + (params.b || 0) * x + (params.c || -4);
        case 'absolute':
            return Math.abs(x - (params.h || 2)) + (params.k || 1);
        case 'rational':
            return 1 / (x - (params.h || 2)) + (params.k || 0);
        case 'radical':
            return x >= (params.h || 0) ? Math.sqrt(x - (params.h || 0)) + (params.k || 0) : undefined;
        case 'exponential':
            return (params.a || 1) * Math.pow(params.b || 2, x) + (params.k || 0);
        case 'logarithmic':
            return x > (params.h || 0) ? (params.a || 1) * Math.log(x - (params.h || 0)) + (params.k || 0) : undefined;
        default:
            return 0;
    }
}

// Animation utilities
function animateValue(start, end, duration, callback) {
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const value = start + (end - start) * progress;
        callback(value);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeCanvases,
        drawGrid,
        drawLinearFunction,
        drawQuadraticFunction,
        drawAbsoluteFunction,
        drawRationalFunction,
        drawRadicalFunction,
        drawExponentialFunction,
        drawLogarithmicFunction,
        updateInfo,
        updateDomainRangeInfo,
        evaluateFunction,
        animateValue,
        canvasContexts
    };
}