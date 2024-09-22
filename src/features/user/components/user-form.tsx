'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, Fragment } from 'react';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/input-with-label';

import { User } from '@/features/user/lib/user.schema';
import { saveUser } from '@/features/user/lib/user.action';
import { UserSchema } from '@/features/user/lib/user.schema';

type UserFormProps = {
  user: User;
};

export const UserForm = ({ user }: UserFormProps) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const form = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(UserSchema),
    defaultValues: { ...user },
  });

  useEffect(() => {
    localStorage.setItem('userFormModified', form.formState.isDirty.toString());
  }, [form.formState.isDirty]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    setErrors({});
    setMessage('');
    const result = await saveUser(data);

    if (result?.errors) {
      setMessage(result.message);
      setErrors(result.errors);
      return;
    } else {
      setMessage(result.message);
      router.refresh();
      form.reset(data);
    }
  };

  return (
    <Fragment>
      {message ? <h2 className="text-2xl">{message}</h2> : null}

      {errors ? (
        <div className="mb-10 text-red-500">
          {Object.keys(errors).map((key) => (
            <p key={key}>{`${key}: ${errors[key as keyof typeof errors]}`}</p>
          ))}
        </div>
      ) : null}

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
            <Button>Submit</Button>
            <Button type="button" variant="destructive" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </Fragment>
  );
};
