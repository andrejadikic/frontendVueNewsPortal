import axios from 'axios';
import { LOGIN } from './routes.js';
import jwt from 'jsonwebtoken';


export const login = async (email, password, router) => {
  try {
    const response = await axios({
      url: `${process.env.VUE_APP_API_URL}${LOGIN}`,
      method: 'post',
      data: {
        email,
        password,
      },
    });
    const userData = getUserInfo(response.data);
    localStorage.setItem('user-info', userData);
    localStorage.setItem('token', JSON.stringify(response.data));
    router.push('/');
  } catch (error) {
    alert(error.response.data[0].message || error.response.data);
  }
};

const getUserInfo = (bearerToken) => {
  const userData = jwt.decode(bearerToken.split(' ')[1]);
  delete userData.exp;
  delete userData.iat;
  return userData.sub;
};
