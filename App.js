import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
// import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import Welcome from './screens/Welcome'
import Login from './screens/Login';
import Color from './constants/color';
import Card from './screens/Card';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from './screens/Details'
import JoinPanel from './components/JoinPanel'
import Test from './screens/Test'
import Amplify from "aws-amplify";
import aws_exports from "./config/aws-exports";
import SafeEntry from './screens/SafeEntry'

Amplify.configure(aws_exports);

// temporary
var isLoggedIn = false;

const slides = [
  {
    key: "1",
    img: require("./assets/running.png"),
    text: "Welcome to Safe Exercise.",
  },
  {
    key: "2",
    img: require("./assets/muscle.png"),
    text: "We know you've been waiting to go out to your favourite gyms and pools.",
  },
  {
    key: "3",
    img: require("./assets/woman.png"),
    text: "Here's where you can check and book time slots!",
  },
];

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);

  const renderSlide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.img} resizeMode='center' />
        <Text style={styles.desc}>{item.text}</Text>
      </View>
    );
  };

  const onFinish = () => {
    setShowRealApp(true);
  };

  const Stack = createStackNavigator();

  const MainStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Safe Entry" component={SafeEntry} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  if (showRealApp) {
    return <MainStack />;
  } else {
    return (
      <AppIntroSlider
        renderItem={renderSlide}
        data={slides}
        onDone={onFinish}
      />
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: Color.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  desc: {
    fontSize: 15,
  },
});
