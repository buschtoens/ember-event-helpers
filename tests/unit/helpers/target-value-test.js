import { module, test } from 'qunit';

import { targetValue } from 'ember-event-helpers/helpers/target-value';

module('Unit | Helper | target-value', function () {
  test('it throws an assertion, when used incorrectly', function (assert) {
    assert.expectAssertion(() => {
      targetValue(['not a function']);
    }, `Expected 'not a function' to be a function, if present.`);

    assert.expectAssertion(() => {
      targetValue([])('not an event');
    }, `Expected 'not an event' to have a 'target' with a 'value' on it.`);

    assert.expectAssertion(() => {
      targetValue([])({ target: {} });
    }, `Expected '[object Object]' to have a 'target' with a 'value' on it.`);

    assert.expectAssertion(() => {
      targetValue([])({});
    }, `Expected '[object Object]' to have a 'target' with a 'value' on it.`);
  });

  test('it works with a handler', function (assert) {
    targetValue([value => assert.equal(42, value)])({
      target: {
        value: 42
      }
    });
  });
});
