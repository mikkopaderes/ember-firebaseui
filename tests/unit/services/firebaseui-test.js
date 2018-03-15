import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import sinon from 'sinon';

module('Unit | Service | firebaseui', function(hooks) {
  setupTest(hooks);

  module('function: startAuthUi', function() {
    test('should start auth UI', function(assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub();
      const service = this.owner.lookup('service:firebaseui');

      service.set('firebase', { auth: sinon.stub() });
      service.set('ui', { start: stub });

      // Act
      service.startAuthUi({ foo: 'bar' });

      // Assert
      assert.ok(stub.calledWithExactly('#firebaseui-auth-container', {
        foo: 'bar',
      }));
    });
  });

  module('function: resetAuthUi', function() {
    test('should reset auth UI', function(assert) {
      assert.expect(1);

      // Arrange
      const stub = sinon.stub();
      const service = this.owner.lookup('service:firebaseui');

      service.set('firebase', { auth: sinon.stub() });
      service.set('ui', { reset: stub });

      // Act
      service.resetAuthUi();

      // Assert
      assert.ok(stub.calledOnce);
    });
  });
});
