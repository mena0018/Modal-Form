import { z } from 'zod';
import { createNavigationConfig } from 'next-safe-navigation';

export const { routes, useSafeParams } = createNavigationConfig((defineRoute) => ({
  home: defineRoute('/'),

  users: defineRoute('/users'),
  userEdit: defineRoute('/users/edit/[id]', {
    params: z.object({ id: z.string() }),
  }),
}));
