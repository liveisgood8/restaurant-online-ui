export function monetize(amount?: number): string {
  return (amount || 0) + '₽';
}
