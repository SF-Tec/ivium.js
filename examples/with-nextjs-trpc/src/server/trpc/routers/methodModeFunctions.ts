import { publicProcedure, t } from '../trpc';
import { Ivium } from 'iviumjs';
import { executeIviumMethod } from 'server/lib/executeIviumMethod';
import { z } from 'zod';

export const methodModeFunctionsRouter = t.router({
  getCellStatus: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getCellStatus());
  }),
  setConnectionMode: publicProcedure
    .input(
      z.object({
        connectionMode: z.number(),
      })
    )
    .query(({ input: { connectionMode } }) => {
      return executeIviumMethod(() => Ivium.setConnectionMode(connectionMode));
    }),
  setCellOn: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.setCellOn());
  }),
  setCellOff: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.setCellOff());
  }),
  setPotential: publicProcedure
    .input(
      z.object({
        potential: z.number(),
      })
    )
    .query(({ input: { potential } }) => {
      return executeIviumMethod(() => Ivium.setPotential(potential));
    }),
  setWe2Potential: publicProcedure
    .input(
      z.object({
        we2Potential: z.number(),
      })
    )
    .query(({ input: { we2Potential } }) => {
      return executeIviumMethod(() => Ivium.setWe2Potential(we2Potential));
    }),
  setCurrent: publicProcedure
    .input(
      z.object({
        current: z.number(),
      })
    )
    .query(({ input: { current } }) => {
      return executeIviumMethod(() => Ivium.setCurrent(current));
    }),
  getPotential: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getPotential());
  }),
  setCurrentRange: publicProcedure
    .input(
      z.object({
        currentRange: z.number(),
      })
    )
    .query(({ input: { currentRange } }) => {
      return executeIviumMethod(() => Ivium.setCurrentRange(currentRange));
    }),
  setWe2CurrentRange: publicProcedure
    .input(
      z.object({
        currentRange: z.number(),
      })
    )
    .query(({ input: { currentRange } }) => {
      return executeIviumMethod(() => Ivium.setWe2CurrentRange(currentRange));
    }),
  getCurrent: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getCurrent());
  }),
  getWe2Current: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getWe2Current());
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
      return executeIviumMethod(() => Ivium.setFilter(filter));
    }),
  setStability: publicProcedure
    .input(
      z.object({
        stability: z.literal(0).or(z.literal(1)).or(z.literal(2)),
      })
    )
    .query(({ input: { stability } }) => {
      return executeIviumMethod(() => Ivium.setStability(stability));
    }),
  setBistatMode: publicProcedure
    .input(
      z.object({
        bistatMode: z.literal(0).or(z.literal(1)),
      })
    )
    .query(({ input: { bistatMode } }) => {
      return executeIviumMethod(() => Ivium.setBistatMode(bistatMode));
    }),
  setDac: publicProcedure
    .input(
      z.object({
        channel: z.literal(0).or(z.literal(1)),
        dac: z.number(),
      })
    )
    .query(({ input: { channel, dac } }) => {
      return executeIviumMethod(() => Ivium.setDac(channel, dac));
    }),
  getAdc: publicProcedure
    .input(
      z.object({
        channel: z.literal(0).or(z.literal(1)),
      })
    )
    .query(({ input: { channel } }) => {
      return executeIviumMethod(() => Ivium.getAdc(channel));
    }),
  setMuxChannel: publicProcedure
    .input(
      z.object({
        channel: z.number(),
      })
    )
    .query(({ input: { channel } }) => {
      return executeIviumMethod(() => Ivium.setMuxChannel(channel));
    }),
  getCurrentTrace: publicProcedure
    .input(
      z.object({
        pointsQuantity: z.number(),
        intervalRate: z.number(),
      })
    )
    .query(({ input: { pointsQuantity, intervalRate } }) => {
      return executeIviumMethod(() =>
        Ivium.getCurrentTrace(pointsQuantity, intervalRate)
      );
    }),
  getCurrentWe2Trace: publicProcedure
    .input(
      z.object({
        pointsQuantity: z.number(),
        intervalRate: z.number(),
      })
    )
    .query(({ input: { pointsQuantity, intervalRate } }) => {
      return executeIviumMethod(() =>
        Ivium.getCurrentWe2Trace(pointsQuantity, intervalRate)
      );
    }),
  getPotentialTrace: publicProcedure
    .input(
      z.object({
        pointsQuantity: z.number(),
        intervalRate: z.number(),
      })
    )
    .query(({ input: { pointsQuantity, intervalRate } }) => {
      return executeIviumMethod(() =>
        Ivium.getPotentialTrace(pointsQuantity, intervalRate)
      );
    }),
  setAcAmplitude: publicProcedure
    .input(
      z.object({
        acAmplitude: z.number(),
      })
    )
    .query(({ input: { acAmplitude } }) => {
      return executeIviumMethod(() => Ivium.setAcAmplitude(acAmplitude));
    }),
  setAcFrequency: publicProcedure
    .input(
      z.object({
        acFrequency: z.number(),
      })
    )
    .query(({ input: { acFrequency } }) => {
      return executeIviumMethod(() => Ivium.setAcFrequency(acFrequency));
    }),
});
