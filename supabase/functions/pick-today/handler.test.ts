import { handleRequest } from './handler.ts';
import { pick } from '../_shared/pick.ts';
import activities from '../_shared/activities.json' with { type: 'json' };

function assert(condition: boolean) {
  if (!condition) throw new Error('Assertion failed');
}

Deno.test('GET returns the shared daily pick with CORS', async () => {
  const response = handleRequest(
    new Request('https://example.com/pick-today'),
    new Date('2026-11-21T12:00:00Z'),
  );
  const body = await response.json();
  assert(response.status === 200);
  assert(body.activity.id === pick(activities, '2026-11-21')?.id);
  assert(body.demo === true);
  assert(response.headers.get('Access-Control-Allow-Origin') === '*');
});

Deno.test('OPTIONS supports browser preflight', () => {
  const response = handleRequest(
    new Request('https://example.com/pick-today', { method: 'OPTIONS' }),
  );
  assert(response.status === 204);
  assert(response.headers.get('Access-Control-Allow-Methods') === 'GET, OPTIONS');
});

Deno.test('unsupported methods return 405', () => {
  const response = handleRequest(
    new Request('https://example.com/pick-today', { method: 'POST' }),
  );
  assert(response.status === 405);
  assert(response.headers.get('Allow') === 'GET, OPTIONS');
});
