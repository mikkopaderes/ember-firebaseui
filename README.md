# ember-firebaseui

Ember implementation of [FirebaseUI for Web](https://github.com/firebase/firebaseui-web)

## Installation

```bash
ember install ember-firebaseui
```

> This addon has a dependency with [EmberFire](https://github.com/firebase/emberfire).

## Usage

### Auth

A component is provided for rendering FirebaseUI Auth. Here's how:

First setup your `uiConfig` which is exactly the same with [FirebaseUI Auth](https://github.com/firebase/firebaseui-web#configuration).

```javascript
import firebase from 'firebase';
import firebaseui from 'firebaseui';

const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
};
```

Then pass that `uiConfig` into the `firebaseui-auth` component.

```javascript
{{firebaseui-auth uiConfig=uiConfig}}
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
