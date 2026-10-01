// Marker for content that must be supplied or confirmed before publishing.
// `npm run build -- --strict` fails while any marker is left in the output.
export const TODO_ATTR = 'data-todo';

export function todo(label) {
  return `<mark class="todo" ${TODO_ATTR}>${label}</mark>`;
}
