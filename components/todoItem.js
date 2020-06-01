import React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native';

export default function TodoItem({item, pressHandler, horizontal}){
    if (horizontal==true) {
        return(
            <TouchableOpacity onPress={()=>pressHandler(item.key)}>
                <Image
                    style={{
                        margin:10,
                        marginBottom:0,
                        width: 100,
                        height: 50}}
                    resizeMode='cover'
                    source={require("../assets/WoodlandsBatminton.png")}
                />
                {/* <Image
                     style={styles.tinyLogo2}
                     resizeMode='contain'
                    source={require('../assets/WoodlandsStadium.png')}
                /> */}
                <Text style={styles.itemHorizontal}>left</Text>
            </TouchableOpacity>
            
        );
    }else{
        return(
            <TouchableOpacity onPress={()=>pressHandler(item.key)}>
                <Image
                     style={styles.tinyLogo}
                     resizeMode='contain'
                    source={require('../assets/splash.png')}
                />
                <Text style={styles.item}>{item.text}</Text>
            </TouchableOpacity>
        );
    }

    
    // return(
    //     <TouchableOpacity onPress={()=>pressHandler(item.key)}>
    //         <Text style={styles.item}>{item.text}</Text>
    //     </TouchableOpacity>
    // )

}

const styles=StyleSheet.create({
    item:{
        padding:16,
        
        borderColor:'#bbb',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10

    },
    itemHorizontal:{
        padding:16,
        marginHorizontal:8,
        borderColor:'#bbb',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10

    },
    tinyLogo: {
        flex:1,
        width: 60,
        height: 60,
        marginTop:10,
        backgroundColor:'coral'
        //resizeMode: 'stretch'
      },
    tinyLogo2: {
        width: 100,
        height: 200,
        
    }
      

})