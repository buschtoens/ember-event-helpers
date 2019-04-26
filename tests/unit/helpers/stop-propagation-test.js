import { stopPropagation } from 'ember-event-helpers/helpers/stop-propagation';
import { module, test } from 'qunit';

module('Unit | Helper | stop-propagation', function() {
  test('it throws an assertion, when used incorrectly', function(assert) {
    assert.expectAssertion(() => {
      stopPropagation(['not a function']);
    }, `Expected 'not a function' to be a function, if present.`);

    assert.expectAssertion(() => {
      stopPropagation([])('not an event');
    }, `Expected 'not an event' to be an Event and have a 'stopPropagation' method.`);

    assert.expectAssertion(() => {
      stopPropagation([])({ stopPropagation: 'not a method' });
    }, `Expected '[object Object]' to be an Event and have a 'stopPropagation' method.`);
  });

  test('it works without a handler', function(assert) {
    assert.expect(1);
    stopPropagation([])({
      stopPropagation: () => assert.ok(true, `it has called 'stopPropagation'`)
    });
  });

  test('it works with a handler', function(assert) {
    assert.expect(2);
    stopPropagation([() => assert.ok(true, 'it has called the handler')])({
      stopPropagation: () => assert.ok(true, `it has called 'stopPropagation'`)
    });
  });

  test(`it calls 'stopPropagation', even if the handler throws`, function(assert) {
    assert.expect(2);
    assert.throws(
      () =>
        stopPropagation([
          () => {
            throw new Error('foobar');
          }
        ])({
          stopPropagation: () =>
            assert.ok(true, `it has called 'stopPropagation'`)
        }),
      /foobar/,
      'The error has bubbled up'
    );
  });
});
