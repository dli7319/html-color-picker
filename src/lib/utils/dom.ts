/**
 * Invokes `fn` for every direct child of `parent` that is an instance of `type`.
 */
export function forEachMatchingChild<T extends Element>(
  parent: Element,
  type: new (...args: any[]) => T,
  fn: (child: T) => void,
): void {
  for (const child of parent.children) {
    if (child instanceof type) fn(child);
  }
}
