import { loadSettings } from "./loadSettings";

import { ReactElement, useEffect, useState, PropsWithChildren } from "react";
import { State, loading } from "./state";
import * as React from "react";

interface AppSettingsLoaderProps<T> {
  settingsUrl: string;
  loading: () => ReactElement;
  ready: (settings: T) => ReactElement;
  error?: (error: Error) => ReactElement;
}

function AppSettingsLoaderComponent<T>(
  props: PropsWithChildren<AppSettingsLoaderProps<T>>
) {
  const [settings, setSettings] = useState<State<T>>(loading());

  useEffect(() => {
    loadSettings<T>(props.settingsUrl).then(s => setSettings(s));
  }, []);

  switch (settings.type) {
    case "Loading":
      return props.loading();
    case "Success":
      return props.ready(settings.data as T);
    case "Error":
      return props.error ? (
        props.error(settings.error)
      ) : (
        <div>Error loading settings</div>
      );
  }
}

export default AppSettingsLoaderComponent;
