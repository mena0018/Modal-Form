'use client';

import { routes } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { User } from '@/features/user/lib/user.schema';
import { TableCell, TableRow } from '@/components/ui/table';

type UserRowProps = {
  user: User;
};

export const UserRow = ({ user }: UserRowProps) => {
  const { push } = useRouter();

  const handleClick = () => {
    push(routes.userEdit({ id: user.id.toString() }));
  };

  return (
    <TableRow onClick={handleClick} className="cursor-pointer">
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.firstname}</TableCell>
      <TableCell>{user.lastname}</TableCell>
    </TableRow>
  );
};
