# ember-firebaseui

Ember implementation of [FirebaseUI for Web](https://github.com/firebase/firebaseui-web)

## Installation

```bash
ember install ember-firebaseui
```

## Configuration

This addon is dependent on [`ember-firebase-service`](https://github.com/rmmmp/ember-firebase-service). You'll need to configure your Firebase as explained [here](https://github.com/rmmmp/ember-firebase-service#configuration).

## Usage

### Auth

#### Torii

Authentication will make use of [Torii](https://github.com/Vestorly/torii) to manage our session.

Create a Torii adapter file in `app/torii-adapters/application.js`. It should contain the following codes.

```javascript
import ToriiFirebaseUiAdapter from 'ember-firebaseui/torii-adapters/firebaseui';

export default ToriiFirebaseUiAdapter.extend({
});
```

Then you'll need to add some Torii configurations in your `config/environment.js`.

```javascript
let ENV = {
  ...

  torii: { sessionServiceName: 'session' },

  ...
}
```

#### Implementation

A component is provided for rendering FirebaseUI Auth. Here's how:

First setup your `uiConfig` which is exactly the same with [FirebaseUI Auth](https://github.com/firebase/firebaseui-web).

```javascript
import { inject } from '@ember/service';
import Component from '@ember/component';

import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default Component.extend({
  session: inject(),
  uiConfig: null,

  init(...args) {
    this._super(args);

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

Then pass that `uiConfig` into the `firebaseui-auth` component.

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
  },
});
```
## Developing

### Installation

* `git clone <repository-url>` this repository
* `cd ember-firebaseui`
* `npm install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
