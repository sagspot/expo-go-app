import axios from 'axios';

export const apiUrl = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
export const telRegex = /^(\+?254|0)[17][0-9]{8}$/;
export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
