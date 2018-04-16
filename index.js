'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-firebaseui',

  treeForVendor(defaultTree) {
    const browserVendorLib = new Funnel('node_modules', {
      destDir: 'fastboot-shims',
      files: ['firebase/firebase-auth.js', 'firebaseui/dist/firebaseui.js'],
    });

    return new MergeTrees([defaultTree, fastbootTransform(browserVendorLib)]);
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import('node_modules/firebaseui/dist/firebaseui.css');
    app.import('vendor/fastboot-shims/firebase/firebase-auth.js');
    app.import('vendor/fastboot-shims/firebaseui/dist/firebaseui.js');
    app.import('vendor/fastboot/firebase-auth.js');
    app.import('vendor/shims/firebaseui.js');
  },
};
