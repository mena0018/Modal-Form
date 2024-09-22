'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type BackButtonProps = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonProps) => {
  const { back } = useRouter();

  return (
    <Button
      variant="secondary"
      onClick={() => back()}
      className={cn('ring-zinc-600 dark:ring-1', className)}
    >
      Back
    </Button>
  );
};
