import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './src/screens/MainTabs';
import { LightTheme } from './src/Theme';

type RootStackRoutes = {
  Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackRoutes>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={LightTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
