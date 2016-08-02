/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-hot-reload-spike',
  included (app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/ember/ember-template-compiler.js');
  }
};
