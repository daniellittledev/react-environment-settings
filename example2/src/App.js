import React, { Component, useEffect } from "react";

import AppSettingsLoader from "react-environment-settings";

const App = () => {
  return (
    <div className="root">
      <AppSettingsLoader
        getSettings={import("./settings.json.txt")}
        loading={() => <div>Loading settings...</div>}
        ready={s => <pre>{JSON.stringify(s, null, 2)}</pre>}
      />
    </div>
  );
};

export default App;
