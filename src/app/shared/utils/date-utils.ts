export function calculateDateDifferenceInDays(
    date1: Date,
    date2: Date,
): number {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const diffTime = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diffTime / MS_PER_DAY);
}

export function getDateDifferenceInDays(publicationDate: string): number {
    const publishedDate = new Date(publicationDate);
    const currentDate = new Date();
    return calculateDateDifferenceInDays(currentDate, publishedDate);
}
