export function updateCounter(count: string, increment: boolean): string {
    const parsedCount = parseInt(count, 10) || 0;
    return (increment ? parsedCount + 1 : parsedCount - 1).toString();
}
