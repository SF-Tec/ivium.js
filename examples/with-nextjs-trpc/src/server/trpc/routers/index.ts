/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from 'server/trpc/trpc';
import { genericIviumFunctionsRouter } from './genericIviumFunctions';

/**
 * In tRPC v10 the root router is created by the same function as child
 * routers, and they can be nested arbitrarily.
 * The root router gets passed to `createNextApiHandler` to handle routing in /api/trpc
 * The root router's type gets passed to `createTRPCNext` so the frontend knows the routes/schema/returns
 */
export const appRouter = t.router({
  healthcheck: t.procedure.query(() => 'ok'),

  genericIviumFunctions: genericIviumFunctionsRouter,
});
export type AppRouter = typeof appRouter;
