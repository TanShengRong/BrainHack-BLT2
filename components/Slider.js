import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Color from '../constants/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.6);

const getDateAndDay = (dt) => {
    // Format: 2020-06-04 1000
    let date = new Date(dt.slice(0, 10))
    date = moment(date).format('MMM,D,dddd')
    let ar = date.split(',')
    let res = {}
    res.day = ar[1]
    res.month = ar[0]
    res.dayName = ar[2]
    return res
}

const getNumberOfHours = (data) => {
    let res = data.length / 7
    return res
}


const Slider = props => {

    var entries = []
    let k = 0

    for (let i = 0; i < props.futureData.length; i += getNumberOfHours(props.futureData)) {
        let r = getDateAndDay(props.futureData[i]['dateTimeSlot'])
        r.key = k
        k = k + 1
        entries.push(r)
    }

    const [card, setCard] = useState();

    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => props.onclick(item.key)}
            >
                <View style={[styles.slide, styles.shadow]}>
                    <Text style={[styles.text, { paddingTop: 20, fontSize: 20 }]} >{item.month}</Text>
                    <Text style={[styles.text, { paddingTop: 15, fontSize: 25 }]}>{item.day}</Text>
                    <View style={{ paddingTop: 30 }}>
                        <Text style={styles.text}>{item.dayName}</Text>
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