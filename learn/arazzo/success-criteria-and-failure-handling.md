# Success criteria and failure handling

Time travel with the Warp API is thrilling, but it's not all smooth jumps and perfect landings. In Arazzo, `successCriteria` let you define what "success" means and what to do when the timeline goes sideways. Whether it's a paradox, a timeout, or an unauthorized hop, these tools keep your workflows on track. Let's explore how to set them up, with Warp examples to guide us through the chaos of time manipulation.

## Defining `successCriteria`
The `successCriteria` field in a step is your checkpoint—it tells Arazzo how to confirm a step worked as expected. It's a list of conditions, typically runtime expressions, that must all pass for the step to succeed. Think of it as your time-travel log: "Did we land in 1889? Is the timeline stable?"

Here's a basic check for Warp's `timeTravel`:

```yaml
steps:
  - stepId: "jumpTo1889"
    operationId: "warpApi.timeTravel"
    requestBody:
      payload:
        destination: "tml_tesla_mission_1"
    successCriteria:
      - condition: "$statusCode == 200"
```

## How it works
- `$statusCode`: A runtime expression grabbing the HTTP response code.
- `== 200`: Ensures the jump returned a 200 OK—mission accomplished!

You can layer conditions for precision. Let's verify the arrival time too:

```yaml
successCriteria:
  - condition: "$statusCode == 200"
  - condition: "$response.body#/arrival_time == '1889-03-10T23:50:00Z'"
```
Both must be true—or the step fails, triggering `onFailure`. You can also use JSONPath for deeper checks:

```yaml
successCriteria:
  - condition: "$statusCode == 200"
  - condition: "$.items_transported.length > 0"
    context: "$response.body"
    type: "jsonpath"
```

This confirms we brought back Tesla's blueprint (items_transported isn't empty).

## Configuring `onFailure`

When a step fails—maybe Warp's servers are overloaded or your token expired—`onFailure` steps in.
It's an optional field that decides the next move.
Your options are:
- `end`: Abort the workflow immediately.
- `retry`: Try the step again, with limits.
- `goto`: Jump to another step or workflow as a backup plan.

## Configuring `onSuccess`

When a step passed—`onSuccess` steps in.
It's an optional field that decides the next move.
Your options are:
- `end`: Abort the workflow immediately.
- `goto`: Jump to another step or workflow as a backup plan.

### Exit on failure
For a must-succeed step like setting an anchor:

```yaml
- stepId: "setHomeAnchor"
  operationId: "warpApi.setAnchor"
  requestBody:
    payload:
      timestamp: "2025-02-19T12:00:00Z"
      description: "Home base"
  successCriteria:
    - condition: "$statusCode == 201"
  onFailure:
    - name: "exitOnFailure"
      type: "end"
```

If the anchor doesn't set (not a 201 Created), the workflow stops—because traveling without a return point is a bad idea.

### Retry on failure
For a flaky jump that might timeout (e.g., 503):

```yaml
- stepId: "jumpTo1889"
  operationId: "warpApi.timeTravel"
  requestBody:
    payload:
      destination: "tml_tesla_mission_1"
  successCriteria:
    - condition: "$statusCode == 200"
  onFailure:
    - name: "retryOnTimeout"
      type: "retry"
      retryLimit: 3
      retryAfter: 5
      criteria:
        - condition: "$statusCode == 503"
```
This retries up to 3 times, waiting 5 seconds between tries—perfect for temporary glitches in the time stream.

### Goto another step

For an unauthorized jump (401), go to a re-authentication step:

```yaml
- stepId: "jumpTo1889"
  operationId: "warpApi.timeTravel"
  requestBody:
    payload:
      destination: "tml_tesla_mission_1"
  successCriteria:
    - condition: "$statusCode == 200"
  onFailure:
    - name: "reAuthOn401"
      type: "goto"
      stepId: "reAuth"
      criteria:
        - condition: "$statusCode == 401"
- stepId: "reAuth"
  operationId: "warpApi.someAuthOperation"  # Hypothetical endpoint
  outputs:
    newToken: $response.body#/token
```

If the jump fails with a 401, it skips to reAuth to refresh the token, then you'd loop back manually or adjust the workflow.

## Practical examples

### Handling timeouts

Warp's `monitorTimeline` might timeout (503). Retry, then give up:

```yaml
- stepId: "monitorJump"
  operationId: "warpApi.monitorTimeline"
  parameters:
    - in: query
      name: timeline_id
      value: "tml_tesla_mission_1"
  successCriteria:
    - condition: "$statusCode == 200"
  onFailure:
    - name: "retryOnTimeout"
      type: "retry"
      retryLimit: 3
      retryAfter: 10
      criteria:
        - condition: "$statusCode == 503"
    - name: "exitOnMaxRetries"
      type: "end"
      criteria:
        - condition: "$retryCount >= 3"
```
After 3 failed attempts, it exits—better to abort than risk a corrupted timeline.

### Unauthorized responses

For a 401 on `checkParadox`:

```yaml
- stepId: "checkStability"
  operationId: "warpApi.checkParadox"
  requestBody:
    payload:
      timeline_id: "tml_tesla_mission_1"
      proposed_changes:
        - event: "Retrieve Tesla's blueprint"
          time: "1889-03-10T23:50:00Z"
  successCriteria:
    - condition: "$statusCode == 200"
    - condition: "$.adam_stable == true"
      context: "$response.body"
      type: "jsonpath"
  onFailure:
    - name: "logOn401"
      type: "goto"
      stepId: "logIssue"
      criteria:
        - condition: "$statusCode == 401"
- stepId: "logIssue"
  operationId: "warpApi.someLogOperation"  # Hypothetical logging endpoint
  requestBody:
    payload:
      message: "Unauthorized paradox check"
```

If authorization fails, it logs the issue—great for auditing time-travel mishaps.

## Tips for success

- **Start simple**: Use `$statusCode` checks first, then add response body conditions.
- **Match reality**: Test successCriteria against actual Warp API responses (e.g., does `adam_stable` exist?).
- **Plan B matters**: Add `onFailure` for critical steps—time travel's too wild to wing it.
- **Tune retries**: Set retryLimit and retryAfter based on your API's behavior (Warp's docs suggest timeouts are rare but possible).

## Why it matters
With the Warp API, a failed step could leave you stranded in 1889 or unravel reality itself. Success criteria ensures your jumps, checks, and anchors hit their marks, while `onFailure` offers a safety net for the unexpected. Together, they turn risky time-travel workflows into reliable missions.
