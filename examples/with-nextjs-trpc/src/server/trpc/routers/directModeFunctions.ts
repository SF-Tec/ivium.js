import { publicProcedure, t } from '../trpc';
import { Ivium } from 'iviumjs';
import { z } from 'zod';

export const directModeFunctionsRouter = t.router({
  getCellStatus: publicProcedure.query(() => Ivium.getCellStatus()),
  setConnectionMode: publicProcedure
    .input(
      z.object({
        connectionMode: z.number(),
      })
    )
    .mutation(({ input: { connectionMode } }) => {
      Ivium.setConnectionMode(connectionMode);
    }),
  setCellOn: publicProcedure.mutation(() => {
    Ivium.setCellOn();
  }),
  setCellOff: publicProcedure.mutation(() => {
    Ivium.setCellOff();
  }),
  setPotential: publicProcedure
    .input(
      z.object({
        potential: z.number(),
      })
    )
    .mutation(({ input: { potential } }) => {
      Ivium.setPotential(potential);
    }),
  setWe2Potential: publicProcedure
    .input(
      z.object({
        we2Potential: z.number(),
      })
    )
    .mutation(({ input: { we2Potential } }) => {
      Ivium.setWe2Potential(we2Potential);
    }),
  setCurrent: publicProcedure
    .input(
      z.object({
        current: z.number(),
      })
    )
    .mutation(({ input: { current } }) => {
      Ivium.setCurrent(current);
    }),
  getPotential: publicProcedure.query(() => Ivium.getPotential()),
  setCurrentRange: publicProcedure
    .input(
      z.object({
        currentRange: z.number(),
      })
    )
    .mutation(({ input: { currentRange } }) => {
      Ivium.setCurrentRange(currentRange);
    }),
  setWe2CurrentRange: publicProcedure
    .input(
      z.object({
        currentRange: z.number(),
      })
    )
    .mutation(({ input: { currentRange } }) => {
      Ivium.setWe2CurrentRange(currentRange);
    }),
  getCurrent: publicProcedure.query(() => Ivium.getCurrent()),
  getWe2Current: publicProcedure.query(() => Ivium.getWe2Current()),
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
    .mutation(({ input: { filter } }) => {
      Ivium.setFilter(filter);
    }),
  setStability: publicProcedure
    .input(
      z.object({
        stability: z.literal(0).or(z.literal(1)).or(z.literal(2)),
      })
    )
    .mutation(({ input: { stability } }) => {
      Ivium.setStability(stability);
    }),
  setBistatMode: publicProcedure
    .input(
      z.object({
        bistatMode: z.literal(0).or(z.literal(1)),
      })
    )
    .mutation(({ input: { bistatMode } }) => {
      Ivium.setBistatMode(bistatMode);
    }),
  setDac: publicProcedure
    .input(
      z.object({
        channel: z.literal(0).or(z.literal(1)),
        dac: z.number(),
      })
    )
    .mutation(({ input: { channel, dac } }) => {
      Ivium.setDac(channel, dac);
    }),
  getAdc: publicProcedure
    .input(
      z.object({
        channel: z.literal(0).or(z.literal(1)),
      })
    )
    .query(({ input: { channel } }) => Ivium.getAdc(channel)),
  setMuxChannel: publicProcedure
    .input(
      z.object({
        channel: z.number().optional(),
      })
    )
    .mutation(({ input: { channel } }) => {
      Ivium.setMuxChannel(channel);
    }),
  getCurrentTrace: publicProcedure
    .input(
      z.object({
        pointsQuantity: z.number(),
        intervalRate: z.number(),
      })
    )
    .query(({ input: { pointsQuantity, intervalRate } }) =>
      Ivium.getCurrentTrace(pointsQuantity, intervalRate)
    ),
  getCurrentWe2Trace: publicProcedure
    .input(
      z.object({
        pointsQuantity: z.number(),
        intervalRate: z.number(),
      })
    )
    .query(({ input: { pointsQuantity, intervalRate } }) =>
      Ivium.getCurrentWe2Trace(pointsQuantity, intervalRate)
    ),
  getPotentialTrace: publicProcedure
    .input(
      z.object({
        pointsQuantity: z.number(),
        intervalRate: z.number(),
      })
    )
    .query(({ input: { pointsQuantity, intervalRate } }) =>
      Ivium.getPotentialTrace(pointsQuantity, intervalRate)
    ),
  setAcAmplitude: publicProcedure
    .input(
      z.object({
        acAmplitude: z.number(),
      })
    )
    .mutation(({ input: { acAmplitude } }) => {
      Ivium.setAcAmplitude(acAmplitude);
    }),
  setAcFrequency: publicProcedure
    .input(
      z.object({
        acFrequency: z.number(),
      })
    )
    .mutation(({ input: { acFrequency } }) => {
      Ivium.setAcFrequency(acFrequency);
    }),
});
