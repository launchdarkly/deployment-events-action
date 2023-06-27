import * as core from '@actions/core';

const requiredInputs = {
  accessToken: 'access-token',
  projectKey: 'project-key',
  environmentKey: 'environment-key',
  baseUri: 'base-uri',
  eventType: 'event-type',
};

const eventTypes = ['started', 'finished', 'failed'];

export const validate = (args) => {
  const errors = [];

  for (const arg in requiredInputs) {
    if (!args[arg]) {
      const a = requiredInputs[arg];
      core.error(`${a} is required`);
      errors.push(a);
    }
  }

  if (!eventTypes.includes(args.eventType)) {
    core.error('Event type must be one of: "started", "finished", "failed"');
    errors.push('event-type');
  }

  return errors;
};
