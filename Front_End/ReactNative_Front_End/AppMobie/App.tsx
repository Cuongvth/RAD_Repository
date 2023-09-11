import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import AppNavigator from './component/Navigator';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={{flex: 1}}>
          <AppNavigator></AppNavigator>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
};

export default App;
