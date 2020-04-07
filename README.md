# ember-event-helpers

[![CI](https://github.com/buschtoens/ember-event-helpers/workflows/CI/badge.svg)](https://github.com/buschtoens/ember-event-helpers/actions)
[![npm version](https://badge.fury.io/js/ember-event-helpers.svg)](http://badge.fury.io/js/ember-event-helpers)
[![Download Total](https://img.shields.io/npm/dt/ember-event-helpers.svg)](http://badge.fury.io/js/ember-event-helpers)
[![Ember Observer Score](https://emberobserver.com/badges/ember-event-helpers.svg)](https://emberobserver.com/addons/ember-event-helpers)
[![Ember Versions](https://img.shields.io/badge/Ember.js%20Versions-%5E2.18%20%7C%7C%20%5E3.0-brightgreen.svg)](https://travis-ci.org/buschtoens/ember-event-helpers)
[![ember-cli Versions](https://img.shields.io/badge/ember--cli%20Versions-%5E2.13%20%7C%7C%20%5E3.0-brightgreen.svg)](https://travis-ci.org/buschtoens/ember-event-helpers)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![dependencies](https://img.shields.io/david/buschtoens/ember-event-helpers.svg)](https://david-dm.org/buschtoens/ember-event-helpers)
[![devDependencies](https://img.shields.io/david/dev/buschtoens/ember-event-helpers.svg)](https://david-dm.org/buschtoens/ember-event-helpers)

Complimentary template helpers to be used with the `{{on}}` element modifier
specified by [RFC #471 "`{{on}}` modifier"][rfc].

[rfc]: https://emberjs.github.io/rfcs/0471-on-modifier.html

## Installation

```
ember install ember-event-helpers
```

If you are below Ember 3.10, you'll also want to install the
[`{{on}}` modifier polyfill][ember-on-modifier]:

```
ember install ember-on-modifier
```

[ember-on-modifier]: https://github.com/buschtoens/ember-on-modifier

#### Compatibility

- Ember.js v2.18 or above
- ember-cli v2.13 or above

## Usage

| Template Helper                                                      | `Event` method                                           |
|----------------------------------------------------------------------|----------------------------------------------------------|
| **[`(prevent-default fn)`](#prevent-default)**                       | [`event.preventDefault()`][e-preventdefault]             |
| **[`(stop-propagation fn`](#stop-propagation)**                      | [`event.stopPropagation()`][e-stoppropagation]           |
| **[`(stop-immediate-propagation fn)`](#stop-immediate-propagation)** | [`stopImmediatePropagation`][e-stopimmediatepropagation] |

[e-preventdefault]: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
[e-stoppropagation]: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
[e-stopimmediatepropagation]: https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation

> 👉 For usage information on `{{on}}` itself, refer to the [RFC][rfc] or
> [polyfill documentation][ember-on-modifier].

All three template helpers return a function that, when invoked, will call the
associated `Event` method on the first argument. The helper themselves also take
an optional `fn` argument, which is a function that will be called synchronously
afterwards with all input arguments of the returned function. The return value
of `fn` is passed through.

Sounds complicated? Let's see some examples instead! 😅

### Template Helpers

#### `(prevent-default)`

Calls [`event.preventDefault()`][e-preventdefault].

Prevent the user agent from performing the default action, like toggling a
checkbox, when it is clicked. The event continues to propagate as usual.

```hbs
<label>
  <input type="checkbox" {{on "click" this.onClick}}>
  Click me baby, one more time!
</label>
<label>
  <input type="checkbox" {{on "click" (prevent-default this.onClick)}}>
  Can't touch this!
</label>
```

```ts
import Component from '@ember/component';
import { action } from '@ember/object';

export default class CheckboxesComponent extends Component {
  @action
  onClick(event: MouseEvent) {
    if (event.defaultPrevented) {
      console.log('Checkbox will not be toggled.');
    } else {
      console.log('Checkbox will be toggled.');
    }
  }
}
```

> 👉 The [`@action` decorator][@action] is used to bind the `onClick` method's
> `this` context to the component instance. This is not required here, since
> `this` is not accessed, but in order to not break with patterns, we still do
> it here.

[@action]: https://github.com/emberjs/rfcs/blob/master/text/0408-decorators.md#method-binding

Using the old [`{{action}}` modifier][action-event-propagation] you would
express the same thing like this:

```hbs
<label>
  <input type="checkbox" {{action this.onClick on="click"}}>
  Click me baby, one more time!
</label>
<label>
  <input type="checkbox" {{action this.onClick on="click" preventDefault=true}}>
  Can't touch this!
</label>
```

[action-event-propagation]: https://www.emberjs.com/api/ember/release/classes/Ember.Templates.helpers/methods/action?anchor=action#event-propagation

#### `(stop-propagation)`

Calls [`event.stopPropagation()`][e-stoppropagation].

Stops further propagation of the current event in the capturing phase (down the
DOM) and bubbling phase (up the DOM).

```hbs
<div class="outer" {{on "click" this.onOuterClick}}>
  <div class="inner-a" {{on "click" this.onInnerClick}}>
    I bubble.
  </div>
  <div class="inner-b" {{on "click" (stop-propagation this.onInnerClick)}}>
   I don't bubble.
  </div>
</div>
```

```ts
import Component from '@ember/component';
import { action } from '@ember/object';

export default class BubbleGumComponent extends Component {
  @action
  onOuterClick(event: MouseEvent) {
    console.log('outer');
  }

  @action
  onInnerClick(event: MouseEvent) {
    console.log('inner');
  }
}
```

Clicking `.inner-a` will print:

```
inner
outer
```

Clicking `.inner-b` will only print:

```
inner
```

If you enable the [`capture` event option][capture] and use `(stop-propagation)`
with it, the event propagation will already be stopped in the capture phase
("down the DOM").

[capture]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters

```hbs
<div class="outer" {{on "click" (stop-propagation this.onOuterClick)}}>
  <div class="inner" {{on "click" this.onInnerClick}}>
    My listener never gets called.
  </div>
</div>
```

Clicking `.inner` will only print:

```
outer
```

#### `(stop-immediate-propagation)`

> ⚠️ Not implemented yet.

Calls [`stopImmediatePropagation`][e-stopimmediatepropagation].

Like `stopPropagation`, but additionally even stopping any further listeners on
the _current_ element in the bubbling / capturing phase to be called.

> 👉 Imagine it like this: `stopPropagation` only stops further propagation
> _vertically_, so further down the DOM (capture phase) or back up the DOM
> (bubble phase). `stopImmediatePropagation` additionally prevents any further
> _horizontal_ propagation, so any further listeners on the same element will
> not be called.

In practice, you will probably never need this helper.

```hbs
<div class="outer" {{on "click" this.onOuterClick}}>
  <button {{on "click" (stop-propagation this.onInnerClickA)}} {{on "click" this.onInnerClickB}}>
    Both my listeners get called.
  </button>
  <button {{on "click" (stop-immediate-propagation this.onInnerClickA)}} {{on "click" this.onInnerClickB}}>
    Only my first listener gets called.
  </button>
</div>
```

```ts
import Component from '@ember/component';
import { action } from '@ember/object';

export default class BubbleGumComponent extends Component {
  @action
  onOuterClick(event: MouseEvent) {
    console.log('outer');
  }

  @action
  onInnerClickA(event: MouseEvent) {
    console.log('inner A');
  }

  @action
  onInnerClickB(event: MouseEvent) {
    console.log('inner B');
  }
}
```

Clicking the first button prints:

```
inner A
inner B
```

The listeners are executed in the order they were registered in. The listener on
`.outer` is not called, since the first listener uses `(stop-propagation)`, so
there is no bubbling.

Clicking the second button prints:

```
inner A
```

Since the first listener uses `(stop-immediate-propagation)`, the second
listener is not called. The `.outer` listener is also not called.

### Currying / Partial Application

If you want to curry the function call / partially apply arguments, you can do
so using the [`{{fn}}` helper][fn-helper]:

[fn-helper]: https://github.com/emberjs/rfcs/blob/master/text/0470-fn-helper.md

```hbs
{{#each this.users as |user|}}
  <button {{on "click" (prevent-default (fn this.deleteUser user))}}>
    Delete {{user.name}}
  </button>
{{/each}}
```

### Combining Helpers

You can nest the helpers:

```hbs
<button {{on "click" (prevent-default (stop-propagation this.onClick))}}>
  Click me
</button>
```

Or register additional "void" helpers, since the `fn` argument is optional:

```hbs
<button
  {{on "click" (prevent-default)}}
  {{on "click" (stop-propagation)}}
  {{on "click" this.onClick))}}
>
  Click me
</button>
```
