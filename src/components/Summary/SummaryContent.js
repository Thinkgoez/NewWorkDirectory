import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import Animated from 'react-native-reanimated';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import { StyledText } from "../common/SimpleComponents"

const SimpleComp = () => <StyledText>Text</StyledText>

const Tabs = createMaterialTopTabNavigator()

// const Tab = ({ focusAnim, title, onPress }) => {
//     return (
//       <TouchableOpacity onPress={onPress}>
//         <Animated.View
//           style={{
//             padding: 10,
//             borderRadius: 10,
//             backgroundColor: focusAnim.interpolate({
//               inputRange: [0, 1],
//               outputRange: ["transparent", "tomato"]
//             })
//           }}
//         >
//           <Animated.Text
//             style={{
//               color: focusAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: ["#444", "#fff"]
//               })
//             }}
//           >{title}</Animated.Text>
//         </Animated.View>
//       </TouchableOpacity>
//     )
//   }
// const TabBar = ({ navigationState, navigation, position }) => {
//     return (
//       <View style={{
//         height: 80,
//         backgroundColor: 'seashell',
//         flexDirection: "row",
//         justifyContent: 'space-around',
//         alignItems: 'center',
//       }}>
//       {navigationState.routes.map((route, index) => {
//         const focusAnim = Animated.interpolate(position, {
//             inputRange: [index - 1, index, index + 1],
//             outputRange: [0, 1, 0],
//           });
//         return(
//           <Tab 
//             focusAnim={focusAnim}
//             title={route.routeName}
//             onPress={() => navigation.navigate(route.routeName)}
//           />
//         )
//       })}
//       </View>
//     )
//   }

export const SummaryContent = () => {
    // tabBar={TabBar}
    return(
        <Tabs.Navigator >
            <Tabs.Screen name="Cartons" component={SimpleComp} />
            <Tabs.Screen name="Articles" component={SimpleComp} />
        </Tabs.Navigator>
    )
}