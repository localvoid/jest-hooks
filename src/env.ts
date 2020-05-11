/**
 * useEnv overrides `process.env` before each test and restores it to the original value after each test.
 *
 * @example
 *
 *     describe("development", () => {
 *       useEnv("NODE_ENV", "development");
 *
 *       it("should perform runtime checks in development mode", () => {
 *         expect(() => { throwsInDevMode(); }).toThrowError();
 *       });
 *     });
 *
 *     describe("production", () => {
 *       useEnv("NODE_ENV", "production");
 *
 *       it("should not perform runtime checks in production mode", () => {
 *         expect(() => { throwsInDevMode(); }).not.toThrowError();
 *       });
 *     });
 *
 * @param key Key.
 * @param value Value.
 */
export function useEnv(key: string, value: string): void {
  const prev = process.env[key];
  beforeEach(() => {
    process.env[key] = value;
  });
  afterEach(() => {
    process.env[key] = prev;
  });
}
