import { publicProcedure, t } from '../trpc';
import { Ivium } from 'iviumjs';
import { executeIviumMethod } from 'server/lib/executeIviumMethod';
import { z } from 'zod';

export const methodModeFunctionsRouter = t.router({
  loadMethod: publicProcedure
    .input(
      z.object({
        methodFilePath: z.string(),
      })
    )
    .query(({ input: { methodFilePath } }) => {
      return executeIviumMethod(() => Ivium.loadMethod(methodFilePath));
    }),
  saveMethod: publicProcedure
    .input(
      z.object({
        methodFilePath: z.string(),
      })
    )
    .query(({ input: { methodFilePath } }) => {
      return executeIviumMethod(() => Ivium.saveMethod(methodFilePath));
    }),
  startMethod: publicProcedure
    .input(
      z.object({
        methodFilePath: z.string().optional(),
      })
    )
    .query(({ input: { methodFilePath } }) => {
      return executeIviumMethod(() => Ivium.startMethod(methodFilePath));
    }),
  abortMethod: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.abortMethod());
  }),
  saveData: publicProcedure
    .input(
      z.object({
        dataFilePath: z.string(),
      })
    )
    .query(({ input: { dataFilePath } }) => {
      return executeIviumMethod(() => Ivium.saveData(dataFilePath));
    }),
  setMethodParameter: publicProcedure
    .input(
      z.object({
        parameterName: z.string(),
        parameterValue: z.string(),
      })
    )
    .query(({ input: { parameterName, parameterValue } }) => {
      return executeIviumMethod(() =>
        Ivium.setMethodParameter(parameterName, parameterValue)
      );
    }),
  getAvailableDataPointsNumber: publicProcedure.query(() => {
    return executeIviumMethod(() => Ivium.getAvailableDataPointsNumber());
  }),
  getDataPoint: publicProcedure
    .input(
      z.object({
        dataPointIndex: z.number(),
      })
    )
    .query(({ input: { dataPointIndex } }) => {
      return executeIviumMethod(() => Ivium.getDataPoint(dataPointIndex));
    }),
  getDataPointFromScan: publicProcedure
    .input(
      z.object({
        dataPointIndex: z.number(),
        scanIndex: z.number(),
      })
    )
    .query(({ input: { dataPointIndex, scanIndex } }) => {
      return executeIviumMethod(() =>
        Ivium.getDataPointFromScan(dataPointIndex, scanIndex)
      );
    }),
});
