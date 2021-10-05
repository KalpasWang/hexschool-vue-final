export default function ceil(num) {
  let n = +num;
  if (isNaN(n)) {
    return;
  }
  return Math.ceil(n);
}
