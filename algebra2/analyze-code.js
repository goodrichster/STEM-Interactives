#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class Algebra2CodeAnalyzer {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.suggestions = [];
        this.metrics = {
            totalLines: 0,
            functionCount: 0,
            commentLines: 0,
            complexity: 0
        };
    }

    analyzeFile(filePath) {
        console.log('🔍 Algebra2 Code Quality Analysis');
        console.log('=' .repeat(50));
        
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            this.analyzeContent(content);
            this.generateReport();
        } catch (error) {
            console.error(`❌ Error reading file: ${error.message}`);
            return false;
        }
    }

    analyzeContent(content) {
        const lines = content.split('\n');
        this.metrics.totalLines = lines.length;
        
        // Analyze structure and patterns
        this.checkSyntaxPatterns(content);
        this.checkFunctionDefinitions(content);
        this.checkCommentCoverage(lines);
        this.checkCodeComplexity(content);
        this.checkEducationalStandards(content);
        this.checkErrorHandling(content);
        this.checkInteractivity(content);
    }

    checkSyntaxPatterns(content) {
        console.log('\n📋 Syntax Pattern Analysis');
        
        // Check for common syntax issues
        const openBraces = (content.match(/{/g) || []).length;
        const closeBraces = (content.match(/}/g) || []).length;
        
        if (openBraces !== closeBraces) {
            this.issues.push(`Brace mismatch: ${openBraces} opening vs ${closeBraces} closing braces`);
            console.log('  ❌ Brace mismatch detected');
        } else {
            console.log('  ✅ Brace matching correct');
        }

        // Check for semicolon usage
        const missingSemicolons = content.match(/\n\s*[^\/\*\s}][^;{]*[^;}]\s*\n/g);
        if (missingSemicolons && missingSemicolons.length > 10) {
            this.warnings.push('Inconsistent semicolon usage detected');
            console.log('  ⚠️  Inconsistent semicolon usage');
        } else {
            console.log('  ✅ Semicolon usage looks good');
        }

        // Check for proper variable declarations
        const varDeclarations = (content.match(/\bvar\s+/g) || []).length;
        const letDeclarations = (content.match(/\blet\s+/g) || []).length;
        const constDeclarations = (content.match(/\bconst\s+/g) || []).length;
        
        if (varDeclarations > 0) {
            this.suggestions.push('Consider using let/const instead of var for better scoping');
            console.log(`  💡 Found ${varDeclarations} var declarations - consider modern alternatives`);
        }
        
        console.log(`  📊 Variable declarations: let(${letDeclarations}), const(${constDeclarations}), var(${varDeclarations})`);
    }

    checkFunctionDefinitions(content) {
        console.log('\n🔧 Function Analysis');
        
        const functionPattern = /function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
        const functions = [];
        let match;
        
        while ((match = functionPattern.exec(content)) !== null) {
            functions.push(match[1]);
        }
        
        this.metrics.functionCount = functions.length;
        console.log(`  📊 Total functions found: ${functions.length}`);
        
        // Check for expected key functions
        const expectedFunctions = [
            'switchUnit', 'switchTopic', 'initializeCanvases', 'drawGrid',
            'updateDomainRange', 'updateCharacteristics', 'updateTransformations',
            'updateComplexPlane', 'updateQuadraticFormula', 'updateSystemsGraph',
            'updatePolynomial', 'updateOperations', 'updateFactoring',
            'updateDivision', 'updateEquations', 'updateRationalExp',
            'updateRadical', 'updateInverse', 'updateRadicalEq',
            'updateExponential', 'updateLogarithmic', 'updateExpEq',
            'updateLogEq', 'updateApplications', 'updateRationalFunc',
            'updateArithmetic', 'updateUnitCircle', 'updateProbability',
            'updateDistribution'
        ];
        
        const missingFunctions = expectedFunctions.filter(fn => !functions.includes(fn));
        
        if (missingFunctions.length === 0) {
            console.log('  ✅ All expected core functions present');
        } else {
            console.log('  ⚠️  Missing functions:');
            missingFunctions.forEach(fn => {
                console.log(`    - ${fn}`);
                this.issues.push(`Missing function: ${fn}`);
            });
        }
        
        // Check for function length (complexity indicator)
        const longFunctions = this.findLongFunctions(content);
        if (longFunctions.length > 0) {
            console.log(`  💡 Functions over 50 lines (${longFunctions.length}): Consider breaking down`);
            longFunctions.forEach(fn => {
                this.suggestions.push(`Function '${fn.name}' is ${fn.lines} lines - consider refactoring`);
            });
        }
    }

    findLongFunctions(content) {
        const lines = content.split('\n');
        const longFunctions = [];
        let currentFunction = null;
        let braceDepth = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const functionMatch = line.match(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
            
            if (functionMatch && braceDepth === 0) {
                currentFunction = {
                    name: functionMatch[1],
                    startLine: i,
                    endLine: null
                };
            }
            
            const openBraces = (line.match(/{/g) || []).length;
            const closeBraces = (line.match(/}/g) || []).length;
            braceDepth += openBraces - closeBraces;
            
            if (currentFunction && braceDepth === 0 && openBraces === 0 && closeBraces > 0) {
                currentFunction.endLine = i;
                currentFunction.lines = currentFunction.endLine - currentFunction.startLine + 1;
                
                if (currentFunction.lines > 50) {
                    longFunctions.push(currentFunction);
                }
                currentFunction = null;
            }
        }
        
        return longFunctions;
    }

    checkCommentCoverage(lines) {
        console.log('\n📝 Documentation Analysis');
        
        const commentLines = lines.filter(line => {
            const trimmed = line.trim();
            return trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
        });
        
        this.metrics.commentLines = commentLines.length;
        const commentRatio = (commentLines.length / lines.length * 100).toFixed(1);
        
        console.log(`  📊 Comment coverage: ${commentRatio}% (${commentLines.length}/${lines.length} lines)`);
        
        if (commentRatio < 10) {
            this.suggestions.push('Consider adding more comments for better code documentation');
            console.log('  💡 Low comment coverage - consider adding more documentation');
        } else if (commentRatio > 30) {
            console.log('  ✅ Good documentation coverage');
        } else {
            console.log('  ✅ Adequate documentation');
        }
    }

    checkCodeComplexity(content) {
        console.log('\n🧮 Complexity Analysis');
        
        // Count control structures as complexity indicators
        const ifStatements = (content.match(/\bif\s*\(/g) || []).length;
        const forLoops = (content.match(/\bfor\s*\(/g) || []).length;
        const whileLoops = (content.match(/\bwhile\s*\(/g) || []).length;
        const switchStatements = (content.match(/\bswitch\s*\(/g) || []).length;
        const tryBlocks = (content.match(/\btry\s*{/g) || []).length;
        
        const totalComplexity = ifStatements + forLoops + whileLoops + switchStatements + tryBlocks;
        this.metrics.complexity = totalComplexity;
        
        console.log(`  📊 Control structures: if(${ifStatements}), for(${forLoops}), while(${whileLoops}), switch(${switchStatements}), try(${tryBlocks})`);
        console.log(`  📊 Total complexity score: ${totalComplexity}`);
        
        if (totalComplexity > 200) {
            this.suggestions.push('High complexity detected - consider refactoring into smaller functions');
            console.log('  💡 High complexity - consider modularization');
        } else {
            console.log('  ✅ Manageable complexity level');
        }
    }

    checkEducationalStandards(content) {
        console.log('\n🎓 Educational Standards Analysis');
        
        // Check for mathematical accuracy patterns
        const mathFunctions = ['Math.sin', 'Math.cos', 'Math.sqrt', 'Math.log', 'Math.pow'];
        const mathUsage = mathFunctions.filter(fn => content.includes(fn));
        
        console.log(`  📊 Mathematical functions used: ${mathUsage.length}/5`);
        if (mathUsage.length >= 4) {
            console.log('  ✅ Good mathematical function coverage');
        } else {
            console.log('  💡 Limited mathematical function usage');
        }
        
        // Check for interactive elements
        const interactiveElements = ['getElementById', 'innerHTML', 'addEventListener'];
        const interactivity = interactiveElements.filter(element => content.includes(element));
        
        console.log(`  📊 Interactive features: ${interactivity.length}/3`);
        if (interactivity.length >= 2) {
            console.log('  ✅ Good interactivity implementation');
        } else {
            this.warnings.push('Limited interactivity detected');
            console.log('  ⚠️  Limited interactivity features');
        }
        
        // Check for educational content patterns
        const educationalKeywords = ['analyze', 'calculate', 'solve', 'graph', 'domain', 'range'];
        const eduContent = educationalKeywords.filter(keyword => content.toLowerCase().includes(keyword));
        
        console.log(`  📊 Educational keywords: ${eduContent.length}/6`);
        if (eduContent.length >= 4) {
            console.log('  ✅ Strong educational content alignment');
        } else {
            this.suggestions.push('Consider adding more educational terminology and explanations');
        }
    }

    checkErrorHandling(content) {
        console.log('\n🛡️ Error Handling Analysis');
        
        const tryBlocks = (content.match(/try\s*{/g) || []).length;
        const catchBlocks = (content.match(/catch\s*\(/g) || []).length;
        const errorChecks = (content.match(/if\s*\([^)]*(!|===\s*null|===\s*undefined)/g) || []).length;
        
        console.log(`  📊 Error handling: try/catch(${tryBlocks}/${catchBlocks}), null checks(${errorChecks})`);
        
        if (tryBlocks === 0 && errorChecks < 5) {
            this.suggestions.push('Consider adding more error handling for robust user experience');
            console.log('  💡 Limited error handling - consider adding more safeguards');
        } else {
            console.log('  ✅ Adequate error handling present');
        }
    }

    checkInteractivity(content) {
        console.log('\n🎨 Interactivity Analysis');
        
        // Check for canvas usage
        const canvasUsage = content.includes('getContext') && content.includes('canvas');
        const domManipulation = content.includes('getElementById') || content.includes('querySelector');
        const eventHandling = content.includes('addEventListener') || content.includes('onclick');
        
        console.log(`  📊 Canvas graphics: ${canvasUsage ? '✅' : '❌'}`);
        console.log(`  📊 DOM manipulation: ${domManipulation ? '✅' : '❌'}`);
        console.log(`  📊 Event handling: ${eventHandling ? '✅' : '❌'}`);
        
        if (canvasUsage && domManipulation && eventHandling) {
            console.log('  ✅ Full interactivity stack implemented');
        } else {
            this.warnings.push('Incomplete interactivity implementation');
        }
    }

    generateReport() {
        console.log('\n' + '='.repeat(50));
        console.log('📊 COMPREHENSIVE CODE QUALITY REPORT');
        console.log('='.repeat(50));
        
        // Overall metrics
        console.log('\n📈 Code Metrics:');
        console.log(`  • Total Lines: ${this.metrics.totalLines}`);
        console.log(`  • Functions: ${this.metrics.functionCount}`);
        console.log(`  • Comment Coverage: ${(this.metrics.commentLines / this.metrics.totalLines * 100).toFixed(1)}%`);
        console.log(`  • Complexity Score: ${this.metrics.complexity}`);
        
        // Quality assessment
        const totalIssues = this.issues.length + this.warnings.length;
        let qualityRating;
        
        if (totalIssues === 0) {
            qualityRating = '🏆 EXCELLENT';
        } else if (totalIssues <= 3) {
            qualityRating = '✅ GOOD';
        } else if (totalIssues <= 7) {
            qualityRating = '⚠️ FAIR';
        } else {
            qualityRating = '❌ NEEDS IMPROVEMENT';
        }
        
        console.log(`\n🎯 Overall Quality: ${qualityRating}`);
        
        // Issues
        if (this.issues.length > 0) {
            console.log('\n❌ Critical Issues:');
            this.issues.forEach(issue => console.log(`  • ${issue}`));
        }
        
        if (this.warnings.length > 0) {
            console.log('\n⚠️ Warnings:');
            this.warnings.forEach(warning => console.log(`  • ${warning}`));
        }
        
        if (this.suggestions.length > 0) {
            console.log('\n💡 Suggestions:');
            this.suggestions.forEach(suggestion => console.log(`  • ${suggestion}`));
        }
        
        // Recommendations
        console.log('\n🎯 Recommendations:');
        
        if (totalIssues === 0) {
            console.log('  ✅ Code quality is excellent');
            console.log('  ✅ All expected functions are present');
            console.log('  ✅ Ready for production use');
            console.log('  🔄 Test interactivity in browser environment');
        } else {
            console.log('  🔧 Address critical issues first');
            console.log('  📝 Review warnings and apply fixes');
            console.log('  💪 Implement suggested improvements');
            console.log('  🧪 Run comprehensive testing');
        }
        
        console.log('\n🚀 Next Steps:');
        console.log('  1. Open test-algebra2.html in browser');
        console.log('  2. Run comprehensive function tests');
        console.log('  3. Test all 9 units interactively');
        console.log('  4. Verify mathematical accuracy');
        console.log('  5. Check responsiveness and UX');
        
        return {
            quality: qualityRating,
            metrics: this.metrics,
            issues: this.issues.length,
            warnings: this.warnings.length,
            suggestions: this.suggestions.length
        };
    }
}

// Run analysis
const analyzer = new Algebra2CodeAnalyzer();
const filePath = path.join(__dirname, 'algebra2.js');
analyzer.analyzeFile(filePath);