import React from 'react';
import {StackNavigator} from '~navigation/StackNavigator';
import ThemeProvider from '~theme/ThemeProvider';

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider>
        <StackNavigator />
      </ThemeProvider>
    </>
  );
}

export default App;
