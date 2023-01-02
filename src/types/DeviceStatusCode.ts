export const DeviceStatusCode = {
  noIviumsoft: -1,
  notConnected: 0,
  availableIdle: 1,
  availableBusy: 2,
  noDeviceAvailable: 3,
} as const;

export type DeviceStatusCode =
  typeof DeviceStatusCode[keyof typeof DeviceStatusCode];
