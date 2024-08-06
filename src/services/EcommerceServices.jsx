import axios from "axios";

const REST_API_BASE_URL="http://localhost:8086/consumer";

export const listUser=()=> axios.get(REST_API_BASE_URL);

export const createUser=(user)=>axios.post(REST_API_BASE_URL+'/registration',user);

export const getUser=(userId)=>axios.get(REST_API_BASE_URL+'/'+userId);

export const updateUser=(userId,user)=>axios.put(REST_API_BASE_URL+'/'+userId,user);

export const deleteUser=(userId)=>axios.delete(REST_API_BASE_URL+'/'+userId);