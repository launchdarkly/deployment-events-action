import * as core from '@actions/core';

const requiredInputs = {
  accessToken: 'access-token',
  projectKey: 'project-key',
  environmentKey: 'environment-key',
  status: 'status',
  baseUri: 'base-uri',
};

const jsonInputs = {
  eventMetadata: 'event-metadata',
  deploymentMetadata: 'deployment-metadata',
};

const statuses = ['in_progress', 'success', 'failure', 'cancelled', 'skipped', 'error', 'pending', 'waiting', 'queued'];

const statusToEventType = {
  in_progress: 'started',
  success: 'finished',
  failure: 'failed',
  cancelled: 'failed',
  skipped: 'failed',
  error: 'failed',
};

export const getConfiguration = () => {
  const accessToken = core.getInput('access-token');
  core.setSecret(accessToken);
  const projectKey = core.getInput('project-key');
  const environmentKey = core.getInput('environment-key');
  let applicationKey = core.getInput('application-key');
  let version = core.getInput('version');
  let status = core.getInput('status');
  let eventMetadata = core.getInput('event-metadata');
  let deploymentMetadata = core.getInput('deployment-metadata');
  const baseUri = core.getInput('base-uri');
  const eventTimeString = core.getInput('event-time');

  const validationErrors = validate({
    accessToken,
    projectKey,
    environmentKey,
    applicationKey,
    version,
    status,
    eventMetadata,
    deploymentMetadata,
    baseUri,
    eventTimeString,
  });
  if (validationErrors.length > 0) {
    core.setFailed(`Invalid arguments: ${validationErrors.join(', ')}`);
    return { hasError: true };
  }

  eventMetadata = JSON.parse(eventMetadata);
  deploymentMetadata = JSON.parse(deploymentMetadata);

  if (applicationKey == 'GITHUB_REPO_NAME') {
    applicationKey = process.env.GITHUB_REPOSITORY.split('/').pop();
    core.info(`Setting applicationKey to repository name: ${applicationKey}`);
  }

  if (version == 'GITHUB_SHA') {
    version = process.env.GITHUB_SHA;
    core.info(`Setting version to SHA: ${version}`);
  }

  const eventType = statusToEventType[status];
  if (eventType !== undefined) {
    core.info(`Setting event type to ${eventType}, from status ${status}`);
  } else {
    core.notice(`Skipping notification for unsupported status ${status}`);
    return { unsupportedStatus: true };
  }

  const eventTime = eventTimeString === 'NOW' ? Date.now() : Date.parse(eventTimeString);
  core.info(`Setting event time to ${eventTime}`);

  return {
    accessToken,
    projectKey,
    environmentKey,
    applicationKey,
    version,
    eventType,
    eventMetadata,
    deploymentMetadata,
    baseUri,
    eventTime,
    hasError: false,
    unsupportedStatus: false,
  };
};

const validate = (args) => {
  const errors = [];

  for (const arg in requiredInputs) {
    if (!args[arg]) {
      const a = requiredInputs[arg];
      core.error(`${a} is required`);
      errors.push(a);
    }
  }

  if (!statuses.includes(args.status)) {
    core.error(
      `status must be one of: "in_progress", "success", "failure", "cancelled", "skipped", but is "${args.status}"`,
    );
    errors.push('status');
  }

  for (const arg in jsonInputs) {
    try {
      JSON.parse(args[arg]);
    } catch (e) {
      const a = jsonInputs[arg];
      core.error(`${a} is invalid json`);
      errors.push(a);
    }
  }

  if (args.eventTimeString !== 'NOW' && isNaN(Date.parse(args.eventTimeString))) {
    core.error(`event-time is invalid datetime string "${args.eventTimeString}"`);
    errors.push('event-time');
  }

  return errors;
};
