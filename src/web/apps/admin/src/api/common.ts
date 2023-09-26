import { Channel, ChannelCredentials } from '@sisa/api';

export const API_DNS = '127.0.0.1:5000';
export const channel = new Channel(API_DNS, ChannelCredentials.createInsecure(), {});
