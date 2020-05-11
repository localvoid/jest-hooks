import { join } from "path";
import { createMutableProxy } from "./proxy";

/**
 * useResetModules resets modules before each test (`jest.resetModules()`).
 */
export function useResetModules(): void {
  beforeEach(() => {
    jest.resetModules();
  });
}

/**
 * useModule imports module before each test.
 *
 * @example
 *
 *     useResetModules();
 *     const m = useModule("module-with-global-state");
 *
 *     it("should modify global state", () => {
 *       m.set(1);
 *       expect(m.get()).toBe(1);
 *     });
 *
 *     it("should reset global state", () => {
 *       expect(m.get()).not.toBe(1);
 *     });
 *
 *
 * @param paths Module path segments.
 * @returns Proxified module.
 */
export function useModule<T extends object>(...paths: string[]): T {
  const path = join(...paths);
  const [state, setState] = createMutableProxy<T>();
  beforeEach(async () => {
    setState(await import(path));
  });
  return state;
}
