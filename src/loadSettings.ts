import { success, error } from "./state";

export type Json = { [index: string]: Json } | string | number;

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

async function getSettings(settingsUrl: string) {
  const content = await fetch(settingsUrl)
  return await content.json()
}

function getSelectedSettings(settings: Json) {
  const environment = settings["environment"] as string;

  const defaultSetting = settings["default"] as string | undefined;
  const envSettings = settings[environment] as string | undefined;

  return [defaultSetting, envSettings].filter(notEmpty);
}

function mergeSettings(allSettings: Json[]) {
  const settings = allSettings.reduce((compiled, environment) => {
    if (typeof environment === "string" || typeof environment === "number") {
      return environment;
    } else if (typeof compiled === "string" || typeof compiled === "number") {
      return compiled;
    } else {
      return {
        ...compiled,
        ...environment
      };
    }
  });
  return settings;
}

export async function loadSettings<T>(
  settingsUrl: string
) {
  try {
    const settings = await getSettings(settingsUrl);
    const allSettings = getSelectedSettings(settings);
    const mergedSettings = mergeSettings(allSettings) as unknown;
    return success<T>(mergedSettings as T);
  } catch (ex) {
    return error<T>(ex);
  }
};
