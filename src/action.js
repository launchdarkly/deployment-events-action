import * as core from '@actions/core';
import { getConfiguration } from './configuration';
import LDClient from './client';

export const run = async () => {
  core.startGroup('Validating arguments');
  const {
    accessToken,
    projectKey,
    environmentKey,
    applicationKey,
    version,
    eventType,
    eventMetadata,
    deploymentMetadata,
    baseUri,
    hasError,
    unsupportedStatus,
  } = getConfiguration();
  core.endGroup();
  if (hasError || unsupportedStatus) {
    return;
  }

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
