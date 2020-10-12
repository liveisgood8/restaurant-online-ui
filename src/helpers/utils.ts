export async function loadable(
  func: () => Promise<void>,
  loadingStateMutator: (isLoading: boolean) => void,
): Promise<void> {
  loadingStateMutator(true);
  await func();
  loadingStateMutator(false);
}
