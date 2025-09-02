// AP Statistics Interactive Simulations
// Comprehensive implementation for AP Statistics curriculum

// Global variables for canvas contexts
let canvasContexts = {};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvases();
    // Initialize first unit
    if (window.Unit1 && typeof Unit1.init === 'function') {
        Unit1.init();
    }
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
    const firstTopicButton = document.querySelector(`#${unitId} .topic-button`);
    if (firstTopicButton) {
        const topicId = firstTopicButton.getAttribute('onclick').match(/'([^']+)'/)[1];
        switchTopic(topicId);
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
        case 'data-displays':
            window.Unit1?.updateDataDisplays?.();
            break;
        case 'descriptive-stats':
            window.Unit1?.calculateDescriptiveStats?.();
            break;
        case 'boxplots':
            window.Unit1?.updateBoxplot?.();
            break;
        // Unit 2 topics
        case 'normal-distributions':
            window.Unit2?.updateNormalDistribution?.();
            break;
        case 'z-scores':
            window.Unit2?.calculateZScore?.();
            break;
        case 'density-curves':
            window.Unit2?.updateDensityCurve?.();
            break;
    }
}

// Initialize all canvas elements
function initializeCanvases() {
    const canvases = document.querySelectorAll('.stats-canvas');
    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        canvasContexts[canvas.id] = ctx;
        
        // Set canvas size based on parent container
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

// Unit 1: Exploring Data
window.Unit1 = {
    init: function() {
        this.updateDataDisplays();
    },
    
    // Data Displays
    updateDataDisplays: function() {
        const canvas = document.getElementById('dataDisplaysCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['dataDisplaysCanvas'];
        drawGrid(ctx, canvas);
        
        const dataset = document.getElementById('datasetSelect')?.value || 'testScores';
        const displayType = document.getElementById('displayType')?.value || 'histogram';
        
        // Sample data sets
        const datasets = {
            testScores: [65, 72, 78, 82, 85, 88, 89, 91, 92, 94, 95, 96, 97, 98, 99, 100, 100, 100],
            heights: [155, 158, 160, 162, 163, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 178, 180, 182],
            commute: [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 50, 55, 60]
        };
        
        const data = datasets[dataset] || datasets.testScores;
        
        switch(displayType) {
            case 'histogram':
                this.drawHistogram(ctx, canvas, data);
                break;
            case 'dotplot':
                this.drawDotPlot(ctx, canvas, data);
                break;
            case 'stemplot':
                this.drawStemPlot(ctx, canvas, data);
                break;
        }
        
        const infoDiv = document.getElementById('dataDisplaysResults');
        if (infoDiv) {
            const mean = data.reduce((a, b) => a + b, 0) / data.length;
            const sorted = [...data].sort((a, b) => a - b);
            const median = sorted.length % 2 === 0 ? 
                (sorted[sorted.length/2 - 1] + sorted[sorted.length/2]) / 2 : 
                sorted[Math.floor(sorted.length/2)];
                
            infoDiv.innerHTML = `
                <div><strong>${dataset.replace(/([A-Z])/g, ' $1').trim()}</strong></div>
                <div>Count: ${data.length}</div>
                <div>Mean: ${mean.toFixed(2)}</div>
                <div>Median: ${median.toFixed(2)}</div>
                <div>Range: ${Math.max(...data) - Math.min(...data)}</div>
            `;
        }
    },
    
    drawHistogram: function(ctx, canvas, data) {
        const width = canvas.width;
        const height = canvas.height;
        const scale = 40;
        
        // Calculate bins
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min;
        const binCount = Math.min(10, Math.ceil(Math.sqrt(data.length)));
        const binWidth = range / binCount;
        
        // Count frequencies
        const bins = new Array(binCount).fill(0);
        data.forEach(value => {
            const binIndex = Math.min(Math.floor((value - min) / binWidth), binCount - 1);
            bins[binIndex]++;
        });
        
        // Draw histogram
        ctx.strokeStyle = '#667eea';
        ctx.fillStyle = 'rgba(102, 126, 234, 0.6)';
        ctx.lineWidth = 2;
        
        const barWidth = (width * 0.8) / binCount;
        const maxFreq = Math.max(...bins);
        
        for (let i = 0; i < binCount; i++) {
            const x = (i * barWidth) - (width * 0.4);
            const barHeight = (bins[i] / maxFreq) * (height * 0.6);
            
            ctx.fillRect(x, 0, barWidth - 2, barHeight);
            ctx.strokeRect(x, 0, barWidth - 2, barHeight);
        }
        
        // Draw labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.scale(1, -1);
        
        for (let i = 0; i < binCount; i++) {
            const x = (i * barWidth) - (width * 0.4) + (barWidth / 2);
            const label = Math.round(min + (i * binWidth));
            ctx.fillText(label.toString(), x, 20);
        }
        
        ctx.scale(1, -1);
    },
    
    drawDotPlot: function(ctx, canvas, data) {
        const width = canvas.width;
        const height = canvas.height;
        const scale = 40;
        
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min;
        
        ctx.fillStyle = '#667eea';
        
        // Draw dots
        data.forEach((value, index) => {
            const x = ((value - min) / range) * (width * 0.8) - (width * 0.4);
            const y = (index % 10) * 15; // Stack dots vertically
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw axis
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-width/2, 0);
        ctx.lineTo(width/2, 0);
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.scale(1, -1);
        
        for (let i = 0; i <= 10; i++) {
            const value = min + (i * range / 10);
            const x = (i * width * 0.8 / 10) - (width * 0.4);
            ctx.fillText(Math.round(value).toString(), x, 20);
        }
        
        ctx.scale(1, -1);
    },
    
    drawStemPlot: function(ctx, canvas, data) {
        const width = canvas.width;
        const height = canvas.height;
        
        // Sort data and create stem-leaf pairs
        const sorted = [...data].sort((a, b) => a - b);
        const stems = {};
        
        sorted.forEach(value => {
            const stem = Math.floor(value / 10);
            const leaf = value % 10;
            if (!stems[stem]) stems[stem] = [];
            stems[stem].push(leaf);
        });
        
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        
        let yPos = -height/2 + 30;
        
        Object.keys(stems).forEach(stem => {
            const leaves = stems[stem].join(' ');
            ctx.fillText(`${stem} | ${leaves}`, -width/2 + 20, yPos);
            yPos += 25;
        });
    },
    
    analyzeShape: function() {
        const infoDiv = document.getElementById('dataDisplaysResults');
        if (infoDiv) {
            infoDiv.innerHTML += `
                <div><strong>Shape Analysis:</strong></div>
                <div>Symmetric: Data is evenly distributed around center</div>
                <div>Skewed Right: Tail extends to the right</div>
                <div>Skewed Left: Tail extends to the left</div>
                <div>Unimodal: One peak</div>
                <div>Bimodal: Two peaks</div>
            `;
        }
    },
    
    // Descriptive Statistics
    calculateDescriptiveStats: function() {
        const dataInput = document.getElementById('dataInput');
        if (!dataInput) return;
        
        const dataText = dataInput.value;
        const data = dataText.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
        
        if (data.length === 0) {
            const infoDiv = document.getElementById('descriptiveStatsResults');
            if (infoDiv) {
                infoDiv.innerHTML = '<div>Please enter valid numerical data</div>';
            }
            return;
        }
        
        // Calculate statistics
        const n = data.length;
        const mean = data.reduce((a, b) => a + b, 0) / n;
        const sorted = [...data].sort((a, b) => a - b);
        const median = n % 2 === 0 ? 
            (sorted[n/2 - 1] + sorted[n/2]) / 2 : 
            sorted[Math.floor(n/2)];
            
        const q1Index = Math.floor(n * 0.25);
        const q3Index = Math.floor(n * 0.75);
        const q1 = sorted[q1Index];
        const q3 = sorted[q3Index];
        const iqr = q3 - q1;
        
        const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (n - 1);
        const stdDev = Math.sqrt(variance);
        const range = Math.max(...data) - Math.min(...data);
        
        const infoDiv = document.getElementById('descriptiveStatsResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Descriptive Statistics</strong></div>
                <div>n = ${n}</div>
                <div>Mean = ${mean.toFixed(2)}</div>
                <div>Median = ${median.toFixed(2)}</div>
                <div>Standard Deviation = ${stdDev.toFixed(2)}</div>
                <div>Variance = ${variance.toFixed(2)}</div>
                <div>Range = ${range.toFixed(2)}</div>
                <div>Q1 = ${q1.toFixed(2)}</div>
                <div>Q3 = ${q3.toFixed(2)}</div>
                <div>IQR = ${iqr.toFixed(2)}</div>
            `;
        }
        
        // Update visualization
        const canvas = document.getElementById('descriptiveStatsCanvas');
        if (canvas) {
            const ctx = canvasContexts['descriptiveStatsCanvas'];
            drawGrid(ctx, canvas);
            this.drawBoxplot(ctx, canvas, data, { mean, median, q1, q3, min: Math.min(...data), max: Math.max(...data) });
        }
    },
    
    drawBoxplot: function(ctx, canvas, data, stats) {
        const width = canvas.width;
        const height = canvas.height;
        
        // Draw boxplot
        ctx.strokeStyle = '#667eea';
        ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
        ctx.lineWidth = 2;
        
        const boxWidth = 40;
        const xPos = 0;
        
        // Draw box
        const boxTop = stats.q3 * 2;
        const boxBottom = stats.q1 * 2;
        const boxHeight = boxTop - boxBottom;
        
        ctx.fillRect(xPos - boxWidth/2, boxBottom, boxWidth, boxHeight);
        ctx.strokeRect(xPos - boxWidth/2, boxBottom, boxWidth, boxHeight);
        
        // Draw median line
        ctx.beginPath();
        ctx.moveTo(xPos - boxWidth/2, stats.median * 2);
        ctx.lineTo(xPos + boxWidth/2, stats.median * 2);
        ctx.stroke();
        
        // Draw whiskers
        ctx.beginPath();
        ctx.moveTo(xPos, stats.min * 2);
        ctx.lineTo(xPos, boxBottom);
        ctx.moveTo(xPos, boxTop);
        ctx.lineTo(xPos, stats.max * 2);
        ctx.stroke();
        
        // Draw whisker caps
        ctx.beginPath();
        ctx.moveTo(xPos - 10, stats.min * 2);
        ctx.lineTo(xPos + 10, stats.min * 2);
        ctx.moveTo(xPos - 10, stats.max * 2);
        ctx.lineTo(xPos + 10, stats.max * 2);
        ctx.stroke();
    },
    
    showFormulas: function() {
        const infoDiv = document.getElementById('descriptiveStatsResults');
        if (infoDiv) {
            infoDiv.innerHTML += `
                <div><strong>Formulas:</strong></div>
                <div>Mean: x̄ = Σx/n</div>
                <div>Standard Deviation: s = √[Σ(x - x̄)²/(n-1)]</div>
                <div>Variance: s² = Σ(x - x̄)²/(n-1)</div>
                <div>IQR = Q3 - Q1</div>
            `;
        }
    },
    
    // Boxplots & Outliers
    updateBoxplot: function() {
        const dataset = document.getElementById('boxplotDataset')?.value || 'class1';
        
        // Sample data sets
        const datasets = {
            class1: [65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 94, 95, 96, 98, 100],
            class2: [60, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 97, 99],
            comparison: [
                ...[65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 94, 95, 96, 98, 100].map(x => ({value: x, class: 'Class 1'})),
                ...[60, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95, 97, 99].map(x => ({value: x, class: 'Class 2'}))
            ]
        };
        
        const data = datasets[dataset];
        
        const canvas = document.getElementById('boxplotCanvas');
        if (canvas) {
            const ctx = canvasContexts['boxplotCanvas'];
            drawGrid(ctx, canvas);
            
            if (dataset === 'comparison') {
                this.drawComparativeBoxplots(ctx, canvas, data);
            } else {
                // Calculate statistics for single dataset
                const values = data;
                const n = values.length;
                const sorted = [...values].sort((a, b) => a - b);
                const median = n % 2 === 0 ? 
                    (sorted[n/2 - 1] + sorted[n/2]) / 2 : 
                    sorted[Math.floor(n/2)];
                    
                const q1Index = Math.floor(n * 0.25);
                const q3Index = Math.floor(n * 0.75);
                const q1 = sorted[q1Index];
                const q3 = sorted[q3Index];
                const iqr = q3 - q1;
                
                const lowerBound = q1 - 1.5 * iqr;
                const upperBound = q3 + 1.5 * iqr;
                
                const outliers = values.filter(x => x < lowerBound || x > upperBound);
                
                const stats = {
                    min: Math.min(...values),
                    q1: q1,
                    median: median,
                    q3: q3,
                    max: Math.max(...values)
                };
                
                this.drawBoxplot(ctx, canvas, values, stats);
                
                const infoDiv = document.getElementById('boxplotResults');
                if (infoDiv) {
                    infoDiv.innerHTML = `
                        <div><strong>Boxplot Analysis</strong></div>
                        <div>Min: ${stats.min}</div>
                        <div>Q1: ${stats.q1.toFixed(2)}</div>
                        <div>Median: ${stats.median.toFixed(2)}</div>
                        <div>Q3: ${stats.q3.toFixed(2)}</div>
                        <div>Max: ${stats.max}</div>
                        <div>IQR: ${(stats.q3 - stats.q1).toFixed(2)}</div>
                        <div>Outliers: ${outliers.length > 0 ? outliers.join(', ') : 'None'}</div>
                    `;
                }
            }
        }
    },
    
    drawComparativeBoxplots: function(ctx, canvas, data) {
        const width = canvas.width;
        const height = canvas.height;
        
        // Separate data by class
        const class1Data = data.filter(d => d.class === 'Class 1').map(d => d.value);
        const class2Data = data.filter(d => d.class === 'Class 2').map(d => d.value);
        
        // Calculate statistics for both classes
        const calculateStats = (values) => {
            const n = values.length;
            const sorted = [...values].sort((a, b) => a - b);
            const median = n % 2 === 0 ? 
                (sorted[n/2 - 1] + sorted[n/2]) / 2 : 
                sorted[Math.floor(n/2)];
                
            const q1Index = Math.floor(n * 0.25);
            const q3Index = Math.floor(n * 0.75);
            const q1 = sorted[q1Index];
            const q3 = sorted[q3Index];
            
            return {
                min: Math.min(...values),
                q1: q1,
                median: median,
                q3: q3,
                max: Math.max(...values)
            };
        };
        
        const class1Stats = calculateStats(class1Data);
        const class2Stats = calculateStats(class2Data);
        
        ctx.strokeStyle = '#667eea';
        ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
        ctx.lineWidth = 2;
        
        // Draw Class 1 boxplot (top)
        this.drawHorizontalBoxplot(ctx, 50, class1Stats);
        
        // Draw Class 2 boxplot (bottom)
        ctx.strokeStyle = '#f093fb';
        ctx.fillStyle = 'rgba(240, 147, 251, 0.3)';
        this.drawHorizontalBoxplot(ctx, -50, class2Stats);
        
        // Add labels
        ctx.fillStyle = '#667eea';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.scale(1, -1);
        ctx.fillText('Class 1', 0, -70);
        ctx.fillStyle = '#f093fb';
        ctx.fillText('Class 2', 0, 30);
        ctx.scale(1, -1);
    },
    
    drawHorizontalBoxplot: function(ctx, yPos, stats) {
        const boxWidth = 40;
        
        // Draw box
        const boxLeft = stats.q1 * 2;
        const boxRight = stats.q3 * 2;
        const boxLength = boxRight - boxLeft;
        
        ctx.fillRect(boxLeft, yPos - boxWidth/2, boxLength, boxWidth);
        ctx.strokeRect(boxLeft, yPos - boxWidth/2, boxLength, boxWidth);
        
        // Draw median line
        ctx.beginPath();
        ctx.moveTo(stats.median * 2, yPos - boxWidth/2);
        ctx.lineTo(stats.median * 2, yPos + boxWidth/2);
        ctx.stroke();
        
        // Draw whiskers
        ctx.beginPath();
        ctx.moveTo(stats.min * 2, yPos);
        ctx.lineTo(boxLeft, yPos);
        ctx.moveTo(boxRight, yPos);
        ctx.lineTo(stats.max * 2, yPos);
        ctx.stroke();
        
        // Draw whisker caps
        ctx.beginPath();
        ctx.moveTo(stats.min * 2, yPos - 10);
        ctx.lineTo(stats.min * 2, yPos + 10);
        ctx.moveTo(stats.max * 2, yPos - 10);
        ctx.lineTo(stats.max * 2, yPos + 10);
        ctx.stroke();
    },
    
    identifyOutliers: function() {
        const infoDiv = document.getElementById('boxplotResults');
        if (infoDiv) {
            infoDiv.innerHTML += `
                <div><strong>Outlier Identification:</strong></div>
                <div>Outliers are values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR</div>
                <div>Lower Bound: Q1 - 1.5×IQR</div>
                <div>Upper Bound: Q3 + 1.5×IQR</div>
                <div>Values outside these bounds are outliers</div>
            `;
        }
    }
};

// Unit 2: Modeling Distributions
window.Unit2 = {
    // Normal Distributions
    updateNormalDistribution: function() {
        const canvas = document.getElementById('normalDistCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['normalDistCanvas'];
        drawGrid(ctx, canvas);
        
        const mean = parseFloat(document.getElementById('normalMean')?.value) || 100;
        const stdDev = parseFloat(document.getElementById('normalStdDev')?.value) || 15;
        
        this.drawNormalDistribution(ctx, canvas, mean, stdDev);
        
        const infoDiv = document.getElementById('normalDistResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Normal Distribution</strong></div>
                <div>Mean (μ): ${mean}</div>
                <div>Standard Deviation (σ): ${stdDev}</div>
                <div>Variance (σ²): ${Math.pow(stdDev, 2)}</div>
            `;
        }
    },
    
    drawNormalDistribution: function(ctx, canvas, mean = 100, stdDev = 15) {
        const scale = 40;
        const startX = -canvas.width / (2 * scale);
        const endX = canvas.width / (2 * scale);
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        let first = true;
        
        for (let x = startX; x <= endX; x += 0.1) {
            // Normal distribution: f(x) = (1/(σ√(2π))) * e^(-((x-μ)²)/(2σ²))
            const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
            const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
            const scaledY = y * 1000; // Scale for visibility
            
            const canvasX = x * scale;
            const canvasY = scaledY * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        
        ctx.stroke();
        
        // Mark mean
        ctx.fillStyle = '#F44336';
        ctx.beginPath();
        ctx.arc(mean * scale, 0, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Mark standard deviations
        ctx.fillStyle = '#FF9800';
        for (let i = -3; i <= 3; i++) {
            if (i !== 0) {
                const x = (mean + i * stdDev) * scale;
                ctx.beginPath();
                ctx.arc(x, 0, 4, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    },
    
    applyEmpiricalRule: function() {
        const infoDiv = document.getElementById('normalDistResults');
        if (infoDiv) {
            infoDiv.innerHTML += `
                <div><strong>Empirical Rule (68-95-99.7)</strong></div>
                <div>68% within 1σ: [μ-σ, μ+σ]</div>
                <div>95% within 2σ: [μ-2σ, μ+2σ]</div>
                <div>99.7% within 3σ: [μ-3σ, μ+3σ]</div>
            `;
        }
    },
    
    // Z-Scores
    calculateZScore: function() {
        const dataValue = parseFloat(document.getElementById('dataValue')?.value) || 115;
        const mean = parseFloat(document.getElementById('zMean')?.value) || 100;
        const stdDev = parseFloat(document.getElementById('zStdDev')?.value) || 15;
        
        if (stdDev === 0) {
            const infoDiv = document.getElementById('zScoreResults');
            if (infoDiv) {
                infoDiv.innerHTML = '<div><strong>Error:</strong> Standard deviation cannot be zero</div>';
            }
            return;
        }
        
        const zScore = (dataValue - mean) / stdDev;
        
        const infoDiv = document.getElementById('zScoreResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Z-Score Calculation</strong></div>
                <div>Data value (x): ${dataValue}</div>
                <div>Mean (μ): ${mean}</div>
                <div>Standard deviation (σ): ${stdDev}</div>
                <div><strong>z = (x - μ) / σ = (${dataValue} - ${mean}) / ${stdDev} = ${zScore.toFixed(4)}</strong></div>
                <div>Interpretation: ${Math.abs(zScore).toFixed(2)} standard deviations ${zScore >= 0 ? 'above' : 'below'} the mean</div>
            `;
        }
        
        // Update visualization
        const canvas = document.getElementById('zScoreCanvas');
        if (canvas) {
            const ctx = canvasContexts['zScoreCanvas'];
            drawGrid(ctx, canvas);
            this.drawZScoreVisualization(ctx, canvas, mean, stdDev, dataValue, zScore);
        }
    },
    
    drawZScoreVisualization: function(ctx, canvas, mean, stdDev, dataValue, zScore) {
        const scale = 40;
        
        // Draw normal distribution
        this.drawNormalDistribution(ctx, canvas, mean, stdDev);
        
        // Mark data value
        ctx.fillStyle = '#4CAF50';
        const x = dataValue * scale;
        ctx.beginPath();
        ctx.arc(x, 0, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw arrow from mean to data value
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mean * scale, -30);
        ctx.lineTo(dataValue * scale, -30);
        ctx.stroke();
        
        // Draw arrowhead
        const arrowSize = 10;
        ctx.beginPath();
        ctx.moveTo(dataValue * scale, -30);
        ctx.lineTo(dataValue * scale - arrowSize, -30 - arrowSize/2);
        ctx.lineTo(dataValue * scale - arrowSize, -30 + arrowSize/2);
        ctx.closePath();
        ctx.fillStyle = '#4CAF50';
        ctx.fill();
    },
    
    findPercentile: function() {
        const infoDiv = document.getElementById('zScoreResults');
        if (infoDiv) {
            infoDiv.innerHTML += `
                <div><strong>Percentile Calculation:</strong></div>
                <div>Use standard normal table or calculator</div>
                <div>For z = value, percentile = P(Z ≤ z)</div>
                <div>Example: z = 1.0 → percentile ≈ 84.13%</div>
            `;
        }
    },
    
    // Density Curves
    updateDensityCurve: function() {
        const canvas = document.getElementById('densityCurveCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['densityCurveCanvas'];
        drawGrid(ctx, canvas);
        
        const curveType = document.getElementById('curveType')?.value || 'normal';
        
        switch(curveType) {
            case 'normal':
                this.drawNormalDensity(ctx, canvas);
                break;
            case 'uniform':
                this.drawUniformDensity(ctx, canvas);
                break;
            case 'skewed':
                this.drawSkewedDensity(ctx, canvas);
                break;
        }
        
        const infoDiv = document.getElementById('densityCurveResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Density Curve Properties</strong></div>
                <div>Total area under curve = 1</div>
                <div>Area represents probability</div>
                <div>Curve is always non-negative</div>
            `;
        }
    },
    
    drawNormalDensity: function(ctx, canvas) {
        const scale = 40;
        const mean = 0;
        const stdDev = 1;
        const startX = -canvas.width / (2 * scale);
        const endX = canvas.width / (2 * scale);
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        let first = true;
        
        for (let x = startX; x <= endX; x += 0.1) {
            // Standard normal distribution
            const exponent = -0.5 * Math.pow(x, 2);
            const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(exponent);
            const scaledY = y * 100;
            
            const canvasX = x * scale;
            const canvasY = scaledY * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        
        ctx.stroke();
    },
    
    drawUniformDensity: function(ctx, canvas) {
        const scale = 40;
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        // Draw uniform distribution (rectangle)
        const rectHeight = 50;
        const rectWidth = width * 0.6;
        const startX = -rectWidth / 2;
        const startY = 0;
        
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + rectWidth, startY);
        ctx.lineTo(startX + rectWidth, startY + rectHeight);
        ctx.lineTo(startX, startY + rectHeight);
        ctx.closePath();
        ctx.stroke();
    },
    
    drawSkewedDensity: function(ctx, canvas) {
        const scale = 40;
        const startX = -canvas.width / (2 * scale);
        const endX = canvas.width / (2 * scale);
        
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        // Draw right-skewed distribution
        let first = true;
        
        for (let x = startX; x <= endX; x += 0.1) {
            // Simple skewed function
            const y = Math.exp(-Math.pow(x, 2) / 2) * (1 + 0.5 * x);
            const scaledY = Math.max(0, y) * 50;
            
            const canvasX = x * scale;
            const canvasY = scaledY * scale;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        
        ctx.stroke();
    },
    
    explainDensity: function() {
        const infoDiv = document.getElementById('densityCurveResults');
        if (infoDiv) {
            infoDiv.innerHTML += `
                <div><strong>Density Curve Explanation:</strong></div>
                <div>1. Always on or above the horizontal axis</div>
                <div>2. Total area under curve equals 1</div>
                <div>3. Describes overall pattern of distribution</div>
                <div>4. Area under curve represents proportion</div>
            `;
        }
    }
};

// Add event listeners to unit cards
document.addEventListener('DOMContentLoaded', function() {
    const unitCards = document.querySelectorAll('.unit-card');
    unitCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const unitId = this.getAttribute('data-unit');
            switchUnit(unitId);
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Update all visible canvases
    const visibleCanvases = document.querySelectorAll('.unit-content.active .stats-canvas');
    visibleCanvases.forEach(canvas => {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Reinitialize context
        const ctx = canvasContexts[canvas.id];
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(1, -1);
        
        drawGrid(ctx, canvas);
        
        // Trigger redraw of current content
        const activeTopic = document.querySelector('.topic-content.active');
        if (activeTopic) {
            const topicId = activeTopic.id;
            switchTopic(topicId);
        }
    });
});