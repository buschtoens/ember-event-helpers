/* eslint-disable unicorn/prevent-abbreviations */
import { render, click } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | target-prop', function (hooks) {
  setupRenderingTest(hooks);

  test('works with input event', async function (assert) {
    this.update = value => {
      assert.ok(value);
    };
    await render(
      hbs`<input type="checkbox" {{on "input" (target-prop this.update "checked")}} data-test-input>`
    );

    await click('[data-test-input]');
  });

  test('works with change event', async function (assert) {
    this.update = value => {
      assert.ok(value);
    };
    await render(
      hbs`<input type="checkbox" {{on "change" (target-prop this.update "checked")}} data-test-input>`
    );

    await click('[data-test-input]');
  });

  test('send empty value', async function (assert) {
    this.update = value => {
      assert.notOk(value);
    };

    await render(
      hbs`<input type="checkbox" checked {{on "input" (target-prop this.update "checked")}} data-test-input>`
    );

    await click('[data-test-input]');
  });
});
