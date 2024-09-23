import { Fragment, ReactNode } from 'react';

type UserLayoutProps = Readonly<{
  modal: ReactNode;
  children: ReactNode;
}>;

export default function UserLayout({ modal, children }: UserLayoutProps) {
  return (
    <Fragment>
      {modal}
      {children}
    </Fragment>
  );
}
