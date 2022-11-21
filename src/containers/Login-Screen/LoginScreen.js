import React, {useState, useEffect} from 'react';
import {View, Alert, Image, ImageBackground, SafeAreaView} from 'react-native';
import {Card} from 'react-native-elements';
import MyTextInput from '../../components/My-TextInput/MyTextInput';
import MyButton from '../../components/My-Button/MyButton';
import styles from './login-screen.css';
import {SOCKET} from '../../config/config';
import 'react-native-get-random-values';
import {useIsFocused} from '@react-navigation/native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
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

const handleLogin = () => {
 
    if (values.roomName && values.userName) {
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

  };
   
  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground
        style={{ flex: 1 }}
        //We are using online image to set background
        source={{
          uri:
          'http://arjavrathod.com/wp-content/uploads/2022/11/crystal_background01-12.png',
        }}
        //You can also set image from your project folder
        //require('./images/background_image.jpg')        //
      >
    <View style={styles.loginScreenContainer}>
      {/* <AppHeader headerTitle="Login" /> */}
      <Image source={{uri: 'http://arjavrathod.com/wp-content/uploads/2022/11/bgf-3-1.png'}}
       style={{width: 350, height: 110,}} />
      <Card containerStyle={styles.loginCardContainer}>
        <Card.Title>Prompt Talk</Card.Title>
        <Card.Divider />
        <View>
          <MyTextInput
            placeholder="Enter Room Name"
            placeholderTextColor="#fff" 
            style={styles.textInput}
            value={values.roomName}
            onChangeText={handleChange('roomName')}
          />
          <MyTextInput
            placeholder="Enter Username"
            placeholderTextColor="white" 
            style={styles.textInput}
            value={values.userName}
            onChangeText={handleChange('userName')}
          />
          <MyButton
            title="Login"
            onPress={() => {
              handleLogin();
            }}
          />
        </View>
      </Card>
    </View>
    </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;