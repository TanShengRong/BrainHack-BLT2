import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  OverlayComponent
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import SandBoxTwo from '../components/sandboxtwo'
import { getLocationDefaults } from '../components/apifunctions'
import { API } from 'aws-amplify';
//tmp to prevent warnings
// console.disableYellowBox = true;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 1.381861;
const LONGITUDE = 103.844939;
const LATITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class CustomMarkers extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      region: {
        latitude: 1.3521,
        longitude: 103.8198,
        latitudeDelta: 0.6022,
        longitudeDelta: LONGITUDE_DELTA,
      },
      items: []
    //   markers: [
    //     {
    //         coordinate: {
    //         latitude: 1.367240,
    //         longitude: 103.840420,
    //         },
    //         key: id++,
    //         title: 'YCK Gym',
    //         description: 'Crowd level is HIGH',
    //     },
    //     {
    //         coordinate: {
    //             latitude: 1.382342,
    //             longitude: 103.846085,
    //         },
    //         key: id++,
    //         title: 'AMK Gym',
    //         description: 'Crowd level is LOW',
    //     },
    //     {
    //         coordinate: {
    //             latitude: 1.352128,
    //             longitude: 103.872122,
    //         },
    //         key: id++,
    //         title: 'Serangoon Gym',
    //         description: 'Crowd level is HIGH',
    //     },
    //     {
    //         coordinate: {
    //             latitude: 1.355957,
    //             longitude: 103.874901,
    //         },
    //         key: id++,
    //         title: 'Serangoon Stadium',
    //         description: 'Crowd level is LOW',
    //     },
    //   ],
    };
  }

  async componentDidMount() {
    console.log('Component did mount');
    const APIDATA = await getLocationDefaults();
    console.log(typeof(APIDATA) === 'object');
    console.log(APIDATA.items[0]);
    this.setState({ items: APIDATA.items });
  }
  animateRandom(reg) {
    this.map.animateToRegion(this.randomRegion(reg));
  }
  randomRegion(reg) {
    return {
      ...this.state.region,
      ...this.randomCoordinate(reg),
    };
  }
  randomCoordinate(reg) {
    const region = this.state.region;
    let lat = 0, long=0;
    switch (reg) {
        case 'amk':
            lat = 1.382342;
            long = 103.846085;
            break;
        case 'sr': 
            lat = 1.352128;
            long = 103.872122;
            break;
    }
    return {
      latitude:
        // region.latitude + (Math.random() - 0.5) * (region.latitudeDelta / 2),
        lat,
      longitude:
        // region.longitude + (Math.random() - 0.5) * (region.longitudeDelta / 2),
        long,
    latitudeDelta: 
        LATITUDE_DELTA,
    longitudeDelta: 
        LONGITUDE_DELTA,
    };
  }
    mapMarkers = () => {
    return this.state.items.map(item => (
        <Marker
          title={item.name}
          key={item.locationId}
          coordinate={{
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon)
          }}
          description={item.address}
        />
      ))
    }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          initialRegion={this.state.region}
          showsUserLocation={true}
          followUserLocation={true}
        >

        {this.mapMarkers()}

        </MapView>
        <View style={styles.buttonContainer}>
          <SandBoxTwo/>
        </View>
      </View>
        // {/* <View style={styles.buttonContainer}> */}
        //   {/* <SandBoxTwo/> */}
        //   {/* <Text>HELLLLLLLLOOOOOOO</Text> */}

        //   {/* <TouchableOpacity
        //     onPress={() => this.setState({ markers: [] })}
        //     style={styles.bubble}
        //   >
        //     <Text>Tap refresh current location</Text>
        //   </TouchableOpacity> */}

        //   {/* <TouchableOpacity
        //     onPress={() => this.animateRandom('amk')}
        //     style={[styles.bubble, styles.button]}
        //   >
        //     <Text style={styles.buttonText}>North Region</Text>
        //   </TouchableOpacity>

        //   <TouchableOpacity
        //     onPress={() => this.animateRandom('sr')}
        //     style={[styles.bubble, styles.button]}
        //   >
        //     <Text style={styles.buttonText}>South Region</Text>
        //   </TouchableOpacity> */}
    );
  }
}

CustomMarkers.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginVertical: 20,
//     backgroundColor: 'transparent',
//   },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop:screenHeight*3/5,
    width:screenWidth,
    flex:1,
    borderWidth:3,
    borderColor:'transparent'
  },
  overlayComponent: {
    position: "absolute",
     bottom: 50,
  },
});

export default CustomMarkers;