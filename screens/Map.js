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
import Color from '../constants/color';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import Sandboxtwo from '../components/sandboxtwo'
import SandBoxNorth from '../components/sandboxnorth'
import SandBoxSouth from '../components/sandboxsouth'
import SandBoxEast from '../components/sandboxeast'
import SandBoxWest from '../components/sandboxwest'
import SandBoxCentral from '../components/sandboxcentral'
import { getLocationDefaults, getLocationByRegion } from '../components/apifunctions'
// import { API } from 'aws-amplify';
//tmp to prevent warnings
console.disableYellowBox = true;

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
      items: [],
      chosenR: '',
    };
  }

  async componentDidMount() {
    console.log('Component did mount');
    const APIDATA = await getLocationDefaults();
    // console.log(typeof(APIDATA) === 'object');
    // console.log(APIDATA.items[0]);

    this.setState({ items: APIDATA.items });
  }

  async updateMarkers(reg) {
    // const APIDATA = await getLocationByRegion(reg);
    if (reg === 'reset') {
      const APIDATA = await getLocationDefaults();
      this.setState({ items: APIDATA.items });
    }
    else {
      const APIDATA = await getLocationByRegion(reg);
      this.setState({ items: APIDATA.items });
    }
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

  renderElement() {
    if (this.state.chosenR === 'north') { return <SandBoxNorth /> }
    if (this.state.chosenR === 'south') { return <SandBoxSouth /> }
    if (this.state.chosenR === 'east') { return <SandBoxEast /> }
    if (this.state.chosenR === 'west') { return <SandBoxWest /> }
    if (this.state.chosenR === 'central') { return <SandBoxCentral /> }
    else {
      return <Sandboxtwo />
    }
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
          {this.renderElement()}
        </View>
        <View style={styles.filterContainer}>

          <TouchableOpacity
            onPress={() => {
              this.updateMarkers('reset')
              this.setState({ chosenR: 'all' });
            }
            }
            style={[styles.bubble, styles.resetButton]}
          >
            <Text style={styles.resetButtonText}>R</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.updateMarkers('north')
              this.setState({ chosenR: 'north' });
            }
            }
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>North</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.updateMarkers('south')
              this.setState({ chosenR: 'south' });
            }
            }
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>South</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.updateMarkers('central')
              this.setState({ chosenR: 'central' });
            }
            }
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>Central</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.updateMarkers('east')
              this.setState({ chosenR: 'east' });
            }
            }
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>East</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.updateMarkers('west')
              this.setState({ chosenR: 'west' });
            }
            }
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>West</Text>
          </TouchableOpacity>

        </View>
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
    minWidth: 70,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Color.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 12,
  },
  buttonText: {
    textAlign: 'center'
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  resetButton: {
    width: 40,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  resetButtonText: {
    color: 'red',
    textAlign: 'center',
  },
  button: {
    width: 70,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: screenHeight * 3 / 5,
    width: screenWidth,
    flex: 1,
    borderWidth: 3,
    borderColor: 'transparent'
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    flex: 0.25,
  },
  overlayComponent: {
    position: "absolute",
    bottom: 50,
  },
});

export default CustomMarkers;