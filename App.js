import 'react-native-gesture-handler';
import React from 'react';
import styled from 'styled-components/native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, Text} from 'react-native';

import {Header} from './src/components/Header/Header';
import {Articles} from './src/pages/Articles';

const Stack = createStackNavigator();

const CancelComponent = React.memo(() => (
  <SafeAreaView>
    <Text>Cancel Page</Text>
  </SafeAreaView>
));
const ConfirmComponent = React.memo(() => (
  <SafeAreaView>
    <Text>ConfirmPage</Text>
  </SafeAreaView>
));

function func({...props}) {
  // props are bad
  return <Header {...props} />;
}
function func1() {
  return <Header />;
}

const App = () => {
  return (
    <StyledSafeAreaView>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          header: func1,
        }}>
        <Stack.Screen name="Articles in Carton" component={Articles} />
        <Stack.Screen name="Cancel" component={CancelComponent} />
        <Stack.Screen name="Confirm" component={ConfirmComponent} />
      </Stack.Navigator>
    </NavigationContainer>
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  height: 100%;
  width: 100%;
`

export default App;
