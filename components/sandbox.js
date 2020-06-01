import React from 'react';
import {StyleSheet, Text,View} from 'react-native';

export default function Sandbox(){
    return(
        <View style={styles.container}>
            <Text style={styles.boxOne}>one</Text>
            <Text style={styles.boxTwo}>two</Text>
            <Text style={styles.boxThree}>three</Text>
            <Text style={styles.boxFour}>four</Text>
        </View>

    )
}

const styles= StyleSheet.create({
    container:{
        //flex:1,
        flexDirection:'row',
        //flexDirection:'row' will make items side by side instead 
        justifyContent:'space-around',
        //justifyContent:'center','spaceout','flex-end','space-between','space-around',
        alignItems:'center',
        //aglin the child alignItems:'center','end','start'
        paddingTop:40,
        backgroundColor:"#ddd",
    },
    boxOne:{
        backgroundColor:'violet',
        padding:10,
    },
    boxTwo:{
        backgroundColor:'gold',
        padding:20,
    },
    boxThree:{
        backgroundColor:'skyblue',
        padding:30,
    },
    boxFour:{
        backgroundColor:'coral',
        padding:40,
    },
})