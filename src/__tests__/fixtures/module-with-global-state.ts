let state = 0;

export function get(): number {
  return state;
}

export function set(value: number): void {
  state = value;
}
