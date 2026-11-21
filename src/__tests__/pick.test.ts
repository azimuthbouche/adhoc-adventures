import { pick } from '../../supabase/functions/_shared/pick';
import activities from '../../supabase/functions/_shared/activities.json';

describe('pick', () => {
  it('returns the same catalog activity for the same seed', () => {
    const activity = pick(activities, '2026-11-21');
    expect(activities).toContain(activity);
    expect(pick(activities, '2026-11-21')).toBe(activity);
  });

  it('can select every activity without mutating the catalog', () => {
    const original = structuredClone(activities);
    const ids = new Set(
      Array.from({ length: 100 }, (_, seed) => pick(activities, String(seed))?.id),
    );
    expect(ids).toEqual(new Set(activities.map((activity) => activity.id)));
    expect(activities).toEqual(original);
  });

  it('returns null for an empty catalog', () => {
    expect(pick([], 'seed')).toBeNull();
  });

  it('handles an empty seed and a single activity', () => {
    expect(pick([activities[0]], '')).toBe(activities[0]);
  });
});
