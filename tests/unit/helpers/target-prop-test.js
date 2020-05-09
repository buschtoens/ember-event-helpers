/* eslint-disable unicorn/prevent-abbreviations */
import { module, test } from 'qunit';

import { targetProp } from 'ember-event-helpers/helpers/target-prop';

module('Unit | Helper | target-prop', function () {
  test('it throws an assertion, when used incorrectly', function (assert) {
    assert.expectAssertion(() => {
      targetProp(['not a function']);
    }, `Expected 'not a function' to be a function, if present.`);

    assert.expectAssertion(() => {
      targetProp([() => {}]);
    }, `Expected 'property', none is given.`);

    assert.expectAssertion(() => {
      targetProp([() => {}, 'checked'])('not an event');
    }, `Expected 'not an event' to have a 'target' with a 'checked' on it.`);

    assert.expectAssertion(() => {
      targetProp([() => {}, 'checked'])({ target: {} });
    }, `Expected '[object Object]' to have a 'target' with a 'checked' on it.`);

    assert.expectAssertion(() => {
      targetProp([() => {}, 'checked'])({});
    }, `Expected '[object Object]' to have a 'target' with a 'checked' on it.`);
  });

  test('it works with a handler', function (assert) {
    targetProp([value => assert.ok(value), 'checked'])({
      target: {
        checked: true
      }
    });
  });
});
