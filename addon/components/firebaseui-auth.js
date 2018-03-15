import { inject } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

import layout from '../templates/components/firebaseui-auth';

/**
 * @class FirebaseUiAuth
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @type {Ember.Service}
   */
  firebaseui: inject(),

  /**
   * @override
   */
  elementId: 'firebaseui-auth-container',

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(args);

    scheduleOnce('afterRender', () => {
      this.get('firebaseui').startAuthUi(this.getAttr('uiConfig'));
    });
  },

  /**
   * @override
   */
  willDestroyElement(...args) {
    this._super(args);

    this.get('firebaseui').resetAuthUi();
  },
});
