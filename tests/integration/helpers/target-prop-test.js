/* eslint-disable unicorn/prevent-abbreviations */
import { render, click, fillIn } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | target-prop', function (hooks) {
  setupRenderingTest(hooks);

  test('[checked] works with input event', async function (assert) {
    this.update = value => {
      assert.ok(value);
    };
    await render(
      hbs`<input type="checkbox" {{on "input" (target-prop this.update "checked")}} data-test-input>`
    );

    await click('[data-test-input]');
  });

  test('[checked] works with change event', async function (assert) {
    this.update = value => {
      assert.ok(value);
    };
    await render(
      hbs`<input type="checkbox" {{on "change" (target-prop this.update "checked")}} data-test-input>`
    );

    await click('[data-test-input]');
  });

  test('[checked] send empty value', async function (assert) {
    this.update = value => {
      assert.notOk(value);
    };

    await render(
      hbs`<input type="checkbox" checked {{on "input" (target-prop this.update "checked")}} data-test-input>`
    );

    await click('[data-test-input]');
  });

  test('[value] works with input event', async function (assert) {
    this.update = value => {
      assert.equal(value, 42);
    };
    await render(
      hbs`<input {{on "input" (target-prop this.update "value")}} data-test-input>`
    );

    await fillIn('[data-test-input]', 42);
  });

  test('[value] works with change event', async function (assert) {
    this.update = value => {
      assert.equal(value, 42);
    };
    await render(
      hbs`<input {{on "change" (target-prop this.update "value")}} data-test-input>`
    );

    await fillIn('[data-test-input]', 42);
  });

  test('[value] send empty value', async function (assert) {
    this.update = value => {
      assert.equal(value, '');
    };

    await render(
      hbs`<input value="42" {{on "input" (target-prop this.update "value")}} data-test-input>`
    );

    await fillIn('[data-test-input]', '');
  });
});
