export const delayedAction = async (
  callback: () => Promise<void>,
  timeout?: number,
) =>
  new Promise<void>((resolve) =>
    setTimeout(async () => {
      await callback();
      resolve();
    }, timeout ?? defaultIntegrationTestContainerStopDelay),
  );

export const jestIntegrationTestTimeout = 120_000;
export const defaultIntegrationTestContainerStopDelay = 15_000;
