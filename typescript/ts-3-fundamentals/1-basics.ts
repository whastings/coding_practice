// With `const`, variable's type is it's literal value (a Literal Type)
const constVariable = 'hello world' // Type: 'hello world'
const constObject = { foo: 'bar' } // Type: { foo: string }

// With `let`, you can separate declaration from assignment
// If no type specified, will be `any`
let anyVar
anyVar = 10
anyVar = 'abc'
let numVar: number
numVar = 10
// numVar = 'abc'
