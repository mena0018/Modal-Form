'use client';

import { useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { User } from '@/features/user/lib/user.schema';
import { UserSchema } from '@/features/user/lib/user.schema';
import { saveUserAction } from '@/features/user/lib/user.action';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/input-with-label';
import { DisplayServerActionResponse } from '@/components/display-server-action-response';

type UserFormProps = {
  user: User;
};

export const UserForm = ({ user }: UserFormProps) => {
  const router = useRouter();
  const { execute, result, isExecuting } = useAction(saveUserAction);

  const form = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(UserSchema),
    defaultValues: { ...user },
  });

  useEffect(() => {
    localStorage.setItem('userFormModified', form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    execute(form.getValues());
    router.refresh();
    form.reset(data);
  };

  return (
    <Fragment>
      <DisplayServerActionResponse result={result} />

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
          className="flex flex-col gap-2"
        >
          <InputWithLabel label="First Name" value="firstname" />
          <InputWithLabel label="Last Name" value="lastname" />
          <InputWithLabel label="Email" value="email" />

          <div className="mt-4 flex gap-4">
            <Button>{isExecuting ? 'Saving...' : 'Submit'}</Button>
            <Button type="button" variant="destructive" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </Fragment>
  );
};
