export function generateWaveformHeights(seedId: number, count = 20): number[] {
  return Array.from({ length: count }, (_, i) => 30 + (((seedId * 31 + i * 17) % 100) % 70))
}
