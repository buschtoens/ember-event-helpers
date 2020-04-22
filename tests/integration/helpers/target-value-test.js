import { render, fillIn } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | target-value', function (hooks) {
  setupRenderingTest(hooks);

  test('works with input event', async function (assert) {
    this.update = value => {
      assert.equal(value, 42);
    };
    await render(
      hbs`<input {{on "input" (target-value this.update)}} data-test-input>`
    );

    await fillIn('[data-test-input]', 42);
  });

  test('works with change event', async function (assert) {
    this.update = value => {
      assert.equal(value, 42);
    };
    await render(
      hbs`<input {{on "change" (target-value this.update)}} data-test-input>`
    );

    await fillIn('[data-test-input]', 42);
  });
});
