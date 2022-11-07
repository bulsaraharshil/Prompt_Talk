import io from 'socket.io-client';

export const API_URL = '"http://127.0.0.1:3000"';
export const SOCKET = io(API_URL);
