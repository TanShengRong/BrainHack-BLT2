import React ,{useState}from 'react';
import { View, Text, StyleSheet,FlatList, TouchableWithoutFeedback, Image,ScrollView, Keyboard,SafeAreaView } from 'react-native';
import TodoItem from '../components/todoItem'
import Header from '../components/header'
import Addtodo from '../components/addtodo'
import SandBox from '../components/sandbox'
//import { ScrollView } from 'react-native-gesture-handler';

const Home = props => {
     const [gyms, setgyms]=useState([
        {name:'Woodlands Batminton', key:'1', urilink:require('../assets/WoodlandsBatminton.png'),
        maxCapacity:10, currentOccupancy:8, bookings:8, operatingHrs:'9am-8pm'},
        {name:'Woodlands Stadium', key:'2',urilink:require('../assets/WoodlandsStadium.png'),maxCapacity:30, currentOccupancy:4, bookings:8, operatingHrs:'9am-9pm'},
        {name:'Woodlands Swimming Complex', key:'3',urilink:require('../assets/WoodlandSwimmingComplex.png'),maxCapacity:20, currentOccupancy:2, bookings:8, operatingHrs:'9am-5pm'},
      ])
    
      const pressHandler=(key)=>{
        setgyms((prevgyms)=>{
          return prevgyms.filter(gyms=>gyms.key!=key);
        });
      }
    
      /*submits a new todo item*/
      const submitHandler=(name)=>{
        /* relies on prevgyms */
        setgyms((prevgyms)=>{
          return[
              {name:name, key:Math.random().toString(), urilink:require('../assets/WoodlandSwimmingComplex.png')},
              ...prevgyms
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
            <SafeAreaView style={styles.screen}>
                <FlatList
                showsHorizontalScrollIndicator={false}
                data={gyms} /* pass gyms as the data for flat list*/
                renderItem={({item})=>(/*item passed into the function needs to be deconstructed by curly braces*/
                <TodoItem item={item} pressHandler={pressHandler} horizontal={false}/>
                )}
                ListHeaderComponent={
                    <>
                    <Addtodo submitHandler={submitHandler}/>
                    <Text style={{fontWeight:'bold'}}> 
                        Currently Available
                    </Text>
                    <View style={styles.listHorizontal}>
                         <FlatList
                         showsHorizontalScrollIndicator={false}
                         horizontal={true}
                         data={gyms} /* pass gyms as the data for flat list*/
                         renderItem={({item})=>(/*item passed into the function needs to be deconstructed by curly braces*/
                         <TodoItem item={item} pressHandler={pressHandler} horizontal={true}/>
                         )}
                         />
                     </View>
                     </>
                }
                />
            </SafeAreaView>
            
        </TouchableWithoutFeedback>
    //     <ScrollView style={styles.container}>
    //     <View style={styles.content}>
    //         <Addtodo submitHandler={submitHandler}/>
    //         <View style={styles.listHorizontal}>
    //              <FlatList
    //              horizontal={true}
    //              data={gyms} /* pass gyms as the data for flat list*/
    //              renderItem={({item})=>(/*item passed into the function needs to be deconstructed by curly braces*/
    //              <TodoItem item={item} pressHandler={pressHandler} horizontal={true}/>
    //              )}
    //              />
    //          </View>
    //         <View style={styles.list}>
    //              <FlatList
    //              data={gyms} /* pass gyms as the data for flat list*/
    //              renderItem={({item})=>(/*item passed into the function needs to be deconstructed by curly braces*/
    //              <TodoItem item={item} pressHandler={pressHandler} horizontal={false}/>
    //              )}
    //              />
    //          </View>
    //     </View>

    // </ScrollView>  
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
        //                 data={gyms} /* pass gyms as the data for flat list*/
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
        paddingTop:40,
        padding:20,
        flex:1
    },

     
      listHorizontal:{
        flex: 1,
        marginBottom:20,
    
      },
    
});

export default Home;