import {
  SettingsConfig,
  SettingsFileConfig,
  Json,
  loadSettings
} from "./loadSettings";

import {
  FC,
  FunctionComponent,
  ReactElement,
  useEffect,
  useState
} from "react";

interface AppSettingsLoaderProps<T> {
  environmentUrl: string;
  getConfig: (environment: string) => SettingsConfig;
  loading: () => ReactElement;
  ready: (settings: T) => ReactElement;
}

type AppSettingsLoader<T = any> = FunctionComponent<AppSettingsLoaderProps<T>>;

const AppSettingsLoaderComponent: FC<AppSettingsLoaderProps<Json>> = props => {
  const [settings, setSettings] = useState<Json | null>(null);

  useEffect(() => {
    loadSettings(props.environmentUrl, props.getConfig).then(s =>
      setSettings(s)
    );
  }, []);

  return settings ? props.ready(settings) : props.loading();
};

const AppSettingsLoader = AppSettingsLoaderComponent;
export default AppSettingsLoader as AppSettingsLoader;

export { Json, SettingsFileConfig, SettingsConfig };
