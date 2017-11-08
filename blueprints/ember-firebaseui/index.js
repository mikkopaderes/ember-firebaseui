/* eslint-env node */
module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return this.addAddonToProject('torii');
  },
};
