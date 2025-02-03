export class BigNum {
    private value: bigint;
    private numDecimals: number;
    
    private stringConstructor(inputValue: string): bigint{
        if(!inputValue.match(/^-?\d*(\.\d+)?$/)){
            throw new TypeError("Invalid number format. Input was " + inputValue + "\n");
        }
        if(inputValue.includes(".")){
            let temp: bigint = BigInt(inputValue.split(".")[0] + inputValue.split(".")[1].padEnd(this.numDecimals, "0").slice(0, this.numDecimals)); // int + decimal + padding + remove padding if too long
            if(inputValue.split(".")[1].length > this.numDecimals){
                // Round value to numDecimals
                if(inputValue.split(".")[1][this.numDecimals] >= "5"){
                    temp += BigInt(1);
                }
            }
            return temp
        }
        // If string is entirely digits
        else{
            return this.stringConstructor(inputValue + ".0");
            // return BigInt(inputValue.toString().padEnd(this.numDecimals, "0"));
        }
    }

    /**
     * Constructor for BigNum
     * @param value The value you want BigNum to be set to.
     * @param numDecimals The number of decimal precision you want this BigNum object to have. Defaults to 16/
     */
    constructor(value: string | number | bigint | BigNum, numDecimals: number = 16) {
        this.value = BigInt(0);
        this.numDecimals = numDecimals;
        if(typeof value === "number" || typeof value === "bigint"){
            this.value = this.stringConstructor(value.toString());
        }
        else if(typeof value === "string"){
            this.value = this.stringConstructor(value);
        }
        else if(value instanceof BigNum){
            if(value.numDecimals === this.numDecimals){
                this.value = value.value;
            }
            else{
                this.value = this.stringConstructor(value.toString());
            }
        }
    }

    /**
     * Setter for value
     * @param value The value you want BigNum to be set to.
     * @returns value of BigNum
     */
    setValue(value:bigint){
        this.value = value;
    }

    /**
     * Takes two numbers and returns their sum.
     * @param other a. The number to be added.
     * @returns Sum of BigNum and a
     */
    add(other: string | number | bigint | BigNum): BigNum {
        let otherVal: BigNum = new BigNum(other);
        otherVal.setValue(this.value + otherVal.value)
        return new BigNum(otherVal, this.numDecimals);
    }

    /**
     * Subtracts two numbers and returns their difference.
     * @param other b. The number to be subtracted.
     * @returns Difference between BigNum and b
     */
    subtract(other: string | number | bigint | BigNum): BigNum {
        let otherVal: BigNum = new BigNum(other);
        otherVal.setValue(this.value - otherVal.value)
        return new BigNum(otherVal, this.numDecimals);
    }

    /**
     * Multiplies two numbers and returns their product.
     * @param other b. The number to be multiplied.
     * @returns Multiplication of BigNum and b
     */
    multiply(other: string | number | bigint | BigNum): BigNum {
        let otherVal: BigNum = new BigNum(other);
        let intermediate: bigint = this.value * otherVal.value / (10n ** BigInt(this.numDecimals));
        if((((intermediate * 2n) / (10n ** BigInt(this.numDecimals))) % 2n) === 1n){
            //Half step up rounding. If the initial division has a decimal >= .5, then doubling then dividing and then modulusing will be 1 if the decimal was >= .5
            intermediate += 1n;
        }
        otherVal.setValue(intermediate);
        return new BigNum(otherVal, this.numDecimals);
    }

    /**
     * Divides BigNum by input value
     * @param other b. The number to divide by. The denominator
     * @returns BigNum divided by b
     */
    divide(other: string | number | bigint | BigNum): BigNum {
        let otherVal: BigNum = new BigNum(other);
        let intermediate: bigint = this.value * (10n ** BigInt(this.numDecimals)) / otherVal.value; // Multiply by 10^numDecimals now, so that decimals are correct
        if((((intermediate * 2n) / (10n ** BigInt(this.numDecimals))) % 2n) === 1n){
            //Half step up rounding. If the initial division has a decimal >= .5, then doubling then dividing and then modulusing will be 1 if the decimal was >= .5
            intermediate += 1n;
        }
        otherVal.setValue(intermediate);
        return new BigNum(otherVal, this.numDecimals);
    }

    /**
     * String representation of BigNum
     * @returns String representation of BigNum
     */
    toString(): string {
        let result: string = this.value.toString();
        let negative: boolean = false;
        if(result.includes("-")){
            negative = true;
            result = result.replace("-","");
        }
        result = result.padStart(this.numDecimals + 1, "0");
        result = result.slice(0, -this.numDecimals) + "." + result.slice(-this.numDecimals);
        result = result.replace(/(\.0*|0+)$/, "");
        if(negative){
            result = "-" + result;
        }
        return result;
    }
}