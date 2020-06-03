import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Color from '../constants/color';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.6);


const Slider = props => {
    const entries = [
        {
            id: 1,
            name: 'Monday'
        },
        {
            id: 2,
            name: 'Tuesday'
        },
        {
            id: 3,
            name: 'Wednesday'
        },
        {
            id: 4,
            name: 'Thursday'
        },
        {
            id: 5,
            name: 'Friday'
        },
        {
            id: 6,
            name: 'Saturday'
        },
        {
            id: 7,
            name: 'Sunday'
        }
    ];

    const [card, setCard] = useState();

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity="0.6"
            // onPress={()=> props.getDay()}
            >
                <View style={[styles.slide, styles.shadow]}>
                    <Text style={[styles.text, { paddingTop: 20, fontSize: 20 }]} >Mar</Text>
                    <Text style={[styles.text, { paddingTop: 15, fontSize: 25 }]}>9</Text>
                    <View style={{ paddingTop: 30 }}>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    return (
        <Carousel
            data={entries}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            onSnapToItem={setCard}
            useScrollView={true}
            loop={true}
        />
    )
};

const styles = StyleSheet.create({
    slide: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        backgroundColor: Color.primary,
        borderRadius: 12,
        overflow: 'visible',
        marginVertical: 10
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    text: {
        color: 'white',
        fontWeight: '700',
        textTransform: 'uppercase'
    }

});

export default Slider;