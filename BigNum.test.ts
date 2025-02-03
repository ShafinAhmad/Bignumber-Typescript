import { BigNum } from "./BigNum";

describe("Incorrect Input", () => {
    test('Should throw error', () => {
        expect(() => {
            new BigNum("a");
        }).toThrow(TypeError);
    })
    test('Should throw error', () => {
        expect(() => {
            new BigNum("50.0.0");
        }).toThrow(TypeError);
    })
})

describe("Add Functionality", () => {
    test('"50"+"10" should be 60', () => {
        const a = new BigNum("50");
        const b = a.add("10");
        expect(b.toString()).toBe("60");
    })
    test('50.0+10.0 should be 60', () => {
        const a = new BigNum("50.0");
        const b = a.add("10.0");
        expect(b.toString()).toBe("60");
    })
    test('50n+10n should be 60', () => {
        const a = new BigNum(50n);
        const b = a.add(10n);
        expect(b.toString()).toBe("60");
    })
    test('50 + 10 should be 60', () => {
        const a = new BigNum(50);
        const b = a.add(10);
        expect(b.toString()).toBe("60");
    })
})

describe("Subtract Functionality", () => {
    test('"50"-"10" should be 40', () => {
        const a = new BigNum("50");
        const b = a.subtract("10");
        expect(b.toString()).toBe("40");
    })
    test('50.0-10.0 should be 40', () => {
        const a = new BigNum("50.0");
        const b = a.subtract("10.0");
        expect(b.toString()).toBe("40");
    })
    test('50n-10n should be 40', () => {
        const a = new BigNum(50n);
        const b = a.subtract(10n);
        expect(b.toString()).toBe("40");
    })
    test('50 - 10 should be 40', () => {
        const a = new BigNum(50);
        const b = a.subtract(10);
        expect(b.toString()).toBe("40");
    })
})

describe("Multiply Functionality", () => {
    test('50.0*10.0 should be 500', () => {
        const a = new BigNum("50.0");
        const b = a.multiply("10.0");
        expect(b.toString()).toBe("500");
    })
    test('"50"*"10" should be 500', () => {
        const a = new BigNum("50");
        const b = a.multiply("10");
        const c = new BigNum("10");
        expect(b.toString()).toBe("500");
    })
    test('50n*10n should be 500', () => {
        const a = new BigNum(50n);
        const b = a.multiply(10n);
        expect(b.toString()).toBe("500");
    })
    test('50 * 10 should be 500', () => {
        const a = new BigNum(50);
        const b = a.multiply(10);
        expect(b.toString()).toBe("500");
    })
    test('1.5 * 2 should be 3', () => {
        const a = new BigNum("1.5");
        const b = a.multiply("2");
        expect(b.toString()).toBe("3");
    })
    test("123.456789 * 100 should be 12345.6789", () => {
        const a = new BigNum("123.456789", 4);
        const b = a.multiply("100");
        expect(b.toString()).toBe("12345.68");
    })
    test("3.5 * 2.0 should be 7", () => {
        const a = new BigNum("3.5");  // 3.5
        const b = a.multiply("2.0");  // 2.0
        expect(b.toString()).toBe("7");
    })
    test("3.5 * 2.0 should be 7", () => {
        const a = new BigNum(3.5, 3);  // 3.5
        const b = a.multiply(2.0);  // 2.0
        expect(b.toString()).toBe("7");
    })

})
describe("Divide Functionality", () => {
    test('"50"/"10" should be 5', () => {
        const a = new BigNum("50");
        const b = a.divide("10");
        expect(b.toString()).toBe("5");
    })
    test('50.0/10.0 should be 5', () => {
        const a = new BigNum("50.0");
        const b = a.divide("10.0");
        expect(b.toString()).toBe("5");
    })
    test('50n/10n should be 5', () => {
        const a = new BigNum(50n);
        const b = a.divide(10n);
        expect(b.toString()).toBe("5");
    })
    test('50 / 10 should be 5', () => {
        const a = new BigNum(50);
        const b = a.divide(10);
        expect(b.toString()).toBe("5");
    })
})
describe("Negative functionality, Add", () => {
    //Neg, Pos
    //Pos, Neg
    //Neg, Neg
    test('"-50"+"10" should be -40', () => {
        const a = new BigNum("-50");
        const b = a.add("10");
        expect(b.toString()).toBe("-40");
    })
    test('50.0 + -10.0 should be 40', () => {
        const a = new BigNum("50.0");
        const b = a.add("-10.0");
        expect(b.toString()).toBe("40");
    })
    test("-50 + -10 should be -60", () => {
        const a = new BigNum(-50);
        const b = a.add(-10);
        expect(b.toString()).toBe("-60");
    })
    test("-50 - 10 should be -60", () => {
        const a = new BigNum(-50);
        const b = a.add(10);
        expect(b.toString()).toBe("-40");
    })
    test("50 - -10 should be 60", () => {
        const a = new BigNum(50);
        const b = a.add(-10);
        expect(b.toString()).toBe("40");
    })
    test("-50 - -10 should be -40", () => {
        const a = new BigNum(-50);
        const b = a.subtract(-10);
        expect(b.toString()).toBe("-40");
    })

    test("-50 * 10 should be -500", () => {
        const a = new BigNum(-50);
        const b = a.multiply(10);
        expect(b.toString()).toBe("-500");
    })
    test("50 * -10 should be -500", () => {
        const a = new BigNum(50);
        const b = a.multiply(-10);
        expect(b.toString()).toBe("-500");
    })
    test("-50 * -10 should be 500", () => {
        const a = new BigNum(-50);
        const b = a.multiply(-10);
        expect(b.toString()).toBe("500");
    })
    test("-50 / 10 should be -5", () => {
        const a = new BigNum(-50);
        const b = a.divide(10);
        expect(b.toString()).toBe("-5");
    })
    test("50 / -10 should be -5", () => {
        const a = new BigNum(50);
        const b = a.divide(-10);
        expect(b.toString()).toBe("-5");
    })
    test("-50 / -10 should be 5", () => {
        const a = new BigNum(-50);
        const b = a.divide(-10);
        expect(b.toString()).toBe("5");
    })
})