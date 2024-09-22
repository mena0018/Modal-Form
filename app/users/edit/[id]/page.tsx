import { BackButton } from '@/components/back-button';
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
      <div className="max-w-md space-y-2 p-8">
        <h1 className="text-2xl">No User Found for that ID.</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-12 flex w-full max-w-md flex-col justify-between gap-4">
      <div className="card space-y-2 rounded bg-card p-8 shadow-lg">
        <h1 className="text-2xl">Edit User {id}</h1>
        <UserForm user={user} />
      </div>
      <BackButton className="ml-auto" />
    </div>
  );
}
