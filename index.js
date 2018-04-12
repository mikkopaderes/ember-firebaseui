'use strict';

const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-firebaseui',

  options: {
    nodeAssets: {
      'firebaseui': {
        srcDir: 'dist',

        import: {
          include: ['firebaseui.js', 'firebaseui.css'],

          processTree(input) {
            return fastbootTransform(input);
          },
        },
      },
    },
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import('node_modules/firebase/firebase-auth.js');
    app.import('vendor/shims/firebaseui.js');
  },
};
