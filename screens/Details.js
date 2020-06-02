import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { useHeaderHeight } from '@react-navigation/stack';
import JoinPanel from '../components/JoinPanel'
import Color from '../constants/color';
import Slider from '../components/Slider'
const MIN_HEIGHT = 0;
const MAX_HEIGHT = 200;

const Details = ({ navigation }) => {


    return (
        <View style={styles.screen}>
            <HeaderImageScrollView
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.6}
                minOverlayOpacity={0.3}
                fadeOutForeground
                renderHeader={() => <Image source={require('../assets/gymboxx.jpg')} style={styles.image} />}
            >
                <View style={{ height: 700 }}>
                    <TriggeringView>
                        <View style={[styles.card, styles.shadow]} >
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Capacity: 100%</Text>
                            <Text style={{ color: Color.secondary, paddingVertical: 5 }}>Queue Count: 3</Text>
                            <Text style={{ color: Color.secondary }}>Estimated waiting time: 1 hour</Text>
                        </View>
                    </TriggeringView>
                    <View>
                    </View>
                    <View style={[{ paddingTop: 80, }, styles.section]}>
                        <Text style={[styles.sectionHeader, { fontSize: 35 }]}>GymBoxx JEM</Text>
                        <Text style={styles.sectiontext}>Location: JEM, Jurong East, #03-12</Text>
                        <Text style={styles.sectiontext}>Operating Hours: 9AM - 10PM</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Available Days</Text>
                        <Slider />
                    </View>
                </View>
            </ HeaderImageScrollView>
            <JoinPanel />
        </View >
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    sectionHeader: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingBottom: 8
    },
    sectiontext: {
        paddingBottom: 5
    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        flex: 1,
        alignSelf: 'stretch',
        resizeMode: 'cover'
    },
    card: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: -60,
        borderRadius: 12,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        width: 300,
        paddingVertical: 10,
        overflow: 'visible',
        marginHorizontal: 40,
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    section: {
        marginHorizontal: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingVertical: 20
    },
    bottom: {
        paddingVertical: 30,
    },
    button: {
        marginHorizontal: 50,
        backgroundColor: Color.primary,
        borderRadius: 12,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Details;