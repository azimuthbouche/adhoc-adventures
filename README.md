# adhoc-adventures

Walking skeleton: Expo Today screen and a public Supabase sample endpoint share
a deterministic picker over three demo activities. The date seed is UTC.
No auth, database access, user preferences, or production catalog yet.

## Local

Use Node 22, then:

```sh
npm ci
npm run web
```

Checks: npm run lint, npm run typecheck, npm test, npm run typecheck:edge,
npm run test:edge, npm run export:web. Deno is installed as a dev dependency.

## Staging

Create a Supabase staging project and a Cloudflare Pages **Direct Upload**
project. Keep the Pages production branch different from staging, for example
main. Do not connect Pages Git builds; the workflow uploads checked artifacts.

In the GitHub staging environment, set:

| Kind | Names |
|---|---|
| Secrets | SUPABASE_ACCESS_TOKEN, CLOUDFLARE_API_TOKEN |
| Variables | SUPABASE_PROJECT_REF, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_PAGES_PROJECT |

Create tokens in provider dashboards and enter them directly in GitHub, never
in chat or files. Restrict the Cloudflare token to Pages Edit for the account.
Supabase access tokens authorize management operations; treat them as privileged.
Configure staging environment approval in GitHub before enabling deploys.

After explicit owner approval, run the manual Staging workflow on the branch.
It reruns CI, deploys and probes the sample function, then uploads the web
artifact to the staging preview branch. Open the Pages URL from the deployment
output and confirm Today renders a pick. The app uses local sample data in this
slice; it does not call Supabase yet.

The sample endpoint deliberately disables JWT verification because it exposes
only bundled demo data. Replace this with authenticated behavior before
adding any user data. No production deployment is configured.

## License

The project uses the MIT license.
Expo template configuration and assets retain their MIT notice in
THIRD_PARTY_NOTICES.txt.
