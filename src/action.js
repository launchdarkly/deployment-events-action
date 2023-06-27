import * as core from '@actions/core';
import { validate } from './configuration';

export const run = async () => {
  // parse and validate args
  core.startGroup('Validating arguments');
  const accessToken = core.getInput('access-token');
  core.setSecret(accessToken);

  const projectKey = core.getInput('project-key');
  const environmentKey = core.getInput('environment-key');
  const applicationKey = core.getInput('application-key');
  const version = core.getInput('version');
  const eventType = core.getInput('event-type');
  const eventMetadata = core.getInput('event-metadata'); // change to multiline?
  const deploymentMetadata = core.getInput('deployment-metadata'); // change to multiline?
  const baseUri = core.getInput('base-uri');

  const validationErrors = validate({
    accessToken,
    projectKey,
    environmentKey,
    applicationKey,
    version,
    eventType,
    eventMetadata,
    deploymentMetadata,
    baseUri,
  });
  if (validationErrors.length > 0) {
    core.setFailed(`Invalid arguments: ${validationErrors.join(', ')}`);
    return;
  }

  core.endGroup();
  core.debug('Running');
  return;
};
