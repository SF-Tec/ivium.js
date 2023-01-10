import { publicProcedure, t } from '../trpc';
import { Ivium } from 'iviumjs';
import { executeIviumMethod } from 'server/lib/executeIviumMethod';
import { z } from 'zod';

export const genericIviumFunctionsRouter = t.router({
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
});
