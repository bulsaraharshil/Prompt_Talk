import React, { useState, useEffect } from 'react';
import { View, Alert, Image, ImageBackground, SafeAreaView, Text } from 'react-native';
import { Card } from 'react-native-elements';
// import MyRoomNumberTextInput from '../../components/My-TextInput/MyRoomNumberTextInput';
import MyRoomNumberTextInput from '../../components/My-TextInput/MyRoomNumberTextInput';
import MyUserNameTextInput from '../../components/My-TextInput/MyUserNameTextInput';
import MyButton from '../../components/My-Button/MyButton';
import styles from './login-screen.css';
import { SOCKET, API_URL } from '../../config/config';
import { getUsersInRoom } from '../../../backend/utils/users';
import 'react-native-get-random-values';
import { useIsFocused } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
const image = "https://raw.githubusercontent.com/AboutReact/sampleresource/master/crystal_background.jpg";
const LoginScreen = (props) => {
  const isFocused = useIsFocused();
  const [values, setValues] = useState({
    userName: '',
    roomName: '',
    id: '',
  });

  const handleChange = (name) => (text) => {
    
    setValues({...values, [name]: text});
    console.log(values);
  };

  useEffect(() => {
    return () => {
      setValues({});
    };
  }, [isFocused]);

  // const validateUser =  (room,userName)=>{
  //   return fetch('http://10.0.0.99:19000/users')
  //     .then((response) => response.text())
  //     .then((data) =>  {
  //       return data.users.find((user) => user.room === room && user.userName === userName);
  //     });
  //   }

  const validateUser = async (room, userName) => {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    return data.users.find((user) => user.room === room && user.userName === userName);
  };
  
  const handleRoomChange = (name) => (text) => {

    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("please enter numbers only");
        }
    }
    // this.setState({ myNumber: newText });
    setValues({ ...values, [name]: newText });
    //console.log(values);
  };

  const handleUserChange = (name) => (text) => {
    setValues({ ...values, [name]: text });
    //console.log(values);
  };

  useEffect(() => {
    return () => {
      setValues({});
    };
  }, [isFocused]);

  const handleLogin = async () => {

    if (values.roomName && values.userName) {
      let checkUser = await validateUser(values.roomName, values.userName);
      if (checkUser === undefined) {
      const id = uuidv4();
      SOCKET.connect();
      SOCKET.emit('join', { userName: values.userName, room: values.roomName });
      props.navigation.navigate('chat', {
        userName: values.userName,
        roomName: values.roomName,
        id,
      }
      );
    } else if (!values.roomName) {
      Alert.alert('Please enter room number');
    } else if (!values.userName) {
      Alert.alert('Please enter user name');
    }
    else {
      Alert.alert('User already exists');
    }
  }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={{ flex: 1 }}
        //We are using local image to set background
        source={require('../../../assets/Login.png')}

      
      //You can also set image from your project folder
      //require('./images/background_image.jpg')        //
      >
        <View style={styles.loginScreenContainer}>
          {/* <AppHeader headerTitle="Login" /> */}
          <Image source={{ uri: 'http://arjavrathod.com/wp-content/uploads/2022/11/bgf-3-1.png' }}
            style={{ width: 350, height: 110, }} />
          <Card containerStyle={styles.loginCardContainer}>
            <Card.Title style={{color:"black"}}>Prompt Talk</Card.Title>
            <Card.Divider />
            <View>
              <MyRoomNumberTextInput
                placeholder="Enter 4 digit room number"
                placeholderTextColor="#fff"
                style={styles.textInput}
                value={values.roomName}
                onChangeText={handleRoomChange('roomName')}
              />
              <MyUserNameTextInput
                placeholder="Enter Username"
                placeholderTextColor="white"
                style={styles.textInput}
                value={values.userName}
                onChangeText={handleUserChange('userName')}
              />
              <MyButton
                title="Join"
                onPress={() => {
                  handleLogin();
                }}
              />
            </View>
          </Card>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;