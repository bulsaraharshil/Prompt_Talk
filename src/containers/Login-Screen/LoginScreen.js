import React, {useState, useEffect} from 'react';
import { View, Alert, Image, ImageBackground, SafeAreaView,Text } from 'react-native';
import {Card} from 'react-native-elements';
import MyTextInput from '../../components/My-TextInput/MyTextInput';
import MyButton from '../../components/My-Button/MyButton';
import styles from './login-screen.css';
import { SOCKET ,API_URL} from '../../config/config';
import 'react-native-get-random-values';
import {useIsFocused} from '@react-navigation/native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { getUsersInRoom } from '../../../backend/utils/users';
const image = "https://raw.githubusercontent.com/AboutReact/sampleresource/master/crystal_background.jpg";
const LoginScreen = (props) => {
  const isFocused = useIsFocused();
  const [values, setValues] = useState({
    userName:'',
    roomName:'',
    id:'',
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

  const validateUser =  (room,userName)=>{
    return fetch('http://192.168.187.166:3000/users')
      .then((response) => response.json())
      .then((data) =>  {
        return data.users.find((user) => user.room === room && user.userName === userName);
      });
    }
    const handleLogin =async () => {
      if (!values.roomName) {
        Alert.alert('Please enter room number');
      } else if (!values.userName) {
        Alert.alert('Please enter user name');
      }
    if (values.roomName && values.userName) {
      let checkusers = await validateUser(values.roomName, values.userName)
      // alert("SDf")
      console.log("==============>",checkusers)
      if(checkusers === undefined){
      const id = uuidv4();
      SOCKET.connect();
      SOCKET.emit('join', {username: values.userName, room: values.roomName});
          props.navigation.navigate('chat', {
            username: values.userName,
            roomName: values.roomName,
            id,
          }
          );
    } else if (!values.roomName) {
      Alert.alert('Please enter room name');
    } else if(!values.userName) {
      Alert.alert('Please enter user name');
    } 
    else {
      Alert.alert("Already registered")
       }
      }

  };
   
  return (
    <View style={styles.container}>
       <Image source={{ uri: 'http://arjavrathod.com/wp-content/uploads/2022/11/bgf-3-1.png' }}
          style={{ width: 250, height:80, marginTop:60,alignSelf:"center"}} />
    {/* <ImageBackground
        style={{ flex: 1 }}
        //We are using online image to set background
        source={{
          uri:
          'http://arjavrathod.com/wp-content/uploads/2022/11/crystal_background01-12.png',
        }}
        //You can also set image from your project folder
        //require('./images/background_image.jpg')        //
      > */}
      <Text style={{color:"black",fontWeight:"bold",fontSize:20,textAlign:"left",marginTop:40,padding:20}}>Prompt Talk</Text>
    <View style={styles.loginScreenContainer}>
      {/* <AppHeader headerTitle="Login" /> */}
      {/* <Image source={{uri: 'http://arjavrathod.com/wp-content/uploads/2022/11/bgf-3-1.png'}}
       style={{width: 350, height: 110,}} />
      <Card containerStyle={styles.loginCardContainer}>
        <Card.Title>Prompt Talk</Card.Title>
        <Card.Divider />
        <View> */}
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
      
    </View>
    
    
  );
};

export default LoginScreen;