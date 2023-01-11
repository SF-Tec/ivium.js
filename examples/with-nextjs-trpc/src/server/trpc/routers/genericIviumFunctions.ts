import { publicProcedure, t } from '../trpc';
import { Ivium } from 'iviumjs';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const genericIviumFunctionsRouter = t.router({
  openDriver: publicProcedure.mutation(() => {
    Ivium.openDriver();
  }),
  closeDriver: publicProcedure.mutation(() => {
    Ivium.closeDriver();
  }),
  getMaxDeviceNumber: publicProcedure.query(() => {
    return Ivium.getMaxDeviceNumber();
  }),
  getDeviceStatus: publicProcedure.query(() => {
    return Ivium.getDeviceStatus();
  }),
  isIviumsoftRunning: publicProcedure.query(() => {
    return Ivium.isIviumsoftRunning();
  }),
  getActiveIviumsoftInstances: publicProcedure.query(() => {
    return Ivium.getActiveIviumsoftInstances();
  }),
  selectIviumsoftInstance: publicProcedure
    .input(
      z.object({
        instanceNumber: z.number(),
      })
    )
    .mutation(({ input: { instanceNumber } }) => {
      Ivium.selectIviumsoftInstance(instanceNumber);
    }),
  getDeviceSerialNumber: publicProcedure.query(() => {
    return Ivium.getDeviceSerialNumber();
  }),
  connectDevice: publicProcedure.mutation(() => {
    try {
      console.log('new connectDevice()');
      Ivium.connectDevice();
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: (e as Error).message,
      });
    }
  }),
  disconnectDevice: publicProcedure.mutation(() => {
    if (Ivium.isIviumsoftRunning()) Ivium.disconnectDevice();
  }),
  getDllVersion: publicProcedure.query(() => {
    return Ivium.getDllVersion();
  }),
  getIviumsoftVersion: publicProcedure.query(() => {
    return Ivium.getIviumsoftVersion();
  }),
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
