import React, { useState, useEffect,useRef } from 'react';
import { View, Text, StyleSheet, ColorPropType,Alert,TextInput,Button,Keyboard, SafeAreaView,TouchableWithoutFeedback  } from 'react-native';
import { WebView } from 'react-native-webview';
import Color from '../constants/color';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function SafeEntry({}){
    const [text,setText]=useState('PPUSH MEEEE');
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')
    const webviewRef = useRef(null)

    const updateState=(navState)=>{
        console.log('Entere');
        setCanGoBack(navState.canGoBack);
        setCanGoForward(navState.canGoForward);
        setCurrentUrl(navState.url);
        alert(` ${navState.url} `);
        setText(`${navState.url}`);
        if (url!==navState.url) { 
            url = navState.url;
            alert(url);
            this.setState({
              url: url
            })
          }
      }

    //NEW
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
    
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setText(`${data}`);
      };
    

      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
    //NEW

    /*OnChangeText Handler Automatically pass the value*/
    const changeHandler=(val)=>{
        setText(val)
    }
    return(
        
        <SafeAreaView style={styles.screen}>
            
            <TextInput 
                style={styles.input}
                placeholder='new MEEEE.'
                onChangeText={changeHandler}
                /*Note: onChangeText={(Val)=>{changeHandler(Val)}}*/ 
            />
            <Button title={text} color='skyblue' onPress={()=>{
                Alert.alert('Cheeky You!','Stay Tune for more Features, ' + text +'.',
                [
                    {text:'Understood', onPress:()=>{ console.log('alert close')}},
            
                ]);
                
            }}/>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        borderWidth:3,
                        borderColor:'Brown'
                    }}>
                    {scanned?
                    <WebView source={{ uri: text}} scalesPageToFit={true} ref={webviewRef}
                    onNavigationStateChange={(navState) => updateState(navState)}/>
                    :
                    <BarCodeScanner
                        type="back"
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    }   
                    {scanned && 
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonContainertwo}>
                            <Button title={'Tap to Scan Again'} color='cyan' onPress={() => setScanned(false)} />
                        </View>
                        <View style={styles.buttonContainertwo}>
                            <Button title={'Check out'} color='crimson' onPress={() => setScanned(true)} />
                        </View>
                    </View>
                    }   
                    
                </View> 
            {/* <WebView source={{ uri: "https://www.youtube.com/watch?v=uy32O4bSrxA" }}/>  */}

        </SafeAreaView>
        
    )
}
//https://www.google.com/url?sa=i&url=https%3A%2F%2Fforums.hardwarezone.com.sg%2Feat-drink-man-woman-16%2F75%2525-din-scan-exit-safe-entry-6281822-19.html&psig=AOvVaw2ae0wpWi1XoTobC1p-wb5g&ust=1591177497352000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDnmJ_s4ukCFQAAAAAdAAAAABAJ
const styles=StyleSheet.create({
    input:{
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        marginBottom:10,
        paddingHorizontal:40,
        paddingVertical:6,
    },
    screen: {
        flex:1,
        backgroundColor:Color.primary,
    },
    buttonContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    buttonContainertwo:{
        flex:1,

    },
})