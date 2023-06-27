import * as core from '@actions/core';

const requiredInputs = {
  accessToken: 'access-token',
  projectKey: 'project-key',
  environmentKey: 'environment-key',
  baseUri: 'base-uri',
};

const jsonInputs = {
  eventMetadata: 'event-metadata',
  deploymentMetadata: 'deployment-metadata',
};

const statuses = ['in_progress', 'success', 'failure', 'cancelled', 'skipped'];

export const statusToEventType = {
  in_progress: 'started',
  success: 'finished',
  failure: 'failed',
  cancelled: 'failed',
  skipped: 'failed',
};

export const validate = (args) => {
  const errors = [];

  for (const arg in requiredInputs) {
    if (!args[arg]) {
      const a = requiredInputs[arg];
      core.error(`${a} is required`);
      errors.push(a);
    }
  }

  if (args.status && !statuses.includes(args.status)) {
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
  return errors;
};
