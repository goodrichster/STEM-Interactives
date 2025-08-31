// Unit 4: Exponentials & Logarithms
// Exponential Functions, Logarithmic Functions, Exponential Equations, Logarithmic Equations, Applications

// Create Unit 4 namespace
window.Unit4 = {
    
    // Exponential Functions
    updateExponential: function() {
        const canvas = document.getElementById('exponentialCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['exponentialCanvas'];
        drawGrid(ctx, canvas);
        
        // Draw basic exponential function
        drawExponentialFunction(ctx, canvas, 1, 2, 0);
        
        const infoDiv = document.getElementById('exponentialResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Exponential Function: f(x) = 2^x</strong></div>
                <div>Domain: (-∞, ∞)</div>
                <div>Range: (0, ∞)</div>
                <div>Horizontal Asymptote: y = 0</div>
            `;
        }
    },

    analyzeGrowthDecay: function() {
        const baseElement = document.getElementById('expBase4');
        if (!baseElement) {
            console.error('Element with ID "expBase4" not found');
            return;
        }
        
        const base = parseFloat(baseElement.value) || 2;
        
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
    },

    findHorizontalAsymptote: function() {
        const vShiftElement = document.getElementById('expK');
        if (!vShiftElement) {
            console.error('Element with ID "expK" not found');
            return;
        }
        
        const vShift = parseFloat(vShiftElement.value) || 0;
        
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
    },

    findHalfLife: function() {
        const baseElement = document.getElementById('expBase4');
        if (!baseElement) {
            console.error('Element with ID "expBase4" not found');
            return;
        }
        
        const base = parseFloat(baseElement.value) || 0.5;
        
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
    },

    // Logarithmic Functions
    updateLogarithmic: function() {
        const canvas = document.getElementById('logarithmicCanvas');
        if (!canvas) return;
        
        const ctx = canvasContexts['logarithmicCanvas'];
        drawGrid(ctx, canvas);
        
        // Draw basic logarithmic function
        drawLogarithmicFunction(ctx, canvas, 1, 0, 0);
        
        const infoDiv = document.getElementById('logarithmicResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Logarithmic Function: f(x) = log(x)</strong></div>
                <div>Domain: (0, ∞)</div>
                <div>Range: (-∞, ∞)</div>
                <div>Vertical Asymptote: x = 0</div>
            `;
        }
    },

    findVerticalAsymptote: function() {
        const hShiftElement = document.getElementById('logH');
        if (!hShiftElement) {
            console.error('Element with ID "logH" not found');
            return;
        }
        
        const hShift = parseFloat(hShiftElement.value) || 0;
        
        let result = '<strong>Vertical Asymptote Analysis:</strong><br><br>';
        result += `For the logarithmic function f(x) = log(x - h) + k:<br>`;
        result += `The vertical asymptote is x = h = ${hShift}<br><br>`;
        result += '<strong>Explanation:</strong><br>';
        result += 'Logarithmic functions are undefined when the argument is ≤ 0,<br>';
        result += `so x - ${hShift} must be > 0, which means x > ${hShift}.<br>`;
        result += 'The function approaches negative infinity as x approaches this line<br>';
        result += 'from the right but never actually reaches it.';
        
        const infoDiv = document.getElementById('logarithmicResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    convertToExponential: function() {
        const baseElement = document.getElementById('logBase');
        if (!baseElement) {
            console.error('Element with ID "logBase" not found');
            return;
        }
        
        const base = parseFloat(baseElement.value) || 10;
        
        let result = '<strong>Converting Logarithmic to Exponential Form:</strong><br><br>';
        result += '<strong>Rule:</strong> If log_b(x) = y, then b^y = x<br><br>';
        result += '<strong>Examples:</strong><br>';
        result += `• log_${base}(x) = 2 → ${base}² = x<br>`;
        result += `• log_${base}(100) = y → ${base}^y = 100<br>`;
        result += `• log_${base}(x) = -1 → ${base}^(-1) = x, so x = 1/${base}<br><br>`;
        result += '<strong>Note:</strong> This conversion is useful for solving<br>';
        result += 'logarithmic equations by transforming them into<br>';
        result += 'exponential form.';
        
        const infoDiv = document.getElementById('logarithmicResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    // Exponential Equations
    updateExpEq: function() {
        const infoDiv = document.getElementById('expEqResults');
        if (infoDiv) {
            infoDiv.innerHTML = '<div>Enter an exponential equation to solve it.</div>';
        }
    },

    solveExponentialEq: function() {
        // Ensure the exponential equations tab is active
        const expEqTab = document.getElementById('exponential-equations');
        if (expEqTab && !expEqTab.classList.contains('active')) {
            switchTopic('exponential-equations');
        }
        
        const equationElement = document.getElementById('expEquation');
        if (!equationElement) {
            console.error('Element with ID "expEquation" not found');
            return;
        }
        
        const equation = equationElement.value.trim();
        
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
    },

    showExpSteps: function() {
        // Ensure the exponential equations tab is active
        const expEqTab = document.getElementById('exponential-equations');
        if (expEqTab && !expEqTab.classList.contains('active')) {
            switchTopic('exponential-equations');
        }
        
        const methodElement = document.getElementById('expMethod');
        if (!methodElement) {
            console.error('Element with ID "expMethod" not found');
            return;
        }
        
        const method = methodElement.value;
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
            default:
                result = '<strong>Please select a method to see examples.</strong>';
        }
        
        const infoDiv = document.getElementById('expEqResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    // Logarithmic Equations
    updateLogEq: function() {
        const infoDiv = document.getElementById('logEqResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Solving Logarithmic Equations</strong></div>
                <div>1. Use properties of logarithms to simplify</div>
                <div>2. Convert to exponential form if needed</div>
                <div>3. Check solutions in original equation</div>
            `;
        }
    },

    solveLogarithmicEq: function() {
        // Ensure the logarithmic equations tab is active
        const logEqTab = document.getElementById('logarithmic-equations');
        if (logEqTab && !logEqTab.classList.contains('active')) {
            switchTopic('logarithmic-equations');
        }
        
        const equationElement = document.getElementById('logEquation');
        if (!equationElement) {
            console.error('Element with ID "logEquation" not found');
            return;
        }
        
        const equation = equationElement.value.trim();
        
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
    },

    showLogSteps: function() {
        // Ensure the logarithmic equations tab is active
        const logEqTab = document.getElementById('logarithmic-equations');
        if (logEqTab && !logEqTab.classList.contains('active')) {
            switchTopic('logarithmic-equations');
        }
        
        const methodElement = document.getElementById('logMethod');
        if (!methodElement) {
            console.error('Element with ID "logMethod" not found');
            return;
        }
        
        const method = methodElement.value;
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
            default:
                result = '<strong>Please select a method to see examples.</strong>';
        }
        
        const infoDiv = document.getElementById('logEqResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    // Applications
    updateApplications: function() {
        const infoDiv = document.getElementById('applicationsResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Exponential Applications</strong></div>
                <div>• Compound Interest: A = P(1 + r/n)^(nt)</div>
                <div>• Population Growth: P(t) = P₀e^(rt)</div>
                <div>• Radioactive Decay: N(t) = N₀e^(-λt)</div>
                <div>• pH Scale: pH = -log[H⁺]</div>
            `;
        }
    },

    calculateFutureValue: function() {
        // Ensure the applications tab is active
        const appsTab = document.getElementById('applications');
        if (appsTab && !appsTab.classList.contains('active')) {
            switchTopic('applications');
        }
        
        const appTypeElement = document.getElementById('applicationType');
        const initialValueElement = document.getElementById('initialValue');
        const rateParamElement = document.getElementById('rateParam');
        
        if (!appTypeElement || !initialValueElement || !rateParamElement) {
            console.error('One or more required elements not found');
            return;
        }
        
        const appType = appTypeElement.value;
        const initialValue = parseFloat(initialValueElement.value) || 0;
        const rateParam = parseFloat(rateParamElement.value) || 0;
        
        let result = '';
        
        switch(appType) {
            case 'compound':
                // For compound interest: A = P(1 + r/n)^(nt)
                // We'll assume n=12 (monthly compounding) and t=rateParam (time in years)
                const rate = rateParam;
                const time = 1; // Default to 1 year if not specified
                const n = 12; // Monthly compounding
                const finalAmount = initialValue * Math.pow(1 + rate/n, n*time);
                
                result = '<strong>Compound Interest Calculation:</strong><br>';
                result += `Formula: A = P(1 + r/n)^(nt)<br>`;
                result += `Where:<br>`;
                result += `• P = ${initialValue} (principal)<br>`;
                result += `• r = ${rate} (annual interest rate)<br>`;
                result += `• n = ${n} (compounded monthly)<br>`;
                result += `• t = ${time} year(s)<br><br>`;
                result += `<strong>Future Value: $${finalAmount.toFixed(2)}</strong><br>`;
                result += `Interest Earned: $${(finalAmount - initialValue).toFixed(2)}`;
                break;
                
            case 'population':
                // For population growth: P(t) = P₀ × e^(rt)
                // rateParam is the growth rate, we'll calculate for t=10 years
                const growthRate = rateParam;
                const timePop = 10; // 10 years
                const finalPopulation = initialValue * Math.exp(growthRate * timePop);
                
                result = '<strong>Population Growth Calculation:</strong><br>';
                result += `Formula: P(t) = P₀ × e^(rt)<br>`;
                result += `Where:<br>`;
                result += `• P₀ = ${initialValue} (initial population)<br>`;
                result += `• r = ${growthRate} (growth rate)<br>`;
                result += `• t = ${timePop} years<br>`;
                result += `• e ≈ 2.718 (natural base)<br><br>`;
                result += `<strong>Future Population: ${Math.round(finalPopulation)}</strong><br>`;
                result += `Population Growth: ${Math.round(finalPopulation - initialValue)}`;
                break;
                
            case 'decay':
                // For radioactive decay: N(t) = N₀ × e^(-λt)
                // rateParam is the decay constant λ
                const decayConstant = rateParam;
                const timeDecay = 5; // 5 time units
                const remainingAmount = initialValue * Math.exp(-decayConstant * timeDecay);
                
                result = '<strong>Radioactive Decay Calculation:</strong><br>';
                result += `Formula: N(t) = N₀ × e^(-λt)<br>`;
                result += `Where:<br>`;
                result += `• N₀ = ${initialValue} (initial amount)<br>`;
                result += `• λ = ${decayConstant} (decay constant)<br>`;
                result += `• t = ${timeDecay} time units<br>`;
                result += `• e ≈ 2.718 (natural base)<br><br>`;
                result += `<strong>Remaining Amount: ${remainingAmount.toFixed(2)}</strong><br>`;
                result += `Decayed Amount: ${(initialValue - remainingAmount).toFixed(2)}`;
                break;
                
            case 'cooling':
                // For Newton's Law of Cooling: T(t) = Tₛ + (T₀ - Tₛ)e^(-kt)
                // rateParam is the cooling constant k
                // We need surrounding temperature, let's assume Tₛ = 20°C
                const coolingConstant = rateParam;
                const surroundingTemp = 20; // Room temperature in °C
                const initialTemp = initialValue; // Initial temperature
                const timeCool = 10; // 10 minutes
                const finalTemp = surroundingTemp + (initialTemp - surroundingTemp) * Math.exp(-coolingConstant * timeCool);
                
                result = '<strong>Newton\'s Law of Cooling:</strong><br>';
                result += `Formula: T(t) = Tₛ + (T₀ - Tₛ)e^(-kt)<br>`;
                result += `Where:<br>`;
                result += `• Tₛ = ${surroundingTemp}°C (surrounding temperature)<br>`;
                result += `• T₀ = ${initialTemp}°C (initial temperature)<br>`;
                result += `• k = ${coolingConstant} (cooling constant)<br>`;
                result += `• t = ${timeCool} minutes<br>`;
                result += `• e ≈ 2.718 (natural base)<br><br>`;
                result += `<strong>Temperature after ${timeCool} minutes: ${finalTemp.toFixed(1)}°C</strong><br>`;
                result += `Temperature Change: ${(finalTemp - initialTemp).toFixed(1)}°C`;
                break;
                
            default:
                result = '<strong>Please select an application type.</strong>';
        }
        
        const infoDiv = document.getElementById('applicationsResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    }
};

console.log('Unit 4 (Exponentials & Logarithms) module loaded successfully');