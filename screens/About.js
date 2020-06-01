import React from 'react';
import { View, Text, StyleSheet, ColorPropType } from 'react-native';
import Color from '../constants/color';

const About = props => {
    return (
        <View style={styles.screen}>
            <Text>This is the about page man.</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Color.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default About;