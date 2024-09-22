'use server';

import prisma from '@/prisma/singleton';
import { User } from '@/features/user/lib/user.schema';
import { UserSchema } from '@/features/user/lib/user.schema';

type ReturnType = {
  message: string;
  errors?: Record<string, unknown>;
};

export async function saveUser(user: User): Promise<ReturnType> {
  const userParsed = UserSchema.safeParse(user);

  if (!userParsed.success) {
    return {
      message: 'Submission Failed',
      errors: userParsed.error.flatten().fieldErrors,
    };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: user,
  });

  return { message: 'User Updated! 🎉' };
}
