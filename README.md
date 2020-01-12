# react-environment-settings

> Load environment settings for react asynchronously at runtime

[![NPM](https://img.shields.io/npm/v/react-environment-settings.svg)](https://www.npmjs.com/package/react-environment-settings) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-environment-settings
```

## Usage

```tsx
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
```

## License

MIT © [daniellittledev](https://github.com/daniellittledev)
