// Converts a number into Indian-format currency words
// e.g. 34500 -> "Thirty Four Thousand Five Hundred Rupees Only"

const ones = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen"
];

const tens = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
];

function twoDigits(num) {
  if (num < 20) return ones[num];
  const ten = Math.floor(num / 10);
  const one = num % 10;
  return `${tens[ten]}${one ? " " + ones[one] : ""}`;
}

function threeDigits(num) {
  const hundred = Math.floor(num / 100);
  const rest = num % 100;
  let str = "";
  if (hundred) str += `${ones[hundred]} Hundred`;
  if (rest) str += `${hundred ? " " : ""}${twoDigits(rest)}`;
  return str;
}

export function numberToWords(amount) {
  const num = Math.floor(Number(amount) || 0);
  const paise = Math.round(((Number(amount) || 0) - num) * 100);

  if (num === 0 && paise === 0) return "Zero Rupees Only";

  let remaining = num;
  const crore = Math.floor(remaining / 10000000);
  remaining %= 10000000;
  const lakh = Math.floor(remaining / 100000);
  remaining %= 100000;
  const thousand = Math.floor(remaining / 1000);
  remaining %= 1000;
  const hundredPart = remaining;

  let parts = [];
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (hundredPart) parts.push(`${threeDigits(hundredPart)}`);

  let words = parts.join(" ").trim();
  words = words ? `${words} Rupees` : "Zero Rupees";

  if (paise > 0) {
    words += ` and ${twoDigits(paise)} Paise`;
  }

  return `${words} Only`;
}

export default numberToWords;
