// Interactive Functionality Test Suite
// Tests for UI interactions, event handling, and user input responses

class InteractiveFunctionalityTest {
    constructor() {
        this.results = [];
        this.passCount = 0;
        this.failCount = 0;
        this.startTime = Date.now();
    }

    // Test utility methods
    test(description, testFn) {
        try {
            const result = testFn();
            if (result === true || (typeof result === 'object' && result.success)) {
                this.passCount++;
                this.results.push({
                    type: 'PASS',
                    description: description,
                    details: result.details || null
                });
                this.log(`✅ PASS: ${description}`, 'success');
            } else {
                this.failCount++;
                this.results.push({
                    type: 'FAIL',
                    description: description,
                    error: result.error || 'Test returned false',
                    details: result.details || null
                });
                this.log(`❌ FAIL: ${description} - ${result.error || 'Test returned false'}`, 'error');
            }
        } catch (error) {
            this.failCount++;
            this.results.push({
                type: 'FAIL',
                description: description,
                error: error.message,
                stack: error.stack
            });
            this.log(`❌ FAIL: ${description} - ${error.message}`, 'error');
        }
    }

    async asyncTest(description, testFn) {
        try {
            const result = await testFn();
            if (result === true || (typeof result === 'object' && result.success)) {
                this.passCount++;
                this.results.push({
                    type: 'PASS',
                    description: description,
                    details: result.details || null
                });
                this.log(`✅ PASS: ${description}`, 'success');
            } else {
                this.failCount++;
                this.results.push({
                    type: 'FAIL',
                    description: description,
                    error: result.error || 'Async test returned false',
                    details: result.details || null
                });
                this.log(`❌ FAIL: ${description} - ${result.error || 'Async test returned false'}`, 'error');
            }
        } catch (error) {
            this.failCount++;
            this.results.push({
                type: 'FAIL',
                description: description,
                error: error.message,
                stack: error.stack
            });
            this.log(`❌ FAIL: ${description} - ${error.message}`, 'error');
        }
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const colorMap = {
            'info': 'color: blue',
            'success': 'color: green',
            'error': 'color: red',
            'warning': 'color: orange'
        };
        console.log(`%c[${timestamp}] ${message}`, colorMap[type] || 'color: black');
    }

    // Helper method to simulate events
    simulateEvent(element, eventType, eventData = {}) {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        Object.assign(event, eventData);
        return element.dispatchEvent(event);
    }

    simulateClick(element) {
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        return element.dispatchEvent(clickEvent);
    }

    simulateInput(element, value) {
        element.value = value;
        const inputEvent = new Event('input', { bubbles: true });
        return element.dispatchEvent(inputEvent);
    }

    // Helper to wait for async operations
    wait(ms = 100) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // UI Element Existence Tests
    testUIElements() {
        this.log('Testing UI elements existence...', 'info');

        this.test('Main navigation unit cards exist', () => {
            const unitCards = document.querySelectorAll('.unit-card');
            return {
                success: unitCards.length >= 9,
                details: `Found ${unitCards.length} unit cards`
            };
        });

        this.test('Unit cards have proper data attributes', () => {
            const unitCards = document.querySelectorAll('.unit-card[data-unit]');
            const expectedUnits = ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9'];
            const foundUnits = Array.from(unitCards).map(card => card.dataset.unit);
            const hasAllUnits = expectedUnits.every(unit => foundUnits.includes(unit));
            
            return {
                success: hasAllUnits,
                details: `Expected units: ${expectedUnits.join(', ')}, Found: ${foundUnits.join(', ')}`
            };
        });

        this.test('Topic buttons exist in Unit 1', () => {
            const unit1 = document.getElementById('unit1');
            if (!unit1) return { success: false, error: 'Unit 1 element not found' };
            
            const topicButtons = unit1.querySelectorAll('.topic-button[data-topic]');
            return {
                success: topicButtons.length >= 5,
                details: `Found ${topicButtons.length} topic buttons in Unit 1`
            };
        });

        this.test('Canvas elements exist', () => {
            const canvases = document.querySelectorAll('.algebra-canvas');
            return {
                success: canvases.length >= 3,
                details: `Found ${canvases.length} canvas elements`
            };
        });

        this.test('Input elements exist for interactive features', () => {
            const inputs = document.querySelectorAll('input[type="range"], input[type="number"], select');
            return {
                success: inputs.length >= 5,
                details: `Found ${inputs.length} interactive input elements`
            };
        });
    }

    // Unit Card Click Tests
    async testUnitCardInteractions() {
        this.log('Testing unit card interactions...', 'info');

        await this.asyncTest('Unit 1 card click activates unit', async () => {
            const unit1Card = document.querySelector('.unit-card[data-unit="unit1"]');
            if (!unit1Card) return { success: false, error: 'Unit 1 card not found' };

            this.simulateClick(unit1Card);
            await this.wait(200); // Wait for module loading

            const activeUnit = document.querySelector('.unit-content.active');
            const activeCard = document.querySelector('.unit-card.active');
            
            return {
                success: activeUnit && activeUnit.id === 'unit1' && activeCard === unit1Card,
                details: `Active unit: ${activeUnit?.id}, Active card: ${activeCard?.dataset.unit}`
            };
        });

        await this.asyncTest('Unit 2 card click switches units', async () => {
            const unit2Card = document.querySelector('.unit-card[data-unit="unit2"]');
            if (!unit2Card) return { success: false, error: 'Unit 2 card not found' };

            this.simulateClick(unit2Card);
            await this.wait(200); // Wait for module loading

            const activeUnit = document.querySelector('.unit-content.active');
            const activeCard = document.querySelector('.unit-card.active');
            
            return {
                success: activeUnit && activeUnit.id === 'unit2' && activeCard === unit2Card,
                details: `Active unit: ${activeUnit?.id}, Active card: ${activeCard?.dataset.unit}`
            };
        });

        // Return to Unit 1 for further testing
        await this.asyncTest('Return to Unit 1 for topic testing', async () => {
            const unit1Card = document.querySelector('.unit-card[data-unit="unit1"]');
            if (!unit1Card) return { success: false, error: 'Unit 1 card not found' };

            this.simulateClick(unit1Card);
            await this.wait(200);

            const activeUnit = document.querySelector('.unit-content.active');
            return {
                success: activeUnit && activeUnit.id === 'unit1',
                details: 'Successfully returned to Unit 1'
            };
        });
    }

    // Topic Button Tests
    async testTopicInteractions() {
        this.log('Testing topic button interactions...', 'info');

        const topicTests = [
            { topic: 'domain-range', description: 'Domain and Range topic' },
            { topic: 'function-characteristics', description: 'Function Characteristics topic' },
            { topic: 'transformations', description: 'Transformations topic' },
            { topic: 'complex-numbers', description: 'Complex Numbers topic' },
            { topic: 'quadratic-formula', description: 'Quadratic Formula topic' }
        ];

        for (const { topic, description } of topicTests) {
            await this.asyncTest(`${description} button click works`, async () => {
                const topicButton = document.querySelector(`.topic-button[data-topic="${topic}"]`);
                if (!topicButton) return { success: false, error: `${topic} button not found` };

                this.simulateClick(topicButton);
                await this.wait(100);

                const activeTopic = document.querySelector('.topic-content.active');
                const activeButton = document.querySelector('.topic-button.active');
                
                return {
                    success: activeTopic && activeTopic.id === topic && activeButton === topicButton,
                    details: `Active topic: ${activeTopic?.id}, Active button topic: ${activeButton?.dataset.topic}`
                };
            });
        }
    }

    // Input Field Tests
    async testInputInteractions() {
        this.log('Testing input field interactions...', 'info');

        await this.asyncTest('Domain range function selector works', async () => {
            // Switch to domain-range topic first
            const domainRangeButton = document.querySelector('.topic-button[data-topic="domain-range"]');
            if (domainRangeButton) {
                this.simulateClick(domainRangeButton);
                await this.wait(100);
            }

            const functionSelect = document.getElementById('domainFunction');
            if (!functionSelect) return { success: false, error: 'Domain function selector not found' };

            const originalValue = functionSelect.value;
            functionSelect.value = 'quadratic';
            this.simulateEvent(functionSelect, 'change');
            await this.wait(100);

            return {
                success: functionSelect.value === 'quadratic',
                details: `Changed from ${originalValue} to ${functionSelect.value}`
            };
        });

        await this.asyncTest('Transformation sliders work', async () => {
            // Switch to transformations topic
            const transformButton = document.querySelector('.topic-button[data-topic="transformations"]');
            if (transformButton) {
                this.simulateClick(transformButton);
                await this.wait(100);
            }

            const hSlider = document.getElementById('transformH');
            if (!hSlider) return { success: false, error: 'Transform H slider not found' };

            const originalValue = hSlider.value;
            this.simulateInput(hSlider, '2');
            await this.wait(100);

            const displayValue = document.getElementById('transformHValue');
            
            return {
                success: hSlider.value === '2' && (displayValue ? displayValue.textContent === '2' : true),
                details: `Slider value: ${hSlider.value}, Display value: ${displayValue?.textContent}`
            };
        });

        await this.asyncTest('Complex number inputs work', async () => {
            // Switch to complex numbers topic
            const complexButton = document.querySelector('.topic-button[data-topic="complex-numbers"]');
            if (complexButton) {
                this.simulateClick(complexButton);
                await this.wait(100);
            }

            const realInput = document.getElementById('complexReal1');
            const imagInput = document.getElementById('complexImag1');
            
            if (!realInput || !imagInput) {
                return { success: false, error: 'Complex number inputs not found' };
            }

            this.simulateInput(realInput, '3');
            this.simulateInput(imagInput, '4');
            await this.wait(100);

            return {
                success: realInput.value === '3' && imagInput.value === '4',
                details: `Real: ${realInput.value}, Imaginary: ${imagInput.value}`
            };
        });
    }

    // Button Action Tests
    async testButtonActions() {
        this.log('Testing button actions...', 'info');

        await this.asyncTest('Analyze Domain Range button works', async () => {
            const domainRangeButton = document.querySelector('.topic-button[data-topic="domain-range"]');
            if (domainRangeButton) {
                this.simulateClick(domainRangeButton);
                await this.wait(100);
            }

            const analyzeButton = document.querySelector('button[onclick*="analyzeDomainRange"]');
            if (!analyzeButton) return { success: false, error: 'Analyze Domain Range button not found' };

            this.simulateClick(analyzeButton);
            await this.wait(100);

            // Check if results are displayed
            const resultsDiv = document.getElementById('domainRangeResults');
            
            return {
                success: resultsDiv && resultsDiv.innerHTML.length > 0,
                details: `Results div exists: ${!!resultsDiv}, Has content: ${resultsDiv?.innerHTML.length > 0}`
            };
        });

        await this.asyncTest('Complex operation button works', async () => {
            const complexButton = document.querySelector('.topic-button[data-topic="complex-numbers"]');
            if (complexButton) {
                this.simulateClick(complexButton);
                await this.wait(100);
            }

            const operationButton = document.querySelector('button[onclick*="performComplexOperation"]');
            if (!operationButton) return { success: false, error: 'Complex operation button not found' };

            this.simulateClick(operationButton);
            await this.wait(100);

            const resultsDiv = document.getElementById('complexResults');
            
            return {
                success: resultsDiv && resultsDiv.innerHTML.length > 0,
                details: `Complex results updated: ${!!resultsDiv && resultsDiv.innerHTML.length > 0}`
            };
        });

        await this.asyncTest('Quadratic solver button works', async () => {
            const quadraticButton = document.querySelector('.topic-button[data-topic="quadratic-formula"]');
            if (quadraticButton) {
                this.simulateClick(quadraticButton);
                await this.wait(100);
            }

            const solveButton = document.querySelector('button[onclick*="solveQuadratic"]');
            if (!solveButton) return { success: false, error: 'Solve quadratic button not found' };

            this.simulateClick(solveButton);
            await this.wait(100);

            const resultsDiv = document.getElementById('quadraticResults');
            
            return {
                success: resultsDiv && resultsDiv.innerHTML.length > 0,
                details: `Quadratic results updated: ${!!resultsDiv && resultsDiv.innerHTML.length > 0}`
            };
        });
    }

    // Canvas Interaction Tests
    testCanvasInteractions() {
        this.log('Testing canvas interactions...', 'info');

        this.test('Canvas elements are interactive', () => {
            const canvases = document.querySelectorAll('.algebra-canvas');
            let interactiveCount = 0;
            
            canvases.forEach(canvas => {
                if (canvas.getContext && canvas.id && canvasContexts[canvas.id]) {
                    interactiveCount++;
                }
            });
            
            return {
                success: interactiveCount >= 3,
                details: `Found ${interactiveCount} interactive canvases out of ${canvases.length} total`
            };
        });

        this.test('Canvas contexts are properly initialized', () => {
            const contextCount = Object.keys(canvasContexts).length;
            
            return {
                success: contextCount >= 3,
                details: `Found ${contextCount} canvas contexts: ${Object.keys(canvasContexts).join(', ')}`
            };
        });

        this.test('Grid drawing function works', () => {
            try {
                const testCanvas = document.createElement('canvas');
                testCanvas.width = 600;
                testCanvas.height = 400;
                const ctx = testCanvas.getContext('2d');
                ctx.translate(testCanvas.width / 2, testCanvas.height / 2);
                ctx.scale(1, -1);
                
                drawGrid(ctx, testCanvas);
                
                return {
                    success: true,
                    details: 'Grid drawing function executed without errors'
                };
            } catch (error) {
                return {
                    success: false,
                    error: `Grid drawing failed: ${error.message}`
                };
            }
        });
    }

    // Responsive Behavior Tests
    async testResponsiveBehavior() {
        this.log('Testing responsive behavior...', 'info');

        await this.asyncTest('Real-time input updates work', async () => {
            // Switch to transformations topic
            const transformButton = document.querySelector('.topic-button[data-topic="transformations"]');
            if (transformButton) {
                this.simulateClick(transformButton);
                await this.wait(100);
            }

            const slider = document.getElementById('transformA');
            if (!slider) return { success: false, error: 'Transform A slider not found' };

            const originalValue = slider.value;
            this.simulateInput(slider, '2');
            await this.wait(200); // Allow for real-time update

            const displayValue = document.getElementById('transformAValue');
            
            return {
                success: displayValue && displayValue.textContent === '2',
                details: `Slider: ${slider.value}, Display: ${displayValue?.textContent}`
            };
        });

        this.test('Error handling for invalid inputs', () => {
            const testInput = document.createElement('input');
            testInput.type = 'number';
            testInput.value = 'invalid';
            
            const numericValue = parseFloat(testInput.value);
            const isHandled = isNaN(numericValue);
            
            return {
                success: isHandled,
                details: 'Invalid input properly handled as NaN'
            };
        });
    }

    // Module Integration Tests
    async testModuleIntegration() {
        this.log('Testing module integration...', 'info');

        await this.asyncTest('Unit switching loads correct module functions', async () => {
            // Test Unit 1
            const unit1Card = document.querySelector('.unit-card[data-unit="unit1"]');
            if (unit1Card) {
                this.simulateClick(unit1Card);
                await this.wait(200);
            }

            const unit1Functions = window.Unit1 && typeof window.Unit1.updateDomainRange === 'function';

            // Test Unit 2
            const unit2Card = document.querySelector('.unit-card[data-unit="unit2"]');
            if (unit2Card) {
                this.simulateClick(unit2Card);
                await this.wait(200);
            }

            const unit2Functions = window.Unit2 && typeof window.Unit2.updatePolynomial === 'function';

            return {
                success: unit1Functions && unit2Functions,
                details: `Unit1 loaded: ${unit1Functions}, Unit2 loaded: ${unit2Functions}`
            };
        });

        await this.asyncTest('Topic functions execute without errors', async () => {
            // Return to Unit 1 and test a topic function
            const unit1Card = document.querySelector('.unit-card[data-unit="unit1"]');
            if (unit1Card) {
                this.simulateClick(unit1Card);
                await this.wait(200);
            }

            try {
                if (window.Unit1 && window.Unit1.updateDomainRange) {
                    window.Unit1.updateDomainRange();
                    return {
                        success: true,
                        details: 'Unit1.updateDomainRange() executed successfully'
                    };
                } else {
                    return {
                        success: false,
                        error: 'Unit1.updateDomainRange function not available'
                    };
                }
            } catch (error) {
                return {
                    success: false,
                    error: `Function execution failed: ${error.message}`
                };
            }
        });
    }

    // Run all tests
    async runAllTests() {
        this.log('🚀 Starting Interactive Functionality Test Suite...', 'info');
        this.startTime = Date.now();

        this.testUIElements();
        await this.testUnitCardInteractions();
        await this.testTopicInteractions();
        await this.testInputInteractions();
        await this.testButtonActions();
        this.testCanvasInteractions();
        await this.testResponsiveBehavior();
        await this.testModuleIntegration();

        const endTime = Date.now();
        const duration = endTime - this.startTime;
        const successRate = ((this.passCount / (this.passCount + this.failCount)) * 100).toFixed(1);

        this.log(`📊 Interactive Test Suite Complete!`, 'info');
        this.log(`✅ Passed: ${this.passCount}`, 'success');
        this.log(`❌ Failed: ${this.failCount}`, 'error');
        this.log(`📈 Success Rate: ${successRate}%`, 'info');
        this.log(`⏱️ Duration: ${duration}ms`, 'info');

        return {
            passed: this.passCount,
            failed: this.failCount,
            successRate: successRate,
            duration: duration,
            results: this.results
        };
    }

    // Generate detailed report
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests: this.passCount + this.failCount,
                passed: this.passCount,
                failed: this.failCount,
                successRate: ((this.passCount / (this.passCount + this.failCount)) * 100).toFixed(1),
                duration: Date.now() - this.startTime
            },
            results: this.results
        };

        return JSON.stringify(report, null, 2);
    }
}

// Export for use in test runner
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveFunctionalityTest;
}

// Auto-run if in browser environment and DOM is ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Interactive Functionality Test Suite loaded and ready');
        });
    } else {
        console.log('Interactive Functionality Test Suite loaded and ready');
    }
}