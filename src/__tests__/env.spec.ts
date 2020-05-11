import { useEnv } from "../env";

function throwsInDevMode(): void {
  if (process.env.NODE_ENV !== "production") {
    throw Error();
  }
}

describe("environment", () => {
  describe("development", () => {
    useEnv("NODE_ENV", "development");

    it("should perform runtime checks in development mode", () => {
      expect(() => { throwsInDevMode(); }).toThrowError();
    });
  });

  describe("production", () => {
    useEnv("NODE_ENV", "production");

    it("should not perform runtime checks in production mode", () => {
      expect(() => { throwsInDevMode(); }).not.toThrowError();
    });
  });
});
