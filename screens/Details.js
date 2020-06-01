import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { useHeaderHeight } from '@react-navigation/stack';
import Color from '../constants/color';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const MIN_HEIGHT = 0;
const MAX_HEIGHT = 200;

const Details = props => {


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
                <View style={{ height: 1000 }}>
                    <TriggeringView>
                        <View style={[styles.card, styles.shadow]} >
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Capacity: 24/24</Text>
                            <Text style={{ color: Color.secondary, paddingVertical: 5 }}>Queue Count: 3</Text>
                            <Text style={{ fontStyle: 'italic' }}>Estimated waiting time: 1-2 hours</Text>
                        </View>
                    </TriggeringView>
                </View>
            </ HeaderImageScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Color.primary
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
    }
});

export default Details;