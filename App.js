import React,{useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView,  FlatList, TouchableOpacity} from 'react-native';
//import { setWorldAlignment } from 'expo/build/AR';

export default function App() {
  const [person, setPerson]=useState([
    {name:'shaun', key:'1'},
    {name:'yoshi', key:'2'},
    {name:'mario', key:'3'},
    {name:'luigi', key:'4'},
    {name:'peach', key:'5'},
    {name:'Jamie', key:'6'},
 

  ])
  const pressHandler=(id)=>{
    console.log(id)
    setPerson((previousState)=>{
      return previousState.filter(itemHere => itemHere.key!=id)
    });
  }


  return(
    <View style={styles.container}>
      <FlatList
      keyExtractor={(item)=>(item.key)}
      numColumns={2}
      data={person}
      renderItem={({item})=>{
        return(
        <TouchableOpacity onPress={()=> pressHandler(item.key)}>
          <Text style={styles.item}> {item.name} </Text>
        </TouchableOpacity>
      )}}/>

      {/* <ScrollView>
        {person.map((item)=>{
          return(
            <View key={item.key}>
              <Text style={styles.item}> {item.name} </Text>
            </View>
          )
        })}
      </ScrollView> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  item:{
    marginTop:24,
    padding:30,
    backgroundColor:'pink',
    fontSize:24,
    marginHorizontal:10,

  },
});
