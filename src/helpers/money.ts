export function monetize(amount?: number): string {
  return (amount || 0) + '₽';
}

export function bonusify(amount?: number): string {
  return (amount || 0) + '฿';
}
