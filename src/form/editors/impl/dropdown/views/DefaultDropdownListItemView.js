/**
 * Developer: Stepan Burguchev
 * Date: 1/16/2015
 * Copyright: 2009-2016 Comindware®
 *       All Rights Reserved
 * Published under the MIT license
 */

"use strict";

import { Handlebars } from 'lib';
import { htmlHelpers } from 'utils';
import list from 'list';
import template from '../templates/defaultDropdownListItem.hbs';

export default Marionette.ItemView.extend({
    initialize: function (options) {
        this.reqres = options.reqres;
    },

    behaviors: {
        ListItemViewBehavior: {
            behaviorClass: list.views.behaviors.ListItemViewBehavior
        }
    },

    className: 'dd-list__i',

    template: Handlebars.compile(template),

    templateHelpers: function () {
        var model = this.model.toJSON();
        var displayAttribute = this.options.displayAttribute;
        return {
            text: _.result(model, displayAttribute)
        };
    },

    events: {
        'click': '__select'
    },

    onHighlighted: function (fragment) {
        var text = htmlHelpers.highlightText(this.model.get(this.options.displayAttribute), fragment);
        this.$el.html(text);
    },

    onUnhighlighted: function () {
        this.$el.html(this.model.get(this.options.displayAttribute));
    },

    __select: function () {
        this.reqres.request('value:set', this.model);
        return false;
    }
});
