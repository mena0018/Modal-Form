'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertConfirmation } from '@/components/alert-confirmation';

export const DialogWrapper = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const closeModal = () => {
    router.back();
  };

  const handleOpenChange = () => {
    const isUserFormModified = localStorage.getItem('userFormModified');

    if (isUserFormModified && JSON.parse(isUserFormModified)) {
      setShowExitConfirmation(true);
    } else {
      closeModal();
    }
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-y-hidden">
        <AlertConfirmation
          open={showExitConfirmation}
          setOpen={setShowExitConfirmation}
          confirmationAction={closeModal}
        />
        {children}
      </DialogContent>
    </Dialog>
  );
};
