const REUNITE_API_BASE = process.env.REUNITE_API_BASE || "https://app.cloud.redocly.com/api";

type Context = { accessToken?: string };

const getHeaders = (context: Context) => {
  const cookie = context.accessToken
    ? `accessToken=${String(context.accessToken).replace(/^Bearer /, "")}`
    : "";
  return {
    "Content-Type": "application/json",
    ...(cookie ? { Cookie: cookie } : {}),
  };
};

const errorResult = (text: string) => ({
  content: [{ type: "text", text }],
  isError: true,
});

const successResult = (data: unknown) => ({
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
});

const checkResponseErrors = (response: Response, errorMessage: string) => {
  if (response.status === 401 || response.status === 403) {
    return errorResult("You do not have permission to access this resource.");
  }
  if (!response.ok) {
    return errorResult(`${errorMessage}: ${response.statusText}`);
  }
  return null;
};

const getRedoclyYamlConfig = async (args: { org: string; project: string }, context: Context) => {
  const { org, project } = args;
  const url = `${REUNITE_API_BASE}/orgs/${org}/projects/${project}`;

  try {
    const response = await fetch(url, { credentials: "include", headers: getHeaders(context) });
    const responseError = checkResponseErrors(response, "Failed to fetch project");
    if (responseError) return responseError;

    const data = await response.json();
    return successResult(data.config);
  } catch {
    return errorResult("Error fetching project config.");
  }
};

const getProjectBuildLogs = async (args: { org: string; project: string; buildId?: string; limit?: number }, context: Context) => {
  const { org, project, buildId, limit = 10 } = args;
  const url = buildId
    ? `${REUNITE_API_BASE}/orgs/${org}/projects/${project}/builds/${buildId}`
    : `${REUNITE_API_BASE}/orgs/${org}/projects/${project}/builds?limit=${limit}`;

  try {
    const response = await fetch(url, { credentials: "include", headers: getHeaders(context) });
    const responseError = checkResponseErrors(response, "Failed to fetch builds");
    if (responseError) return responseError;

    const data = await response.json();
    if (buildId) {
      const logs = (data.logs ?? []).map(({ id, log, date, sortOrder }) => ({ id, log, date, sortOrder }));
      return successResult(logs);
    }
    const builds = (data.items ?? []).map(({ id, status, createdAt, finishedAt, branchName }) => ({
      id, status, createdAt, finishedAt, branchName,
    }));
    return successResult(builds);
  } catch {
    return errorResult("Error fetching project builds.");
  }
};

const getOrgMembers = async (args: { org: string; limit?: number; search?: string }, context: Context) => {
  const { org, limit = 20, search } = args;
  const params = new URLSearchParams({ limit: String(limit) });
  if (search) params.set("search", search);
  const url = `${REUNITE_API_BASE}/orgs/${org}/members?${params}`;

  try {
    const response = await fetch(url, { credentials: "include", headers: getHeaders(context) });
    const responseError = checkResponseErrors(response, "Failed to fetch members");
    if (responseError) return responseError;

    const data = await response.json();
    const members = (data.items ?? []).map(({ id, name, email, role, firstName, lastName }) => ({
      id, name, email, role, firstName, lastName,
    }));
    return successResult(members);
  } catch {
    return errorResult("Error fetching org members.");
  }
};

export default {
  "get-redocly-yaml-config": getRedoclyYamlConfig,
  "get-project-build-logs": getProjectBuildLogs,
  "get-org-members": getOrgMembers,
};
