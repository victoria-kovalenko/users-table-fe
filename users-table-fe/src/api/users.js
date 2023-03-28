import { client } from './httpCreate';

export const getUsers =  () => { 
  return client.get('/users'); 
};