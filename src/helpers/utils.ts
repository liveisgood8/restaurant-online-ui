export function getCategoryIdFromUrlSearch (searchPartOfUrl: string): number | undefined {
  const categoryIdString = new URLSearchParams(searchPartOfUrl).get('categoryId');
  if (categoryIdString) {
    return parseInt(categoryIdString);
  }
}

export async function loadable(
  func: () => Promise<void>,
  loadingStateMutator: (isLoading: boolean) => void,
): Promise<void> {
  loadingStateMutator(true);
  await func();
  loadingStateMutator(false);
}
