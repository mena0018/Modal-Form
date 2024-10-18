import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    // Log to console.
    console.error('Action error:', error.message);

    // Return generic message
    return 'Oh no, something went wrong!';
  },
});
