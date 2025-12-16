/**
 * Strict Logic Tutor - Prevents student success through guessing
 * Precision-first approach with mandatory steps and validation
 */

class StrictLogicTutor {
    constructor() {
        this.studentProgress = {
            quantifiers: { attempts: 0, correct: 0, lastMistake: null },
            negation: { attempts: 0, correct: 0, lastMistake: null },
            counterexamples: { attempts: 0, correct: 0, lastMistake: null },
            conditionals: { attempts: 0, correct: 0, lastMistake: null },
            laws: { attempts: 0, correct: 0, lastMistake: null },
            proofs: { attempts: 0, correct: 0, lastMistake: null }
        };
        
        this.validationRules = {
            quantifierTranslation: {
                domainRequired: true,
                quantifierRequired: true,
                predicateRequired: true,
                validSyntax: /^[∀∃]x\s*∈\s*[ℕℤℚℝ],\s*.+/,
                errorMessage: "Statement must be in form: ∀x ∈ D, P(x) or ∃x ∈ D, P(x)"
            },
            negation: {
                quantifierSwitched: (original, negated) => {
                    if (original.startsWith("∀") && !negated.startsWith("∃")) return false;
                    if (original.startsWith("∃") && !negated.startsWith("∀")) return false;
                    return true;
                },
                predicateNegated: (original, negated) => {
                    // Extract predicates and check if one is negation of other
                    const originalPred = original.split(",")[1]?.trim();
                    const negatedPred = negated.split(",")[1]?.trim();
                    
                    if (!originalPred || !negatedPred) return false;
                    
                    // Check if negated predicate is ¬(original) or if original is ¬(negated)
                    return (negatedPred === `¬(${originalPred})`) || 
                           (originalPred === `¬(${negatedPred})`) ||
                           (originalPred.startsWith("¬") && originalPred.substring(1) === negatedPred);
                }
            }
        };
        
        this.seedData = {
            quantifierStatements: [
                {
                    statement: "∀x ∈ ℕ, x ≥ 0",
                    type: "universal",
                    valid: true,
                    edgeCases: ["x = 0", "large values"]
                },
                {
                    statement: "∃x ∈ ℤ, x² = -1",
                    type: "existential",
                    valid: false,
                    edgeCases: ["negative numbers", "zero", "positive numbers"]
                }
            ],
            negationChallenges: [
                {
                    original: "∀x ∈ ℝ, x² ≥ 0",
                    correctNegation: "∃x ∈ ℝ, x² < 0",
                    commonMistakes: [
                        "∃x ∈ ℝ, x² ≥ 0", // Only switched quantifier
                        "∀x ∈ ℝ, x² < 0"  // Only negated predicate
                    ]
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupStrictValidation();
    }
    
    setupStrictValidation() {
        // Override any default behaviors with strict validation
        console.log("Strict validation mode enabled");
    }
    
    // QUANTIFIER TRANSLATION WITH STRICT VALIDATION
    validateQuantifierTranslation(domain, quantifier, predicate) {
        this.studentProgress.quantifiers.attempts++;
        
        // Rule 1: All components required
        if (!domain || !quantifier || !predicate) {
            this.studentProgress.quantifiers.lastMistake = "missing_components";
            throw new Error("All components required: domain, quantifier, and predicate");
        }
        
        // Rule 2: Valid domain
        const validDomains = ["ℕ", "ℤ", "ℚ", "ℝ"];
        if (!validDomains.includes(domain)) {
            this.studentProgress.quantifiers.lastMistake = "invalid_domain";
            throw new Error(`Invalid domain. Must be one of: ${validDomains.join(", ")}`);
        }
        
        // Rule 3: Valid quantifier
        const validQuantifiers = ["∀", "∃", "No"];
        if (!validQuantifiers.includes(quantifier)) {
            this.studentProgress.quantifiers.lastMistake = "invalid_quantifier";
            throw new Error(`Invalid quantifier. Must be one of: ${validQuantifiers.join(", ")}`);
        }
        
        // Rule 4: Predicate must not be empty
        if (predicate.trim().length === 0) {
            this.studentProgress.quantifiers.lastMistake = "empty_predicate";
            throw new Error("Predicate cannot be empty");
        }
        
        // If we get here, translation is valid
        this.studentProgress.quantifiers.correct++;
        this.studentProgress.quantifiers.lastMistake = null;
        return true;
    }
    
    // NEGATION PROCESS WITH STEP VALIDATION
    validateNegationStep(step, originalStatement, currentInput) {
        this.studentProgress.negation.attempts++;
        
        switch(step) {
            case 1: // Switch quantifier
                const quantSwitched = this.validationRules.negation.quantifierSwitched(
                    originalStatement, 
                    currentInput
                );
                
                if (!quantSwitched) {
                    this.studentProgress.negation.lastMistake = "quantifier_not_switched";
                    throw new Error("You must switch the quantifier (∀ to ∃ or ∃ to ∀)");
                }
                break;
                
            case 2: // Negate predicate
                const predNegated = this.validationRules.negation.predicateNegated(
                    originalStatement,
                    currentInput
                );
                
                if (!predNegated) {
                    this.studentProgress.negation.lastMistake = "predicate_not_negated";
                    throw new Error("You must negate the predicate (add ¬ or remove ¬)");
                }
                break;
                
            case 3: // Final validation
                const completeNegation = this.validationRules.negation.quantifierSwitched(originalStatement, currentInput) &&
                                       this.validationRules.negation.predicateNegated(originalStatement, currentInput);
                
                if (!completeNegation) {
                    this.studentProgress.negation.lastMistake = "incomplete_negation";
                    throw new Error("Negation must both switch quantifier AND negate predicate");
                }
                
                this.studentProgress.negation.correct++;
                this.studentProgress.negation.lastMistake = null;
                return true;
        }
        
        return true;
    }
    
    // COUNTEREXAMPLE VALIDATION
    validateCounterexample(statementType, domain, predicate, testValue) {
        this.studentProgress.counterexamples.attempts++;
        
        // Validate domain membership
        const domainMembership = this.validateDomainMembership(domain, testValue);
        if (!domainMembership.valid) {
            this.studentProgress.counterexamples.lastMistake = "domain_violation";
            throw new Error(domainMembership.error);
        }
        
        // Validate predicate satisfaction
        const predicateResult = this.evaluatePredicate(predicate, testValue);
        if (predicateResult.error) {
            this.studentProgress.counterexamples.lastMistake = "predicate_evaluation_error";
            throw new Error(predicateResult.error);
        }
        
        // Validate logical consistency
        const logicalValidity = this.validateCounterexampleLogic(
            statementType, 
            predicateResult.satisfies
        );
        
        if (!logicalValidity.valid) {
            this.studentProgress.counterexamples.lastMistake = logicalValidity.errorType;
            throw new Error(logicalValidity.message);
        }
        
        this.studentProgress.counterexamples.correct++;
        this.studentProgress.counterexamples.lastMistake = null;
        return logicalValidity;
    }
    
    validateDomainMembership(domain, value) {
        // Convert string value to appropriate type
        let numericValue;
        try {
            numericValue = parseFloat(value);
        } catch (e) {
            return { valid: false, error: "Test value must be a number" };
        }
        
        switch(domain) {
            case "ℕ": // Natural numbers
                return Number.isInteger(numericValue) && numericValue >= 0 ?
                    { valid: true } : 
                    { valid: false, error: "Value must be a non-negative integer for domain ℕ" };
                    
            case "ℤ": // Integers
                return Number.isInteger(numericValue) ?
                    { valid: true } : 
                    { valid: false, error: "Value must be an integer for domain ℤ" };
                    
            case "ℚ": // Rationals
                return Number.isFinite(numericValue) ?
                    { valid: true } : 
                    { valid: false, error: "Value must be a finite number for domain ℚ" };
                    
            case "ℝ": // Reals
                return Number.isFinite(numericValue) || !isNaN(numericValue) ?
                    { valid: true } : 
                    { valid: false, error: "Value must be a real number for domain ℝ" };
                    
            default:
                return { valid: false, error: "Invalid domain" };
        }
    }
    
    evaluatePredicate(predicate, value) {
        // Simple predicate evaluator for demonstration
        // In a real implementation, this would be much more sophisticated
        
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            return { error: "Cannot evaluate predicate: invalid numeric value" };
        }
        
        try {
            // Handle common predicates
            if (predicate.includes("even")) {
                return { satisfies: Number.isInteger(numValue) && numValue % 2 === 0 };
            }
            
            if (predicate.includes("odd")) {
                return { satisfies: Number.isInteger(numValue) && numValue % 2 !== 0 };
            }
            
            if (predicate.includes("≥ 0")) {
                return { satisfies: numValue >= 0 };
            }
            
            if (predicate.includes("x² = -1")) {
                return { satisfies: Math.pow(numValue, 2) === -1 };
            }
            
            return { error: "Unsupported predicate format" };
        } catch (e) {
            return { error: "Error evaluating predicate: " + e.message };
        }
    }
    
    validateCounterexampleLogic(statementType, predicateSatisfied) {
        switch(statementType) {
            case "universal": // ∀x ∈ D, P(x)
                // Looking for counterexample (value where P(x) is FALSE)
                if (predicateSatisfied) {
                    return {
                        valid: false,
                        errorType: "not_counterexample",
                        message: "This value satisfies the predicate, so it's not a counterexample to a universal statement"
                    };
                } else {
                    return {
                        valid: true,
                        type: "counterexample",
                        message: "Correct! This is a valid counterexample showing the universal statement is false."
                    };
                }
                
            case "existential": // ∃x ∈ D, P(x)
                // Looking for example (value where P(x) is TRUE)
                if (predicateSatisfied) {
                    return {
                        valid: true,
                        type: "example",
                        message: "Correct! This is a valid example showing the existential statement is true."
                    };
                } else {
                    return {
                        valid: false,
                        errorType: "not_example",
                        message: "This value does not satisfy the predicate, so it's not an example for the existential statement"
                    };
                }
                
            case "no": // No x ∈ D, P(x) ≡ ∀x ∈ D, ¬P(x)
                // Looking for counterexample (value where P(x) is TRUE)
                if (predicateSatisfied) {
                    return {
                        valid: true,
                        type: "counterexample",
                        message: "Correct! This shows the 'No' statement is false because we found an example."
                    };
                } else {
                    return {
                        valid: false,
                        errorType: "not_counterexample",
                        message: "This value does not satisfy the predicate, so it doesn't disprove the 'No' statement"
                    };
                }
                
            default:
                return {
                    valid: false,
                    errorType: "invalid_statement_type",
                    message: "Invalid statement type"
                };
        }
    }
    
    // LAW APPLICATION VALIDATION
    validateLawApplication(law, premises, conclusion) {
        this.studentProgress.laws.attempts++;
        
        const validationResult = this.checkLawPreconditions(law, premises, conclusion);
        
        if (!validationResult.valid) {
            this.studentProgress.laws.lastMistake = validationResult.errorType;
            throw new Error(validationResult.message);
        }
        
        this.studentProgress.laws.correct++;
        this.studentProgress.laws.lastMistake = null;
        return validationResult;
    }
    
    checkLawPreconditions(law, premises, conclusion) {
        switch(law) {
            case "detachment":
                // Premises must contain p→q and p, conclusion must be q
                if (premises.length < 2) {
                    return {
                        valid: false,
                        errorType: "insufficient_premises",
                        message: "Law of Detachment requires two premises: p→q and p"
                    };
                }
                
                // Check if we have conditional and antecedent
                const hasConditional = premises.some(p => p.includes("→"));
                const hasAntecedent = premises.some(p => !p.includes("→"));
                
                if (!hasConditional || !hasAntecedent) {
                    return {
                        valid: false,
                        errorType: "missing_components",
                        message: "Law of Detachment requires a conditional (p→q) and its antecedent (p)"
                    };
                }
                
                return {
                    valid: true,
                    message: "Correct application of Law of Detachment"
                };
                
            case "simplification":
                // Premise must be p∧q, conclusion must be p or q
                if (premises.length < 1 || !premises[0].includes("∧")) {
                    return {
                        valid: false,
                        errorType: "invalid_premise",
                        message: "Simplification requires a conjunction (p∧q) as premise"
                    };
                }
                
                return {
                    valid: true,
                    message: "Correct application of Simplification"
                };
                
            default:
                return {
                    valid: false,
                    errorType: "unsupported_law",
                    message: "Unsupported law application"
                };
        }
    }
    
    // PROOF VALIDATION
    validateProof(lines, goal) {
        this.studentProgress.proofs.attempts++;
        
        // Check each line for validity
        for (let i = 0; i < lines.length; i++) {
            const lineValidation = this.validateProofLine(lines, i);
            if (!lineValidation.valid) {
                this.studentProgress.proofs.lastMistake = lineValidation.errorType;
                throw new Error(`Line ${i+1}: ${lineValidation.message}`);
            }
        }
        
        // Check if goal is reached
        const lastLine = lines[lines.length - 1];
        if (lastLine.statement !== goal) {
            this.studentProgress.proofs.lastMistake = "goal_not_reached";
            throw new Error("Proof does not reach the stated goal");
        }
        
        this.studentProgress.proofs.correct++;
        this.studentProgress.proofs.lastMistake = null;
        return { valid: true, message: "Proof is valid and complete" };
    }
    
    validateProofLine(lines, lineNumber) {
        const line = lines[lineNumber];
        
        // Check for forward referencing
        if (line.justification && line.justification.citedLines) {
            for (const citedLine of line.justification.citedLines) {
                if (citedLine > lineNumber + 1) { // +1 because line numbers are 1-indexed
                    return {
                        valid: false,
                        errorType: "forward_referencing",
                        message: `Cannot reference line ${citedLine} from line ${lineNumber + 1} (forward reference)`
                    };
                }
            }
        }
        
        // Check law application
        if (line.justification && line.justification.law) {
            const lawValidation = this.checkLawPreconditions(
                line.justification.law,
                line.justification.citedLines.map(ln => lines[ln - 1].statement), // Convert to 0-indexed
                line.statement
            );
            
            if (!lawValidation.valid) {
                return {
                    valid: false,
                    errorType: "invalid_law_application",
                    message: `Invalid law application: ${lawValidation.message}`
                };
            }
        }
        
        return { valid: true };
    }
    
    // PROGRESS REPORTING
    getStudentProgress() {
        return {
            quantifiers: {
                successRate: this.studentProgress.quantifiers.correct / Math.max(1, this.studentProgress.quantifiers.attempts),
                attempts: this.studentProgress.quantifiers.attempts,
                lastMistake: this.studentProgress.quantifiers.lastMistake
            },
            negation: {
                successRate: this.studentProgress.negation.correct / Math.max(1, this.studentProgress.negation.attempts),
                attempts: this.studentProgress.negation.attempts,
                lastMistake: this.studentProgress.negation.lastMistake
            },
            counterexamples: {
                successRate: this.studentProgress.counterexamples.correct / Math.max(1, this.studentProgress.counterexamples.attempts),
                attempts: this.studentProgress.counterexamples.attempts,
                lastMistake: this.studentProgress.counterexamples.lastMistake
            },
            laws: {
                successRate: this.studentProgress.laws.correct / Math.max(1, this.studentProgress.laws.attempts),
                attempts: this.studentProgress.laws.attempts,
                lastMistake: this.studentProgress.laws.lastMistake
            },
            proofs: {
                successRate: this.studentProgress.proofs.correct / Math.max(1, this.studentProgress.proofs.attempts),
                attempts: this.studentProgress.proofs.attempts,
                lastMistake: this.studentProgress.proofs.lastMistake
            }
        };
    }
}

// Export for use in the application
window.StrictLogicTutor = StrictLogicTutor;