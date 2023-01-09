/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from '@trpc/server/adapters/next';
import { Ivium } from 'iviumjs';
import { z } from 'zod';
import { publicProcedure, router } from '../../../server/trpc';

function executeIviumMethod<T extends void | number>(method: () => T) {
  try {
    const result = method();

    return {
      success: true,
      result,
    };
  } catch (e) {
    console.log(e);

    return {
      success: false,
      result: null,
    };
  }
}

const appRouter = router({
  greeting: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        text: `hello ${input?.name ?? 'world'}`,
        // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
      };
    }),
  closeDriver: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.closeDriver());
  }),
  connectDevice: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.connectDevice());
  }),
  getPotential: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getPotential());
  }),
  openDriver: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.openDriver());
  }),
  selectIviumsoftInstance: publicProcedure
    .input(
      z.object({
        instanceNumber: z.number(),
      })
    )
    .query(({ input: { instanceNumber } }) => {
      return executeIviumMethod(() =>
        Ivium.selectIviumsoftInstance(instanceNumber)
      );
    }),
  // 💡 Tip: Try adding a new procedure here and see if you can use it in the client!
  // getUser: publicProcedure.query(() => {
  //   return { id: '1', name: 'bob' };
  // }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
