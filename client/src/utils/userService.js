import axios from 'axios';
import authHeader from './authHeader';

class UserService {
  getPublicContent() {
    return axios.get(`${process.env.REACT_APP_API_URL}/test/all`);
  }

  getUserBoard() {
    return axios.get(`${process.env.REACT_APP_API_URL}/test/user`, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(`${process.env.REACT_APP_API_URL}/test/mod`, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(`${process.env.REACT_APP_API_URL}/test/admin`, { headers: authHeader() });
  }
}

export default new UserService();
