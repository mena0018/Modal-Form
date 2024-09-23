import { DialogWrapper } from '@/components/dialog-wrapper';
import { getUserById } from '@/features/user/lib/get-user';
import { UserForm } from '@/features/user/components/user-form';

type EditUserProps = {
  params: {
    id: string;
  };
};

export default async function EditUser({ params }: EditUserProps) {
  const { id } = params;
  const user = await getUserById(Number(id));

  if (!user?.id) {
    return (
      <DialogWrapper>
        <div className="max-w-md space-y-2 p-8">
          <h1 className="text-2xl">No User Found for that ID.</h1>
        </div>
      </DialogWrapper>
    );
  }

  return (
    <DialogWrapper>
      <div className="space-y-2">
        <h1 className="mb-4 text-2xl">Edit User {id}</h1>
        <UserForm user={user} />
      </div>
    </DialogWrapper>
  );
}
