import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { useHeaderHeight } from '@react-navigation/stack';
import JoinPanel from '../components/JoinPanel'
import Color from '../constants/color';
import Slider from '../components/Slider'
const MIN_HEIGHT = 0;
const MAX_HEIGHT = 200;
import moment from 'moment'
import { Auth } from 'aws-amplify';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const getOperatingHours = (start, end) => {
    let sh = parseInt(start.slice(0, 2))
    let sm = start.slice(2, 4)
    let AmOrPm = sh >= 12 ? "PM" : 'AM'
    sh = (sh % 12) || 12
    let s = sh.toString() + ':' + sm + AmOrPm

    let eh = parseInt(end.slice(0, 2)) + 1
    let em = end.slice(2, 4)
    AmOrPm = eh >= 12 ? "PM" : 'AM'
    eh = (eh % 12) || 12
    let e = eh.toString() + ':' + em + AmOrPm
    let res = s + ' - ' + e
    return res
}

const getCapacity = (current, max) => {
    return Math.floor(current / max * 100)
}



const Details = ({ route }) => {

    const [bookings, setBookings] = useState()
    const [day, setDay] = useState()
    const [selectedTime, setSelectedTime] = useState()
    const [timings, setTimings] = useState()

    const panelRef = useRef()

    const { data } = route.params;

    const url = `https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations/central/${data.locationId}/future`

    const [refreshing, setRefreshing] = React.useState(false);

    const getDTslot = () => {
        let selectedDay = moment().add(day, 'days').format('YYYY-MM-DD')
        let time = selectedTime.replace(':', "").slice(0, 4)
        return selectedDay + " " + time
    }

    const [username, setUsername] = useState('');

    useEffect(() => {
        try {
            Auth.currentAuthenticatedUser({
                bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
            }).then(user => {
                setUsername(user.username);
                // TBD
            }).catch(err => setError(err));
        }
        catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setBookings(json.items))
            .catch((error) => console.error(error))
        //   .finally(() => setLoading(false));
    }, [refreshing]);

    async function postData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response; // parses JSON response into native JavaScript objects
    }

    const onSubmit = () => {
        // make post request
        let url = `https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/users/${username}`
        let post = { 'username': username, 'locationId': data.locationId, "dateTimeSlot": getDTslot() }
        console.log(url)
        console.log(post)

        postData(url, post)
            .then(data => {
                let title = data.ok ? "Success" : "Fail to submit"
                let msg = data.ok ? "Your booking has been submitted." : "Check if you have already signed up for this timeslot."
                Alert.alert(
                    title,
                    msg,
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                );
            })
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setBookings();
        setDay();
        setSelectedTime();
        setTimings();
        panelRef.current.hideBtn(true)
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);


    const handleClick = (timing) => {
        if (selectedTime == timing) {
            setSelectedTime()
            panelRef.current.hideBtn(true)
        } else {
            setSelectedTime(timing)
            panelRef.current.hideBtn(false)
        }
    }

    const getNumberOfHours = (data) => {
        let res = data.length / 7
        return res
    }

    const timeslots = [
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '12:00 - 13:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
        '17:00 - 18:00',
        '18:00 - 19:00',
        '19:00 - 20:00',
    ]


    const clickDay = (day) => {
        setDay(day)
        let hrs = getNumberOfHours(bookings)
        renderTimeslot(bookings.slice(hrs * day, hrs * (day + 1)))
    }

    const renderTimeslot = (week) => {
        var ts = []

        for (let i = 0; i < week.length; i++) {
            if (week[i].bookings != week[i].maxOccupancy) {
                ts.push(timeslots[i])
            }
        }
        setTimings(ts)
    }



    return (
        <View style={styles.screen}>
            <HeaderImageScrollView
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.6}
                minOverlayOpacity={0}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                fadeOutForeground
                renderHeader={() => <Image source={{ uri: data.imageUrl }} style={styles.image} />}
            >
                <View>
                    <TriggeringView>
                        <View style={[styles.card, styles.shadow]} >
                            <Text style={{ fontWeight: 'bold', fontSize: 25, paddingBottom: 5 }}>Capacity: {getCapacity(data.currentOccupancy, data.maxCapacity)}%</Text>
                            <Text style={{ color: Color.secondary, paddingBottom: 5 }}>Current Available Slots: {data.maxCapacity - data.currentOccupancy}</Text>
                            <Text style={{ color: Color.secondary }}>Max Capacity: {data.maxCapacity}</Text>
                        </View>
                    </TriggeringView>
                    <View>
                    </View>
                    <View style={[{ paddingTop: 80, }, styles.section]}>
                        <Text style={[styles.sectionHeader, { fontSize: 35 }]}>{data.name}</Text>
                        <Text style={styles.sectiontext}>Location: {data.address}</Text>
                        <Text style={styles.sectiontext}>Operating Hours: {getOperatingHours(data.startTime, data.endTime)}</Text>
                        <Text style={[styles.sectiontext, { color: Color.secondary, paddingTop: 10, paddingBottom: 0 }]}>The above information is for walk-in purposes. Users may only book from the next day onwards.</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Available Days</Text>
                        {bookings ?
                            <Slider futureData={bookings} onclick={clickDay} />
                            :
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <ActivityIndicator />
                            </View>
                        }
                    </View>
                    <View style={[styles.section, { marginBottom: 100 }]}>
                        <Text style={styles.sectionHeader}>Available slots</Text>
                        {day != null ?
                            <View style={styles.timeslotContainer}>
                                {timings.map(slot => (
                                    <TouchableOpacity onPress={() => handleClick(slot)}>
                                        <View style={[styles.timeslot, { backgroundColor: (selectedTime === slot ? Color.primary : "white") }]}>
                                            <Text style={{ fontWeight: "600" }}>{slot}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            : <View></View>}
                    </View>
                </View>
            </ HeaderImageScrollView>
            <JoinPanel ref={panelRef} onclick={onSubmit} />
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
        minHeight: 250,
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
    },
    timeslot: {
        borderColor: Color.primary,
        borderWidth: 2,
        borderRadius: 10,
        margin: 10,
        padding: 15,
        paddingHorizontal: 25
    },
    timeslotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },

});

export default Details;