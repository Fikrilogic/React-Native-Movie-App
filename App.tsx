import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from './src/presenter/navigations/AppNavigation';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {myTheme} from './src/commons/theme/custom-theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark,...myTheme}}>
        <AppNavigation />
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}

export default App;
