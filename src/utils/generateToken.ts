export function generateOtpToken(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
