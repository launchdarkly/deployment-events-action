import * as core from '@actions/core';
import { validate, outcomeToEventType } from './configuration';
import LDClient from './client';

export const run = async () => {
  // parse and validate args
  core.startGroup('Validating arguments');
  const accessToken = core.getInput('access-token');
  core.setSecret(accessToken);

  const projectKey = core.getInput('project-key');
  const environmentKey = core.getInput('environment-key');
  let applicationKey = core.getInput('application-key');
  let version = core.getInput('version');
  let eventType = core.getInput('event-type');
  const outcome = core.getInput('outcome');
  let eventMetadata = core.getInput('event-metadata');
  let deploymentMetadata = core.getInput('deployment-metadata');
  const baseUri = core.getInput('base-uri');

  const validationErrors = validate({
    accessToken,
    projectKey,
    environmentKey,
    applicationKey,
    version,
    eventType,
    outcome,
    eventMetadata,
    deploymentMetadata,
    baseUri,
  });
  if (validationErrors.length > 0) {
    core.setFailed(`Invalid arguments: ${validationErrors.join(', ')}`);
    return;
  }

  eventMetadata = JSON.parse(eventMetadata);
  deploymentMetadata = JSON.parse(deploymentMetadata);

  if (!applicationKey) {
    applicationKey = process.env.GITHUB_REPOSITORY.split('/').pop();
    core.info(`Setting applicationKey to repository name: ${applicationKey}`);
  }

  if (!version) {
    version = process.env.GITHUB_SHA;
    core.info(`Setting version to SHA: ${version}`);
  }

  if (eventType) {
    core.info(`Using event type: ${eventType}`);
  } else if (outcome) {
    eventType = outcomeToEventType[outcome];
    core.info(`Setting event type to ${eventType}`);
  }

  core.endGroup();

  core.startGroup('Send event');

  const client = new LDClient(accessToken, baseUri);
  await client.sendDeploymentEvent(
    projectKey,
    environmentKey,
    applicationKey,
    version,
    eventType,
    eventMetadata,
    deploymentMetadata,
  );
  core.endGroup();

  return;
};
