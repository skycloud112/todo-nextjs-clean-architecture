export const toISOString = (date: Date): string => date.toISOString();

export const fromISOString = (isoString: string): Date => new Date(isoString);
