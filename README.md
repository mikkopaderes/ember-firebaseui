ember-firebaseui
==============================================================================

Ember implementation of FirebaseUI for Web

Installation
------------------------------------------------------------------------------

```
npm install firebase@5.x --save-dev
ember install ember-firebaseui
```

### Configuration

Add a `firebase` and `torii` property in your `config/environment.js`.

```javascript
let ENV = {
  ...

  firebase: {
    apiKey: '<api_key>',
    authDomain: '<auth_domain>',
    databaseURL: '<database_url>',
    projectId: '<project_id>',
    storageBucket: '<storage_bucket>',
    messagingSenderId: '<messaging_sender_id>'
  },
  torii: { sessionServiceName: 'session' },

  ...
}
```

Usage
------------------------------------------------------------------------------

### Auth

#### Torii

Authentication will make use of [Torii](https://github.com/Vestorly/torii) to manage our session.

Create a Torii adapter file in `app/torii-adapters/application.js`. It should contain the following codes.

```javascript
import ToriiFirebaseUiAdapter from 'ember-firebaseui/torii-adapters/firebaseui';

export default ToriiFirebaseUiAdapter.extend({
});
```

#### `{{firebaseui-auth}}`

`{{firebaseui-auth}}` component is provided for rendering FirebaseUI Auth. Here's how:

First setup your `uiConfig` which is exactly the same with [FirebaseUI Auth](https://github.com/firebase/firebaseui-web).

```javascript
import { inject } from '@ember/service';
import Component from '@ember/component';

import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default Component.extend({
  session: inject(),

  init(...args) {
    this._super(...args);

    const uiConfig = {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      callbacks: {
        signInSuccess: () => {
          this.get('session').fetch();
        },
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };

    this.set('uiConfig', uiConfig);
  }
});
```

Then pass that `uiConfig` into the `{{firebaseui-auth}}` component.

```javascript
{{firebaseui-auth uiConfig=uiConfig}}
```

In our application route, we can setup our session if the user's already signed in by calling `this.get('session').fetch()` in the `beforeModel()` hook.

```javascript
import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  session: inject(),

  beforeModel() {
    return this.get('session').fetch().catch(() => {});
  }
});
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-firebaseui`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
