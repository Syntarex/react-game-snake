export function generateRandomDecimalBetween(x1: number, x2: number): number {
    if (x1 < 0 || x2 < 0) {
        throw new Error("Do not use negative numbers.");
    }

    if (x1 === x2) {
        throw new Error("Both numbers are equal.");
    }

    const min: number = x1 < x2 ? x1 : x2;
    const max: number = x1 > x2 ? x1 : x2;

    return Math.floor(Math.random() * (max - min + 1) + min);
}
