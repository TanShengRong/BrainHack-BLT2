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
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
            coordinate: {
            latitude: 1.367240,
            longitude: 103.840420,
            },
            key: id++,
            title: 'YCK Gym',
            description: 'Crowd level is HIGH',
        },
        {
            coordinate: {
                latitude: 1.382342,
                longitude: 103.846085,
            },
            key: id++,
            title: 'AMK Gym',
            description: 'Crowd level is LOW',
        },
        {
            coordinate: {
                latitude: 1.352128,
                longitude: 103.872122,
            },
            key: id++,
            title: 'Serangoon Gym',
            description: 'Crowd level is HIGH',
        },
        {
            coordinate: {
                latitude: 1.355957,
                longitude: 103.874901,
            },
            key: id++,
            title: 'Serangoon Stadium',
            description: 'Crowd level is LOW',
        },
      ],
    };
  }

  componentDidMount() {
    console.log('Component did mount');
    // this.getCurrentPosition();
    getLocationDefaults();
  }
  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setRegion(region);
        },
        (error) => {
          //TODO: better design
          if (Platform.OS === "android") {
            this.requestLocationPermission();}
          switch (error.code) {
            case 1:
              if (Platform.OS === "ios") {
                Alert.alert("", "To locate your location enable permission for the application in Settings - Privacy - Location");
              } else {
                Alert.alert("", "To locate your location enable permission for the application in Settings - Apps - Safe Exercising - Location");
              }
              break;
            default:
              Alert.alert("", "Error detecting location");
          }
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          showsUserLocation={true}
          followUserLocation={true}
        >
          {this.state.markers.map(marker => (
            <Marker
              title={marker.title}
              key={marker.key}
              coordinate={marker.coordinate}
              description={marker.description}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <SandBoxTwo/>
          <Text>HELLLLLLLLOOOOOOO</Text>
          {/* <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Tap refresh current location</Text>
          </TouchableOpacity> */}
        </View>
        {/* <OverlayComponent style={ styles.overlayComponent }
        /> */}
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  overlayComponent: {
    position: "absolute",
     bottom: 50,
  }
});

export default CustomMarkers;