export default function currency(num) {
  let n = +num;
  if (isNaN(n)) {
    return;
  }
  return `$${n.toFixed(0).replace(/./g, (char, idx, str) => {
    const replacedStr =
      idx && char !== '.' && (str.length - idx) % 3 === 0
        ? `, ${char}`.replace(/\s/g, '')
        : char;
    return replacedStr;
  })}`;
}
