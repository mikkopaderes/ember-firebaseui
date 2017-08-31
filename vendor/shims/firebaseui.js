(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['firebaseui'],
      __esModule: true,
    };
  }

  define('firebaseui', [], vendorModule);
})();
