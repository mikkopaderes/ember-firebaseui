import { inject } from '@ember/service';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import RSVP from 'rsvp';

/**
 * @class FirebaseUi
 * @namespace ToriiAdapters
 * @extends Ember.Object
 */
export default EmberObject.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: inject(),

  /**
   * Fetches the signed in Firebase user
   *
   * @return {Promise}
   */
  fetch() {
    return new RSVP.Promise((resolve, reject) => {
      const auth = this.get('firebase').auth();

      auth.onAuthStateChanged((user) => {
        if (user) {
          run(null, resolve, { currentUser: user });
        } else {
          auth.getRedirectResult().then((result) => {
            if (result.user) {
              run(null, resolve, { currentUser: result.user });
            } else {
              run(null, reject, 'No session available');
            }
          }).catch((e) => {
            run(null, reject, e);
          });
        }
      });
    });
  },

  /**
   * Close existing session
   *
   * @return {Promise} Resolves when successfully signed out
   */
  close() {
    return this.get('firebase').auth().signOut();
  },
});
