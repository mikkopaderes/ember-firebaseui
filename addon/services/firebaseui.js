import { inject } from '@ember/service';
import Service from '@ember/service';

import FirebaseUi from 'firebaseui';
import firebase from 'firebase';

/**
 * @class FirebaseUi
 * @namespace Service
 * @extends Service
 */
export default Service.extend({
  /**
   * @type {Ember.Service}
   * @default
   * @readonly
   */
  firebase: inject(),

  /**
   * @type {FirebaseUi}
   * @readonly
   */
  ui: null,

  /**
   * Service hook
   */
  init(...args) {
    this._super(args);

    // Workaround for when the firebase asset is an AMD module
    window.firebase = firebase;
  },

  /**
   * Starts the FirebaseUI Auth
   *
   * @param {Object} uiConfig
   */
  startAuthUi(uiConfig) {
    const auth = this.get('firebase').auth();
    let ui = this.get('ui');

    if (!ui) {
      ui = new FirebaseUi.auth.AuthUI(auth);

      this.set('ui', ui);
    }

    ui.start('#firebaseui-auth-container', uiConfig);
  },

  /**
   * Resets the FirebaseUI Auth
   */
  resetAuthUi() {
    this.get('ui').reset();
  },
});
