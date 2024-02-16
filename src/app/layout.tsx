import { PropsWithChildren } from 'react';
import { ClientProvider } from 'utils/trpc';

export function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="fr">
      <ClientProvider>{props.children}</ClientProvider>
    </html>
  );
}

export default RootLayout;
