/**
 * Description: index.js
 * Author: crossjs <liwenfu@crossjs.com>
 * Date: 2014-12-15 15:34:50
 */

'use strict';

var $ = require('jquery');

// 提供 Template 模板支持，默认引擎是 Handlebars
module.exports = {

  // Handlebars 的 helpers
  templateHelpers: null,

  // Handlebars 的 partials
  templatePartials: null,

  // 根据配置的模板和传入的数据，构建 this.element 和 templateElement
  parseElementFromTemplate: function () {
    // template 支持 id 选择器
    var t, template = this.get('template'), model;

    if (/^#/.test(template) &&
        (t = document.getElementById(template.substring(1)))) {
      template = t.innerHTML;
      this.set('template', template);
    }

    if (typeof template === 'function') {

      model = this.get('model') || {};

      if (model.toJSON) {
        model = model.toJSON();
      }

      // 设置默认的 classPrefix
      model.classPrefix = this.get('classPrefix');

      template = template(model, {
        helpers: this.templateHelpers,
        partials: this.templatePartials
      });
    }

    this.element = $(template);
  }

};
