/* eslint-disable unicorn/prevent-abbreviations */
import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

export function targetProp([handler, property]) {
  assert(
    `Expected '${handler}' to be a function, if present.`,
    !handler || typeof handler === 'function'
  );

  assert(`Expected 'property', none is given.`, property !== undefined);

  return function (event) {
    assert(
      `Expected '${event}' to have a 'target' with a '${property}' on it.`,
      event && event.target && event.target[property] !== undefined
    );

    if (handler) handler(event.target[property]);
  };
}

export default helper(targetProp);
