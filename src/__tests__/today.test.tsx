import { render, screen } from '@testing-library/react-native';
import React from 'react';
import Today from '../app/index';
import { pick } from '../../supabase/functions/_shared/pick';
import activities from '../../supabase/functions/_shared/activities.json';

it('keeps initial content independent of the build date before effects run', async () => {
  const effect = jest.spyOn(React, 'useEffect').mockImplementation(() => {});
  try {
    await render(<Today />);
    expect(screen.getByText('Loading your pick...')).toBeOnTheScreen();
    for (const activity of activities) {
      expect(screen.queryByText(activity.title)).toBeNull();
    }
  } finally {
    effect.mockRestore();
  }
});

it('renders the daily demo pick with its instructions', async () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-11-21T12:00:00Z'));
  try {
    const activity = pick(activities, '2026-11-21')!;
    await render(<Today />);
    expect(screen.getByRole('header', { name: 'Today' })).toBeOnTheScreen();
    expect(screen.getByText(activity.title)).toBeOnTheScreen();
    expect(screen.getByText(activity.summary)).toBeOnTheScreen();
    for (const step of activity.steps) {
      expect(screen.getByText(step)).toBeOnTheScreen();
    }
    expect(screen.getByText(/demo/i)).toBeOnTheScreen();
  } finally {
    jest.useRealTimers();
  }
});
