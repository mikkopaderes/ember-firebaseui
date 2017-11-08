import { moduleFor, test } from 'ember-qunit';

import sinon from 'sinon';

moduleFor('service:firebaseui', 'Unit | Service | firebaseui', {
  needs: ['service:firebase'],
});

test('should start auth UI', function(assert) {
  assert.expect(1);

  // Arrange
  const stub = sinon.stub();

  const service = this.subject({
    firebase: { auth: sinon.stub() },
    ui: { start: stub },
  });

  // Act
  service.startAuthUi({ foo: 'bar' });

  // Assert
  assert.ok(
    stub.calledWithExactly('#firebaseui-auth-container', { foo: 'bar' }),
  );
});

test('should reset auth UI', function(assert) {
  assert.expect(1);

  // Arrange
  const stub = sinon.stub();

  const service = this.subject({
    firebase: { auth: sinon.stub() },
    ui: { reset: stub },
  });

  // Act
  service.resetAuthUi();

  // Assert
  assert.ok(stub.calledOnce);
});
