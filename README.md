# react-environment-settings

> Load environment settings for react asynchronously at runtime

[![NPM](https://img.shields.io/npm/v/react-environment-settings.svg)](https://www.npmjs.com/package/react-environment-settings) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-environment-settings
```

## Usage

```tsx
import * as React from 'react'

import MyComponent from 'react-environment-settings'

function getConfig(environment: string) {
  return [
    { file: `settings.json`, optional: false },
    { file: `settings.${environment}.json`, optional: true }
  ];
}

class App extends React.Component {
  render () {
    return (
      <AppSettingsLoader
        environmentUrl={"environment.json"}
        getConfig={getConfig}
        loading={() => <div>Loading settings...</div>}
        ready={s => <pre>{JSON.stringify(s, null, 2)}</pre>}
      />
    )
  }
}
```

## License

MIT © [daniellittledev](https://github.com/daniellittledev)
