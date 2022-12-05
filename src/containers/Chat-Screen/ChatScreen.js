import React, {useState, useCallback, useEffect, useRef} from 'react';
import {GiftedChat, InputToolbar, Send, Bubble} from 'react-native-gifted-chat';
import { TouchableOpacity, Image, Alert, ImageBackground, SafeAreaView, View,Linking } from 'react-native';
import AppHeader from '../../components/App-Header/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './chat-screen.css';
import {SOCKET} from '../../config/config';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {Text} from 'react-native-elements';

//  const socket = io()

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const isRendered = useRef(false);

  useEffect(() => {
    SOCKET.on('message', (data) => {
      if(data.length!== undefined){
        console.log("Client side if part:",data);
        if (props.route?.params?.id !== data[0].user._id) {
          if (!isRendered.current) {
            console.log("Inside Message gifted",isRendered.current);
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, data),
            );
          }
        }
      }
      else if (data.length === undefined){
        console.log("Client side else part:",messages);
        if (props.route.params.id !== data.id) {
          if (!isRendered.current) {
            console.log("Inside Message gifted",isRendered.current);
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, data),
            );
          }
        }
      }
      else{
        console.log("No data");
      }
      console.log(props.route.params.username);
  
    });
    return () => {
      isRendered.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSend = useCallback((message =[]) => {
    console.log("Message on send:::",message);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
    SOCKET.emit('chatMessage', message);
  }, []);

//   const ShareLocation =() => {
//     let locationObj =[
//  {
//       _id: "2768aa4c-7330-4143-9477-240df4d39cbe",
//       createdAt: new Date,
//       text: "https://www.fiverr.com/inbox/madayo",
//       user:  {
//       _id: props.route.params.id,
//         name:props.route.params.userName,
//       }
//     }
//   ]
   
//     setMessages((previousMessages) =>
//     GiftedChat.append(previousMessages, locationObj),
//   );
//   SOCKET.emit('chatMessage', locationObj);
//   };







  // getPermissionAsync= async(permission)=> {
  //   const { status } = await Permissions.askAsync(permission)
  //   if (status !== 'granted') {
  //     const { name } = Constants.manifest
  //     const permissionName = permission.toLowerCase().replace('_', ' ')
  //     Alert.alert(
  //       'Cannot be done 😞',
  //       `If you would like to use this feature, you'll need to enable the ${permissionName} permission in your phone settings.`,
  //       [
  //         {
  //           text: "Let's go!",
  //           onPress: () => Linking.openURL('app-settings:'),
  //         },
  //         { text: 'Nevermind', onPress: () => {}, style: 'cancel' },
  //       ],
  //       { cancelable: true },
  //     )
  
  //     return false
  //   }
  //   return true
  // }
  






  //   const getLocationAsync=async(onSend)=> {
  //     alert()
  //   if (await getPermissionAsync(Permissions.LOCATION)) {
  //     const location = await Location.getCurrentPositionAsync({})
  //     if (location) {
  //       onSend([{ location: location.coords }])
  //     }
  //   }
  // }

  const renderInputToolbar = (props) => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbarContainerStyle}
          textInputProps={{
            style: {
              color: '#000000',
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: 22,
              paddingVertical:12,
              // marginTop:5
            },
            multiline: true,
            returnKeyType: 'go',
            onSubmitEditing: () => {
              if (props.text && props.onSend) {
                let text = props.text;
                props.onSend({text: text.trim()}, true);
              }
            },
          }}
        />
        {/* <TouchableOpacity style={styles.inputToolbarTouchableOpacity}>
          <Ionicons
            name="add-circle-outline"
            style={styles.inputToolbarIcon}
            size={32}
          />
        </TouchableOpacity> */}
      </>
    );
  };

  // const renderSend = (props) => {
  //   return (
  //     <>
  //       <Send {...props}>
  //         <Ionicons name="send" size={28} style={styles.sendIcon} />
  //       </Send>
  //     </>
  //   );
  // };

  // const renderSend = (sendProps) => {
  //   if (sendProps.text.trim().length > 0) {
  //     return (
  //       <TouchableOpacity {...props}>
  //         <Ionicons name="send" size={28} style={styles.sendIcon} />
  //       </TouchableOpacity>
  //     );
  //   }
  //   return null;
  // }


  const renderSend = (props) => {
    return (
      <Send {...props} style={{marginRight:20,right:40}}>
        <Ionicons name="send" size={28}  style={{marginRight:30,marginBottom:5}}/>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#0F0326',
            borderColor: '#000000',
          },
          left: {
            backgroundColor: '#D5E3EC',
          },
        }}
      />
    );
  };

  const leftFromGroup = () => {
    SOCKET.disconnect();
    props.navigation.navigate('login');
  };

  const showAlert = () => {
    Alert.alert(
      'Leave Group',
      'Are you sure you want to leave the group?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => leftFromGroup()},
      ],
      {cancelable: false},
    );
  };

  return (
    <>
     <SafeAreaView style={styles.container}>
     <ImageBackground
        style={{ flex: 1 }}
        //We are using online image to set background
        source={{
          uri:
          'http://arjavrathod.com/wp-content/uploads/2022/11/987-copy.png',
        }}
        //You can also set image from your project folder
        //require('./images/background_image.jpg')        //
      >
      <Header
      leftComponent={
              
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <View style={{borderWidth:1,height:40,width:40,borderRadius:100,justifyContent:"center",alignItems:"center",marginRight:5,borderColor:"white"}}>
          <FontAwesome name="group" size={24} color="white" />                
          </View>
            <View >
        <Text style={{fontSize: 15, fontWeight: "bold"}} >{props.route?.params?.roomName}</Text>
          <Text >{props.route?.params?.userName}, You</Text>
        </View>
        </View>
      }
      // centerComponent={{style: {fontSize: 15, fontWeight: "bold"}, text:props.route.params.roomName}}
      rightComponent={
          <>
            <TouchableOpacity
              onPress = {showAlert}>
              <Text style={styles.leftGroupButton}>
              Leave Group 
                <Ionicons name="backspace-outline" size={16} color="#ffffff" />
              </Text>
            </TouchableOpacity>
          </>
        }
      />
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderAvatar={null}
        renderUsernameOnMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: props.route?.params?.id,
              name: props.route?.params?.userName,
        }}
      />
      <TouchableOpacity
          onPress={()=>   Linking.openURL("https://maps.app.goo.gl/QMgM3eSjsK1zqNfaA")}
          style={{position:"absolute",backgroundColor:"black",right:15,bottom:15,borderWidth:1,borderRadius:100,height:30,width:30,justifyContent:"center",alignItems:"center"}}
          >
            <Entypo name="location" size={16} color="white" />
          </TouchableOpacity>
      </ImageBackground>
      </SafeAreaView>
    </>
  );
};



export default ChatScreen;