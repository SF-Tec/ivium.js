/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from '@trpc/server/adapters/next';
import { Ivium } from 'iviumjs';
import { z } from 'zod';
import { publicProcedure, router } from '../../../server/trpc';

type IviumResult<T extends string | number | number[]> = [number, T];

function executeIviumMethod<
  T extends
    | void
    | number
    | string
    | boolean
    | IviumResult<string | number | number[]>
    | number[]
>(method: () => T) {
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

  // #######################
  // ## GENERIC FUNCTIONS ##
  // #######################

  openDriver: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.openDriver());
  }),
  closeDriver: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.closeDriver());
  }),
  getMaxDeviceNumber: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getMaxDeviceNumber());
  }),
  getDeviceStatus: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getDeviceStatus());
  }),
  isIviumsoftRunning: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.isIviumsoftRunning());
  }),
  getActiveIviumsoftInstances: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getActiveIviumsoftInstances());
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
  getDeviceSerialNumber: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getDeviceSerialNumber());
  }),
  connectDevice: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.connectDevice());
  }),
  disconnectDevice: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.disconnectDevice());
  }),
  getDllVersion: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getDllVersion());
  }),
  getIviumsoftVersion: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getIviumsoftVersion());
  }),
  selectChannel: publicProcedure
    .input(
      z.object({
        channelNumber: z.number(),
      })
    )
    .query(({ input: { channelNumber } }) => {
      return executeIviumMethod(() => Ivium.selectChannel(channelNumber));
    }),

  getPotential: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getPotential());
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
