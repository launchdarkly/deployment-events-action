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

const eventTypes = ['started', 'finished', 'failed'];

// no support for skipped
const outcomes = ['success', 'failure', 'cancelled'];

export const outcomeToEventType = {
  success: 'finished',
  failure: 'failed',
  cancelled: 'failed',
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

  if (!args.eventType && !args.outcome) {
    core.error('Event type or outcome required.');
    errors.push('event-type');
    errors.push('outcome');
  }

  if (args.eventType && !eventTypes.includes(args.eventType)) {
    core.error('Event type must be one of: "started", "finished", "failed"');
    errors.push('event-type');
  }

  if (args.outcome && !outcomes.includes(args.outcome)) {
    core.error('Outcome must be one of: "success", "failure", "cancelled"');
    errors.push('outcome');
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
  return new Set(errors);
};
