import React ,{useState}from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default function Addtodo({submitHandler}){
    const [text,setText]=useState('');
    
    /*OnChangeText Handler Automatically pass the value*/
    const changeHandler=(val)=>{
        setText(val)
    }
    return(
        <View >
            <TextInput 
                style={styles.input}
                placeholder='new todo...'
                onChangeText={changeHandler}
                /*Note: onChangeText={(Val)=>{changeHandler(Val)}}*/ 
            />
            <Button title="Add todo" color='coral' onPress={()=>submitHandler(text)}/>
        </View>
    )
}

const styles=StyleSheet.create({
    input:{
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        marginBottom:10,
        paddingHorizontal:8,
        paddingVertical:6,
    }
})