import { Platform } from 'react-native';
import io from 'socket.io-client';

export const API_URL = 'http://10.0.0.99:3000'; //this is the IP address of my computer and it changes when I connect to a different network, use command "ipconfig getifaddr en0" to get current IP address

// export const API_URL = Platform.OS === 'ios' ? 'http://192.168.99.213:3000' : 'http://192.168.99.213:3000';

export const SOCKET = io(API_URL);
