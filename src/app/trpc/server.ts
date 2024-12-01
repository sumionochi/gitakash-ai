import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "@/app/server/api/root";
import { createTRPCContext } from "@/app/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  // Retrieve the original headers from Next.js
  const originalHeaders = headers();
  
  // Create a new Headers object and modify it
  const heads = new Headers(await originalHeaders);
  heads.set("x-trpc-source", "rsc");

  // Construct a new Request object with the modified headers
  // Replace 'http://localhost' with the appropriate URL if necessary
  const req = new Request('http://localhost', {
    method: 'GET', // or the appropriate HTTP method
    headers: heads,
  });

  // Pass the Request object to createTRPCContext
  return createTRPCContext({
    req,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);
