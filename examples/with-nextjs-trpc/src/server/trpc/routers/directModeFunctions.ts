import { publicProcedure, t } from '../trpc';
import { Ivium } from 'iviumjs';
import { z } from 'zod';

export const directModeFunctionsRouter = t.router({
  getCellStatus: publicProcedure.query(() => {
    return Ivium.getCellStatus();
  }),
  setConnectionMode: publicProcedure
    .input(
      z.object({
        connectionMode: z.number(),
      })
    )
    .query(({ input: { connectionMode } }) => {
      return Ivium.setConnectionMode(connectionMode);
    }),
  setCellOn: publicProcedure.query(() => {
    return Ivium.setCellOn();
  }),
  setCellOff: publicProcedure.query(() => {
    return Ivium.setCellOff();
  }),
  setPotential: publicProcedure
    .input(
      z.object({
        potential: z.number(),
      })
    )
    .query(({ input: { potential } }) => {
      return Ivium.setPotential(potential);
    }),
  setWe2Potential: publicProcedure
    .input(
      z.object({
        we2Potential: z.number(),
      })
    )
    .query(({ input: { we2Potential } }) => {
      return Ivium.setWe2Potential(we2Potential);
    }),
  setCurrent: publicProcedure
    .input(
      z.object({
        current: z.number(),
      })
    )
    .query(({ input: { current } }) => {
      return Ivium.setCurrent(current);
    }),
  getPotential: publicProcedure.query(() => {
    return Ivium.getPotential();
  }),
  setCurrentRange: publicProcedure
    .input(
      z.object({
        currentRange: z.number(),
      })
    )
    .query(({ input: { currentRange } }) => {
      return Ivium.setCurrentRange(currentRange);
    }),
  setWe2CurrentRange: publicProcedure
    .input(
      z.object({
        currentRange: z.number(),
      })
    )
    .query(({ input: { currentRange } }) => {
      return Ivium.setWe2CurrentRange(currentRange);
    }),
  getCurrent: publicProcedure.query(() => {
    return Ivium.getCurrent();
  }),
  getWe2Current: publicProcedure.query(() => {
    return Ivium.getWe2Current();
  }),
  setFilter: publicProcedure
    .input(
      z.object({
        filter: z
          .literal(0)
          .or(z.literal(1))
          .or(z.literal(2))
          .or(z.literal(3))
          .or(z.literal(4)),
      })
    )
    .query(({ input: { filter } }) => {
      return Ivium.setFilter(filter);
    }),
  setStability: publicProcedure
    .input(
      z.object({
        stability: z.literal(0).or(z.literal(1)).or(z.literal(2)),
      })
    )
    .query(({ input: { stability } }) => {
      return Ivium.setStability(stability);
    }),
  setBistatMode: publicProcedure
    .input(
      z.object({
        bistatMode: z.literal(0).or(z.literal(1)),
      })
    )
    .query(({ input: { bistatMode } }) => {
      return Ivium.setBistatMode(bistatMode);
    }),
  setDac: publicProcedure
    .input(
      z.object({
        channel: z.literal(0).or(z.literal(1)),
        dac: z.number(),
      })
    )
    .query(({ input: { channel, dac } }) => {
      return Ivium.setDac(channel, dac);
    }),
  getAdc: publicProcedure
    .input(
      z.object({
        channel: z.literal(0).or(z.literal(1)),
      })
    )
    .query(({ input: { channel } }) => {
      return Ivium.getAdc(channel);
    }),
  setMuxChannel: publicProcedure
    .input(
      z.object({
        channel: z.number().optional(),
      })
    )
    .query(({ input: { channel } }) => {
      return Ivium.setMuxChannel(channel);
    }),
  getCurrentTrace: publicProcedure
    .input(
      z.object({
        pointsQuantity: z.number(),
        intervalRate: z.number(),
      })
    )
    .query(({ input: { pointsQuantity, intervalRate } }) => {
      return Ivium.getCurrentTrace(pointsQuantity, intervalRate);
    }),
  getCurrentWe2Trace: publicProcedure
    .input(
      z.object({
        pointsQuantity: z.number(),
        intervalRate: z.number(),
      })
    )
    .query(({ input: { pointsQuantity, intervalRate } }) => {
      return Ivium.getCurrentWe2Trace(pointsQuantity, intervalRate);
    }),
  getPotentialTrace: publicProcedure
    .input(
      z.object({
        pointsQuantity: z.number(),
        intervalRate: z.number(),
      })
    )
    .query(({ input: { pointsQuantity, intervalRate } }) => {
      return Ivium.getPotentialTrace(pointsQuantity, intervalRate);
    }),
  setAcAmplitude: publicProcedure
    .input(
      z.object({
        acAmplitude: z.number(),
      })
    )
    .query(({ input: { acAmplitude } }) => {
      return Ivium.setAcAmplitude(acAmplitude);
    }),
  setAcFrequency: publicProcedure
    .input(
      z.object({
        acFrequency: z.number(),
      })
    )
    .query(({ input: { acFrequency } }) => {
      return Ivium.setAcFrequency(acFrequency);
    }),
});
