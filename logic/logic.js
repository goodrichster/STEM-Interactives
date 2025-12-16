/**
 * Logic Tutor for High School Discrete Math
 * Comprehensive educational tool covering quantifiers, negation, conditionals, logical equivalence, and proofs
 * Following modern JavaScript practices with exact mathematical representations
 */

// Import strict validation system
// import StrictLogicTutor from './strict-logic.js';  // Using global reference instead

class LogicTutor {
    constructor() {
        // Initialize strict validation system
        this.strictValidator = new StrictLogicTutor();
        
        this.currentModule = 'quantifiers';
        this.quantifiers = {
            domain: null,
            quantifier: null,
            predicate: ''
        };
        this.negation = {
            originalStatement: '',
            step: 0,
            switchedQuantifier: '',
            negatedPredicate: '',
            finalResult: ''
        };
        this.counterexample = {
            statementType: 'universal',
            domain: 'ℕ',
            statement: '',
            testValue: '',
            isValid: null
        };
        this.conditionals = {
            type: 'conditional',
            firstStatement: '',
            secondStatement: '',
            isEquivalent: false
        };
        this.laws = {
            premises: [],
            goal: '',
            selectedLaw: null,
            appliedLaws: []
        };
        this.proofs = {
            lines: [{ statement: '', reason: '' }],
            goal: '',
            isValid: false
        };
        this.flashcards = [
            // Foundational Vocabulary & Symbols
            {
                id: 1,
                front: "What is a proposition?",
                back: "A statement that is either true or false, but not both.",
                category: "foundational",
                type: "definition"
            },
            {
                id: 2,
                front: "What are the truth values?",
                back: "T = true, F = false",
                category: "foundational",
                type: "definition"
            },
            {
                id: 3,
                front: "What is negation (¬p)?",
                back: "The opposite truth value of proposition p.",
                category: "foundational",
                type: "definition"
            },
            {
                id: 4,
                front: "What is conjunction (p ∧ q)?",
                back: "'p and q' - True when both p and q are true.",
                category: "foundational",
                type: "definition"
            },
            {
                id: 5,
                front: "What is disjunction (p ∨ q)?",
                back: "'p or q' (inclusive OR) - True when p is true, q is true, or both are true.",
                category: "foundational",
                type: "definition"
            },
            {
                id: 6,
                front: "What is exclusive OR (XOR)?",
                back: "Symbolic form: (p ∨ q) ∧ ¬(p ∧ q) - True when exactly one of p or q is true.",
                category: "foundational",
                type: "definition"
            },
            {
                id: 7,
                front: "What is a truth table?",
                back: "A table that shows the truth value of a compound statement for all possible truth values of its components.",
                category: "foundational",
                type: "definition"
            },
            
            // Law of Disjunctive Inference
            {
                id: 8,
                front: "What is the Law of Disjunctive Inference (Form 1)?",
                back: "Given: p ∨ q, Given: ¬p, Conclude: q",
                category: "ldi",
                type: "definition"
            },
            {
                id: 9,
                front: "What is the Law of Disjunctive Inference (Form 2)?",
                back: "Given: p ∨ q, Given: ¬q, Conclude: p",
                category: "ldi",
                type: "definition"
            },
            {
                id: 10,
                front: "What is the purpose of LDI?",
                back: "Eliminates one option in a disjunction to conclude the other.",
                category: "ldi",
                type: "purpose"
            },
            
            // Conditional Statements
            {
                id: 11,
                front: "What is a conditional (p → q)?",
                back: "'If p, then q' - False only when p is true and q is false.",
                category: "conditionals",
                type: "definition"
            },
            {
                id: 12,
                front: "What is the hypothesis in p → q?",
                back: "The 'if' part of a conditional (p in p → q)",
                category: "conditionals",
                type: "definition"
            },
            {
                id: 13,
                front: "What is the conclusion in p → q?",
                back: "The 'then' part of a conditional (q in p → q)",
                category: "conditionals",
                type: "definition"
            },
            {
                id: 14,
                front: "When is p → q false?",
                back: "Only when p is true and q is false. Otherwise, it is true.",
                category: "conditionals",
                type: "rule"
            },
            {
                id: 15,
                front: "What is a biconditional (p ↔ q)?",
                back: "'p if and only if q' - True when p and q have the same truth value.",
                category: "conditionals",
                type: "definition"
            },
            
            // Law of Detachment
            {
                id: 16,
                front: "What is the Law of Detachment?",
                back: "Given: p → q, Given: p, Conclude: q",
                category: "detachment",
                type: "definition"
            },
            {
                id: 17,
                front: "What is the purpose of the Law of Detachment?",
                back: "Allows you to apply a conditional once its hypothesis is known to be true.",
                category: "detachment",
                type: "purpose"
            },
            
            // Law of Contrapositive
            {
                id: 18,
                front: "What is the contrapositive of p → q?",
                back: "¬q → ¬p",
                category: "contrapositive",
                type: "definition"
            },
            {
                id: 19,
                front: "What is the Law of Contrapositive?",
                back: "A conditional statement is logically equivalent to its contrapositive. p → q ≡ ¬q → ¬p",
                category: "contrapositive",
                type: "law"
            },
            {
                id: 20,
                front: "What is logical equivalence?",
                back: "Two statements that have identical truth tables.",
                category: "contrapositive",
                type: "definition"
            },
            
            // De Morgan's Laws
            {
                id: 21,
                front: "What is De Morgan's Law 1?",
                back: "¬(p ∧ q) ≡ ¬p ∨ ¬q",
                category: "demorgan",
                type: "law"
            },
            {
                id: 22,
                front: "What is De Morgan's Law 2?",
                back: "¬(p ∨ q) ≡ ¬p ∧ ¬q",
                category: "demorgan",
                type: "law"
            },
            {
                id: 23,
                front: "What is the purpose of De Morgan's Laws?",
                back: "Used when negating compound statements.",
                category: "demorgan",
                type: "purpose"
            },
            
            // Quantifiers
            {
                id: 24,
                front: "What is the universal quantifier (∀)?",
                back: "'for all' - Applied to every element in a domain.",
                category: "quantifiers",
                type: "definition"
            },
            {
                id: 25,
                front: "What is the existential quantifier (∃)?",
                back: "'there exists' - At least one element in a domain satisfies the condition.",
                category: "quantifiers",
                type: "definition"
            },
            {
                id: 26,
                front: "How to translate 'All A are B'?",
                back: "∀x (A(x) → B(x))",
                category: "quantifiers",
                type: "translation"
            },
            {
                id: 27,
                front: "How to translate 'Some A are B'?",
                back: "∃x (A(x) ∧ B(x))",
                category: "quantifiers",
                type: "translation"
            },
            
            // Negation of Quantified Statements
            {
                id: 28,
                front: "What is ¬(∀x P(x)) equivalent to?",
                back: "∃x ¬P(x)",
                category: "negation-quantifiers",
                type: "law"
            },
            {
                id: 29,
                front: "What is ¬(∃x P(x)) equivalent to?",
                back: "∀x ¬P(x)",
                category: "negation-quantifiers",
                type: "law"
            },
            {
                id: 30,
                front: "How to negate 'All' statements in English?",
                back: "'There exists at least one … not'",
                category: "negation-quantifiers",
                type: "english"
            },
            {
                id: 31,
                front: "How to negate 'Some' statements in English?",
                back: "'All … not'",
                category: "negation-quantifiers",
                type: "english"
            },
            
            // Proof Structures
            {
                id: 32,
                front: "What are the components of a two-column proof?",
                back: "Statements and Reasons",
                category: "proofs",
                type: "components"
            },
            {
                id: 33,
                front: "What is 'Given' in a proof?",
                back: "Information assumed to be true at the start of a proof.",
                category: "proofs",
                type: "definition"
            },
            {
                id: 34,
                front: "What is the structure of an indirect proof?",
                back: "1. Assume the negation of what you want to prove, 2. Use logical reasoning to reach a contradiction, 3. Conclude the original statement is true",
                category: "proofs",
                type: "structure"
            },
            {
                id: 35,
                front: "What is a contradiction?",
                back: "A statement that is always false (e.g., p ∧ ¬p)",
                category: "proofs",
                type: "definition"
            },
            
            // Meta-Logic Terms
            {
                id: 36,
                front: "What do 'Always/Sometimes/Never True' classify?",
                back: "Logical statements based on truth tables.",
                category: "metalogic",
                type: "classification"
            },
            {
                id: 37,
                front: "What is a logical proof?",
                back: "A sequence of statements, each justified by a law, definition, or given, leading to a conclusion.",
                category: "metalogic",
                type: "definition"
            }
        ];
        
        this.flashcardState = {
            currentIndex: 0,
            reviewed: new Set(),
            mastered: new Set(),
            currentCard: null
        };
        
        this.init();
    }
    
    init() {
        this.setupTabSwitching();
        this.setupEventListeners();
        this.setupHashNavigation(); // Add hash navigation support
        this.renderFlashcards();
        this.updateFlashcardInfo();
    }
    
    setupTabSwitching() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const contentDivs = document.querySelectorAll('.module-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and content divs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                contentDivs.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding content
                const moduleName = button.getAttribute('data-tab');
                const contentId = `${moduleName}-content`;
                const contentDiv = document.getElementById(contentId);
                if (contentDiv) {
                    contentDiv.classList.add('active');
                    this.currentModule = moduleName;
                    this.drawCurrentModule();
                    
                    // Update URL hash
                    window.location.hash = moduleName;
                }
            });
        });
    }
    
    // Add hash navigation support
    setupHashNavigation() {
        // Handle initial hash on page load
        this.handleHashChange();
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            this.handleHashChange();
        });
    }
    
    handleHashChange() {
        const hash = window.location.hash.substring(1); // Remove #
        if (hash) {
            this.navigateToSection(hash);
        }
    }
    
    navigateToSection(sectionName) {
        // Validate section name
        const validSections = ['quantifiers', 'negation', 'counterexamples', 'conditionals', 'laws', 'proofs', 'flashcards'];
        if (!validSections.includes(sectionName)) {
            return;
        }
        
        // Activate the tab and content
        const tabButtons = document.querySelectorAll('.tab-button');
        const contentDivs = document.querySelectorAll('.module-content');
        
        // Remove active class from all buttons and content divs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        contentDivs.forEach(content => content.classList.remove('active'));
        
        // Find and activate the correct tab
        const targetTab = document.querySelector(`.tab-button[data-tab="${sectionName}"]`);
        const targetContent = document.getElementById(`${sectionName}-content`);
        
        if (targetTab && targetContent) {
            targetTab.classList.add('active');
            targetContent.classList.add('active');
            this.currentModule = sectionName;
            this.drawCurrentModule();
        }
    }
    
    setupEventListeners() {
        // Quantifiers module
        const domainOptions = document.querySelectorAll('.domain-option');
        domainOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                domainOptions.forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
                this.quantifiers.domain = e.target.getAttribute('data-domain');
            });
        });
        
        const quantifierOptions = document.querySelectorAll('.quantifier-option');
        quantifierOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                quantifierOptions.forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
                this.quantifiers.quantifier = e.target.getAttribute('data-quantifier');
            });
        });
        
        const predicateInput = document.getElementById('predicateInput');
        if (predicateInput) {
            predicateInput.addEventListener('input', (e) => {
                this.quantifiers.predicate = e.target.value;
            });
        }
        
        const translateBtn = document.getElementById('translateBtn');
        if (translateBtn) {
            translateBtn.addEventListener('click', () => this.translateToSymbolic());
        }
        
        const generateStatementBtn = document.getElementById('generateStatementBtn');
        if (generateStatementBtn) {
            generateStatementBtn.addEventListener('click', () => this.generateRandomStatement());
        }
        
        const resetQuantifiersBtn = document.getElementById('resetQuantifiersBtn');
        if (resetQuantifiersBtn) {
            resetQuantifiersBtn.addEventListener('click', () => this.resetQuantifiers());
        }
        
        // Negation module
        const startNegationBtn = document.getElementById('startNegationBtn');
        if (startNegationBtn) {
            startNegationBtn.addEventListener('click', () => this.startNegationProcess());
        }
        
        const switchQuantifierBtn = document.getElementById('switchQuantifierBtn');
        if (switchQuantifierBtn) {
            switchQuantifierBtn.addEventListener('click', () => this.switchQuantifier());
        }
        
        const negatePredicateBtn = document.getElementById('negatePredicateBtn');
        if (negatePredicateBtn) {
            negatePredicateBtn.addEventListener('click', () => this.negatePredicate());
        }
        
        const finalizeNegationBtn = document.getElementById('finalizeNegationBtn');
        if (finalizeNegationBtn) {
            finalizeNegationBtn.addEventListener('click', () => this.finalizeNegation());
        }
        
        const resetNegationBtn = document.getElementById('resetNegationBtn');
        if (resetNegationBtn) {
            resetNegationBtn.addEventListener('click', () => this.resetNegation());
        }
        
        // Counterexample module
        const validateCounterexampleBtn = document.getElementById('validateCounterexampleBtn');
        if (validateCounterexampleBtn) {
            validateCounterexampleBtn.addEventListener('click', () => this.validateCounterexample());
        }
        
        const generateChallengeBtn = document.getElementById('generateChallengeBtn');
        if (generateChallengeBtn) {
            generateChallengeBtn.addEventListener('click', () => this.generateCounterexampleChallenge());
        }
        
        const resetCounterexampleBtn = document.getElementById('resetCounterexampleBtn');
        if (resetCounterexampleBtn) {
            resetCounterexampleBtn.addEventListener('click', () => this.resetCounterexample());
        }
        
        // Flashcards module
        const shuffleCardsBtn = document.getElementById('shuffleCardsBtn');
        if (shuffleCardsBtn) {
            shuffleCardsBtn.addEventListener('click', () => this.shuffleFlashcards());
        }
        
        const showAllBtn = document.getElementById('showAllBtn');
        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                const container = document.getElementById('flashcardsContainer');
                const isInGridMode = container && container.querySelector('.flashcard-grid');
                
                if (isInGridMode) {
                    // Switch back to single card view
                    showAllBtn.textContent = 'Show All Cards';
                    this.renderFlashcards(document.getElementById('categoryFilterSelect').value, 'single');
                } else {
                    // Switch to grid view
                    showAllBtn.textContent = 'Show Single Card';
                    this.renderFlashcards(document.getElementById('categoryFilterSelect').value, 'grid');
                }
            });
        }
        
        const resetFlashcardsBtn = document.getElementById('resetFlashcardsBtn');
        if (resetFlashcardsBtn) {
            resetFlashcardsBtn.addEventListener('click', () => this.resetFlashcards());
        }
        
        const categoryFilterSelect = document.getElementById('categoryFilterSelect');
        if (categoryFilterSelect) {
            categoryFilterSelect.addEventListener('change', (e) => this.filterFlashcards(e.target.value));
        }
    }
    
    drawCurrentModule() {
        // This method would handle drawing module-specific content if needed
        // For now, we're relying on DOM manipulation in the event handlers
    }
    
    // Quantifiers module methods
    translateToSymbolic() {
        const domain = this.quantifiers.domain;
        const quantifier = this.quantifiers.quantifier;
        const predicate = this.quantifiers.predicate.trim();
        
        try {
            // Use strict validation
            this.strictValidator.validateQuantifierTranslation(domain, quantifier, predicate);
            
            // If validation passes, proceed with translation
            let symbolicForm = "";
            let verification = "";
            
            if (quantifier === "No") {
                symbolicForm = `∀x ∈ ${domain}, ¬(${predicate})`;
                verification = "Correctly translated 'No' statement as universal with negated predicate";
            } else {
                symbolicForm = `${quantifier}x ∈ ${domain}, ${predicate}`;
                if (quantifier === "∀") {
                    verification = "Correctly formed universal quantifier statement";
                } else if (quantifier === "∃") {
                    verification = "Correctly formed existential quantifier statement";
                }
            }
            
            this.updateTranslationResult(symbolicForm, verification);
        } catch (error) {
            this.updateTranslationResult("ERROR", error.message);
            return;
        }
    }
    
    updateTranslationResult(result, verification = "") {
        const resultElement = document.getElementById('symbolicResult');
        const verificationElement = document.getElementById('translationVerification');
        
        if (resultElement) resultElement.textContent = result;
        if (verificationElement) verificationElement.textContent = verification || "Incomplete translation";
    }
    
    generateRandomStatement() {
        const domains = ["ℕ", "ℤ", "ℚ", "ℝ"];
        const quantifiers = ["∀", "∃", "No"];
        const predicates = [
            "x is even",
            "x > 0",
            "x² ≥ 0",
            "x is prime",
            "x < 10",
            "x is rational"
        ];
        
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const randomQuantifier = quantifiers[Math.floor(Math.random() * quantifiers.length)];
        const randomPredicate = predicates[Math.floor(Math.random() * predicates.length)];
        
        // Update UI
        document.querySelectorAll('.domain-option').forEach(opt => {
            opt.classList.toggle('selected', opt.getAttribute('data-domain') === randomDomain);
        });
        
        document.querySelectorAll('.quantifier-option').forEach(opt => {
            opt.classList.toggle('selected', opt.getAttribute('data-quantifier') === randomQuantifier);
        });
        
        const predicateInput = document.getElementById('predicateInput');
        if (predicateInput) {
            predicateInput.value = randomPredicate;
        }
        
        // Update state
        this.quantifiers.domain = randomDomain;
        this.quantifiers.quantifier = randomQuantifier;
        this.quantifiers.predicate = randomPredicate;
        
        this.translateToSymbolic();
    }
    
    resetQuantifiers() {
        // Reset selections
        document.querySelectorAll('.domain-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelectorAll('.quantifier-option').forEach(opt => opt.classList.remove('selected'));
        
        const predicateInput = document.getElementById('predicateInput');
        if (predicateInput) predicateInput.value = '';
        
        this.quantifiers = {
            domain: null,
            quantifier: null,
            predicate: ''
        };
        
        this.updateTranslationResult('-', '-');
    }
    
    // Negation module methods
    startNegationProcess() {
        const statementSelect = document.getElementById('originalStatementSelect');
        const customInput = document.getElementById('customStatementInput');
        
        let statement = "";
        if (statementSelect && statementSelect.value) {
            statement = statementSelect.value;
        } else if (customInput && customInput.value.trim()) {
            statement = customInput.value.trim();
        }
        
        if (!statement) {
            alert("Please select a statement or enter a custom one");
            return;
        }
        
        this.negation.originalStatement = statement;
        this.negation.step = 1;
        
        // Enable step buttons
        const switchBtn = document.getElementById('switchQuantifierBtn');
        const negateBtn = document.getElementById('negatePredicateBtn');
        const finalizeBtn = document.getElementById('finalizeNegationBtn');
        
        if (switchBtn) switchBtn.disabled = false;
        if (negateBtn) negateBtn.disabled = true;
        if (finalizeBtn) finalizeBtn.disabled = true;
        
        // Update UI
        this.updateNegationProgress("Step 1: Switch Quantifier", "Ready");
        this.updateStepIndicator(1);
    }
    
    switchQuantifier() {
        if (this.negation.step !== 1) return;
        
        const statement = this.negation.originalStatement;
        let switched = "";
        
        if (statement.startsWith("∀")) {
            switched = statement.replace("∀", "∃");
        } else if (statement.startsWith("∃")) {
            switched = statement.replace("∃", "∀");
        } else if (statement.startsWith("No")) {
            switched = statement.replace("No", "∃");
        } else {
            switched = "Invalid statement format";
        }
        
        // Validate the step with strict system
        try {
            this.strictValidator.validateNegationStep(1, statement, switched);
            this.negation.switchedQuantifier = switched;
            this.negation.step = 2;
            
            // Enable next button
            const negateBtn = document.getElementById('negatePredicateBtn');
            if (negateBtn) negateBtn.disabled = false;
            
            // Update UI
            this.updateNegationProgress("Step 2: Negate Predicate", "Quantifier switched");
            this.updateStepIndicator(2);
        } catch (error) {
            this.updateNegationProgress("ERROR", error.message);
        }
    }
    
    negatePredicate() {
        if (this.negation.step !== 2) return;
        
        const switched = this.negation.switchedQuantifier;
        let negated = "";
        
        // Find the predicate part (after the comma)
        const commaIndex = switched.indexOf(',');
        if (commaIndex !== -1) {
            const beforeComma = switched.substring(0, commaIndex + 1); // Include the comma
            const predicate = switched.substring(commaIndex + 1).trim();
            
            // Negate the predicate
            if (predicate.startsWith("¬")) {
                // Already negated, remove negation
                negated = beforeComma + " " + predicate.substring(1).trim();
            } else {
                // Add negation
                negated = beforeComma + " ¬(" + predicate + ")";
            }
        } else {
            negated = "Error: Invalid statement format";
        }
        
        // Validate the step with strict system
        try {
            this.strictValidator.validateNegationStep(2, this.negation.originalStatement, negated);
            this.negation.negatedPredicate = negated;
            this.negation.step = 3;
            
            // Enable final button
            const finalizeBtn = document.getElementById('finalizeNegationBtn');
            if (finalizeBtn) finalizeBtn.disabled = false;
            
            // Update UI
            this.updateNegationProgress("Step 3: Finalize Negation", "Predicate negated");
            this.updateStepIndicator(3);
        } catch (error) {
            this.updateNegationProgress("ERROR", error.message);
        }
    }
    
    finalizeNegation() {
        if (this.negation.step !== 3) return;
        
        this.negation.finalResult = this.negation.negatedPredicate;
        this.negation.step = 4;
        
        // Update UI
        this.updateNegationProgress("Complete", "Negation finalized");
        this.updateStepIndicator(4);
        
        // Display result
        const resultElement = document.getElementById('symbolicResult');
        if (resultElement) resultElement.textContent = this.negation.finalResult;
    }
    
    updateNegationProgress(step, status) {
        const stepElement = document.getElementById('currentStep');
        const statusElement = document.getElementById('negationStatus');
        
        if (stepElement) stepElement.textContent = step;
        if (statusElement) statusElement.textContent = status;
    }
    
    updateStepIndicator(activeStep) {
        for (let i = 1; i <= 4; i++) {
            const stepElement = document.getElementById(`step${i}`);
            if (stepElement) {
                if (i === activeStep) {
                    stepElement.classList.add('active');
                } else {
                    stepElement.classList.remove('active');
                }
            }
        }
    }
    
    resetNegation() {
        this.negation = {
            originalStatement: '',
            step: 0,
            switchedQuantifier: '',
            negatedPredicate: '',
            finalResult: ''
        };
        
        // Reset UI
        const statementSelect = document.getElementById('originalStatementSelect');
        const customInput = document.getElementById('customStatementInput');
        if (statementSelect) statementSelect.value = "";
        if (customInput) customInput.value = "";
        
        // Disable buttons
        const switchBtn = document.getElementById('switchQuantifierBtn');
        const negateBtn = document.getElementById('negatePredicateBtn');
        const finalizeBtn = document.getElementById('finalizeNegationBtn');
        if (switchBtn) switchBtn.disabled = true;
        if (negateBtn) negateBtn.disabled = true;
        if (finalizeBtn) finalizeBtn.disabled = true;
        
        // Reset step indicator
        this.updateStepIndicator(1);
        this.updateNegationProgress("-", "Waiting to start");
    }
    
    // Counterexample module methods
    validateCounterexample() {
        const statementType = document.getElementById('statementTypeSelect').value;
        const domain = document.getElementById('counterexampleDomainSelect').value;
        const statement = document.getElementById('counterexampleStatementInput').value.trim();
        const testValue = document.getElementById('testValueInput').value.trim();
        
        if (!statement || !testValue) {
            this.displayValidationResult("Please enter both statement and test value", "neutral");
            return;
        }
        
        try {
            // Use strict validation system
            const result = this.strictValidator.validateCounterexample(
                statementType, 
                domain, 
                statement, 
                testValue
            );
            
            this.displayValidationResult(result.message, result.type === "counterexample" || result.type === "example" ? "correct" : "incorrect");
        } catch (error) {
            this.displayValidationResult(error.message, "incorrect");
        }
    }
    
    displayValidationResult(message, type) {
        const resultElement = document.getElementById('validationResult');
        if (resultElement) {
            resultElement.textContent = message;
            resultElement.className = "counterexample-result " + type;
        }
    }
    
    generateCounterexampleChallenge() {
        const challenges = [
            {
                type: "universal",
                domain: "ℤ",
                statement: "x is even",
                solution: "3",
                explanation: "3 is odd, so it's a counterexample to 'all integers are even'"
            },
            {
                type: "existential",
                domain: "ℕ",
                statement: "x is prime",
                solution: "2",
                explanation: "2 is prime, so it's an example for 'some natural numbers are prime'"
            },
            {
                type: "no",
                domain: "ℤ",
                statement: "x is negative",
                solution: "-1",
                explanation: "-1 shows that 'No integers are negative' is false"
            }
        ];
        
        const challenge = challenges[Math.floor(Math.random() * challenges.length)];
        
        // Update UI
        document.getElementById('statementTypeSelect').value = challenge.type;
        document.getElementById('counterexampleDomainSelect').value = challenge.domain;
        document.getElementById('counterexampleStatementInput').value = challenge.statement;
        document.getElementById('testValueInput').value = "";
        
        this.displayValidationResult(`Challenge: Find a ${challenge.type} example for "${challenge.statement}" in ${challenge.domain}`, "neutral");
    }
    
    resetCounterexample() {
        document.getElementById('statementTypeSelect').value = "universal";
        document.getElementById('counterexampleDomainSelect').value = "ℕ";
        document.getElementById('counterexampleStatementInput').value = "";
        document.getElementById('testValueInput').value = "";
        this.displayValidationResult("Enter a statement and test value to begin", "neutral");
    }
    
    // Flashcards module methods
    renderFlashcards(category = 'all', viewMode = 'single') {
        const container = document.getElementById('flashcardsContainer');
        if (!container) return;
        
        // Filter cards by category
        let cardsToShow = this.flashcards;
        if (category !== 'all') {
            cardsToShow = this.flashcards.filter(card => card.category === category);
        }
        
        // Set current card to first in filtered list or first overall
        this.flashcardState.currentCard = cardsToShow.length > 0 ? cardsToShow[0] : null;
        this.flashcardState.currentIndex = 0;
        
        if (viewMode === 'grid') {
            this.showAllFlashcards();
        } else {
            this.displayCurrentCard();
        }
    }
    
    displayCurrentCard() {
        const container = document.getElementById('flashcardsContainer');
        if (!container) return;

        if (!this.flashcardState.currentCard) {
            container.innerHTML = '<div class="no-cards-message">No flashcards available for this category.</div>';
            this.updateFlashcardInfo();
            return;
        }

        container.innerHTML = `
            <div class="flashcard-single" id="flashcardContainer">
                <div class="card-container">
                    <div class="card-face card-front">
                        <div class="card-label">QUESTION</div>
                        <div class="card-content">${this.flashcardState.currentCard.front}</div>
                        <div class="click-hint">Click to flip</div>
                    </div>
                    <div class="card-face card-back">
                        <div class="card-label">ANSWER</div>
                        <div class="card-content">${this.flashcardState.currentCard.back}</div>
                        <div class="click-hint">Click to flip back</div>
                    </div>
                </div>
                <div class="flashcard-controls">
                    <button class="control-button secondary" id="prevCardBtn">Previous</button>
                    <button class="control-button secondary" id="shuffleCardsBtn">Shuffle</button>
                    <button class="control-button secondary" id="nextCardBtn">Next</button>
                </div>
                <div class="flashcard-navigation">
                    <span id="cardPosition">Card ${this.flashcardState.currentIndex + 1} of ${this.getTotalFilteredCards()}</span>
                </div>
            </div>
        `;

        // Add event listeners
        this.attachFlashcardEventListeners();
        this.updateFlashcardInfo();
    }

    attachFlashcardEventListeners() {
        const flashcardContainer = document.getElementById('flashcardContainer');
        const prevBtn = document.getElementById('prevCardBtn');
        const nextBtn = document.getElementById('nextCardBtn');
        const shuffleBtn = document.getElementById('shuffleCardsBtn');

        if (flashcardContainer) {
            flashcardContainer.addEventListener('click', () => this.flipCurrentCard());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.previousCard();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.nextCard();
            });
        }

        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.shuffleFlashcards();
            });
        }
    }

    flipCurrentCard() {
        const flashcardContainer = document.getElementById('flashcardContainer');
        if (flashcardContainer) {
            flashcardContainer.classList.toggle('flipped');
            
            // Mark as reviewed when flipped to back
            if (flashcardContainer.classList.contains('flipped')) {
                this.flashcardState.reviewed.add(this.flashcardState.currentCard.id);
                this.updateFlashcardInfo();
            }
        }
    }

    previousCard() {
        const filteredCards = this.getFilteredCards();
        if (filteredCards.length === 0) return;
        
        this.flashcardState.currentIndex = 
            (this.flashcardState.currentIndex - 1 + filteredCards.length) % filteredCards.length;
        this.flashcardState.currentCard = filteredCards[this.flashcardState.currentIndex];
        this.displayCurrentCard();
    }
    
    nextCard() {
        const filteredCards = this.getFilteredCards();
        if (filteredCards.length === 0) return;
        
        this.flashcardState.currentIndex = 
            (this.flashcardState.currentIndex + 1) % filteredCards.length;
        this.flashcardState.currentCard = filteredCards[this.flashcardState.currentIndex];
        this.displayCurrentCard();
    }
    
    getFilteredCards() {
        const categoryFilter = document.getElementById('categoryFilterSelect');
        const category = categoryFilter ? categoryFilter.value : 'all';
        
        let cardsToShow = this.flashcards;
        if (category !== 'all') {
            cardsToShow = this.flashcards.filter(card => card.category === category);
        }
        
        return cardsToShow;
    }
    
    getTotalFilteredCards() {
        return this.getFilteredCards().length;
    }
    
    shuffleFlashcards() {
        // Reshuffle the main array
        for (let i = this.flashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.flashcards[i], this.flashcards[j]] = [this.flashcards[j], this.flashcards[i]];
        }
        
        // Reset to first card, preserving view mode
        const categoryFilter = document.getElementById('categoryFilterSelect');
        const category = categoryFilter ? categoryFilter.value : 'all';
        
        // Check if we're in grid view mode
        const container = document.getElementById('flashcardsContainer');
        const isInGridMode = container && container.querySelector('.flashcard-grid');
        
        this.renderFlashcards(category, isInGridMode ? 'grid' : 'single');
    }
    
    filterFlashcards(category) {
        // Check if we're in grid view mode
        const container = document.getElementById('flashcardsContainer');
        const isInGridMode = container && container.querySelector('.flashcard-grid');
        
        this.renderFlashcards(category, isInGridMode ? 'grid' : 'single');
    }
    
    showAllFlashcards() {
        const container = document.getElementById('flashcardsContainer');
        if (!container) return;
        
        // Get filtered cards
        const filteredCards = this.getFilteredCards();
        
        if (filteredCards.length === 0) {
            container.innerHTML = '<div class="no-cards-message">No flashcards available for this category.</div>';
            return;
        }
        
        // Create grid HTML
        let gridHTML = '<div class="flashcard-grid">\n';
        
        filteredCards.forEach((card, index) => {
            // Get category name for display
            const categoryNames = {
                'foundational': 'Foundational Vocabulary & Symbols',
                'ldi': 'Law of Disjunctive Inference',
                'conditionals': 'Conditional Statements',
                'detachment': 'Law of Detachment',
                'contrapositive': 'Law of Contrapositive',
                'demorgan': 'De Morgan\'s Laws',
                'quantifiers': 'Quantifiers',
                'negation-quantifiers': 'Negation of Quantified Statements',
                'proofs': 'Proof Structures',
                'metalogic': 'Meta-Logic Terms'
            };
            
            const categoryName = categoryNames[card.category] || card.category;
            
            gridHTML += `
            <div class="flashcard-grid-item" data-card-id="${card.id}" data-index="${index}">
                <div class="flashcard-grid-category">${categoryName}</div>
                <div class="flashcard-grid-front">${card.front}</div>
                <div class="flashcard-grid-back">${card.back}</div>
            </div>`;
        });
        
        gridHTML += '\n</div>';
        
        container.innerHTML = gridHTML;
        
        // Add event listeners to grid items
        const gridItems = container.querySelectorAll('.flashcard-grid-item');
        gridItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('flipped');
                
                // Mark as reviewed when flipped
                if (item.classList.contains('flipped')) {
                    const cardId = parseInt(item.getAttribute('data-card-id'));
                    this.flashcardState.reviewed.add(cardId);
                    this.updateFlashcardInfo();
                }
            });
        });
        
        // Update info panel
        this.updateFlashcardInfo();
    }
    
    resetFlashcards() {
        // Reset state
        this.flashcardState = {
            currentIndex: 0,
            reviewed: new Set(),
            mastered: new Set(),
            currentCard: this.flashcards[0] || null
        };
        
        // Reset filter
        const categoryFilter = document.getElementById('categoryFilterSelect');
        if (categoryFilter) categoryFilter.value = 'all';
        
        // Check if we're in grid view mode
        const container = document.getElementById('flashcardsContainer');
        const isInGridMode = container && container.querySelector('.flashcard-grid');
        
        this.renderFlashcards('all', isInGridMode ? 'grid' : 'single');
    }
    
    updateFlashcardInfo() {
        const totalElement = document.getElementById('totalCards');
        const reviewedElement = document.getElementById('reviewedCards');
        const masteredElement = document.getElementById('masteredCards');
        
        if (totalElement) totalElement.textContent = this.flashcards.length;
        if (reviewedElement) reviewedElement.textContent = this.flashcardState.reviewed.size;
        if (masteredElement) masteredElement.textContent = this.flashcardState.mastered.size;
        
        // Update card position text
        const positionElement = document.getElementById('cardPosition');
        if (positionElement) {
            positionElement.textContent = `Card ${this.flashcardState.currentIndex + 1} of ${this.getTotalFilteredCards()}`;
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const logicTutor = new LogicTutor();
});