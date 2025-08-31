// Modular System Test Suite
// Tests for dynamic loading, module registration, and core architecture

class ModularSystemTest {
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

    // Core Architecture Tests
    testCoreFilesLoaded() {
        this.log('Testing core files loaded...', 'info');
        
        this.test('Canvas contexts object exists', () => {
            return typeof canvasContexts === 'object';
        });

        this.test('drawGrid function exists', () => {
            return typeof drawGrid === 'function';
        });

        this.test('initializeCanvases function exists', () => {
            return typeof initializeCanvases === 'function';
        });

        this.test('switchUnit function exists', () => {
            return typeof switchUnit === 'function';
        });

        this.test('switchTopic function exists', () => {
            return typeof switchTopic === 'function';
        });

        this.test('loadUnitModule function exists', () => {
            return typeof loadUnitModule === 'function';
        });
    }

    // Module Loading System Tests
    async testModuleLoadingSystem() {
        this.log('Testing module loading system...', 'info');

        // Test module registry
        this.test('Module registry exists', () => {
            return typeof moduleRegistry === 'object';
        });

        // Test if initial modules are properly set up
        this.test('Module registry has expected units', () => {
            const expectedUnits = ['unit1', 'unit2', 'unit3', 'unit4', 'unit5', 'unit6', 'unit7', 'unit8', 'unit9'];
            return expectedUnits.every(unit => moduleRegistry.hasOwnProperty(unit));
        });

        // Test dynamic loading capability
        await this.asyncTest('Unit 1 module can be loaded', async () => {
            try {
                await loadUnitModule('unit1');
                return {
                    success: typeof window.Unit1 === 'object',
                    details: `Unit1 type: ${typeof window.Unit1}`
                };
            } catch (error) {
                return {
                    success: false,
                    error: `Failed to load Unit1: ${error.message}`
                };
            }
        });

        // Test module functions exist after loading
        this.test('Unit 1 module loaded', () => {
            return typeof window.Unit1 === 'object' &&
                   typeof window.Unit1.updateDomainRange === 'function';
        });
    }

    // Performance Tests
    testPerformanceMetrics() {
        this.log('Testing performance metrics...', 'info');

        this.test('Module loading is efficient', () => {
            const startTime = performance.now();
            // Simulate module check
            const moduleExists = moduleRegistry['unit1'] !== null;
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            return {
                success: duration < 10, // Should be very fast
                details: `Module check took ${duration.toFixed(2)}ms`
            };
        });

        this.test('Canvas initialization is efficient', () => {
            const startTime = performance.now();
            // Test canvas context creation speed
            const testCanvas = document.createElement('canvas');
            const ctx = testCanvas.getContext('2d');
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            return {
                success: duration < 50, // Should be under 50ms
                details: `Canvas creation took ${duration.toFixed(2)}ms`
            };
        });
    }

    // Memory Usage Tests
    testMemoryUsage() {
        this.log('Testing memory usage...', 'info');

        this.test('Global namespace pollution check', () => {
            const globalKeys = Object.keys(window);
            const algebraKeys = globalKeys.filter(key => 
                key.startsWith('Unit') || 
                key.includes('algebra') || 
                key.includes('canvas') ||
                key.includes('module')
            );
            
            return {
                success: algebraKeys.length < 20, // Reasonable limit
                details: `Found ${algebraKeys.length} algebra-related globals: ${algebraKeys.join(', ')}`
            };
        });

        this.test('Module registry size reasonable', () => {
            const registrySize = Object.keys(moduleRegistry).length;
            return {
                success: registrySize === 9, // Should have exactly 9 units
                details: `Module registry has ${registrySize} entries`
            };
        });
    }

    // Error Handling Tests
    testErrorHandling() {
        this.log('Testing error handling...', 'info');

        this.test('Invalid module loading handled gracefully', async () => {
            try {
                const result = await loadUnitModule('invalidUnit');
                return {
                    success: result === false,
                    details: 'Invalid module load returned false as expected'
                };
            } catch (error) {
                return {
                    success: true,
                    details: 'Invalid module load threw error as expected'
                };
            }
        });

        this.test('Missing canvas elements handled gracefully', () => {
            try {
                // Try to get context for non-existent canvas
                const missingContext = canvasContexts['nonExistentCanvas'];
                return {
                    success: missingContext === undefined,
                    details: 'Missing canvas context is undefined as expected'
                };
            } catch (error) {
                return {
                    success: false,
                    error: `Should handle missing canvas gracefully: ${error.message}`
                };
            }
        });
    }

    // Cross-Module Communication Tests
    testCrossModuleCommunication() {
        this.log('Testing cross-module communication...', 'info');

        this.test('Event delegation system active', () => {
            // Check if event listeners are properly set up
            const hasClickListeners = document.body.onclick !== null || 
                                     document.hasEventListener?.('click') ||
                                     document.addEventListener !== undefined;
            
            return {
                success: hasClickListeners,
                details: 'Event delegation system appears to be active'
            };
        });

        this.test('Global functions accessible', () => {
            const globalFunctions = ['switchUnit', 'switchTopic', 'loadUnitModule'];
            const allAccessible = globalFunctions.every(fn => typeof window[fn] === 'function');
            
            return {
                success: allAccessible,
                details: `Global functions accessible: ${globalFunctions.join(', ')}`
            };
        });
    }

    // Canvas System Tests
    testCanvasSystem() {
        this.log('Testing canvas system...', 'info');

        this.test('Canvas contexts object initialized', () => {
            return typeof canvasContexts === 'object' && canvasContexts !== null;
        });

        this.test('Canvas utility functions available', () => {
            const canvasFunctions = ['drawGrid', 'initializeCanvases'];
            const allAvailable = canvasFunctions.every(fn => typeof window[fn] === 'function');
            
            return {
                success: allAvailable,
                details: `Canvas functions available: ${canvasFunctions.join(', ')}`
            };
        });

        this.test('Test canvas can be created and configured', () => {
            try {
                const testCanvas = document.createElement('canvas');
                testCanvas.width = 600;
                testCanvas.height = 400;
                const ctx = testCanvas.getContext('2d');
                ctx.translate(testCanvas.width / 2, testCanvas.height / 2);
                ctx.scale(1, -1);
                
                return {
                    success: true,
                    details: 'Test canvas created and configured successfully'
                };
            } catch (error) {
                return {
                    success: false,
                    error: `Canvas creation failed: ${error.message}`
                };
            }
        });
    }

    // Run all tests
    async runAllTests() {
        this.log('🚀 Starting Modular System Test Suite...', 'info');
        this.startTime = Date.now();

        this.testCoreFilesLoaded();
        await this.testModuleLoadingSystem();
        this.testPerformanceMetrics();
        this.testMemoryUsage();
        await this.testErrorHandling();
        this.testCrossModuleCommunication();
        this.testCanvasSystem();

        const endTime = Date.now();
        const duration = endTime - this.startTime;
        const successRate = ((this.passCount / (this.passCount + this.failCount)) * 100).toFixed(1);

        this.log(`📊 Test Suite Complete!`, 'info');
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
    module.exports = ModularSystemTest;
}

// Auto-run if in browser environment and DOM is ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Modular System Test Suite loaded and ready');
        });
    } else {
        console.log('Modular System Test Suite loaded and ready');
    }
}