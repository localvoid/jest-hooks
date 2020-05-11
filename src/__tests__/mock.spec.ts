import { resolve } from "path";
import { useResetModules, useModule } from '../module';
import { useMockFn, useSpyOn } from "../mock";

useResetModules();
const m = useModule<typeof import("./fixtures/mock")>(
  resolve(__dirname, "./fixtures/mock"),
);

describe("mock", () => {
  describe("function", () => {
    const fn = useMockFn(() => m.fn);

    it("should mock function", () => {
      fn();
      expect(fn).toHaveBeenCalled();
      expect(m.state()).toBe(1);
    });

    it("should reset mocked function", () => {
      expect(fn).not.toHaveBeenCalled();
      expect(m.state()).toBe(0);
    });
  });

  describe("spy", () => {
    const spy = useSpyOn(() => m, "fn");

    it("should spy on method", () => {
      m.fn();
      expect(spy).toHaveBeenCalled();
      expect(m.state()).toBe(1);
    });

    it("should reset mocked function", () => {
      expect(spy).not.toHaveBeenCalled();
      expect(m.state()).toBe(0);
    });
  });
});
