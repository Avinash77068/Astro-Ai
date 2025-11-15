
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import TotalFile from './src/TotalFile';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <TotalFile />
    </SafeAreaProvider>
  );
}


export default App;
