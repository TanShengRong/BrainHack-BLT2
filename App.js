import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import Welcome from './screens/Welcome'
import Login from './screens/Login';
import Color from './constants/color';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// temporary
var isLoggedIn = false;

const slides = [
  {
    key: '1',
    title: 'First Slide',
    text: "Here's the first slide."
  },
  {
    key: '2',
    title: 'Second Slide',
    text: "Here's the 2nd slide."
  },
  {
    key: '3',
    title: 'Slide Three',
    text: "Here's the third slide."
  }
]

export default function App() {

  const [showRealApp, setShowRealApp] = useState(false);

  const renderSlide = ({ item }) => {

    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.text}</Text>
      </View>
    )
  }

  const onFinish = () => {
    setShowRealApp(true);
  }

  const Stack = createStackNavigator();

  const MainStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  if (showRealApp) {
    return <MainStack />;
  } else {
    return <AppIntroSlider renderItem={renderSlide} data={slides} onDone={onFinish} />;
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  desc: {
    fontSize: 15
  },



});

