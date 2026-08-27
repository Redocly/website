import React from 'react';
import styled from 'styled-components';

import { useThemeHooks } from '@redocly/theme/core/hooks';
import { Markdown } from '@redocly/theme/components/Markdown/Markdown';

import type { Post } from '@redocly/marketing-pages/components/Blog/types.js';
import PostInfo from '@redocly/marketing-pages/components/Blog/PostInfo.js';
import { MediaBox } from '@redocly/marketing-pages/components/PositionItems/MediaBox.js';
import { Box } from '@redocly/marketing-pages/ui/Box.js';

import { RecentPosts } from '../@theme/components/Blog/RecentPosts';

import ctaEclipse from './images/cta-eclipse.svg';

export const frontmatter = {
  title: 'Open-source, agent-friendly SDKs and tooling from OpenAPI description',
  description:
    'Meet redocly generate-client: one OpenAPI description becomes typed SDKs in TypeScript, Python, Go, and PHP — plus validation schemas, query hooks, test mocks, a CLI, and docs. Open source, zero runtime dependencies, and built for AI agents.',
  seo: {
    title: 'Open-source, agent-friendly SDKs and tooling from OpenAPI description',
    description:
      'Meet redocly generate-client: one OpenAPI description becomes typed SDKs in TypeScript, Python, Go, and PHP — plus validation schemas, query hooks, test mocks, a CLI, and docs. Open source, zero runtime dependencies, and built for AI agents.',
  },
  author: 'roman-marshevskyi',
  publishedDate: '2026-08-27',
  categories: ['redocly:redocly-cli', 'api-descriptions:openapi', 'api-lifecycle:sdks'],
};

export default function AgentFriendlySdksPost() {
  const { usePageProps } = useThemeHooks();
  const pageProps = usePageProps();

  const { publishedDate, author, categories, title, slug } = (pageProps.metadata ?? {}) as Post & {
    slug?: string;
  };

  return (
    <PageWrapper style={{ background: 'white' }}>
      <BlogMediaBox>
        <PostInfo
          authorName={author?.name}
          authorBIO={author?.authorBIO}
          publishedDate={publishedDate}
          categories={categories}
          title={title}
          author={author}
          avatar={author?.image}
        />

        <HeroFigure>
          <div className="frame">
            <HeroDiagram />
          </div>
          <figcaption>
            One OpenAPI description, one command, and every consumer of your API gets a typed,
            dependency-free artifact that regenerates instead of drifting.
          </figcaption>
        </HeroFigure>

        <Markdown>
          <Lead>
            As agents become part of engineering teams, more of your API calls are written by one.
            Agents hallucinate endpoints, invent response fields, and hand-write API code you then
            review line by line. Generated code is the cheapest, safest code an agent can ship, so
            we built a generator that treats the agent as a first-class user.
          </Lead>

          <p>
            Meet <code>generate-client</code>: a new command in the{' '}
            <a href="https://github.com/Redocly/redocly-cli">Redocly CLI</a>, powered by a new
            package,{' '}
            <a href="https://github.com/Redocly/redocly-cli/tree/main/packages/client-generator">
              <code>@redocly/client-generator</code>
            </a>
            , that turns one OpenAPI description into typed SDKs in{' '}
            <strong>TypeScript, Python, Go, and PHP</strong>, plus validation schemas, TanStack
            Query and SWR hooks, test mocks, a ready-to-run <strong>command-line interface</strong>,
            and reference docs for all of it. Both the command and the package are open source
            (MIT), and everything they generate is yours outright.
          </p>

          <p>
            The SDKs are fully featured with <strong>zero runtime dependencies</strong>: auth,
            retries, middleware, pagination iterators, typed Server-Sent Events, query-string
            serialization, and multipart uploads, all built on web-standard <code>fetch</code>,{' '}
            <code>AbortController</code>, and <code>URLSearchParams</code>, emitted as code that
            imports nothing. The API code your agent used to hallucinate becomes one deterministic
            command, and the compiler becomes its fact-checker: operation ids, parameters, and
            response fields are literal types, so a wrong call fails <code>tsc</code> with the exact
            operation named.
          </p>

          <h2>Up and running in three steps</h2>

          <Steps>
            <Step>
              <StepNumber>1</StepNumber>
              <div>
                <StepLabel>Start from your API description</StepLabel>
                <StepHint>
                  The one you already have: OpenAPI 3.0, 3.1, 3.2, or Swagger 2.0.
                </StepHint>
                <Pre>
                  <TokC># openapi.yaml</TokC>
                  {'\npaths:\n  /menu-items:\n    get:\n      operationId: '}
                  <TokS>listMenuItems</TokS>
                  {'\n  /orders/{orderId}:\n    get:\n      operationId: '}
                  <TokS>getOrderById</TokS>
                  {'\ncomponents:\n  securitySchemes:\n    BearerAuth:\n      type: '}
                  <TokS>http</TokS>
                  {'\n      scheme: '}
                  <TokS>bearer</TokS>
                </Pre>
              </div>
            </Step>

            <Step>
              <StepNumber>2</StepNumber>
              <div>
                <StepLabel>Run one command</StepLabel>
                <StepHint>
                  No account, no config required. Flags or a <code>redocly.yaml</code>{' '}
                  <code>client</code> block, your choice.
                </StepHint>
                <Pre>
                  <TokC>$</TokC> npx @redocly/cli@latest generate-client openapi.yaml{' '}
                  <TokFlag>--output</TokFlag> src/client.ts
                </Pre>
              </div>
            </Step>

            <Step>
              <StepNumber>3</StepNumber>
              <div>
                <StepLabel>Call your API</StepLabel>
                <StepHint>
                  Every operation is a typed function; every name comes from the description.
                </StepHint>
                <Pre>
                  <TokK>import</TokK>
                  {' { configure, listMenuItems, getOrderById } '}
                  <TokK>from</TokK> <TokS>'./client.js'</TokS>
                  {';\n\n'}
                  <TokF>configure</TokF>
                  {'({ auth: { bearer: token } }); '}
                  <TokC>// sent only where an operation requires it</TokC>
                  {'\n\n'}
                  <TokK>const</TokK>
                  {' menu  = '}
                  <TokK>await</TokK> <TokF>listMenuItems</TokF>
                  {'({ query: { limit: '}
                  <TokF>10</TokF>
                  {' } });\n'}
                  <TokK>const</TokK>
                  {' order = '}
                  <TokK>await</TokK> <TokF>getOrderById</TokF>
                  {'({ path: { orderId: '}
                  <TokS>'ord_01khr…'</TokS>
                  {' } });'}
                </Pre>
              </div>
            </Step>
          </Steps>

          <p>That's the whole client.</p>

          <StepsTagline>One description. One command. Every time your API changes.</StepsTagline>

          <h2>The features you'd otherwise hand-write</h2>

          <p>
            Types are a third of the problem. The behavior is what teams hand-write around generated
            types, and where drift starts. The generated client includes it:
          </p>

          <ul>
            <li>
              <strong>
                Auth from your <code>securitySchemes</code>
              </strong>
              : bearer, basic, and API keys in header, query, or cookie, each sent only where an
              operation's <code>security</code> requires it. Credentials can be async token
              providers, resolved on every request, so refresh flows need no extra code. Every
              client instance carries its own.
            </li>
            <li>
              <strong>Pagination</strong>: declare your pagination convention once (cursor, offset,
              page, or <code>Link</code> header) and the iterators appear on the operation itself:{' '}
              <code>listOrders.pages()</code>, <code>listOrders.items()</code>, typed, abortable,
              with duplicate-cursor loop detection. Delete your pagination loops.
            </li>
            <li>
              <strong>Opt-in, abort-aware retries</strong>: exponential backoff, jitter,{' '}
              <code>Retry-After</code>, idempotent-only by default, and a custom{' '}
              <code>retryOn</code> predicate.
            </li>
            <li>
              <strong>Typed Server-Sent Events</strong>: an operation whose <code>2xx</code> is{' '}
              <code>text/event-stream</code> becomes a typed async iterator with automatic
              reconnection, payloads typed from OpenAPI 3.2's <code>itemSchema</code>.
            </li>
            <li>
              <strong>Composable middleware</strong>: <code>onRequest</code>,{' '}
              <code>onResponse</code>, and <code>onError</code>, with operation ids, paths, and tags
              visible to it as literal types.
            </li>
            <li>
              <strong>The fiddly details, handled</strong>: query parameters serialized exactly as
              the description declares, file uploads from a plain typed object, per-request
              timeouts, and idempotency keys that make retries safe.
            </li>
            <li>
              <strong>Two error models</strong>: exceptions by default, or a typed{' '}
              <code>{'{ data, error }'}</code> result if you prefer returns over throws.
            </li>
          </ul>

          <p>
            And it's strict on your behalf: a call with an argument the operation doesn't declare
            fails before the request leaves the process, with an error that names the operation and
            says where the argument belongs.
          </p>

          <p>
            It reads OpenAPI <strong>3.0, 3.1, and 3.2</strong>, plus <strong>Swagger 2.0</strong>{' '}
            (normalized to 3.x before generation).
          </p>

          <h2>Skills first</h2>

          <p>
            Every part of this tool assumes an agent will operate it, and each of those decisions
            helps the humans just as much:
          </p>

          <ul>
            <li>
              <strong>The design ships as agent skills.</strong> Every generator carries its own
              design document, and ejecting a generator drops it into your repo as a skill (
              <code>{'.claude/skills/<name>-generator/'}</code>) beside the authoring guide. An
              agent asked to change generated output loads the rules first and edits the generator,
              not the output.
            </li>
            <li>
              <strong>A discoverable surface instead of prose.</strong> The generated CLI answers{' '}
              <code>--help</code> with its commands and <code>{'schema <command>'}</code> with one
              operation's whole contract as JSON: method, path, parameters with types, request and
              response schemas. An agent learns a real API in two commands.
            </li>
            <li>
              <strong>Feedback an agent can act on.</strong> Strict types plus runtime
              unknown-argument errors name the operation and say where the argument belongs.
            </li>
            <li>
              <strong>Deterministic ground truth.</strong> The generated mocks are seeded and
              offline, so tests an agent writes reproduce exactly, with no live API in the loop
              teaching it wrong lessons.
            </li>
            <li>
              <strong>Regeneration over hand-editing.</strong> The client is machine-owned and
              rebuilt from the description; the generator is human-owned and ejectable. That split
              tells an agent exactly which file it is allowed to change.
            </li>
          </ul>

          <p>
            The instruction we ship our own agents is one paragraph:{' '}
            <em>
              never hand-write HTTP code for our APIs; regenerate the client and import the
              functions, and a wrong call fails the build.
            </em>
          </p>

          <h2>One description, every consumer</h2>

          <p>
            The vocabulary is simple: you select <strong>generators</strong> in one list, each
            generator emits an <strong>artifact</strong>, and each artifact serves a different
            consumer of your API. The SDK is one kind of artifact; here is the whole list, produced
            from one parse of your description in one command:
          </p>

          <TableScroll>
            <table>
              <thead>
                <tr>
                  <th>Generator</th>
                  <th>Artifact</th>
                  <th>Consumer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>typescript</code> (default), <code>python</code>, <code>go</code>,{' '}
                    <code>php</code>
                  </td>
                  <td>the full typed client, in that language</td>
                  <td>calling your API from any stack</td>
                </tr>
                <tr>
                  <td>
                    <code>zod</code>
                  </td>
                  <td>Zod schemas + validation middleware</td>
                  <td>runtime contract checks</td>
                </tr>
                <tr>
                  <td>
                    <code>tanstack-query</code>, <code>swr</code>
                  </td>
                  <td>query and mutation factories, hooks</td>
                  <td>React, Vue, Svelte, Solid data fetching</td>
                </tr>
                <tr>
                  <td>
                    <code>mock</code>
                  </td>
                  <td>MSW v2 handlers + typed data factories</td>
                  <td>tests and demos, offline and deterministic</td>
                </tr>
                <tr>
                  <td>
                    <code>transformers</code>
                  </td>
                  <td>
                    <code>Date</code> converters
                  </td>
                  <td>
                    ISO strings → <code>Date</code>, paired with <code>--date-type Date</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>cli</code>
                  </td>
                  <td>a bin-ready command-line interface</td>
                  <td>scripts, CI, agents</td>
                </tr>
                <tr>
                  <td>your own</td>
                  <td>anything</td>
                  <td>the long tail</td>
                </tr>
              </tbody>
            </table>
          </TableScroll>

          <p>
            Every language SDK carries the same behavior, each as a single self-contained file:{' '}
            <code>httpx</code> for Python, the standard library for Go, the curl extension for PHP.
            And names resolve once: <code>listOrders</code> is the operation in the description, the
            function in every SDK, and the CLI command, so one identifier greps across your whole
            stack.
          </p>

          <p>
            Docs are one flag: add <code>--docs</code> and every selected generator writes a
            reference page beside its output. The docs regenerate with the code, so they cannot
            drift from it.
          </p>

          <h2>And if you disagree with a built-in, take it</h2>

          <p>
            When a tool gets something wrong for you, the traditional move is to fork it, and a fork
            is a life sentence: you maintain the whole project from that day on, and upstream fixes
            stop reaching you. Eject gives you the ownership without the fork:
          </p>

          <Pre>
            <TokC>$</TokC> npx @redocly/cli@latest eject-generator python
          </Pre>

          <p>
            That copies the built-in generator into your repository as{' '}
            <strong>TypeScript source you own</strong>: a folder with one readable file per stage
            (naming, types, models, operations, pagination, client). It wires your config to it,
            and, unmodified, it produces byte-identical output. We verify that byte-identity in our
            test suite. Later versions merge into your copy file by file with <code>--update</code>.
            The generator's design document arrives with it as an{' '}
            <strong>agent skill in your repo</strong>, and the skill is yours to manage: edit it to
            state your house rules (naming, headers, error style, whatever the built-in got wrong
            for you), and your AI agent reads the skill first and changes the ejected generator to
            match. You maintain a short design document; the agent maintains the code to it.
          </p>

          <h2>Yours to shape</h2>

          <ul>
            <li>
              <strong>Call style</strong>: grouped inputs by default; <code>--args-style flat</code>{' '}
              merges them into one object when an operation's inputs can't collide.
            </li>
            <li>
              <strong>Output layout</strong>: one <code>single</code> file (default), or{' '}
              <code>split</code> with schema types in a sibling module.
            </li>
            <li>
              <strong>Runtime placement</strong>: inlined into the client by default for a truly
              single-file artifact, or <code>--runtime module</code> to write the runtime as real,
              readable files beside it, shared between clients.
            </li>
            <li>
              <strong>No build step, if you want none</strong>: with <code>--import-ext ts</code>,
              the generated client, the zod module, and the CLI run as they are under plain Node
              22.18+, which strips the types itself.
            </li>
            <li>
              <strong>Configuration</strong>: CLI flags or a <code>client</code> block in{' '}
              <code>redocly.yaml</code>, with per-API overrides for monorepos that generate several
              clients from one config.
            </li>
          </ul>

          <h2>Proven on ourselves first</h2>

          <p>
            We didn't design this in the abstract: Redocly's own platform runs on this generator:
            four internal APIs, hundreds of operations, an in-house codegen deleted in the process,
            and much of the migration executed by an AI agent working against the generated client.
            That migration found real bugs our tests had missed, and it's the subject of the next
            post.
          </p>

          <p>
            One caveat, stated plainly: the command is still experimental, flags and output may
            change, so pin your CLI version. The code it generates is strict-TypeScript clean,
            exhaustively tested, and already carrying Redocly's production traffic.
          </p>

          <CtaCard>
            <CtaGlow aria-hidden="true">
              <CtaGlowInner>
                <img src={ctaEclipse} alt="" />
              </CtaGlowInner>
            </CtaGlow>
            <CtaTitleColumn>
              <CtaTitle>Try it on your own API</CtaTitle>
              <CtaDescription>
                One command, no account, runs entirely on your machine.
              </CtaDescription>
            </CtaTitleColumn>
            <CtaActionColumn>
              <Pre>
                <TokC>$</TokC> npx @redocly/cli@latest generate-client openapi.yaml{' '}
                <TokFlag>--output</TokFlag> src/client.ts
              </Pre>
              <CtaNote>
                Then import a function and call your API. The whole client is in the file you just
                generated.
              </CtaNote>
              <CtaLinks>
                <a href="https://redocly.com/docs/cli/commands/generate-client">
                  Command reference
                </a>
                <a href="https://redocly.com/docs/cli/guides/customize-client-generation">
                  Write a custom generator
                </a>
                <a href="https://github.com/Redocly/redocly-cli/tree/main/tests/e2e/generate-client/examples">
                  Runnable examples
                </a>
                <a href="https://github.com/Redocly/redocly-cli">GitHub</a>
              </CtaLinks>
            </CtaActionColumn>
          </CtaCard>
        </Markdown>
      </BlogMediaBox>

      <MediaBox>
        <Box style={{ margin: '80px 0' }}>
          <RecentPosts currentSlug={slug} />
        </Box>
      </MediaBox>
    </PageWrapper>
  );
}

function HeroDiagram() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 560"
      role="img"
      aria-label="Diagram: one OpenAPI description flows through redocly generate-client into grouped artifacts: SDKs in TypeScript, Python, Go, and PHP; validation schemas, query hooks, and test mocks; a command-line interface; and reference docs."
    >
      <defs>
        <radialGradient id="hero-wash" cx="85%" cy="-10%" r="70%">
          <stop offset="0%" stopColor="#99cdff" stopOpacity="0.30" />
          <stop offset="60%" stopColor="#99cdff" stopOpacity="0" />
        </radialGradient>
        <marker
          id="hero-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#2467f2" />
        </marker>
      </defs>
      <rect width="1200" height="560" fill="#ffffff" />
      <rect width="1200" height="560" fill="url(#hero-wash)" />

      <text x="80" y="92" fontSize="40" fontWeight="700" fill="#1a1c21" letterSpacing="-0.5">
        One description. Every consumer.
      </text>
      <text x="80" y="128" fontSize="19" fill="#555761">
        typed SDKs, a CLI, mocks, and docs. Built for agents, owned by you.
      </text>

      <rect x="80" y="205" width="230" height="230" rx="12" fill="#ffffff" stroke="#dcdde5" />
      <path
        d="M 80 217 a 12 12 0 0 1 12 -12 h 206 a 12 12 0 0 1 12 12 v 32 h -230 z"
        fill="#e7f3ff"
      />
      <text x="102" y="233" fontSize="15" fontWeight="700" fill="#2467f2">
        openapi.yaml
      </text>
      <g fontFamily="Menlo, Consolas, monospace" fontSize="12.5" fill="#3b3c45">
        <text x="102" y="275">
          openapi: 3.1.0
        </text>
        <text x="102" y="296">
          paths:
        </text>
        <text x="114" y="317">
          {'/orders/{orderId}:'}
        </text>
        <text x="126" y="338" fill="#0e8450">
          get: …
        </text>
        <text x="102" y="363">
          securitySchemes:
        </text>
        <text x="114" y="384" fill="#0e8450">
          BearerAuth: …
        </text>
      </g>

      <line
        x1="310"
        y1="320"
        x2="392"
        y2="320"
        stroke="#2467f2"
        strokeWidth="2.5"
        markerEnd="url(#hero-arrow)"
      />

      <rect x="400" y="275" width="300" height="90" rx="12" fill="#16171c" />
      <circle cx="424" cy="297" r="5" fill="#f56565" />
      <circle cx="442" cy="297" r="5" fill="#f7d787" />
      <circle cx="460" cy="297" r="5" fill="#48bb78" />
      <g fontFamily="Menlo, Consolas, monospace" fontSize="14">
        <text x="424" y="331" fill="#8a8f9f">
          $
        </text>
        <text x="442" y="331" fill="#e8eaf2">
          redocly
        </text>
        <text x="510" y="331" fill="#7cc4ff">
          generate-client
        </text>
        <text x="442" y="353" fill="#8a8f9f">
          → typed · zero deps · yours
        </text>
      </g>

      <line
        x1="700"
        y1="297"
        x2="782"
        y2="239"
        stroke="#2467f2"
        strokeWidth="2.5"
        markerEnd="url(#hero-arrow)"
      />
      <line
        x1="700"
        y1="313"
        x2="782"
        y2="319"
        stroke="#2467f2"
        strokeWidth="2.5"
        markerEnd="url(#hero-arrow)"
      />
      <line
        x1="700"
        y1="331"
        x2="782"
        y2="399"
        stroke="#2467f2"
        strokeWidth="2.5"
        markerEnd="url(#hero-arrow)"
      />
      <line
        x1="700"
        y1="347"
        x2="782"
        y2="479"
        stroke="#2467f2"
        strokeWidth="2.5"
        markerEnd="url(#hero-arrow)"
      />

      <g fontSize="14.5">
        <rect x="790" y="204" width="330" height="58" rx="10" fill="#ffffff" stroke="#dcdde5" />
        <text x="812" y="228" fontWeight="700" fill="#1a1c21">
          SDKs
        </text>
        <text x="812" y="248" fill="#555761" fontSize="12.5">
          client.ts · client.py · client.go · client.php
        </text>

        <rect x="790" y="284" width="330" height="58" rx="10" fill="#ffffff" stroke="#dcdde5" />
        <text x="812" y="308" fontWeight="700" fill="#1a1c21">
          Schemas, hooks, and mocks
        </text>
        <text x="812" y="328" fill="#555761" fontSize="12.5">
          client.zod.ts · client.tanstack.ts · client.mocks.ts
        </text>

        <rect x="790" y="364" width="330" height="58" rx="10" fill="#ffffff" stroke="#dcdde5" />
        <text x="812" y="388" fontWeight="700" fill="#1a1c21">
          CLI
        </text>
        <text x="812" y="408" fill="#555761" fontSize="12.5">
          client.cli.ts
        </text>

        <rect x="790" y="444" width="330" height="74" rx="10" fill="#ffffff" stroke="#dcdde5" />
        <text x="812" y="468" fontWeight="700" fill="#1a1c21">
          Docs
        </text>
        <text x="812" y="488" fill="#555761" fontSize="12.5">
          client.python.md · client.cli.md
        </text>
        <text x="812" y="505" fill="#555761" fontSize="12.5">
          one page per artifact
        </text>
      </g>
    </svg>
  );
}

const HeroFigure = styled.figure`
  margin: 6px 0 36px;

  .frame {
    border: 1px solid #ededf2;
    border-radius: 12px;
    overflow: hidden;
    background: #ffffff;
  }

  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  figcaption {
    font-size: 13px;
    color: #6e6f7a;
    margin-top: 10px;
  }
`;

const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const BlogMediaBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: calc(90vw);

  @media screen and (min-width: 900px) {
    max-width: 800px;
  }
`;

const Lead = styled.p`
  font-size: 19px;
  line-height: 1.6;
`;

// The theme's Markdown wrapper styles 'pre' (background, text color, padding),
// so token colors here are picked for contrast on its light code-block background.
const Pre = styled.pre`
  border-radius: 8px;
  font-size: 13.5px;
  tab-size: 2;
  white-space: pre;
`;

const TokC = styled.span`
  color: #59636e;
`;

const TokK = styled.span`
  color: #cf222e;
`;

const TokS = styled.span`
  color: #116329;
`;

const TokF = styled.span`
  color: #8250df;
`;

const TokFlag = styled.span`
  color: #953800;
  font-weight: 600;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 26px 0 10px;
`;

const Step = styled.div`
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 14px;

  /* Let the code block shrink and scroll instead of widening the column */
  > div {
    min-width: 0;
  }

  pre {
    margin-bottom: 0;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const StepNumber = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #e7f3ff;
  color: #2467f2;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

const StepLabel = styled.div`
  font-weight: 700;
  font-size: 16.5px;
  margin: 6px 0 8px;
`;

const StepHint = styled.div`
  font-size: 14px;
  color: var(--color-text-dimmed, #6e6f7a);
  margin: -4px 0 8px;
`;

const StepsTagline = styled.p`
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  margin: 22px 0 0;
`;

const TableScroll = styled.div`
  overflow-x: auto;
  margin: 0 0 1.3em;
  border: 1px solid #ededf2;
  border-radius: 8px;

  table {
    border-collapse: collapse;
    width: 100%;
    min-width: 560px; /* scroll horizontally on small screens instead of squashing columns */
    font-size: 14.5px;
    margin: 0;
  }

  th,
  td {
    text-align: left;
    padding: 11px 16px;
    border-bottom: 1px solid #ededf2;
    vertical-align: top;
  }

  thead th {
    background: #fbfbfc;
    font-weight: 600;
    white-space: nowrap;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

// CTA card in the style of the /reviewer page: tonal card, split columns, eclipse glow.
const CtaCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 64px;
  border-radius: 32px;
  background-color: var(--bg-color-tonal);

  > div:last-child {
    border-top: 1px solid var(--border-color-secondary);
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;

    > div:last-child {
      border-left: 1px solid var(--border-color-secondary);
      border-top: none;
    }
  }
`;

/* The "Eclipse" glow from the reviewer page CTA: a blurred pink→violet ellipse
   anchored to the card's bottom-left, clipped by the card. */
const CtaGlow = styled.div`
  position: absolute;
  top: 135px;
  left: -37px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 564px;
  height: 369px;
  pointer-events: none;
`;

const CtaGlowInner = styled.div`
  position: relative;
  flex: none;
  width: 267px;
  height: 557px;
  transform: rotate(93.43deg) scaleY(0.99) skewX(-7.19deg);

  img {
    position: absolute;
    inset: -35.89% -75.04%;
    width: 250.08%;
    height: 171.78%;
    max-width: none;
  }
`;

const CtaTitleColumn = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px 32px 0;

  @media screen and (min-width: 768px) {
    padding: 40px 32px 40px 40px;
  }
`;

const CtaTitle = styled.p`
  margin: 0;
  font-family: 'Red Hat Display';
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  color: var(--text-color-primary);
`;

const CtaDescription = styled.p`
  margin: 0;
  font-family: 'Red Hat Display';
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  color: var(--text-color-helper);
`;

const CtaActionColumn = styled.div`
  position: relative;
  display: flex;
  flex: 1.4;
  min-width: 0;
  flex-direction: column;
  gap: 20px;
  padding: 32px;

  @media screen and (min-width: 768px) {
    padding: 40px;
  }

  &&& pre {
    margin: 0;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color-secondary);
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const CtaNote = styled.p`
  margin: 0;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--text-color-helper);
`;

const CtaLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: start;
  gap: 12px 40px;
  font-size: 14.5px;

  a {
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 400px) {
    grid-template-columns: minmax(0, max-content);
  }
`;
