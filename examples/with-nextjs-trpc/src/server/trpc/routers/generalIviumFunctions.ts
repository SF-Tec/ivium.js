import { publicProcedure, t } from '../trpc';
import { Ivium } from 'iviumjs';
import { z } from 'zod';

export const generalIviumFunctionsRouter = t.router({
  openDriver: publicProcedure.mutation(() => {
    Ivium.openDriver();
  }),
  closeDriver: publicProcedure.mutation(() => {
    Ivium.closeDriver();
  }),
  getMaxDeviceNumber: publicProcedure.query(() => Ivium.getMaxDeviceNumber()),
  getDeviceStatus: publicProcedure.query(() => Ivium.getDeviceStatus()),
  isIviumsoftRunning: publicProcedure.query(() => Ivium.isIviumsoftRunning()),
  getActiveIviumsoftInstances: publicProcedure.query(() =>
    Ivium.getActiveIviumsoftInstances()
  ),
  selectIviumsoftInstance: publicProcedure
    .input(
      z.object({
        instanceNumber: z.number(),
      })
    )
    .mutation(({ input: { instanceNumber } }) => {
      Ivium.selectIviumsoftInstance(instanceNumber);
    }),
  getDeviceSerialNumber: publicProcedure.query(() =>
    Ivium.getDeviceSerialNumber()
  ),
  connectDevice: publicProcedure.mutation(() => {
    Ivium.connectDevice();
  }),
  disconnectDevice: publicProcedure.mutation(() => {
    Ivium.disconnectDevice();
  }),
  getDllVersion: publicProcedure.query(() => Ivium.getDllVersion()),
  getIviumsoftVersion: publicProcedure.query(() => Ivium.getIviumsoftVersion()),
  selectChannel: publicProcedure
    .input(
      z.object({
        channelNumber: z.number(),
      })
    )
    .mutation(({ input: { channelNumber } }) => {
      Ivium.selectChannel(channelNumber);
    }),
});
