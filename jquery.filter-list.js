/**
 * jquery.filter-list.js
 * ------------------------------------------------------
 * Authors: Jeroen Ransijn
 * Company: Aan Zee
 * version: 1.0
 * Usage: $('[data-filter-list]').filterList();
 */
;(function (root, $, undefined) {
	"use strict";

	var pluginName = "filterList";
	var defaults = {
		isToggledWithClassNames: false,
		isFilteredOnKeyup: true,
		filterListAttribute: 'data-filter-list',
		selectorItem: 'li',
		classNameHidden: 'is-hidden',
		classNameShown: 'is-shown'
	};

	// Case-insensitive "contains"
	$.expr[':'].Contains = function(a,i,m){
		return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;
		this.$el = $(element);

		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {

		init: function () {
			var listSelector = this.$el.attr( this.options['filterListAttribute'] );
			this.$list = $(listSelector);

			if (this.$list.length > 0) {
				this.$el
					.on('keyup', this._onKeyup.bind(this))
					.on('search', this.search.bind(this));
			}
		},
		reset: function () {
			if ( this.options['isToggledWithClassNames'] ) {
				this.$list.find( this.options['selectorItem'] )
					.removeClass(this.options['classNameHidden'] + ' ' + this.options['classNameShown']);
			} else {
				this.$list.find( this.options['selectorItem'] ).show();
			}

			this.$el.trigger('reset');
		},
		_onKeyup: function (e) {
			var searchValue = this.$el.val();

			if ( ! (e && e.which == 13 || this.options['isFilteredOnKeyup']) ) return;

			this.search();
		},
		search: function () {
			var searchValue = this.$el.val();

			if (searchValue.trim() === "") {
				return this.reset();
			}

			var nonMatches = this.$list.find( this.options['selectorItem'] + ':not(:Contains(' + searchValue + '))');
			var matches = this.$list.not( nonMatches );

			// Hide non matches
			if ( this.options['isToggledWithClassNames'] ) {
				nonMatches
					.addClass( this.options['classNameHidden'] )
					.removeClass(this.options['classNameShown']);
			} else {
				nonMatches.hide();
			}

			// Show matches
			if ( this.options['isToggledWithClassNames'] ) {
				matches
					.removeClass( this.options['classNameHidden'] )
					.addClass( this.options['classNameShown'] );
			} else {
				matches.show();
			}

			this.$el.trigger('filter', [searchValue || "", matches, nonMatches]);
		},
		getList: function () {
			return this.$list;
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if ( ! $.data(this, "plugin-" + pluginName)) {
				$.data(this, "plugin-" + pluginName,
					new Plugin( this, options ));
				}
		});
	};

})(this, jQuery);