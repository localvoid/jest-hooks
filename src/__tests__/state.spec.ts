import { useTestState, useTestStateProxy } from "../state";

describe("state", () => {
  describe("with init function", () => {
    const [get, set] = useTestState(() => 0);

    it("should set state", () => {
      set(1);
      expect(get()).toBe(1);
    });

    it("should reset state", () => {
      expect(get()).toBe(0);
    });
  });

  describe("with clean hooks", () => {
    const cleanHook = jest.fn();
    useTestState((clean) => {
      clean(cleanHook);
      return {};
    });

    it("should not invoke clean hooks before tests", () => {
      expect(cleanHook).toHaveBeenCalledTimes(0);
    });

    it("should invoke clean hooks after tests", () => {
      expect(cleanHook).toHaveBeenCalledTimes(1);
    });
  });
});

describe("state proxy", () => {
  describe("with init function", () => {
    const obj = useTestStateProxy(() => ({
      value: 0,
    }));

    it("should modify state", () => {
      obj.value = 1;
      expect(obj.value).toBe(1);
    });

    it("should reset state", () => {
      expect(obj.value).toBe(0);
    });
  });

  describe("with clean hooks", () => {
    const cleanHook = jest.fn();
    useTestStateProxy((clean) => {
      clean(cleanHook);
      return {};
    });

    it("should not invoke clean hooks before tests", () => {
      expect(cleanHook).toHaveBeenCalledTimes(0);
    });

    it("should invoke clean hooks after tests", () => {
      expect(cleanHook).toHaveBeenCalledTimes(1);
    });
  });
});
