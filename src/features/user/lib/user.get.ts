import prisma from '@/prisma/singleton';
import { notFound } from 'next/navigation';
import { User } from '@/features/user/lib/user.schema';

export const getUsers = async (): Promise<User[]> => {
  const users = prisma.user.findMany({ orderBy: { id: 'asc' } });

  if (!users) {
    notFound();
  }

  return users;
};

export const getUserById = async (id: number): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    notFound();
  }

  return user;
};
