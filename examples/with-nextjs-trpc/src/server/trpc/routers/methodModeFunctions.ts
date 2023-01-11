import { publicProcedure, t } from '../trpc';
import { Ivium } from 'iviumjs';
import { z } from 'zod';

export const methodModeFunctionsRouter = t.router({
  loadMethod: publicProcedure
    .input(
      z.object({
        methodFilePath: z.string(),
      })
    )
    .mutation(({ input: { methodFilePath } }) => {
      Ivium.loadMethod(methodFilePath);
    }),
  saveMethod: publicProcedure
    .input(
      z.object({
        methodFilePath: z.string(),
      })
    )
    .mutation(({ input: { methodFilePath } }) => {
      Ivium.saveMethod(methodFilePath);
    }),
  startMethod: publicProcedure
    .input(
      z.object({
        methodFilePath: z.string().optional(),
      })
    )
    .mutation(({ input: { methodFilePath } }) => {
      Ivium.startMethod(methodFilePath);
    }),
  abortMethod: publicProcedure.mutation(() => {
    Ivium.abortMethod();
  }),
  saveData: publicProcedure
    .input(
      z.object({
        dataFilePath: z.string(),
      })
    )
    .mutation(({ input: { dataFilePath } }) => {
      Ivium.saveData(dataFilePath);
    }),
  setMethodParameter: publicProcedure
    .input(
      z.object({
        parameterName: z.string(),
        parameterValue: z.string(),
      })
    )
    .mutation(({ input: { parameterName, parameterValue } }) => {
      Ivium.setMethodParameter(parameterName, parameterValue);
    }),
  getAvailableDataPointsNumber: publicProcedure.query(() =>
    Ivium.getAvailableDataPointsNumber()
  ),
  getDataPoint: publicProcedure
    .input(
      z.object({
        dataPointIndex: z.number(),
      })
    )
    .query(({ input: { dataPointIndex } }) =>
      Ivium.getDataPoint(dataPointIndex)
    ),
  getDataPointFromScan: publicProcedure
    .input(
      z.object({
        dataPointIndex: z.number(),
        scanIndex: z.number(),
      })
    )
    .query(({ input: { dataPointIndex, scanIndex } }) =>
      Ivium.getDataPointFromScan(dataPointIndex, scanIndex)
    ),
});
