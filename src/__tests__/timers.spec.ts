import { useTimers } from "../timers";

const timers = useTimers();

describe("timers", () => {
  it("should advance time", () => {
    let triggered = 0;
    setTimeout(() => { triggered++; }, 1000);
    setTimeout(() => { triggered++; }, 2000);
    timers.advance(1500);
    expect(triggered).toBe(1);
  });

  it("should run all timers", () => {
    let triggered = 0;
    function addTimeout() {
      setTimeout(() => {
        triggered++;
        if (triggered < 3) {
          addTimeout();
        }
      }, 1000);
    }
    addTimeout();
    timers.runAll();
    expect(triggered).toBe(3);
  });

  it("should run pending", () => {
    let triggered = 0;
    function addTimeout() {
      setTimeout(() => {
        triggered++;
        addTimeout();
      }, 1000);
    }
    addTimeout();
    timers.runPending();
    expect(triggered).toBe(1);
  });
});
