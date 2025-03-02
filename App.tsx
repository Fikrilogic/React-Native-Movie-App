import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from './src/presenter/navigations/AppNavigation';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {myTheme} from './src/commons/theme/custom-theme';
import {MainApplicationProvider} from './src/module/AppModule';
import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...myTheme}}>
        <MainApplicationProvider>
          <AppNavigation />
        </MainApplicationProvider>
      </ApplicationProvider>
      <Toast topOffset={Platform.OS === 'ios' ? 80 : 40}/>
    </SafeAreaProvider>
  );
}

export default App;
