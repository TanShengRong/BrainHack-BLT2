import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SectionList } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Color from '../constants/color';


export default class JoinPanel extends React.Component {

    bs = React.createRef()

    hideBtn = (isDisabled) => {
        if (isDisabled) {
            this.bs.current.snapTo(3)
        } else {
            this.bs.current.snapTo(1)
        }
    }

    state = {
        button: 'JOIN',
        hideBtn: this.props.isDisabled
    };

    toggleBtn = () => {
        if (this.state.button == 'CONFIRM') {
            this.setState({ button: "JOIN" })
            this.bs.current.snapTo(1)
        } else {
            this.setState({ button: "CONFIRM" })
            this.bs.current.snapTo(0)
        }
    }

    method = () => this.bs.current.snapTo(3)


    _renderItem = ({ item }) => {
        <View>
            <Text>{item.title}</Text>
        </View>
    }

    _renderSectionHeader = ({ section: { title } }) => {
        <Text>{title}</Text>
    }

    renderInner = () => (
        <View style={styles.panel}>
            <TouchableOpacity
                style={[styles.panelButton, styles.shadow]}
                onPress={this.toggleBtn}>
                <Text style={{ color: 'white', fontWeight: '700' }}>{this.state.button}</Text>
            </TouchableOpacity>
            <View style={styles.warning}>
                <Text>Note: Our staff will be contacting your phone number as registered. Please arrive within 15 minutes of the call. Failing to do so may cause you to lose your allocated time slot.</Text>
            </View>
            <TouchableOpacity style={styles.cancel} onPress={this.toggleBtn}>
                <Text style={{ color: Color.secondary }}>CANCEL</Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        return (
            <BottomSheet
                ref={this.bs}
                snapPoints={[300, 100, 100, 0]}
                renderContent={this.renderInner}
                initialSnap={3}
                enabledGestureInteraction={false}
            />
        )
    }
}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
    cancel: {
        paddingTop: 20,
        alignItems: 'center'
    },
    box: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
    },
    warning: {
        paddingVertical: 30,
        paddingHorizontal: 40
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    commandButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#292929',
        alignItems: 'center',
        margin: 7,
    },
    panel: {
        height: 1000,
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
    },
    header: {
        width: '100%',
        height: 50,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        marginHorizontal: 50,
        backgroundColor: Color.primary,
        borderRadius: 12,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
    },
    map: {
        height: '100%',
        width: '100%',
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
    disabled: {
        opacity: 0.6
    }
})