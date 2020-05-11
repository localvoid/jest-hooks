import { createMutableProxy } from "./proxy";

/**
 * useTestState creates transient state.
 *
 * @example
 *
 *     const [get, set] = useTestState(() => 0);
 *
 *     it("should set state", () => {
 *       set(1);
 *       expect(get()).toBe(1);
 *     });
 *
 *     it("should reset state", () => {
 *       expect(get()).toBe(0);
 *     });
 *
 *
 * @param initState Init state function or initial state value.
 * @returns State getter and setter functions.
 */
export function useTestState<T>(initState: (clean: (hook: () => void) => void) => T): [() => T, (v: T) => void] {
  let state: T | undefined;
  const cleanHooks: (() => void)[] = [];
  const clean = (hook: () => void) => {
    cleanHooks.push(hook);
  };
  beforeEach(() => {
    state = initState(clean);
  });
  afterEach(() => {
    cleanHooks.forEach((hook) => { hook(); });
    state = void 0;
  });

  return [
    () => state!,
    (v: T) => {
      state = v;
    },
  ];
}

/**
 * useTestStateProxy creates transient state wrapped in a `Proxy` object.
 *
 * @example
 *
 *     const el = useTestStateProxy((clean) => {
 *       const el = document.createElement("div");
 *       document.body.appendChild(el);
 *       clean(() => {
 *         el.remove();
 *       });
 *       return el;
 *     });
 *
 *     it("should set text context", () => {
 *       el.textContent = "text";
 *       expect(el.textContent).toBe("text");
 *     });
 *
 *     it("should create a new element", () => {
 *       expect(el.textContent).toBe("");
 *     });
 *
 *
 * @param initState Init state function.
 * @param isFunction Proxified object should have `typeof obj === "function"`.
 * @returns Proxified state.
 */
export function useTestStateProxy<T extends object>(
  initState: (clean: (hook: () => void) => void) => T,
  isFunction?: boolean,
): T;
export function useTestStateProxy<T extends object>(initState: any, isFunction?: boolean): T {
  const [state, setState] = createMutableProxy<T>(isFunction);
  const cleanHooks: (() => void)[] = [];
  const clean = (hook: () => void) => {
    cleanHooks.push(hook);
  };
  beforeEach(() => {
    setState(initState(clean));
  });
  afterEach(() => {
    cleanHooks.forEach((hook) => { hook(); });
    setState(void 0 as any);
  });

  return state;
}
