import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import Service from '@ember/service';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | firebaseui-auth', function(hooks) {
  setupRenderingTest(hooks);

  test('should render firebaseui auth widget', async function(assert) {
    assert.expect(1);

    // Arrange
    const startAuthUiStub = sinon.stub();
    const firebaseuiStub = Service.extend({
      startAuthUi: startAuthUiStub,
      resetAuthUi: sinon.stub(),
    });

    this.owner.register('service:firebaseui', firebaseuiStub);
    this.set('uiConfig', { foo: 'bar' });

    // Act
    await render(hbs`{{firebaseui-auth uiConfig=uiConfig}}`);

    // Assert
    assert.ok(startAuthUiStub.calledWithExactly(this.get('uiConfig')));
  });
});
