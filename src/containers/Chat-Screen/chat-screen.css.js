import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputToolbarContainerStyle: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    marginHorizontal: 10,
    marginBottom: 4.5,
    marginLeft: '12%', // add icon
    borderRadius: 50,
    borderColor: '#FFE0E0',
  },
  inputToolbarTouchableOpacity: {
    position: 'absolute',
    marginLeft: '4%',
    marginBottom: '1%',
    bottom: 0,
  },
  inputToolbarIcon: {
    color: '#0F0326',
  },
  sendIcon: {
    color: '#0F0326',
    marginRight: '0%',
    marginBottom: '30%',
  },
  leftGroupButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 0,
  },
  chatFont:{
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  centerContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput:{
    color:'red',
  },

});