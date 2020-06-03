import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Map from './Map';
import SafeEntry from "./SafeEntry";
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import Details from './Details';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function Welcome() {

    const TabStack = () => {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Map" component={Map} />
                <Tab.Screen name="Safe Entry" component={SafeEntry} />
            </Tab.Navigator>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={TabStack} />
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});