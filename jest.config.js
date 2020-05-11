module.exports = {
  testEnvironment: "node",
  transform: { "\\.ts$": "ts-jest" },
  testMatch: ["**/__tests__/*.spec.ts"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "\\.snap$",
    "\\.jest$",
  ],
  moduleFileExtensions: ["js", "ts"],
  coverageReporters: ["text", "json", "lcov", "html"],
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["/__tests__/", "/node_modules/"],
  cacheDirectory: ".jest/cache",
};
