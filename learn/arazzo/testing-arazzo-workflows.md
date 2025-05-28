# Testing API Workflows with Respect

You've documented your Warp API workflow to nab Tesla's blueprint from 1889—now it's time to test it.
Redocly's new tool, **Respect**, launched in 2025, runs Arazzo files with a command like `npx @redocly/cli@latest respect warp.arazzo.yaml --input token=your-warp-token`.
It executes your time-travel mission against the Warp API, showing you if every anchor, jump, and return works as planned. Let's dive into how Respect tests your Warp workflow, run our Tesla mission, and unpack the output to ensure we don't get stuck in the past.

## Why test with Respect?
Arazzo workflows are actionable scripts, not just docs.

Respect takes your Warp API steps—setting anchors, creating timelines, traveling through time—and runs them live (or against mocks), giving you real results.

Testing with Respect:
- **Confirms execution**: Checks if the sequence (anchor → timeline → travel) flows smoothly.
- **Spots failures**: Catches issues like bad tokens or paradox-inducing jumps early.
- **Delivers output**: Shows step-by-step success or failure—did Tesla's blueprint make it back?

Unlike `npx @redocly/cli@latest lint` (syntax checking), Respect *executes* the workflow, hitting Warp's endpoints with your inputs.
It's like a time machine simulator—press go and see where you land.

## Setting up Respect

You'll need:
- **Redocly CLI**: We'll use `npx` to get the latest version of the CLI.
- **Arazzo file**: We'll use `warp.arazzo.yaml` and `warp.openapi.yaml` from the [documentation article](./arazzo-walkthrough.md) - click the download button at the top-right of the file list.
- **Warp token**: A bearer token for Warp's `bearerAuth` security (you can make up any token such as `abc123`).


## Testing the Tesla blueprint workflow

Execute it:

```bash
npx @redocly/cli@latest respect warp.arazzo.yaml --input token=abc123
```

The `--input token=abc123` passes the Warp token to the workflow, mapping to its security needs.


## Decoding the output

Respect runs each step, sending requests to Warp's API and logging the results. Here's a possible output (hypothetical, based on Respect's purpose):

```bash
Running workflow warp.arazzo.yaml / missionLostInvention

  ✓ POST /anchors - step setAnchorToCurrentTime
    ✓ status code check (Response code 201 matches one of description codes: [201, 409])
    ✓ content-type check
    ✓ schema check

  ✓ POST /timelines - step createTimelineTo1889
    ✓ status code check (Response code 201 matches one of description codes: [201])
    ✓ content-type check
    ✓ schema check

  ✓ POST /travels - step travelTo1889
    ✓ status code check (Response code 200 matches one of description codes: [200, 400])
    ✓ content-type check
    ✓ schema check

  ✓ POST /items - step findAndRegisterBlueprint
    ✓ status code check (Response code 200 matches one of description codes: [200, 409])
    ✓ content-type check
    ✓ schema check

  ✓ POST /paradox-checks - step avoidParadox
    ✓ success criteria check
    ✓ success criteria check
    ✓ status code check (Response code 200 matches one of description codes: [200, 400])
    ✓ content-type check
    ✓ schema check

  ✓ POST /travels - step returnToPresent
    ✓ status code check (Response code 200 matches one of description codes: [200, 400])
    ✓ content-type check
    ✓ schema check


  Summary for warp.arazzo.yaml
  
  Workflows: 1 passed, 1 total
  Steps: 6 passed, 6 total
  Checks: 20 passed, 20 total
  Time: 996ms


┌─────────────────────────────────────────────────────┬────────────┬─────────┬─────────┬──────────┬─────────┐
│ Filename                                            │ Workflows  │ Passed  │ Failed  │ Warnings │ Skipped │
├─────────────────────────────────────────────────────┼────────────┼─────────┼─────────┼──────────┼─────────┤
│ ✓ warp.arazzo.yaml                                  │ 1          │ 1       │ -       │ -        │ -       │
└─────────────────────────────────────────────────────┴────────────┴─────────┴─────────┴──────────┴─────────┘
```

Respect checks the status code, content-type, and schema of each step automatically.
In addition, it checks the success criteria of each step, if defined.

## Enhancing with Respect options

The Respect docs offer handy flags:

Verbose Mode: Add `--verbose` for detailed logs (truncated to the first step in the example below because it is verbose):

```bash
npx @redocly/cli@latest respect warp.arazzo.yaml --input token=abc123 --verbose

Running workflow warp.arazzo.yaml / missionLostInvention

  ✓ POST /anchors - step setAnchorToCurrentTime

    Request URL: https://warp-multi-sidebars.redocly.app/_mock/apis/anchors
    Request Headers:
      content-type: application/json
      accept: application/json
      authorization: ********
    Request Body:
      {
        "timestamp": "2024-09-16T05:04:00Z",
        "description": "Home Base - Start of Tesla Mission"
      }


    Response status code: 201
    Response time: 214 ms
    Response Body:
      {
        "id": "anc_mel2c9ba",
        "timestamp": "2024-09-16T05:04:00Z",
        "description": "Home Base - Start of Tesla Mission"
      }

    ✓ status code check (Response code 201 matches one of description codes: [201, 409])
    ✓ content-type check
    ✓ schema check
```

## Why it matters

Respect turns your Warp Arazzo file into a live test, proving the Tesla blueprint mission works—or doesn't.
It's not just theory; it's execution, catching bugs before they strand you in 1889.
For Warp's team, it's a QA step that ensures reliable time travel, and the output can plug into CI/CD for automated checks.
