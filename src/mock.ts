import { createMutableProxy } from "./proxy";

/**
 * useMockFn creates a mock function and resets it after each test.
 *
 * @example
 *
 *     const video = useModule("video");
 *     const play = useMockFn(() => video.play);
 *
 *     it("should mock function", () => {
 *       play();
 *       expect(play).toHaveBeenCalled();
 *     });
 *
 *     it("should reset mocked function", () => {
 *       expect(play).not.toHaveBeenCalled();
 *     });
 *
 *
 * @param implementation Optional implementation.
 * @returns Mocked function.
 */
export function useMockFn<T = any, Y extends any[] = any>(
  implementation?: () => (...args: Y) => T,
): jest.Mock<T, Y> {
  const fn = jest.fn();
  if (implementation) {
    beforeEach(() => {
      fn.mockImplementation(implementation());
    });
  }
  afterEach(() => {
    fn.mockReset();
    fn.mockClear();
  });
  return fn;
}

/**
 * useSpyOn creates a spy object and resets it after each test.
 *
 * @example
 *
 *     const video = useModule("video");
 *     const spy = useSpyOn(() => video, "play");
 *
 *     it("should spy on a method", () => {
 *       video.play();
 *       expect(spy).toHaveBeenCalled();
 *     });
 *
 *     it("should reset spy instance", () => {
 *       expect(spy).not.toHaveBeenCalled();
 *     });
 *
 *
 * @param object Target.
 * @param method Target method.
 * @param accessType Access type.
 * @returns Spy object.
 */
export function useSpyOn<T extends {}, M extends jest.NonFunctionPropertyNames<Required<T>>>(
  object: () => T,
  method: M,
  accessType: "get",
): jest.SpyInstance<Required<T>[M], []>;
export function useSpyOn<T extends {}, M extends jest.NonFunctionPropertyNames<Required<T>>>(
  object: () => T,
  method: M,
  accessType: "set",
): jest.SpyInstance<void, [Required<T>[M]]>;
export function useSpyOn<T extends {}, M extends jest.FunctionPropertyNames<Required<T>>>(
  object: () => T,
  method: M,
): Required<T>[M] extends (...args: any[]) => any ?
  jest.SpyInstance<ReturnType<Required<T>[M]>, jest.ArgsType<Required<T>[M]>> : never;
export function useSpyOn<T extends {}, M extends jest.ConstructorPropertyNames<Required<T>>>(
  object: () => T,
  method: M
): Required<T>[M] extends new (...args: any[]) => any ?
  jest.SpyInstance<InstanceType<Required<T>[M]>, jest.ConstructorArgsType<Required<T>[M]>> : never;
export function useSpyOn(object: any, methodName: any, accessType?: any): any {
  const [state, setState] = createMutableProxy<any>();
  beforeEach(() => {
    setState(jest.spyOn(object(), methodName, accessType));
  });
  afterEach(() => {
    state.mockReset();
    state.mockClear();
  });

  return state;
}
