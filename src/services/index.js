import axios from 'axios';
const baseURL = 'http://localhost:3000/api';

let mainService = axios.create({
  baseURL: baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export function addTodo(boardId, listId, todo) {
  
}

export async function getAccessToken(email, password) {
  try {
    const result = await mainService.post('/todoUsers/login', { email, password });
    const { data, status } = result;
    if (status < 200 && status > 299) {
      throw new Error(status);
    }
    return data;
  } catch (error) {
    return new Error(error);
  }
}

export async function getBoards(token) {
  try {
    const result = await mainService.get('/boards', {
      headers: {
        'Authorization': token
      }
    })
    const { data, status } = result;
    if (status<200 && status>299) {
      throw new Error(status);
    }
    return data;
  } catch (error) {
    return new Error(error);
  }
}

export default {
  getAccessToken,
  getBoards
}