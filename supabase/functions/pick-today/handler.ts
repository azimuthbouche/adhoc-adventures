import { pick } from '../_shared/pick.ts';
import activities from '../_shared/activities.json' with { type: 'json' };

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Cache-Control': 'no-store',
};

// This public demo reads bundled samples only, never user data or credentials.
export function handleRequest(request: Request, now = new Date()): Response {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }
  if (request.method !== 'GET') {
    return new Response(null, {
      status: 405,
      headers: { ...headers, Allow: 'GET, OPTIONS' },
    });
  }
  const date = now.toISOString().slice(0, 10);
  return Response.json(
    { activity: pick(activities, date), date, demo: true },
    { headers },
  );
}
