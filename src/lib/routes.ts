import { z } from 'zod';
import { createNavigationConfig } from 'next-safe-navigation';

export const { routes, useSafeParams, useSafeSearchParams } = createNavigationConfig((route) => ({
  home: route('/'),

  users: route('/users'),
  userEdit: route('/users/edit/[id]', {
    params: z.object({ id: z.string() }),
  }),
}));
