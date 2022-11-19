import React from 'react';
import {RootNavigator} from './src/navigation/Root-Navigator/RootNavigator';
import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs()
const App = () => {
  return (
    LogBox.ignoreAllLogs(),
    <>
      <RootNavigator />
    </>
  );
};
export default App;
