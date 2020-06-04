import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Image, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import TodoItem from '../components/todoItem'
import Header from '../components/header'
import Addtodo from '../components/addtodo'
import SandBox from '../components/sandbox'
import SandBoxtwo from '../components/sandboxtwo'
//import { ScrollView } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [gyms, setgyms] = useState([]);

  // runs whenever this page is loaded
  useEffect(() => {
    fetch('https://wrm7pj3sz1.execute-api.us-east-1.amazonaws.com/staging/locations')
      .then((response) => response.json())
      .then((json) => setgyms(json.items))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    console.log("Fetch")
  }, []);


  //  {name:'Woodlands Batminton', key:'1', urilink:require('../assets/WoodlandsBatminton.png'),
  //  maxCapacity:10, currentOccupancy:8, bookings:8, operatingHrs:'9am-8pm'},
  //  {name:'Woodlands Stage', key:'4', urilink:{uri:'data:image/jpeg;base64,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'},
  //  maxCapacity:10, currentOccupancy:8, bookings:8, operatingHrs:'9am-8pm'},
  //  {name:'Woodlands Stadium', key:'2',urilink:require('../assets/WoodlandsStadium.png'),maxCapacity:30, currentOccupancy:4, bookings:8, operatingHrs:'9am-9pm'},
  //  {name:'Woodlands Swimming Complex', key:'3',urilink:require('../assets/WoodlandSwimmingComplex.png'),maxCapacity:20, currentOccupancy:2, bookings:8, operatingHrs:'9am-5pm'},

  //{"address":"1 Woodlands Road","currentOccupancy":"10","endTime":"1700",
  //"imageUrl":"https://s3.amazonaws.com/com.blt2.safe-exercise.images/WoodlandsStadium.png",
  //"locationId":"f70612ac60bd4503a31fd070046b607b","maxCapacity":"20",
  //"name":"Woodlands Stadium","region":"central","startTime":"0900"}


  const pressHandler = (item) => {
    console.log("Selected item:")
    console.log(item)
    navigation.navigate('Details', { data: item })
  }

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={gyms} /* pass gyms as the data for flat list*/
            renderItem={({ item }) => (/*item passed into the function needs to be deconstructed by curly braces*/
              <TodoItem item={item} pressHandler={() => pressHandler(item)} horizontal={false} />
            )}
            ListHeaderComponent={
              <>
                <Text style={{ fontWeight: 'bold' }}>
                  Currently Available
                  </Text>
                <View style={styles.listHorizontal}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={gyms} /* pass gyms as the data for flat list*/
                    keyExtractor={({ locationId }, index) => locationId}
                    renderItem={({ item }) => (/*item passed into the function needs to be deconstructed by curly braces*/
                      <TodoItem item={item} pressHandler={() => pressHandler(item)} horizontal={true} />
                    )}
                  />
                  <Text style={{fontWeight:'bold'}}> 
                          Currently Available
                      </Text>
                </View>
              </>
            }
          />
        )}

      </TouchableWithoutFeedback>
      <View style={styles.input}>
        <View>
          <Text style={{fontWeight:'bold'}}> 
              Hi !
          </Text>
          <Text style={{fontWeight:'bold'}}> 
              My Bookings
          </Text>
        </View>
        
          <Avatar
          size="small"
          rounded
          title="MT"
          onPress={() => Alert.alert(
            `Hi !`,
            "Do you want to logout?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {try {
                  Auth.signOut()
                // signout success
              }
                catch(e) {
                    // signout failed
              }} }
            ],
            { cancelable: false }
          )}
          activeOpacity={0.7}
          source={{uri:'https://maxst.icons8.com/vue-static/icon/collection-favorites.png',}}
          />
        </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: 40,
    padding: 20,
    flex: 1
  },
  listHorizontal: {
    flex: 1,
    marginBottom: 20,
  },
  input:{
        
    borderBottomColor:"#ddd",
    paddingHorizontal:8,
    justifyContent:'space-between',
    flexDirection:'row',
  }
});

export default Home;