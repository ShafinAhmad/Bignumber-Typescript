```markdown
# BigNum.js

## Arbitrary-Precision Decimal Arithmetic in Javascript/Typescript

This Javascript/Typescript class, `BigNum`, provides a way to perform arithmetic operations on decimal numbers with arbitrary precision, overcoming the limitations of Javascript's built-in number type for precise decimal calculations. It leverages the `bigint` type for internal representation, ensuring accuracy for calculations involving large numbers and decimals.

## Features

*   **Arbitrary Precision:** Handles decimal numbers with a user-defined number of decimal places, limited only by available memory.
*   **Accurate Decimal Arithmetic:** Avoids floating-point errors inherent in Javascript's standard number type when dealing with decimals.
*   **Supports Basic Operations:** Implements `add`, `subtract`, `multiply`, and `divide` operations.
*   **Flexible Input:** Accepts `string`, `number`, `bigint`, and `BigNum` instances as input for constructor and arithmetic operations.
*   **Configurable Decimal Precision:**  Set the desired number of decimal places when creating a `BigNum` instance.
*   **String Representation:**  Provides a `toString()` method to convert `BigNum` back to a user-friendly string format, automatically handling decimal placement and removing trailing zeros.

## Why use BigNum?

Javascript's standard number type is based on 64-bit floating-point representation (IEEE 754). While suitable for many general-purpose calculations, it can lead to precision issues when dealing with decimal numbers, especially in financial applications or scenarios requiring high accuracy.

**Example of standard Javascript number precision issues:**

javascript
console.log(0.1 + 0.2); // Output: 0.30000000000000004 (incorrect!)
```

`BigNum` solves this problem by representing numbers internally as `bigint` and managing decimal places explicitly. This ensures that decimal arithmetic operations are performed accurately.

**With `BigNum`:**

```javascript
const BigNum = require('./bignum'); // Assuming you've saved BigNum.js or BigNum.ts

const num1 = new BigNum("0.1");
const num2 = new BigNum("0.2");
const sum = num1.add(num2);

console.log(sum.toString()); // Output: 0.3 (correct!)
```

## Installation

Simply copy the `BigNum.ts` (or compiled `BigNum.js`) file into your project.

If you are using Typescript, you can directly import and use the `BigNum` class.

For Javascript projects, you can either use the `BigNum.ts` directly with a Typescript compiler or compile it to `BigNum.js` and include it in your project.

## Usage

### Importing `BigNum`

```typescript
// Typescript
import { BigNum } from './BigNum';

// Javascript (assuming BigNum.js is in the same directory)
const BigNum = require('./BigNum');
```

### Creating a `BigNum` instance

You can create a `BigNum` object using various input types:

```typescript
const num1 = new BigNum("123.45"); // From a string
const num2 = new BigNum(100);      // From a number
const num3 = new BigNum(12345n);    // From a bigint
const num4 = new BigNum(num1);      // From another BigNum

const num5 = new BigNum("3.14159", 5); // 5 decimal places precision
const num6 = new BigNum("2.71828");   // Default 16 decimal places precision
```

### Performing Arithmetic Operations

```typescript
const num1 = new BigNum("10.5");
const num2 = new BigNum("2.5");

const sum = num1.add(num2);         // Addition
const difference = num1.subtract(num2); // Subtraction
const product = num1.multiply(num2);    // Multiplication
const quotient = num1.divide(num2);     // Division

console.log("Sum:", sum.toString());        // Output: Sum: 13
console.log("Difference:", difference.toString()); // Output: Difference: 8
console.log("Product:", product.toString());    // Output: Product: 26.25
console.log("Quotient:", quotient.toString());   // Output: Quotient: 4.2
```

You can also perform operations with numbers, strings, or bigints directly:

```typescript
const num = new BigNum("5");

const sum = num.add(10);          // Add a number
const difference = num.subtract("2");    // Subtract a string
const product = num.multiply(2n);      // Multiply by a bigint

console.log("Sum:", sum.toString());        // Output: Sum: 15
console.log("Difference:", difference.toString()); // Output: Difference: 3
console.log("Product:", product.toString());    // Output: Product: 10
```

### Getting String Representation

Use the `toString()` method to get the string representation of a `BigNum`:

```typescript
const num = new BigNum("1234.56789");
console.log(num.toString()); // Output: 1234.56789

const num2 = new BigNum("3.000");
console.log(num2.toString()); // Output: 3 (trailing zeros are removed)
```

## API Reference

### `constructor(value: string | number | bigint | BigNum, numDecimals: number = 16)`

*   **`value`**: The initial value for the `BigNum` object. Can be a string, number, bigint, or another `BigNum` instance.
    *   **String**: Represents the number as a string, supporting decimal points (e.g., `"123.45"`, `"-0.5"`, `"100"`).
    *   **Number**: A standard Javascript number.
    *   **Bigint**: A Javascript `bigint` value.
    *   **BigNum**: Another `BigNum` instance to copy the value from.
*   **`numDecimals` (optional)**:  The number of decimal places of precision for this `BigNum` object. Defaults to `16`.

**Throws:**
*   `TypeError`: If the input string `value` for the constructor does not match a valid number format (e.g., contains non-numeric characters other than `-` and `.`).

### `add(other: string | number | bigint | BigNum): BigNum`

*   **`other`**: The value to add to the current `BigNum`. Can be a string, number, bigint, or another `BigNum` instance.
*   **Returns**: A new `BigNum` object representing the sum of the current `BigNum` and `other`. The returned `BigNum` will have the same `numDecimals` precision as the original `BigNum` instance.

### `subtract(other: string | number | bigint | BigNum): BigNum`

*   **`other`**: The value to subtract from the current `BigNum`. Can be a string, number, bigint, or another `BigNum` instance.
*   **Returns**: A new `BigNum` object representing the difference between the current `BigNum` and `other`. The returned `BigNum` will have the same `numDecimals` precision as the original `BigNum` instance.

### `multiply(other: string | number | bigint | BigNum): BigNum`

*   **`other`**: The value to multiply the current `BigNum` by. Can be a string, number, bigint, or another `BigNum` instance.
*   **Returns**: A new `BigNum` object representing the product of the current `BigNum` and `other`. The returned `BigNum` will have the same `numDecimals` precision as the original `BigNum` instance.  **Note:** Multiplication may involve rounding to maintain the specified `numDecimals` precision. Half-up rounding is used.

### `divide(other: string | number | bigint | BigNum): BigNum`

*   **`other`**: The value to divide the current `BigNum` by (the denominator). Can be a string, number, bigint, or another `BigNum` instance.
*   **Returns**: A new `BigNum` object representing the quotient of the current `BigNum` divided by `other`. The returned `BigNum` will have the same `numDecimals` precision as the original `BigNum` instance. **Note:** Division may involve rounding to maintain the specified `numDecimals` precision. Half-up rounding is used.

### `toString(): string`

*   **Returns**: A string representation of the `BigNum` value, formatted as a decimal number. Trailing zeros after the decimal point are removed.

## Considerations

*   **Performance:** While `bigint` operations are generally efficient, using `BigNum` for very complex or extremely high-precision calculations might be slower than native Javascript numbers for simpler operations. However, for scenarios where decimal precision is crucial, the accuracy benefits of `BigNum` outweigh potential performance considerations.
*   **Rounding:**  Multiplication and division operations may involve rounding to maintain the specified `numDecimals` precision. Half-up rounding is implemented, meaning values of 0.5 and above are rounded up.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

[MIT License](LICENSE)