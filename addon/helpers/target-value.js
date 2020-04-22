import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

export function targetValue([handler]) {
  assert(
    `Expected '${handler}' to be a function, if present.`,
    !handler || typeof handler === 'function'
  );

  return function (event) {
    assert(
      `Expected '${event}' to have a 'target' with a 'value' on it.`,
      event && event.target && event.target.value
    );

    if (handler) handler(event.target.value);
  };
}

export default helper(targetValue);
