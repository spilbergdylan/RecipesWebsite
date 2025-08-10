export function slugToDisplay(slug: string) {
  switch (slug) {
    case 'spilbergs':
      return 'The Spilbergs';
    case 'kahanes':
      return 'The Kahanes';
    case 'brookes':
      return 'The Brookes';
    case 'nona-saba':
      return 'Nona and Saba';
    default:
      return slug;
  }
}

export function formatDate(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string') {
    try {
      const arr = JSON.parse(value);
      return Array.isArray(arr) ? arr.map(String) : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
} 