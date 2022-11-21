import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat';
import { TouchableOpacity, Image, Alert, ImageBackground, SafeAreaView, View } from 'react-native';
import AppHeader from '../../components/App-Header/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './chat-screen.css';
import { SOCKET } from '../../config/config';

import { Header, Text } from 'react-native-elements';


//  const socket = io()

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const isRendered = useRef(false);

  useEffect(() => {
    SOCKET.on('message', (data) => {
      if (data.length !== undefined) {
        //console.log("Client side if part:", data);
        if (props.route.params.id !== data[0].user._id) {
          if (!isRendered.current) {
            //console.log("Inside Message gifted", isRendered.current);
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, data),
            );
          }
        }
      }
      else if (data.length === undefined) {
        //console.log("Client side else part:", messages);
        if (props.route.params.id !== data.id) {
          if (!isRendered.current) {
            //console.log("Inside Message gifted", isRendered.current);
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, data),
            );
          }
        }
      }
      else {
        //console.log("No data");
      }
      //console.log(props.route.params.userName);

    });
    return () => {
      isRendered.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSend = useCallback((message = []) => {
    //console.log("Message on send:::", message);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
    SOCKET.emit('chatMessage', message);
  }, []);

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
            },
            multiline: true,
            returnKeyType: 'go',
            onSubmitEditing: () => {
              if (props.text && props.onSend) {
                let text = props.text;
                props.onSend({ text: text.trim() }, true);
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
      <Send {...props}>
        <Ionicons name="send" size={28} />
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
        { text: 'OK', onPress: () => leftFromGroup() },
      ],
      { cancelable: false },
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          //We are using online image to set background
          source={{
            uri:
              'http://arjavrathod.com/wp-content/uploads/2022/11/987.jpg',
          }}

        >
          <Header
            leftComponent={{style:{fontSize: 15, fontWeight: "bold"} ,text: props.route.params.userName}}
            centerComponent={{style: {fontSize: 15, fontWeight: "bold"}, text:props.route.params.roomName}}
            rightComponent={
              <>
                <TouchableOpacity
                  onPress={showAlert}>
                  <Text style={styles.leftGroupButton}>
                    Leave
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
              _id: props.route.params.id,
              name: props.route.params.userName,
            }}
          />
        </ImageBackground>
      </View>
    </>
  );
};



export default ChatScreen;