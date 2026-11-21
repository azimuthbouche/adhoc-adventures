# Project rules

Web-first Expo Router app. Routes live in src/app. Native builds and the full
selection policy are outside the current scope.

- Use npx expo install for Expo dependencies; check docs for the installed SDK.
- Write failing behavior tests before implementation. Keep PRs under ~850 added
  lines, including tests and excluding lockfiles.
- Pure selection code and sample JSON live in supabase/functions/_shared so Expo
  and Edge Functions use one implementation without external bundler imports.
- The three samples are demo data, not an approved production catalog.
  Authenticated selection must keep the catalog server-side.
- Never put credentials or user data in the repo, client bundle, or logs.
- Run npm run lint, npm run typecheck, npm test, npm run typecheck:edge,
  npm run test:edge, and npm run export:web before handing back code.
- Commit, push, PR creation, and deployment require explicit owner permission.
