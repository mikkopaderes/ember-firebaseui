import { module, test } from 'qunit';
import RSVP from 'rsvp';

import sinon from 'sinon';

import firebaseUiAdapter from 'ember-firebaseui/torii-adapters/firebaseui';

module('Unit | Torii Adapter | firebaseui', function() {
  test('should fetch signed in user from `onAuthStateChanged`', async function(assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub().returns({
      onAuthStateChanged(callback) {
        callback({ uid: 'foo' });
      },
    });

    const adapter = firebaseUiAdapter.create({
      firebase: { auth: stub },
    });

    // Act
    const result = await adapter.fetch();

    // Assert
    assert.deepEqual(result, {
      currentUser: { uid: 'foo' },
    });
  });

  test('should fetch signed in user from `getRedirectResult`', async function(assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub().returns({
      getRedirectResult: sinon.stub().returns(RSVP.Promise.resolve({
        user: { uid: 'foo' },
      })),

      onAuthStateChanged(callback) {
        callback();
      },
    });

    const adapter = firebaseUiAdapter.create({
      firebase: { auth: stub },
    });

    // Act
    const result = await adapter.fetch();

    // Assert
    assert.deepEqual(result, {
      currentUser: { uid: 'foo' },
    });
  });

  test('should reject when no user info is available', async function(assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub().returns({
      getRedirectResult: sinon.stub().returns(RSVP.Promise.resolve({})),

      onAuthStateChanged(callback) {
        callback();
      },
    });

    const adapter = firebaseUiAdapter.create({
      firebase: { auth: stub },
    });

    try {
      // Act
      await adapter.fetch();
    } catch (e) {
      assert.ok(true);
    }
  });

  test('should reject when signing in errors out', async function(assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub().returns({
      getRedirectResult: sinon.stub().returns(RSVP.Promise.reject()),

      onAuthStateChanged(callback) {
        callback();
      },
    });

    const adapter = firebaseUiAdapter.create({
      firebase: { auth: stub },
    });

    try {
      // Act
      await adapter.fetch();
    } catch (e) {
      assert.ok(true);
    }
  });

  test('should sign out', async function(assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub().returns({
      signOut: sinon.stub().returns(RSVP.Promise.resolve('foo')),
    });

    const adapter = firebaseUiAdapter.create({
      firebase: { auth: stub },
    });

    // Act
    const result = await adapter.close();

    // Assert
    assert.equal(result, 'foo');
  });
});
