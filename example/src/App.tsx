import React from "react";

import AppSettingsLoader from "react-environment-settings";
import settingsAssetUrl from "./settings.json.txt";

interface Settings {
  data: string;
}

const App = () => {
  return (
    <div className="root">
      <AppSettingsLoader<Settings>
        settingsUrl={settingsAssetUrl}
        loading={() => <div>Loading settings...</div>}
        ready={s => <pre>{JSON.stringify(s, null, 2)}</pre>}
      />
    </div>
  );
};

export default App;
