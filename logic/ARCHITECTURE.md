# Logic Tutor System Architecture

## Design Philosophy: Precision Over Intuition

This system is designed to teach mathematical logic with strict precision requirements, preventing students from succeeding through guessing or intuitive approximation. Every interaction requires exact compliance with formal logical rules.

## Component Architecture

### 1. Core Validation Engine
The `StrictLogicTutor` class serves as the central validation authority:
- Enforces mandatory steps in all learning processes
- Implements formal validation rules for all logical operations
- Tracks student progress and common error patterns
- Prevents skipping or bypassing critical learning steps

### 2. Module-Specific Validators
Each learning module has dedicated validation components:

#### QuantifierEngine
- Validates domain declarations (ℕ, ℤ, ℚ, ℝ)
- Ensures proper variable binding syntax
- Checks predicate well-formedness
- Requires complete statement construction

#### NegationProcessor
- Mandates both quantifier switching AND predicate negation
- Prevents common errors (quantifier-only or predicate-only changes)
- Enforces step-by-step progression
- Validates structural preservation

#### CounterexampleValidator
- Verifies domain membership for test values
- Evaluates predicate satisfaction formally
- Determines logical validity of examples/counterexamples
- Prevents invalid "near misses"

#### LawApplier
- Checks preconditions for each logical law
- Validates cited premises and line references
- Ensures conclusion follows formally from premises
- Prevents misapplication of laws

#### ProofVerifier
- Enforces dependency ordering (no forward referencing)
- Validates justification for each proof step
- Checks goal achievement
- Ensures logical flow integrity

## Data Schemas

### QuantifiedStatement
```javascript
{
  "quantifier": "∀" | "∃" | "No",
  "domain": "ℕ" | "ℤ" | "ℚ" | "ℝ",
  "variable": "string",
  "predicate": {
    "type": "atomic" | "compound",
    "structure": "AST representation",
    "latex": "string"
  },
  "canonicalForm": "string"
}
```

### NegationProcess
```javascript
{
  "originalStatement": "reference",
  "steps": [
    {
      "stepNumber": 1..3,
      "action": "switch_quantifier" | "negate_predicate" | "finalize",
      "input": "string",
      "expected": "string",
      "provided": "string",
      "correct": "boolean"
    }
  ],
  "finalResult": "reference",
  "completed": "boolean",
  "errors": ["ValidationError"]
}
```

### Proof
```javascript
{
  "premises": ["string"],
  "goal": "string",
  "lines": [
    {
      "statement": "string",
      "justification": {
        "law": "string",
        "citedLines": ["number"],
        "valid": "boolean"
      },
      "dependencies": ["number"]
    }
  ],
  "completed": "boolean",
  "valid": "boolean",
  "errors": ["ProofError"]
}
```

## Interaction Logic

### Mandatory Step Progression
All modules enforce ordered progression:
1. **Quantifier Translation**: Domain → Quantifier → Predicate → Validation
2. **Negation Process**: Original Statement → Switch Quantifier → Negate Predicate → Finalize
3. **Counterexample Validation**: Statement Type → Domain → Predicate → Test Value → Validation
4. **Proof Construction**: Premises → Goal → Line 1 → Justification → Line 2 → ... → Goal Reached

### No Shortcuts Allowed
- Students cannot skip steps
- Previous steps must be validated before proceeding
- Partial credit is not awarded for incomplete processes
- Guessing is prevented through structured input mechanisms

## Validation Rules

### Quantifier Translation Rules
1. **Domain Requirement**: Explicit domain from {ℕ, ℤ, ℚ, ℝ} required
2. **Quantifier Requirement**: Must be ∀, ∃, or "No"
3. **Predicate Requirement**: Well-formed predicate expression required
4. **Syntax Validation**: Must conform to canonical form `Qx ∈ D, P(x)`

### Negation Validation Rules
1. **Quantifier Switching**: ∀ ↔ ∃ required (No ↔ ∃)
2. **Predicate Negation**: P(x) ↔ ¬P(x) required
3. **No Omissions**: Both transformations mandatory
4. **Structure Preservation**: Variable and domain unchanged

### Counterexample Validation Rules
1. **Domain Membership**: Test value must belong to specified domain
2. **Predicate Evaluation**: Formal evaluation of predicate satisfaction
3. **Logical Consistency**: Must actually refute/disprove statement
4. **Uniqueness Tracking**: Prevents trial-and-error approaches

### Law Application Rules
1. **Precondition Checking**: Each law has specific prerequisites
2. **Dependency Validation**: Referenced lines must exist and be prior
3. **Correct Citation**: Law name must match actual application
4. **Conclusion Validity**: Derived statement must follow logically

### Proof Validation Rules
1. **Line Dependency**: No forward referencing allowed
2. **Justification Requirement**: Every non-premise line needs justification
3. **Goal Achievement**: Final line must match stated goal
4. **Logical Flow**: Each step must follow from previous via valid laws

## Error Prevention Mechanisms

### Structured Inputs
- Dropdowns instead of free text entry
- Constrained selection options
- Real-time syntax validation
- Immediate feedback on errors

### Mandatory Steps
- Cannot proceed without completing current step
- Previous errors must be corrected
- No skipping ahead to avoid critical concepts
- Progression only after validation

### Comprehensive Error Tracking
- Categorizes error types for targeted remediation
- Tracks common mistakes to adjust difficulty
- Provides specific guidance rather than generic feedback
- Prevents repeated guessing with same incorrect approach

## Seed Data Examples

### Edge Case Statements
```javascript
[
  {
    "statement": "∀x ∈ ℕ, x ≥ 0", // Boundary case with 0
    "type": "universal",
    "valid": true
  },
  {
    "statement": "∃x ∈ ℤ, x² = -1", // No solution in integers
    "type": "existential",
    "valid": false
  },
  {
    "statement": "No x ∈ ℚ, x² = 2", // Irrational solution
    "type": "no_statement",
    "valid": false
  }
]
```

### Common Mistake Patterns
```javascript
[
  {
    "original": "∀x ∈ ℝ, x² ≥ 0",
    "correctNegation": "∃x ∈ ℝ, x² < 0",
    "commonMistakes": [
      "∃x ∈ ℝ, x² ≥ 0", // Only switched quantifier
      "∀x ∈ ℝ, x² < 0"  // Only negated predicate
    ]
  }
]
```

## Student Progress Tracking

The system tracks:
- Attempt counts for each module
- Success rates by concept type
- Common error patterns
- Mastery progression

This enables adaptive difficulty adjustment and targeted remediation.

## Conclusion

This architecture ensures that students master logical precision through:
1. **Mandatory structured progression** - No skipping or guessing
2. **Formal validation** - Intuition insufficient, precision required
3. **Immediate specific feedback** - Errors clearly identified and categorized
4. **Comprehensive coverage** - All edge cases and common mistakes addressed
5. **Adaptive learning** - Difficulty adjusts based on demonstrated mastery

Students cannot succeed by guessing because every step requires exact compliance with formal logical rules, enforced by the validation engine.