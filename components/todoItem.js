import React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function TodoItem({item, pressHandler, horizontal}){
    if (horizontal==true) {
        return(
            <TouchableOpacity onPress={()=>pressHandler(item.key)}>
                <View>
                    <Image
                        style={{
                        margin:10,
                        marginBottom:0,
                        width: screenWidth/3,
                        height: screenWidth/3,
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,}}
                        resizeMode='cover' 
                        source={item.urilink}
                    />
                </View>

                <Text style={styles.itemHorizontal}>{item.name}</Text>
            </TouchableOpacity>
            
        );
    }else{
        return(
            <TouchableOpacity onPress={()=>pressHandler(item.key)}>
                <View style={styles.containter}>
                    <Image
                        style={styles.tinyLogo}
                        resizeMode='cover'
                        source={item.urilink}
                    />

                   
                    <Text style={styles.item}>{item.name}</Text>
                </View>

            </TouchableOpacity>
        );
    }

    
    // return(
    //     <TouchableOpacity onPress={()=>pressHandler(item.key)}>
    //         <Text style={styles.item}>{item.name}</Text>
    //     </TouchableOpacity>
    // )

}

const styles=StyleSheet.create({
    containter:{
        //backgroundColor:'skyblue',
        //borderColor:'red',
        //borderWidth:1,
        margin:5,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',

    },

    item:{
        flex:1,
        padding:16,
        borderColor:'#bbb',
        borderWidth:1,
        borderTopRightRadius:30,
        borderBottomRightRadius:30,
        height:screenHeight/6,

    },
    itemHorizontal:{
        height: screenWidth/8,
        paddingBottom:16,
        paddingLeft:2,
        marginHorizontal:8,
        borderColor:'#bbb',
        borderWidth:1,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        fontSize: 9,
        fontWeight: "bold",

    },
    tinyLogo: {
        height:screenHeight/6 ,
        width: screenHeight/6,
        borderWidth:1,
        borderColor:'#bbb',
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        //resizeMode: 'stretch'
      },

      

})