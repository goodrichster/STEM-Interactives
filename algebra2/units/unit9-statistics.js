// Unit 9: Statistics
// Data Distributions, Binomial Probability, Normal Distribution, Empirical Rule

// Create Unit 9 namespace
window.Unit9 = {
    // Add zoom level property for normal distribution
    normalDistributionZoom: 1.0,
    
    // Data Distributions
    updateDistribution: function() {
        const canvas = document.getElementById('distributionCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['distributionCanvas'];
        drawGrid(ctx, canvas);
        
        // Get values from UI controls
        const distType = document.getElementById('distType')?.value || 'normal';
        const mean = parseFloat(document.getElementById('meanSlider')?.value || 0);
        const stdDev = parseFloat(document.getElementById('stdSlider')?.value || 1);
        
        // Update display values
        const meanValueEl = document.getElementById('meanValue');
        if (meanValueEl) meanValueEl.textContent = mean.toFixed(1);
        
        const stdValueEl = document.getElementById('stdValue');
        if (stdValueEl) stdValueEl.textContent = stdDev.toFixed(1);
        
        // Show/hide zoom controls based on distribution type with smooth transition
        const zoomControls = document.getElementById('zoomControls');
        if (zoomControls) {
            if (distType === 'normal') {
                zoomControls.style.display = 'block';
                // Trigger reflow to ensure display change takes effect before adding class
                zoomControls.offsetHeight;
                zoomControls.classList.add('show');
            } else {
                zoomControls.classList.remove('show');
                // Wait for transition to complete before hiding
                setTimeout(() => {
                    if (distType !== 'normal') {
                        zoomControls.style.display = 'none';
                    }
                }, 300);
            }
        }
        
        // Draw appropriate distribution
        switch(distType) {
            case 'normal':
                this.drawNormalDistribution(ctx, canvas, mean, stdDev);
                break;
            case 'binomial':
                this.drawBinomialDistribution(ctx, canvas);
                break;
            case 'uniform':
                this.drawUniformDistribution(ctx, canvas);
                break;
            default:
                this.drawNormalDistribution(ctx, canvas, mean, stdDev);
        }
        
        const infoDiv = document.getElementById('distributionResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>${distType.charAt(0).toUpperCase() + distType.slice(1)} Distribution</strong></div>
                <div>Mean (μ): ${mean.toFixed(2)}</div>
                <div>Standard Deviation (σ): ${stdDev.toFixed(2)}</div>
                ${distType === 'normal' ? `<div>Zoom: ${this.normalDistributionZoom.toFixed(1)}x</div>` : ''}
                ${distType === 'normal' ? '<div>Follows the Empirical Rule (68-95-99.7)</div>' : ''}
            `;
        }
    },

    drawNormalDistribution: function(ctx, canvas, mean = 0, stdDev = 1) {
        const scale = 40 * this.normalDistributionZoom; // Apply zoom to scale
        const startX = -canvas.width / (2 * scale);
        const endX = canvas.width / (2 * scale);
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        let first = true;
        
        for (let x = startX; x <= endX; x += 0.1 / this.normalDistributionZoom) { // Adjust step size based on zoom
            // Normal distribution: f(x) = (1/(σ√(2π))) * e^(-((x-μ)²)/(2σ²))
            const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
            const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
            const scaledY = y * 100 * stdDev; // Scale for visibility
            
            const canvasX = x * scale;
            const canvasY = scaledY * scale / this.normalDistributionZoom; // Adjust Y scale based on zoom
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        
        ctx.stroke();
        
        // Mark standard deviations
        ctx.fillStyle = '#F44336';
        ctx.setLineDash([5, 5]);
        
        // Draw mean line
        ctx.beginPath();
        ctx.moveTo(mean * scale, -canvas.height/2);
        ctx.lineTo(mean * scale, canvas.height/2);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Mark standard deviations
        for (let i = -2; i <= 2; i++) {
            if (i !== 0) {
                const x = (mean + i * stdDev) * scale;
                const exponent = -0.5 * Math.pow(i, 2);
                const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent) * 100 * stdDev * scale / this.normalDistributionZoom;
                
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
                
                // Add label
                ctx.fillStyle = '#333';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(`μ${i > 0 ? '+' : ''}${i}σ`, x, -10);
                ctx.fillStyle = '#F44336';
            }
        }
    },

    // Add zoom functions for normal distribution
    zoomInNormal: function() {
        this.normalDistributionZoom = Math.min(3.0, this.normalDistributionZoom + 0.1);
        this.updateDistribution();
    },
    
    zoomOutNormal: function() {
        this.normalDistributionZoom = Math.max(0.3, this.normalDistributionZoom - 0.1);
        this.updateDistribution();
    },
    
    resetZoomNormal: function() {
        this.normalDistributionZoom = 1.0;
        this.updateDistribution();
    },

    showEmpiricalRule: function() {
        const infoDiv = document.getElementById('distributionResults') || document.getElementById('normalResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Empirical Rule (68-95-99.7)</strong></div>
                <div><strong>68%</strong> of data within 1 standard deviation</div>
                <div><strong>95%</strong> of data within 2 standard deviations</div>
                <div><strong>99.7%</strong> of data within 3 standard deviations</div>
                <div>Applies to normal (bell-shaped) distributions</div>
            `;
        }
    },

    calculateZScore: function() {
        // Add null checks for all elements
        const dataValueElement = document.getElementById('dataValue');
        const meanElement = document.getElementById('mean');
        const stdDevElement = document.getElementById('stdDev');
        
        const value = dataValueElement ? parseFloat(dataValueElement.value) || 0 : 0;
        const mean = meanElement ? parseFloat(meanElement.value) || 0 : 0;
        const stdDev = stdDevElement ? parseFloat(stdDevElement.value) || 1 : 1;
        
        if (stdDev === 0) {
            const infoDiv = document.getElementById('distributionResults');
            if (infoDiv) {
                infoDiv.innerHTML = '<div><strong>Error:</strong> Standard deviation cannot be zero</div>';
            }
            return;
        }
        
        const zScore = (value - mean) / stdDev;
        
        const infoDiv = document.getElementById('distributionResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Z-Score Calculation</strong></div>
                <div>Data value (x): ${value}</div>
                <div>Mean (μ): ${mean}</div>
                <div>Standard deviation (σ): ${stdDev}</div>
                <div><strong>z = (x - μ) / σ = (${value} - ${mean}) / ${stdDev} = ${zScore.toFixed(4)}</strong></div>
                <div>Interpretation: ${Math.abs(zScore).toFixed(2)} standard deviations ${zScore >= 0 ? 'above' : 'below'} the mean</div>
            `;
        }
    },

    showBinomialProbability: function() {
        const infoDiv = document.getElementById('binomialResults') || document.getElementById('distributionResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Binomial Probability</strong></div>
                <div><strong>Formula:</strong> P(X = k) = C(n,k) × p^k × (1-p)^(n-k)</div>
                <div><strong>Conditions:</strong></div>
                <div>• Fixed number of trials (n)</div>
                <div>• Two possible outcomes (success/failure)</div>
                <div>• Constant probability (p)</div>
                <div>• Independent trials</div>
                <div><strong>Mean:</strong> μ = np</div>
                <div><strong>Standard Deviation:</strong> σ = √(np(1-p))</div>
            `;
        }
    },

    calculateBinomial: function() {
        // Add null checks for all elements
        const trialsElement = document.getElementById('trials');
        const successesElement = document.getElementById('successes');
        const probabilityElement = document.getElementById('probability');
        
        const n = trialsElement ? parseInt(trialsElement.value) || 10 : 10;
        const k = successesElement ? parseInt(successesElement.value) || 5 : 5;
        const p = probabilityElement ? parseFloat(probabilityElement.value) || 0.5 : 0.5;
        
        if (k > n || p < 0 || p > 1) {
            const infoDiv = document.getElementById('binomialResults') || document.getElementById('distributionResults');
            if (infoDiv) {
                infoDiv.innerHTML = '<div><strong>Error:</strong> Invalid parameters</div>';
            }
            return;
        }
        
        // Calculate combination C(n,k)
        function combination(n, k) {
            if (k > n) return 0;
            if (k === 0 || k === n) return 1;
            
            let result = 1;
            for (let i = 0; i < k; i++) {
                result *= (n - i) / (i + 1);
            }
            return result;
        }
        
        const comb = combination(n, k);
        const probability = comb * Math.pow(p, k) * Math.pow(1 - p, n - k);
        const mean = n * p;
        const stdDev = Math.sqrt(n * p * (1 - p));
        
        const infoDiv = document.getElementById('binomialResults') || document.getElementById('distributionResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Binomial Probability Calculation</strong></div>
                <div>Trials (n): ${n}</div>
                <div>Successes (k): ${k}</div>
                <div>Probability (p): ${p}</div>
                <div>C(${n},${k}): ${comb}</div>
                <div><strong>P(X = ${k}) = ${probability.toFixed(6)}</strong></div>
                <div>Mean: ${mean.toFixed(2)}</div>
                <div>Standard Deviation: ${stdDev.toFixed(4)}</div>
            `;
        }
    },

    drawBinomialDistribution: function(ctx, canvas) {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = 0;
        const centerY = 0;
        const scale = 30;
        
        // Sample parameters for binomial distribution
        const n = 10; // number of trials
        const p = 0.5; // probability of success
        
        ctx.strokeStyle = '#f093fb';
        ctx.fillStyle = '#f093fb';
        ctx.lineWidth = 2;
        
        // Draw binomial distribution as bars
        const barWidth = 15;
        for (let k = 0; k <= n; k++) {
            // Calculate probability P(X = k) = C(n,k) * p^k * (1-p)^(n-k)
            const prob = this.binomialProbability(n, p, k);
            
            const x = centerX + (k - n/2) * scale;
            const barHeight = prob * 200 * scale;
            
            // Draw bar
            ctx.fillRect(x - barWidth/2, centerY, barWidth, barHeight);
            
            // Draw outline
            ctx.strokeRect(x - barWidth/2, centerY, barWidth, barHeight);
        }
        
        // Add labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Binomial Distribution (n=10, p=0.5)', 0, -height/2 + 20);
    },
    
    drawUniformDistribution: function(ctx, canvas) {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = 0;
        const centerY = 0;
        const scale = 40;
        
        // Parameters for uniform distribution
        const a = -2; // minimum value
        const b = 2;  // maximum value
        const heightValue = 1 / (b - a); // constant height
        
        ctx.strokeStyle = '#4facfe';
        ctx.fillStyle = '#4facfe';
        ctx.lineWidth = 2;
        
        // Draw uniform distribution as a rectangle
        const rectWidth = (b - a) * scale;
        const rectHeight = heightValue * 50;
        const rectX = centerX - rectWidth/2;
        const rectY = centerY;
        
        // Draw filled rectangle
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        
        // Draw outline
        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
        
        // Draw vertical lines at a and b
        ctx.beginPath();
        ctx.moveTo(a * scale, rectY);
        ctx.lineTo(a * scale, rectY + rectHeight);
        ctx.moveTo(b * scale, rectY);
        ctx.lineTo(b * scale, rectY + rectHeight);
        ctx.stroke();
        
        // Add labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Uniform Distribution', 0, -height/2 + 20);
        ctx.fillText(`a = ${a}`, a * scale, rectY + rectHeight + 20);
        ctx.fillText(`b = ${b}`, b * scale, rectY + rectHeight + 20);
    },
    
    // Helper function to calculate binomial probability
    binomialProbability: function(n, p, k) {
        function combination(n, k) {
            if (k > n) return 0;
            if (k === 0 || k === n) return 1;
            
            let result = 1;
            for (let i = 0; i < k; i++) {
                result *= (n - i) / (i + 1);
            }
            return result;
        }
        
        return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }
};

console.log('Unit 9 (Statistics) module loaded successfully');