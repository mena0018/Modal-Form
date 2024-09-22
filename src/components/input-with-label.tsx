'use client';

import { XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type Props = {
  label: string;
  value: string;
  readOnly?: boolean;

  placeholder?: string;
};

export const InputWithLabel = ({ label, value, placeholder, readOnly }: Props) => {
  const form = useFormContext();
  const fieldTitleNoSpaces = label.replaceAll(' ', '-');

  return (
    <FormField
      name={value}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={fieldTitleNoSpaces} className="text-base">
            {label}
          </FormLabel>

          <div className="flex w-full max-w-xs items-center gap-2">
            <div className="flex w-full max-w-xs items-center rounded-md border border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <FormControl>
                <Input
                  {...field}
                  id={fieldTitleNoSpaces}
                  className="w-full max-w-xs"
                  placeholder={placeholder || label}
                  readOnly={readOnly}
                  disabled={readOnly}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
            </div>

            {!readOnly ? (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Clear"
                title="Clear"
                className="rounded-mdl grid place-content-center text-red-500 hover:bg-transparent hover:text-rose-400"
                onClick={(e) => {
                  e.preventDefault();
                  form.setValue(value, '', { shouldDirty: true });
                }}
              >
                <XIcon className="m-0 size-6 p-0" />
              </Button>
            ) : null}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
