# jquery.filter-list.js
> Filter a list with an input field, without the hassle [Check it out on JSFiddle](TODO)

## Features
-
- Check "on" the All checkbox while other checkboxes are on and they will check "off"
- Check all A,B,C "off" while All is "off" too and All will check "on"
- A change event is always triggered for plugin who depend on this

## Install
Download and include the javascript file.
```html
<script src="jquery.filter-list.js"></script>
```

## Basic usage
Check out `demo.html` for all examples.

Put the selector for the list in the `data-filter-list` attribute. (This attribute can be changed with options)
```html
<input type="text" data-filter-list="#fruit-list-1">
<ul id="fruit-list-1">
	<li>Apple</li>
	<li>Apricot</li>
	<li>Avocado</li>
	<li>Banana</li>
</ul>
```

Call the plugin on the desired selector

```javascript
$(function () {
	// Document ready
	$('[data-filter-list]').filterList();
});
```

## Only filter on enter key and on search

It is simple to disable the keyup event and only allow enter to filter the list.
```html
<input class="basic-search-on-enter" type="text" data-filter-list="#fruit-list-2"> <button class="trigger-search">Trigger search</button>
<ul id="fruit-list-2">
	<li>Apple</li>
	<li>Apricot</li>
	<li>Avocado</li>
	<li>Banana</li>
</ul>
```

Triggering `search` on the input field is the same as pressing enter.
```javascript
$('.basic-search-on-enter').filterList({
	isFilteredOnKeyup: false
});

$('.trigger-search').on('click', function (e) {
	e.preventDefault();
	$(this).parent().find('input').trigger('search');
});
```

## Toggle with class names instead of show/hide
By default does the filter call the `show`/`hide` methods on the jQuery elements. Sometimes this is not desired, so you can set it to use class names: which uses `is-hidden` and `is-shown` by default. (Most implementations will not require the `is-shown` class)


## Listening to filter events
It is easy to build your application around filter list because it's easy to see what matches are returned.

```javascript
/**
 * @param {string} searchValue
 * @param {array} matches, contains jQuery elements
 * @param {array} nonMatches, contains jQuery elements
 * @param {array} plugin, reference to the plugin
 */
$('#filter-list-listening').filterList()
	.on('filter', function (searchValue, matches, nonMatches, plugin) {
		// do stuff...
	});
```

## Options and defaults
Most options speak for themselves

```javascript
$('[data-filter-list]').filterList({
	isToggledWithClassNames: false,
	isFilteredOnKeyup: true,
	filterListAttribute: 'data-filter-list',
	selectorItem: 'li',
	classNameHidden: 'is-hidden',
	classNameShown: 'is-shown'
});
```

## Authors
This plugin is released by Aan Zee and is mainly developed by [Jeroen Ransijn](https://github.com/jeroenransijn)