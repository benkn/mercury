const skipWords = new Set(['AND']);

export function readable(categoryName: string): string {
  const parts = categoryName.split('_');
  return parts.map((part) => capitalize(part)).join(' ').trim();
}

function capitalize(s: string): string {
  if (skipWords.has(s)) {
    return s.toLocaleLowerCase();
  }
  return s.charAt(0).toLocaleUpperCase() + s.substring(1).toLocaleLowerCase();
}
