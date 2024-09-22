import { Dispatch, SetStateAction } from 'react';
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmationAction: () => void;
};

export function AlertConfirmation({ open, setOpen, confirmationAction }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You haven't saved your changes. Please confirm you want to exit without saving.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmationAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
