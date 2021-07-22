import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
const Tab = ({ title, onPress, isActive }) => {
    const backgroundColor = useSharedValue("transparent")
    // const textColor = useSharedValue("#444")

    // backgroundColor.value = isActive ? 'tomato' : 'transparent'
    // textColor.value = isActive ? '#444' : '#fff'

    // const animatedStyles = useAnimatedStyle(() => {
    //     return {
    //         backgroundColor: backgroundColor.value,
    //         color: textColor.value
    //     };
    // });
    return (
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={[{
            padding: 10,
            borderRadius: 10,
            backgroundColor: backgroundColor.value
          }, ]}
        >
          <Animated.Text
            style={[ ]}
          >{title}</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
const TabBar = ({ navigationState, navigation, position }) => {
    return (
      <View style={{
        height: 80,
        backgroundColor: 'seashell',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {navigationState.routes.map((route, index) => {
        const isActive = position === index;
        return(
          <Tab 
            isActive={isActive}
            title={route.routeName}
            onPress={() => navigation.navigate(route.routeName)}
            key={route.routeName}
          />
        )
      })}
      </View>
    )
  }