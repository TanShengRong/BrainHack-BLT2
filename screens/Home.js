import React ,{useState}from 'react';
import { View, Text, StyleSheet,FlatList, TouchableWithoutFeedback, Image,ScrollView, Keyboard } from 'react-native';
import TodoItem from '../components/todoItem'
import Header from '../components/header'
import Addtodo from '../components/addtodo'
import SandBox from '../components/sandbox'
//import { ScrollView } from 'react-native-gesture-handler';

const Home = props => {
     const [todos, settodos]=useState([
        {text:'buy coffee', key:'1', urilink:'../assets/WoodlandsBatminton.png'},
        {text:'create app', key:'2',urilink:'../assets/WoodlandsStadium.png'},
        {text:'play on switch', key:'3',urilink:'../assets/WoodlandSwimmingComplex.png'},
      ])
    
      const pressHandler=(key)=>{
        settodos((prevTodos)=>{
          return prevTodos.filter(todos=>todos.key!=key);
        });
      }
    
      /*submits a new todo item*/
      const submitHandler=(text)=>{
        /* relies on prevTodos */
        settodos((prevTodos)=>{
          return[
              {text:text, key:Math.random().toString(), urilink:"../assets/WoodlandsBatminton.png"},
              ...prevTodos
            ];
        })
      }
    return (
        //<SandBox/>
        //<Image  source={require('../assets/splash.png')} style = {{ width: 200, height: 200 }}/>
        // <Image
        //     style={{
        //         width: 100,
        //         height: 200}}
        //     resizeMode='contain'
        //     source={require("../assets/WoodlandsBatminton.png")}
        // />
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss}}>
            
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                
                 <View style={styles.content}>
                    <Addtodo submitHandler={submitHandler}/>
                    <View style={styles.listHorizontal}>
                         <FlatList
                         horizontal={true}
                         data={todos} /* pass todos as the data for flat list*/
                         renderItem={({item})=>(/*item passed into the function needs to be deconstructed by curly braces*/
                         <TodoItem item={item} pressHandler={pressHandler} horizontal={true}/>
                         )}
                         />
                     </View>
                    <View style={styles.list}>
                         <FlatList
                         data={todos} /* pass todos as the data for flat list*/
                         renderItem={({item})=>(/*item passed into the function needs to be deconstructed by curly braces*/
                         <TodoItem item={item} pressHandler={pressHandler} horizontal={false}/>
                         )}
                         />
                     </View>
                 </View>
                </View>

            </ScrollView>  
        </TouchableWithoutFeedback>
        
        // <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss}}> 
        //     <View style={styles.container}>
        //         <View style={styles.screen}>
        //             <Text>This is the home page man.</Text>
        //         </View>
        //         <Header/>
        //         <View style={styles.content}>
        //             <Addtodo submitHandler={submitHandler}/>
        //             <View style={styles.list}>
        //                 <FlatList
        //                 data={todos} /* pass todos as the data for flat list*/
        //                 renderItem={({item})=>(/*item passed into the function needs to be deconstructed by curly braces*/
        //                 <TodoItem item={item} pressHandler={pressHandler}/>
        //                 )}
        //                 />
        //             </View>
        //         </View>
        //     </View>
        // </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen: {
        padding:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
      },
      content:{
        flex: 1,
        padding:10,
        
    
      },
      list:{
        flex: 1,
        marginTop:20,

    
      },
      listHorizontal:{
        flex: 1,
        marginLeft:20,
        
    
      },
    
});

export default Home;