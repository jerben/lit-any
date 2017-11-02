# lit-any

Building late-bound User Interface with `lit-html` without actually creating (too many) custom elements

## Quick guide

### 1. Install

``` bash
yarn add lit-any
```

### 2. Set up how to render your content

You want to display an object which represents a person but the avatar comes in two flavors. Of course,
it's possible to keep abusing `if` statements or drop in a `<template is="dom-if">` (old syntax, I know).

With `lit-any` you can deconstruct your HTML by defining partial templates which will be rendered when
they are really needed.

```javascript
import { ViewTemplates } from 'lit-any';
import { html } from 'lit-html';

ViewTemplates.when
    .value(isPerson)
    .renders((renderFunc, person) => html`
        <person-element name="${person.name}">
            <span slot="avatar">
                ${renderFunc(person.avatar, 'person-element-avatar')}
            </span>
        </person-element>
    `);

ViewTemplates.when
    .scope('person-element-avatar')
    .value(v => v.url)
    .renders((_, image) => html`
        <img src="${image.url}" alt="avatar" />
    `);

ViewTemplates.when
    .scope('person-element-avatar')
    .value(v => v.large)
    .renders((_, image) => html`
        <a href="${image.url}">
            <img src="${image.large}" alt="avatar" />
        </a>        
    `);

function isPerson(value) {
    return value.type === 'Person';
}
```

This will set up the rendering so that `<person-element>` is displayed for a person but the avatar will
be rendered based on the presence of the `large` property. 

### 3a. Render anywhere

To do actual rendering you don't really need a dedicated custom element. Any container will be fine

```html
<div id="personCoontainer"></div>
```

```javascript
import { render } from 'lit-any';

const person = {
    type: 'Person',
    image: {
        url: 'https://s.gravatar.com/avatar/1497654c2d1af3cef4987234d1aced57?s=80',
        large: 'https://s.gravatar.com/avatar/1497654c2d1af3cef4987234d1aced57?s=800'
    }
};

const personContainer = document.querySelector('#personContainer');

render({ value: person }, personContainer);
```

### 3b. Render element

Alternatively you can use the `lit-view` instead of rendering directly to any node.

```html
<lit-view id="personCoontainer"></lit-view>
```

```javascript
const person = {
    type: 'Person',
    image: {
        url: 'https://s.gravatar.com/avatar/1497654c2d1af3cef4987234d1aced57?s=80',
        large: 'https://s.gravatar.com/avatar/1497654c2d1af3cef4987234d1aced57?s=800'
    }
};

const personContainer = document.querySelector('#personContainer');

personContainer.value = person;
```

## To Do

1. `lit-form` element to build forms with individual input controls
