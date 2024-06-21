export function generateToken(length: number): string {
  // return Math.floor(1000 + Math.random() * 9000).toString();
  if (length === 4) {
    return Math.floor(1000 + Math.random() * 9000).toString();
  } else if (length === 6) {
    return Math.floor(100000 + Math.random() * 900000).toString();
  } else {
    throw new Error('Unsupported token length');
  }
}
