function normalizedName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
}

export function compareCandidateNames(left: string, right: string): number {
  const normalizedLeft = normalizedName(left)
  const normalizedRight = normalizedName(right)
  if (normalizedLeft < normalizedRight) return -1
  if (normalizedLeft > normalizedRight) return 1
  return 0
}
