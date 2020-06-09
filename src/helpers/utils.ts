export function getCategoryIdFromUrlSearch (searchPartOfUrl: string): number | undefined {
  const categoryIdString = new URLSearchParams(searchPartOfUrl).get('categoryId');
  if (categoryIdString) {
    return parseInt(categoryIdString);
  }
}
