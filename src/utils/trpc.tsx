'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, wsLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import superjson from 'superjson';

import type { AppRouter } from 'server/routers/_app';

export const trpc = createTRPCReact<AppRouter>({});

export function ClientProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        wsLink({
          client: createWSClient({
            url: `ws://localhost:3001`,
          }),
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
