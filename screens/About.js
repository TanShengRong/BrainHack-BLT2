import React from 'react';
import { View, Text, StyleSheet, ColorPropType, Image } from 'react-native';
import Color from '../constants/color';
import Logo from "../assets/BLTlogo.jpg";

const About = props => {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.h1}>What is BLT2?</Text>
                <Text>We are a group of students that are worried about the challenges 
                    our local communities may face when lockdown is lifted.</Text>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.h2}>What is Crowd Control?</Text>
                <Text>Crowd Control is a mobile application developed to supplement 
                    existing effort done by the government and volunteers in fighting 
                    against COVID-19.
                </Text>
            </View>
            <View style={styles.botContainer}>
                <Image
                    source={Logo}
                    style={styles.image}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    h1: {
        color: '#010101',
        fontSize: 40,
    },
    h2: {
        color: '#010101',
        fontSize: 30,
    },
    image: {
        width: 350,
        height: 350,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    topContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    botContainer: {
        justifyContent: 'center',
        width: '100%',
        margin: 20,
        padding: 10,
      },
});

export default About;