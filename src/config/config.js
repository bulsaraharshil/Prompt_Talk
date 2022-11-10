import { Platform } from 'react-native';
import io from 'socket.io-client';

// export const API_URL = 'http://127.0.0.1:3000';

export const API_URL = Platform.OS === 'ios' ? 'http://192.168.99.213:3000' : 'http://192.168.99.213:3000';

export const SOCKET = io(API_URL);
