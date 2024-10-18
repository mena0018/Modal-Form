'use server';

import prisma from '@/prisma/singleton';
import { actionClient } from '@/lib/safe-action';
import { flattenValidationErrors } from 'next-safe-action';
import { UserSchema } from '@/features/user/lib/user.schema';

export const saveUserAction = actionClient
  .schema(UserSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id, firstname, lastname, email } }) => {
    await prisma.user.update({
      where: { id },
      data: {
        firstname,
        lastname,
        email,
      },
    });
    return { message: 'User Updated! 🎉' };
  });
