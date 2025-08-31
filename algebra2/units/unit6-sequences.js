// Unit 6: Sequences & Series
// Arithmetic Sequences, Geometric Sequences, and Series

// Create Unit 6 namespace
window.Unit6 = {
    
    // Initialization function
    init: function() {
        console.log('Unit 6 (Sequences & Series) module initialized');
    },
    
    // Arithmetic Sequences
    updateArithmetic: function() {
        const canvas = document.getElementById('arithmeticCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['arithmeticCanvas'];
        drawGrid(ctx, canvas);
        
        const firstTerm = parseFloat(document.getElementById('arithFirst').value) || 3;
        const commonDiff = parseFloat(document.getElementById('arithDiff').value) || 2;
        
        // Draw arithmetic sequence
        this.drawArithmeticSequence(ctx, canvas, firstTerm, commonDiff);
        
        // Show basic sequence info
        let result = `<strong>Arithmetic Sequence:</strong><br>`;
        result += `First term (a₁) = ${firstTerm}<br>`;
        result += `Common difference (d) = ${commonDiff}<br>`;
        result += `General term: aₙ = ${firstTerm} + (n-1)(${commonDiff})`;
        
        const infoDiv = document.getElementById('arithmeticResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    drawArithmeticSequence: function(ctx, canvas, firstTerm, commonDiff) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 20;
        
        // Save and reset transform to properly display text
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        // Redraw the grid after clearing
        drawGrid(ctx, canvas);
        
        // Draw sequence points
        ctx.fillStyle = '#667eea';
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        
        const numPoints = Math.min(10, Math.floor(canvas.width / 40));
        
        // Add title first
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for text
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Arithmetic Sequence: aₙ = ${firstTerm} + (n-1)(${commonDiff})`, canvas.width / 2, 30);
        ctx.restore();
        
        // Draw points and lines for the sequence
        for (let n = 1; n <= numPoints; n++) {
            const term = firstTerm + (n - 1) * commonDiff;
            const x = -canvas.width/4 + (n-1) * 40;
            const y = term * scale;
            
            // Draw point
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw label (with transform adjustment for text)
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            
            // Convert canvas coordinates to screen coordinates
            const screenX = x + canvas.width/2;
            const screenY = canvas.height/2 - y;
            
            ctx.fillText(`a${n}=${term}`, screenX, screenY - 10);
            ctx.restore();
            
            // Connect points
            if (n > 1) {
                const prevX = -canvas.width/4 + (n-2) * 40;
                const prevTerm = firstTerm + (n - 2) * commonDiff;
                const prevY = prevTerm * scale;
                
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }
    },

    findNthTerm: function() {
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
    },

    calculateSum: function() {
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
    },

    // Geometric Sequences
    updateGeometric: function() {
        const canvas = document.getElementById('geometricCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['geometricCanvas'];
        drawGrid(ctx, canvas);
        
        const firstTerm = parseFloat(document.getElementById('geomFirst').value) || 2;
        const commonRatio = parseFloat(document.getElementById('geomRatio').value) || 2;
        
        // Draw geometric sequence
        this.drawGeometricSequence(ctx, canvas, firstTerm, commonRatio);
        
        // Show basic sequence info
        let result = `<strong>Geometric Sequence:</strong><br>`;
        result += `First term (a₁) = ${firstTerm}<br>`;
        result += `Common ratio (r) = ${commonRatio}<br>`;
        result += `General term: aₙ = ${firstTerm} × ${commonRatio}^(n-1)`;
        
        const infoDiv = document.getElementById('geometricResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    drawGeometricSequence: function(ctx, canvas, firstTerm, commonRatio) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 20;
        
        // Save and reset transform to properly display text
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        // Redraw the grid after clearing
        drawGrid(ctx, canvas);
        
        // Draw sequence points
        ctx.fillStyle = '#f093fb';
        ctx.strokeStyle = '#f093fb';
        ctx.lineWidth = 2;
        
        const numPoints = Math.min(6, Math.floor(canvas.width / 60));
        
        // Add title first
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for text
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Geometric Sequence: aₙ = ${firstTerm} × ${commonRatio}^(n-1)`, canvas.width / 2, 30);
        ctx.restore();
        
        // Draw points and lines for the sequence
        for (let n = 1; n <= numPoints; n++) {
            const term = firstTerm * Math.pow(commonRatio, n - 1);
            // Limit y values to prevent extreme values
            const limitedTerm = Math.min(Math.max(term, -15), 15);
            const x = -canvas.width/4 + (n-1) * 50;
            const y = limitedTerm * scale;
            
            // Draw point
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw label (with transform adjustment for text)
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            
            // Convert canvas coordinates to screen coordinates
            const screenX = x + canvas.width/2;
            const screenY = canvas.height/2 - y;
            
            ctx.fillText(`a${n}=${term.toFixed(2)}`, screenX, screenY - 10);
            ctx.restore();
            
            // Connect points
            if (n > 1) {
                const prevX = -canvas.width/4 + (n-2) * 50;
                const prevTerm = firstTerm * Math.pow(commonRatio, n - 2);
                const limitedPrevTerm = Math.min(Math.max(prevTerm, -15), 15);
                const prevY = limitedPrevTerm * scale;
                
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }
    },

    findGeometricNthTerm: function() {
        const firstTerm = parseFloat(document.getElementById('geomFirst').value) || 1;
        const commonRatio = parseFloat(document.getElementById('geomRatio').value) || 2;
        const n = parseInt(prompt('Enter the term number (n):')) || 5;
        
        if (n <= 0) {
            alert('Please enter a positive integer for n.');
            return;
        }
        
        const nthTerm = firstTerm * Math.pow(commonRatio, n - 1);
        
        let result = `<strong>Finding the ${n}th Term:</strong><br>`;
        result += `Using formula: aₙ = a₁ × r^(n-1)<br>`;
        result += `a${n} = ${firstTerm} × ${commonRatio}^(${n}-1)<br>`;
        result += `a${n} = ${firstTerm} × ${commonRatio}^${n-1}<br>`;
        result += `<strong>a${n} = ${nthTerm}</strong>`;
        
        const infoDiv = document.getElementById('geometricResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    calculateGeometricSum: function() {
        const firstTerm = parseFloat(document.getElementById('geomFirst').value) || 1;
        const commonRatio = parseFloat(document.getElementById('geomRatio').value) || 2;
        const n = parseInt(prompt('Enter the number of terms:')) || 5;
        
        if (n <= 0) {
            alert('Please enter a positive integer for number of terms.');
            return;
        }
        
        let sum;
        let result = `<strong>Sum of First ${n} Terms:</strong><br>`;
        
        if (commonRatio === 1) {
            sum = firstTerm * n;
            result += `Since r = 1, Sₙ = n × a₁<br>`;
            result += `S${n} = ${n} × ${firstTerm} = ${sum}`;
        } else {
            sum = firstTerm * (1 - Math.pow(commonRatio, n)) / (1 - commonRatio);
            result += `Using formula: Sₙ = a₁(1 - rⁿ)/(1 - r)<br>`;
            result += `S${n} = ${firstTerm}(1 - ${commonRatio}^${n})/(1 - ${commonRatio})<br>`;
            result += `S${n} = ${firstTerm}(1 - ${Math.pow(commonRatio, n)})/(${1 - commonRatio})<br>`;
            result += `<strong>S${n} = ${sum}</strong>`;
        }
        
        const infoDiv = document.getElementById('geometricResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    // Series
    updateSeries: function() {
        const canvas = document.getElementById('seriesCanvas');
        if (canvas) {
            const ctx = canvasContexts['seriesCanvas'];
            if (ctx) {
                drawGrid(ctx, canvas);
                
                // Draw example series convergence
                this.drawSeriesExample(ctx, canvas);
                
                // Add title
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for text
                ctx.fillStyle = '#333';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Series Convergence Examples', canvas.width / 2, 30);
                ctx.restore();
            }
        }
        
        const infoDiv = document.getElementById('seriesResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Series Formulas</strong></div>
                <div><strong>Arithmetic Series:</strong> Sₙ = n(a₁ + aₙ)/2 = n/2[2a₁ + (n-1)d]</div>
                <div><strong>Geometric Series:</strong> Sₙ = a₁(1 - rⁿ)/(1 - r) for r ≠ 1</div>
                <div><strong>Infinite Geometric Series:</strong> S = a₁/(1 - r) for |r| < 1</div>
            `;
        }
    },

    drawSeriesExample: function(ctx, canvas) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 30;
        
        // Save and reset transform to properly display text
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        // Redraw the grid after clearing
        drawGrid(ctx, canvas);
        
        // Add title first
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for text
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Series Convergence Examples', canvas.width / 2, 30);
        ctx.restore();
        
        // Draw converging geometric series example (r = 0.5)
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        
        let sum = 0;
        const firstTerm = 1;
        const ratio = 0.5;
        
        // Draw partial sums
        ctx.beginPath();
        for (let n = 0; n < 10; n++) {
            const term = firstTerm * Math.pow(ratio, n);
            sum += term;
            
            const x = -canvas.width/3 + n * 40;
            const y = sum * scale;
            
            if (n === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Draw point
            ctx.fillStyle = '#667eea';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add point label
            if (n % 3 === 0) { // Label every third point to avoid clutter
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.fillStyle = '#333';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                
                // Convert canvas coordinates to screen coordinates
                const screenX = x + canvas.width/2;
                const screenY = canvas.height/2 - y;
                
                ctx.fillText(`S${n+1}=${sum.toFixed(2)}`, screenX, screenY - 10);
                ctx.restore();
            }
        }
        ctx.stroke();
        
        // Draw asymptote (infinite sum = a₁/(1-r) = 1/(1-0.5) = 2)
        const infiniteSum = firstTerm / (1 - ratio);
        const asymptoteY = infiniteSum * scale;
        
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(-canvas.width/3, asymptoteY);
        ctx.lineTo(canvas.width/3, asymptoteY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Add labels for the asymptote
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#ff6b6b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        const asymptoteScreenY = canvas.height/2 - asymptoteY;
        ctx.fillText(`Convergence to ${infiniteSum}`, canvas.width * 3/4, asymptoteScreenY);
        ctx.restore();
    },

    calculateInfiniteGeometricSum: function() {
        const firstTerm = parseFloat(document.getElementById('geomFirst').value) || 1;
        const commonRatio = parseFloat(document.getElementById('geomRatio').value) || 0.5;
        
        if (Math.abs(commonRatio) >= 1) {
            const infoDiv = document.getElementById('seriesResults');
            if (infoDiv) {
                infoDiv.innerHTML = `<strong>Error:</strong> Infinite geometric series converges only when |r| < 1. Current r = ${commonRatio}`;
            }
            return;
        }
        
        const sum = firstTerm / (1 - commonRatio);
        
        let result = `<strong>Infinite Geometric Series Sum:</strong><br>`;
        result += `Formula: S = a₁/(1 - r) for |r| < 1<br>`;
        result += `a₁ = ${firstTerm}, r = ${commonRatio}<br>`;
        result += `S = ${firstTerm}/(1 - ${commonRatio})<br>`;
        result += `S = ${firstTerm}/${(1 - commonRatio)}<br>`;
        result += `<strong>S = ${sum}</strong>`;
        
        const infoDiv = document.getElementById('seriesResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    }
};

console.log('Unit 6 (Sequences & Series) module loaded successfully');

// Auto-initialize if module loader is present
if (typeof window.algebra2Loader !== 'undefined') {
    window.Unit6.init();
}
