/**
 * Mutable Proxy.
 */
export type MutableProxy<T> = [T, (newValue: T) => void];

/**
 * createMutableProxy creates a mutable proxy.
 *
 * @param isFunction Proxified object should have `typeof obj === "function"`.
 * @returns {@link MutableProxy}
 */
export function createMutableProxy<T extends object>(isFunction?: boolean): MutableProxy<T> {
  let target: any;
  return [
    new Proxy<T>(isFunction ? () => { /**/ } : Object.create(null), {
      getPrototypeOf: (oTarget) => Reflect.getPrototypeOf(target),
      setPrototypeOf: (oTarget, proto) => Reflect.setPrototypeOf(target, proto),
      isExtensible: (oTarget) => Reflect.isExtensible(target),
      preventExtensions: (oTarget) => Reflect.preventExtensions(target),
      getOwnPropertyDescriptor: (oTarget, key) => Reflect.getOwnPropertyDescriptor(target, key),
      defineProperty: (oTarget, key, desc) => Reflect.defineProperty(target, key, desc),
      has: (oTarget, key) => Reflect.has(target, key),
      get: (oTarget, key) => Reflect.get(target, key),
      set: (oTarget, key, value) => Reflect.set(target, key, value),
      deleteProperty: (oTarget, key) => Reflect.deleteProperty(target, key),
      ownKeys: (oTarget) => Reflect.ownKeys(target),
      apply: (oTarget, thisArg, args) => Reflect.apply(target, thisArg, args),
      construct: (oTarget, args, newTarget) => Reflect.construct(target, args, newTarget),
    }),
    (value: T) => {
      target = value;
    },
  ];
}
