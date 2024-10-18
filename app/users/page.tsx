import { getUsers } from '@/features/user/lib/user.get';
import { UserRow } from '@/features/user/components/user-row';
import { BackButton } from '@/components/back-button';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="container flex w-full flex-col gap-4 p-8">
      <h1 className="text-2xl">Users List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
      <BackButton className="ml-auto mt-4" />
    </div>
  );
}
