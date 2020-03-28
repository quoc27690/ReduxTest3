import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

// import getTemp from '../api/getTemp';
import getTemp from '../api/getTemp';

import {connect} from 'react-redux';
import {
  startFetch,
  fetchError,
  fetchSuccess,
  fetchDataThunk,
} from '../../redux/actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
    };
    this.myTextInput = React.createRef();
  }

  getWeatherMessage = () => {
    console.log('ok');
    const {cityName, temp, isLoading, error} = this.props;
    if (isLoading) {
      return '...IS LOADING';
    }
    if (error) {
      return 'VUI LÒNG THỬ LẠI';
    }
    if (!cityName) {
      return 'NHẬP TÊN THÀNH PHỐ';
    }
    return `${cityName} HIỆN TẠI LÀ ${temp} ĐỘ C`;
  };

  getTempByCityName = () => {
    const {cityName} = this.state;
    // this.props.startFetch();
    // getTemp(cityName)
    //   .then(temp => this.props.fetchSuccess(cityName, temp))
    //   .catch(() => this.props.fetchError());
    this.props.fetchDataThunk(cityName);
    this.myTextInput.current.clear();
  };

  clearTextInput() {
    this.setState({
      cityName: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text1}>{this.getWeatherMessage()}</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.cityName}
          onChangeText={text => this.setState({cityName: text})}
          ref={this.myTextInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.getTempByCityName}>
          <Text style={styles.text2}>Lấy Nhiệt Độ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cityName: state.cityName,
    temp: state.temp,
    isLoading: state.isLoading,
    error: state.error,
  };
}

export default connect(mapStateToProps, {
  startFetch,
  fetchError,
  fetchSuccess,
  fetchDataThunk,
})(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: 'white',
    fontSize: 15,
  },
  text2: {
    color: 'white',
  },
  button: {
    backgroundColor: 'grey',
    padding: 15,
  },
  textInput: {
    backgroundColor: 'black',
    color: 'white',
    margin: 20,
    width: '80%',
  },
});
