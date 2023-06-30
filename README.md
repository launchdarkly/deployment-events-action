# LaunchDarkly Deployment Events

Send deployment events to LaunchDarkly

<!-- action-docs-inputs -->

## Inputs

| parameter           | description                                                                                                                                                                                   | required | default                      |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------- |
| access-token        | LaunchDarkly access token                                                                                                                                                                     | `true`   |                              |
| project-key         | The project key                                                                                                                                                                               | `true`   |                              |
| environment-key     | The environment key                                                                                                                                                                           | `true`   |                              |
| application-key     | The application key. Defaults to the repo name.                                                                                                                                               | `false`  | GITHUB_REPO_NAME             |
| version             | The version. Defaults to current git SHA. When action uses event `deployment_status`, use `github.event.deployment.sha`.                                                                      | `false`  | GITHUB_SHA                   |
| status              | Status of deploy. Values: in_progress, success, failure, cancelled, skipped.                                                                                                                  | `true`   |                              |
| event-metadata      | A JSON object containing metadata about the event                                                                                                                                             | `false`  | {}                           |
| deployment-metadata | A JSON object containing metadata about the deployment                                                                                                                                        | `false`  | {}                           |
| base-uri            | The base URI for the LaunchDarkly server. Most users should use the default value.                                                                                                            | `false`  | https://app.launchdarkly.com |
| event-time          | Optionally set an event time for status in datetime string format. When action uses event `deployment_status`, use `github.event.deployment_status.created_at`. Example: 2012-07-20T01:19:13Z | `false`  | NOW                          |

<!-- action-docs-inputs -->

## Contributing

We encourage pull requests and other contributions from the community. Check out our [contributing guidelines](CONTRIBUTING.md) for instructions on how to contribute to this project.

## About LaunchDarkly

- LaunchDarkly is a continuous delivery platform that provides feature flags as a service and allows developers to iterate quickly and safely. We allow you to easily flag your features and manage them from the LaunchDarkly dashboard. With LaunchDarkly, you can:
  - Roll out a new feature to a subset of your users (like a group of users who opt-in to a beta tester group), gathering feedback and bug reports from real-world use cases.
  - Gradually roll out a feature to an increasing percentage of users, and track the effect that the feature has on key metrics (for instance, how likely is a user to complete a purchase if they have feature A versus feature B?).
  - Turn off a feature that you realize is causing performance problems in production, without needing to re-deploy, or even restart the application with a changed configuration file.
  - Grant access to certain features based on user attributes, like payment plan (eg: users on the ‘gold’ plan get access to more features than users in the ‘silver’ plan). Disable parts of your application to facilitate maintenance, without taking everything offline.
- LaunchDarkly provides feature flag SDKs for a wide variety of languages and technologies. Check out [our documentation](https://docs.launchdarkly.com/sdk) for a complete list.
- Explore LaunchDarkly
  - [launchdarkly.com](https://www.launchdarkly.com/ 'LaunchDarkly Main Website') for more information
  - [docs.launchdarkly.com](https://docs.launchdarkly.com/ 'LaunchDarkly Documentation') for our documentation and SDK reference guides
  - [apidocs.launchdarkly.com](https://apidocs.launchdarkly.com/ 'LaunchDarkly API Documentation') for our API documentation
  - [blog.launchdarkly.com](https://blog.launchdarkly.com/ 'LaunchDarkly Blog Documentation') for the latest product updates
