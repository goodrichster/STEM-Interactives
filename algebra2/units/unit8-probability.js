// Unit 8: Probability
// Basic Probability, Permutations & Combinations, Birthday Paradox, Compound Events, Conditional Probability

// Create Unit 8 namespace
window.Unit8 = {
    
    // Basic Probability (without graph)
    updateProbability: function() {
        const infoDiv = document.getElementById('probabilityResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Basic Probability</strong></div>
                <div>P(Event) = Favorable Outcomes / Total Outcomes</div>
                <div>Range: 0 ≤ P(Event) ≤ 1</div>
                <div>P(A) + P(A') = 1</div>
            `;
        }
    },

    calculateBasicProbability: function() {
        const favorable = parseInt(document.getElementById('favorableOutcomes').value) || 1;
        const total = parseInt(document.getElementById('totalOutcomes').value) || 6;
        
        if (total === 0) {
            const infoDiv = document.getElementById('probabilityResults');
            if (infoDiv) {
                infoDiv.innerHTML = '<div><strong>Error:</strong> Total outcomes cannot be zero</div>';
            }
            return;
        }
        
        const probability = favorable / total;
        const percentage = (probability * 100).toFixed(2);
        
        const infoDiv = document.getElementById('probabilityResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Probability Calculation</strong></div>
                <div>Favorable outcomes: ${favorable}</div>
                <div>Total outcomes: ${total}</div>
                <div><strong>P(Event) = ${favorable}/${total} = ${probability.toFixed(4)}</strong></div>
                <div><strong>Percentage: ${percentage}%</strong></div>
            `;
        }
    },

    calculateProbability: function() {
        const probType = document.getElementById('probType').value;
        
        let result = '<div><strong>Probability Calculation:</strong></div><br>';
        
        switch(probType) {
            case 'coin':
                result += '<div><strong>Coin Flip Experiment:</strong></div>';
                result += '<div>Sample space: {Heads, Tails}</div>';
                result += '<div>Total outcomes: 2</div><br>';
                result += '<div>P(Heads) = 1/2 = 0.5 = 50%</div>';
                result += '<div>P(Tails) = 1/2 = 0.5 = 50%</div>';
                break;
            case 'dice':
                result += '<div><strong>Dice Roll Experiment:</strong></div>';
                result += '<div>Sample space: {1, 2, 3, 4, 5, 6}</div>';
                result += '<div>Total outcomes: 6</div><br>';
                result += '<div>P(any number) = 1/6 ≈ 0.167 = 16.7%</div>';
                result += '<div>P(even) = 3/6 = 1/2 = 50%</div>';
                result += '<div>P(odd) = 3/6 = 1/2 = 50%</div>';
                break;
            case 'cards':
                result += '<div><strong>Card Draw Experiment:</strong></div>';
                result += '<div>Standard deck: 52 cards</div>';
                result += '<div>Total outcomes: 52</div><br>';
                result += '<div>P(Heart) = 13/52 = 1/4 = 25%</div>';
                result += '<div>P(Face card) = 12/52 = 3/13 ≈ 23.1%</div>';
                result += '<div>P(Ace) = 4/52 = 1/13 ≈ 7.7%</div>';
                break;
        }
        
        const infoDiv = document.getElementById('probabilityResults');
        if (infoDiv) {
            infoDiv.innerHTML = result;
        }
    },

    // Permutations and Combinations
    calculatePermutationsCombinations: function() {
        const n = parseInt(document.getElementById('totalItems').value) || 5;
        const r = parseInt(document.getElementById('selectItems').value) || 3;
        
        if (r > n || n < 0 || r < 0) {
            const infoDiv = document.getElementById('permCombResults');
            if (infoDiv) {
                infoDiv.innerHTML = '<div><strong>Error:</strong> Invalid parameters. Ensure r ≤ n and both are non-negative.</div>';
            }
            return;
        }
        
        // Calculate factorial
        function factorial(num) {
            if (num === 0 || num === 1) return 1;
            let result = 1;
            for (let i = 2; i <= num; i++) {
                result *= i;
            }
            return result;
        }
        
        // Calculate permutations: P(n,r) = n! / (n-r)!
        const permutations = factorial(n) / factorial(n - r);
        
        // Calculate combinations: C(n,r) = n! / (r! * (n-r)!)
        const combinations = factorial(n) / (factorial(r) * factorial(n - r));
        
        const infoDiv = document.getElementById('permCombResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Permutations and Combinations</strong></div>
                <div>Total items (n): ${n}</div>
                <div>Items to select (r): ${r}</div>
                <div><strong>Permutations P(${n},${r}) = ${n}!/${n-r}! = ${permutations.toLocaleString()}</strong></div>
                <div><strong>Combinations C(${n},${r}) = ${n}!/(${r}!×${n-r}!) = ${combinations.toLocaleString()}</strong></div>
                <div><strong>Explanation:</strong></div>
                <div>• Permutations: Order matters (e.g., arranging people in seats)</div>
                <div>• Combinations: Order doesn't matter (e.g., selecting committee members)</div>
            `;
        }
    },

    // Birthday Paradox
    calculateBirthdayParadox: function() {
        const numPeople = parseInt(document.getElementById('numPeople').value) || 23;
        
        if (numPeople < 2 || numPeople > 100) {
            const infoDiv = document.getElementById('birthdayResults');
            if (infoDiv) {
                infoDiv.innerHTML = '<div><strong>Error:</strong> Number of people must be between 2 and 100.</div>';
            }
            return;
        }
        
        // Calculate probability that no two people share a birthday
        let probNoShared = 1.0;
        for (let i = 1; i < numPeople; i++) {
            probNoShared *= (365 - i) / 365;
        }
        
        // Probability that at least two people share a birthday
        const probShared = 1 - probNoShared;
        const percentage = (probShared * 100).toFixed(2);
        
        const infoDiv = document.getElementById('birthdayResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Birthday Paradox Calculation</strong></div>
                <div>Number of people: ${numPeople}</div>
                <div>Days in a year: 365</div>
                <div><strong>Probability of at least one shared birthday: ${percentage}%</strong></div>
                <div><strong>Probability = 1 - (365/365) × (364/365) × (363/365) × ... × (${365-numPeople+1}/365)</strong></div>
                <div><strong>Explanation:</strong></div>
                <div>The birthday paradox demonstrates that in a group of just 23 people,</div>
                <div>there's a 50.7% chance that at least two people share the same birthday.</div>
                <div>This seems counterintuitive because we're not looking for a specific match</div>
                <div>but rather any match among all possible pairs.</div>
            `;
        }
    },

    showCompoundEvents: function() {
        const infoDiv = document.getElementById('probabilityResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Compound Events</strong></div>
                <div><strong>Addition Rule:</strong> P(A or B) = P(A) + P(B) - P(A and B)</div>
                <div><strong>Multiplication Rule:</strong> P(A and B) = P(A) × P(B|A)</div>
                <div><strong>Independent Events:</strong> P(A and B) = P(A) × P(B)</div>
                <div><strong>Mutually Exclusive:</strong> P(A and B) = 0</div>
            `;
        }
    },

    showConditionalProbability: function() {
        const infoDiv = document.getElementById('probabilityResults');
        if (infoDiv) {
            infoDiv.innerHTML = `
                <div><strong>Conditional Probability</strong></div>
                <div><strong>Formula:</strong> P(B|A) = P(A and B) / P(A)</div>
                <div>P(B|A) = "Probability of B given A"</div>
                <div><strong>Bayes' Theorem:</strong> P(A|B) = P(B|A) × P(A) / P(B)</div>
                <div>Used when we know P(B|A) and want P(A|B)</div>
            `;
        }
    }
};

console.log('Unit 8 (Probability) module loaded successfully');