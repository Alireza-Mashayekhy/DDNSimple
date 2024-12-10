export const numberFormatter = (number: number) => {
    const isNegative = number < 0;
    const absNumberStr = Math.abs(number).toString();
    const formattedNumber = absNumberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return isNegative ? `(${formattedNumber})` : formattedNumber;
};
