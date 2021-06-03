import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

const API_KEY = '894c0c1d03546d1843b5efd334d6e479';
const queryUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Weather Information',
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      main: null
    };
  }

  componentDidMount() {
    const {
      route: {
        params: { city },
      },
    } = this.props;

    fetch(queryUrl(city))
      .then(response => response.json())
      .then(info => {
        console.log(info);
        this.setState({
          ...info,
          isLoading: false,
          main: info
        });
      });
  }

  render() {
    const {
        route: {
          params: { city },
        },
        navigation,
      } = this.props;

      navigation.setOptions({ title: `Weather Information: ${city}` });
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.main.temp - 273.15;


    return (
      <View style={styles.container}>
        <ImageBackground source={{uri: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"}} style={styles.bgImage} >
          <Text style={styles.cityText}>도시 : {city}</Text>
          <Text style={styles.tempatureText}>
            온도 : <Text style={styles.tempatureText2}>{celsius.toFixed(1)}</Text> 도
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  cityText: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tempatureText: {
    flex: 8,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 60,
    fontWeight: 'bold',
  },
  tempatureText2: {
    flex: 8,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 82,
    fontWeight: 'bold',
  },
  bgImage: {
    width: '100%', height: '100%',
  },
});
