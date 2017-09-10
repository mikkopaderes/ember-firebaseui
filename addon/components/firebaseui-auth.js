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
  layout,

  /**
   * @type {Ember.Service}
   * @default
   * @readOnly
   */
  firebaseui: inject(),

  /**
   * @type {string}
   * @default
   * @readonly
   */
  elementId: 'firebaseui-auth-container',

  /**
   * Component hook
   */
  didInsertElement(...args) {
    this._super(args);

    scheduleOnce('afterRender', () => {
      this.get('firebaseui').startAuthUi(this.getAttr('uiConfig'));
    });
  },

  /**
   * Component hook
   */
  willDestroyElement(...args) {
    this._super(args);

    this.get('firebaseui').resetAuthUi();
  },
});
