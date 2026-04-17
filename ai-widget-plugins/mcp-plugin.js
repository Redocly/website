import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirName = dirname(fileURLToPath(import.meta.url));

export default function mcpPlugin() {
  return {
    id: 'mcp-add-numbers-plugin',
    processContent(actions) {
      actions.addMcpTools(join(dirName, './mcp-tools.js'), [
        {
          name: 'get-project-build-logs',
          isWidgetTool: true,
          description:
            'Fetch build logs or list recent builds for a Reunite project. When a buildId is provided, returns the log lines for that build. Without a buildId, returns a list of recent builds with their status.',
          schema: {
            type: 'object',
            required: ['org', 'project'],
            properties: {
              org: {
                type: 'string',
                description: "The organization slug or ID prefixed with 'org_'. Both are accepted.",
              },
              project: {
                type: 'string',
                description: "The project slug or ID prefixed with 'prj_'. Both are accepted.",
              },
              buildId: {
                type: 'string',
                description:
                  "Build ID prefixed with 'pb_'. When provided, returns the full log lines for that build. When omitted, lists recent builds.",
              },
              limit: {
                type: 'number',
                description:
                  'Max number of builds to return when listing (default 10). Ignored when buildId is provided.',
              },
            },
          },
        },
        {
          name: 'get-org-members',
          isWidgetTool: true,
          description:
            'List members of a Reunite organization with their roles. Optionally filter by name or email.',
          schema: {
            type: 'object',
            required: ['org'],
            properties: {
              org: {
                type: 'string',
                description: "The organization slug or ID prefixed with 'org_'. Both are accepted.",
              },
              limit: {
                type: 'number',
                description: 'Max number of members to return (default 20).',
              },
              search: {
                type: 'string',
                description: 'Filter users by name or email.',
              },
            },
          },
        },
        {
          name: 'get-redocly-yaml-config',
          isWidgetTool: true,
          description:
            'Fetch the redocly.yaml config for a Reunite project. Accepts either a slug or an ID for both the org and project — the API treats them identically.',
          schema: {
            type: 'object',
            required: ['org', 'project'],
            properties: {
              org: {
                type: 'string',
                description:
                  "The organization slug (e.g. 'my-org') or organization ID prefixed with 'org_'. Both are accepted by the API and behave the same way.",
              },
              project: {
                type: 'string',
                description:
                  "The project slug (e.g. 'my-project') or project ID prefixed with 'prj_'. Both are accepted by the API and behave the same way.",
              },
            },
          },
        },
      ]);
    },
  };
}
