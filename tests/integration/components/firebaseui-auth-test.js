import { moduleForComponent, test } from 'ember-qunit';
import Service from 'ember-service';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

moduleForComponent('firebaseui-auth', 'Integration | Component | firebaseui auth', {
  integration: true,
});

test('should render firebaseui auth widget', function(assert) {
  assert.expect(1);

  // Arrange
  const startAuthUiStub = sinon.stub();

  const firebaseuiStub = Service.extend({
    startAuthUi: startAuthUiStub,
    resetAuthUi: sinon.stub(),
  });

  this.register('service:firebaseui', firebaseuiStub);
  this.inject.service('firebaseui', { as: 'firebaseui' });
  this.set('uiConfig', { foo: 'bar' });

  // Act
  this.render(hbs`{{firebaseui-auth uiConfig=uiConfig}}`);

  // Assert
  assert.ok(startAuthUiStub.calledWithExactly(this.get('uiConfig')));
});
