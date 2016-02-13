/**
 * @module Template
 * @author crossjs <liwenfu@crossjs.com>
 */

'use strict';

var $ = require('jquery');
var __ = require('nd-i18n');

// 提供 Template 模板支持，默认引擎是 Handlebars
module.exports = {

  // Handlebars 的 helpers
  templateHelpers: {
    __: __
  },

  // Handlebars 的 partials
  templatePartials: null,

  // 根据配置的模板和传入的数据，构建 this.element 和 templateElement
  parseElementFromTemplate: function() {
    var template = this.get('template');
    var model;

    if (typeof template === 'function') {

      model = this.get('model') || {};

      if (model.toJSON) {
        model = model.toJSON();
      }

      // 设置默认的 classPrefix
      model.classPrefix = this.get('classPrefix');

      template = template(model, this._getTemplateOptions());
    }

    this.element = $(template);
  },

  _getTemplateOptions: function() {
    if (!this._templateOptions) {
      this._templateOptions = {
        helpers: $.extend({}, this.templateHelpers, this.get('templateHelpers')),
        partials: $.extend({}, this.templatePartials, this.get('templatePartials'))
      };
    }

    return this._templateOptions;
  },

  renderPartialTemplate: function(name, model) {
    if (!model) {
      model = {};
    }

    // 设置默认的 classPrefix
    model.classPrefix = this.get('classPrefix');

    var templateOptions = this._getTemplateOptions();
    var tempaltePartial = templateOptions.partials[name];

    if (tempaltePartial) {
      this.$('[data-partial="' + name + '"]').html(
        tempaltePartial.call(this, model, templateOptions)
      );
    }
  }

};
