import * as core from '@actions/core';

export const run = async () => {
  // parse and validate args
  core.startGroup('Validating arguments');
  const accessToken = core.getInput('access-token');
  core.setSecret(accessToken);
  // TODO get other inputs

  return;
};
