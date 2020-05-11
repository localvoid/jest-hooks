<p align="center">
  <img width="622" height="457" src="https://localvoid.github.io/jest-hooks/example.png">
</p>

`jest-hooks` is a collection of hooks for testing with [Jest](https://jestjs.io/) library.

## Hooks

### State

`useTestState(initState)` creates transient test state. `initState` argument is a function that initializes state before
each test.

```js
describe("state", () => {
  const [get, set] = useTestState(() => 0);

  it("should set state", () => {
    set(1);
    expect(get()).toBe(1);
  });

  it("should reset state", () => {
    expect(get()).toBe(0);
  });
});
```

`useTestStateProxy(initState)` creates transient state wrapped in a `Proxy` object.

```js
import { useTestStateProxy } from "jest-hooks";

describe("state", () => {
  const el = useTestStateProxy((clean) => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    clean(() => {
      el.remove();
    });
    return el;
  });

  it("should modify text content", () => {
    el.textContent = "text";
    expect(el.textContent).toBe("text");
  });

  it("should create a new element", () => {
    expect(el.textContent).toBe("");
  });
});
```

### Environment

`useEnv(kev, value)` overrides `process.env` before each tests and restores it to the original value after each test.

```js
import { useEnv } from "jest-hooks";

function throwsInDevMode() {
  if (process.env.NODE_ENV !== "production") {
    throw Error();
  }
}

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
```

### Modules

`useResetModules()` resets modules before each test (`jest.resetModules()`).

`useModule(module)` imports module before each test.

```js
import { useResetModules, useTestState } from "jest-hooks";

useResetModules();
const m = useModule("module-with-global-state");

it("should modify global state", () => {
  m.set(1);
  expect(m.get()).toBe(1);
});

it("should reload module", () => {
  expect(m.get()).toBe(0);
});
```

### Timers

`useTimers()` mocks timers `jest.useFakeTimers()` before each test and resets them after each test
`jest.useRealTimers()`.

```js
import { useTimers } from "jest-hooks";

const timers = useTimers();

describe("timers", () => {
  it("should advance time", () => {
    let triggered = 0;
    setTimeout(() => { triggered++; }, 1000);
    setTimeout(() => { triggered++; }, 2000);
    timers.advance(1500);
    expect(triggered).toBe(1);
  });
});
```

### Mock

`useMockFn(implementation)` creates a mock function (`jest.fn()`) and resets it after each test.

```js
import { useResetModules, useModule, useMockFn } from "jest-hooks";

useResetModules();
const video = useModule("video");
const play = useMockFn(() => video.play);

describe("function", () => {
  it("should mock function", () => {
    play();
    expect(play).toHaveBeenCalled();
  });

  it("should reset mocked function", () => {
    expect(play).not.toHaveBeenCalled();
  });
});
```

`useSpyOn(object, method, accessType)` creates a spy object (`jest.spyOn()`) and resets it after each test.


```js
import { useResetModules, useModule, useSpyOn } from "jest-hooks";

useResetModules();
const video = useModule("video");
const spy = useSpyOn(() => video, "play");

describe("spy", () => {
  it("should spy on a method", () => {
    video.play();
    expect(spy).toHaveBeenCalled();
  });

  it("should reset spy instance", () => {
    expect(spy).not.toHaveBeenCalled();
  });
});
```
