import React, { Component } from "react";

import AppSettingsLoader from "react-environment-settings";

function getConfig(environment) {
  return [
    { file: `settings.json`, optional: false },
    { file: `settings.${environment}.json`, optional: true }
  ];
}

export default class App extends Component {
  render() {
    return (
      <div className="root">
        <AppSettingsLoader
          environmentUrl={"environment.json"}
          getConfig={getConfig}
          loading={() => <div>Loading settings...</div>}
          ready={s => <pre>{JSON.stringify(s, null, 2)}</pre>}
        />
      </div>
    );
  }
}
