import { useResetModules, useModule } from "../module";

useResetModules();
const m = useModule<typeof import("./fixtures/module-with-global-state")>(
  __dirname, "./fixtures/module-with-global-state",
);

describe("module", () => {
  it("should modify global state", () => {
    m.set(1);
    expect(m.get()).toBe(1);
  });

  it("should reset global state", () => {
    expect(m.get()).not.toBe(1);
  });
});
