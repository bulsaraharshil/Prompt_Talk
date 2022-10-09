import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.joinText}>Let's Connect</Text>
      <TextInput style={styles.nameInput} placeholder="Enter Name" placeholderTextColor="white"/>
      <TextInput style={styles.roomInput} placeholder="Enter Room" placeholderTextColor="white"/>
      <Button title="Join" onPress={() => alert('Joining...')}/>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Prompt Talk" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinText:{
    color:"white",
    fontSize: 35
  },
  nameInput:{
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    color:"white",
    padding:12,
    margin:5
  },
  roomInput:{
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    color:"white",
    padding:12,
    margin:5
  }
});


export default App;