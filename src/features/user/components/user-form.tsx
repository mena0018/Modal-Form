'use client';

import { toast } from 'sonner';
import { useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { User } from '@/features/user/lib/user.schema';
import { UserSchema } from '@/features/user/lib/user.schema';
import { saveUserAction } from '@/features/user/lib/user.action';

import { Form } from '@/components/ui/form';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/input-with-label';

type UserFormProps = {
  user: User;
};

export const UserForm = ({ user }: UserFormProps) => {
  const router = useRouter();

  const form = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(UserSchema),
    defaultValues: { ...user },
  });

  const { executeAsync, isExecuting } = useAction(saveUserAction, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
    },
    onError: ({ error }) => {
      toast.error(error.serverError || error.bindArgsValidationErrors);
    },
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    await executeAsync(data);
    router.refresh();
    form.reset(data);
  };

  useEffect(() => {
    localStorage.setItem('userFormModified', form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

  return (
    <Fragment>
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
            <Button className="min-w-20">
              {isExecuting ? <LoaderCircle className="animate-spin" size={20} /> : 'Submit'}
            </Button>
            <Button type="button" variant="destructive" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </Fragment>
  );
};
