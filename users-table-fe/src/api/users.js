import { client } from './httpCreate';

function random(length) {
  const characters = '-abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const getUsers =  () => { 
  return client.get('/users'); 
};

export const getUserById = (id) => {
  return client.get(`/users/${id}`);
};

export const createUser = (name, lastName, email, phone) => {
  const data = {
    name,
    lastName,
    email,
    phone
  }
  return client.post('/user', {
    id: random(16),
    ...data
  });
};

export const updateUser = (title, description, start, end, id) => {
  const data = {
    title,
    description,
    start,
    end
  }
  return client.patch(`/users/${id}`, data);
};