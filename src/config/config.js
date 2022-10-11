import io from 'socket.io-client';

export const API_URL = '"http://10.0.0.99:3001"';
export const SOCKET = io(API_URL);
