import getJson from "./get-json";

export type Json = { [index: string]: { [index: string]: Json } } | string | number;

export interface SettingsFileConfig {
  file: string;
  optional: boolean;
}

export type SettingsConfig = SettingsFileConfig[];

async function getEnvironment(environmentUrl: string) {
  const environment = (await getJson<string>(environmentUrl)).data;

  if (environment === undefined) {
    throw new Error(
      `The environment is undefined, possibly due to an error parsing the JSON`
    );
  }

  return environment;
}

async function getSettings(config: SettingsConfig) {
  const settingsPromise = await Promise.all(
    config.map(async fileConfig => {
      const result = await getJson<Json>(fileConfig.file);
      return {
        config: fileConfig,
        result: result
      };
    })
  );

  const failures = settingsPromise.filter(
    x => !x.config.optional && !x.result.ok
  );

  if (failures.length > 0) {
    const fileNames = failures.map(x => x.config.file).join(", ");
    throw new Error(
      `The files ${fileNames} where not optional but were missing`
    );
  }

  const settingsData = settingsPromise
    .filter(x => x.result.ok)
    .map(x => x.result.data as Json);

    return settingsData;
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

export const loadSettings = async (
  environmentUrl: string,
  getConfig: (environment: string) => SettingsConfig
) => {
  const environment = await getEnvironment(environmentUrl);
  const config = getConfig(environment);
  const allSettings = await getSettings(config);
  const settings = mergeSettings(allSettings);
  return settings;
};
