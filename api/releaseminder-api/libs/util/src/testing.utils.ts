export const delayedAction = async (
  callback: () => Promise<void>,
  timeout: number,
) =>
  new Promise<void>((resolve) =>
    setTimeout(async () => {
      await callback();
      resolve();
    }, timeout),
  );
