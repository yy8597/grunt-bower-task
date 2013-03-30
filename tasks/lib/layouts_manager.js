var _ = require('lodash');
var path = require('path');

var handleUntyped = function(layout) {
  return function(type, pkg) {
    if (type === '__untyped__') {
      return pkg;
    }
    return layout(type, pkg);
  };
};

var defaultLayouts = {
  byType: handleUntyped(function(type, pkg) {
    return path.join(type, pkg);
  }),

  byComponent: handleUntyped(function(type, pkg) {
    return path.join(pkg, type);
  })
};

module.exports = {

  /**
   * Resolves named layouts, returns functions as is
   *
   * @param {string | Function} layout name or layout function
   * @returns {Function} layout function
   */
  getLayout: function(layout) {
    if (_.isFunction(layout)) {
      return layout;
    }

    if (!_.isString(layout)) {
      throw 'Layout should be specified by name or as a function';
    }

    if (_(defaultLayouts).has(layout)) {
      return defaultLayouts[layout];
    }

    throw 'The following named layouts are supported: ' + _.keys(defaultLayouts).join(', ');
  }

};