import 'react-native-gesture-handler';
import React from 'react';
import styled from 'styled-components/native'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Header} from './src/components/Header/Header';
import {Articles} from './src/pages/Articles';
import { Summary } from './src/pages/Summary';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function func({...props}) {
  // props are bad
  return <Header {...props} />;
}
function func1({ scene }) {
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;
  
    return (
      <Header title={title} />
    );
}

const App = () => {
  return (
    <StyledSafeAreaView>
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{header: func1, headerShown: true}}>
        <Drawer.Screen name="Articles in Carton" component={Articles} />
        <Drawer.Screen name="Summary" component={Summary} />
      </Drawer.Navigator>
    </NavigationContainer>
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  height: 100%;
  width: 100%;
`

export default App;
