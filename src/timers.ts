export interface TimersController {
  /**
   * Runs all timers.
   */
  runAll: typeof jest.runAllTimers;
  /**
   * Runs pending timers.
   */
  runPending: typeof jest.runOnlyPendingTimers;
  /**
   * Advances timers by time.
   *
   * @param msToRun Milliseconds to run.
   */
  advance: typeof jest.advanceTimersByTime;
}

/**
 * useTimers mocks timers.
 *
 * @example
 *
 *     const timers = useTimers();
 *
 *     it("should run pending timers", () => {
 *       let triggered = 0;
 *       setTimeout(() => { triggered++; }, 1000);
 *       timers.runPending();
 *       expect(triggered).toBe(1);
 *     });
 *
 * @returns {@link TimersController}
 */
export function useTimers(): TimersController {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  return {
    runAll: jest.runAllTimers,
    runPending: jest.runOnlyPendingTimers,
    advance: jest.advanceTimersByTime,
  };
}
