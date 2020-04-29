import axios from 'axios';
import authHeader from './authHeader';

class UserService {
  getPublicContent() {
    return axios.get(`${process.env.REACT_APP_API_URL}/user/test/all`);
  }

  getUserBoard() {
    return axios.get(`${process.env.REACT_APP_API_URL}/user/test/user`, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(`${process.env.REACT_APP_API_URL}/user/test/mod`, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(`${process.env.REACT_APP_API_URL}/user/test/admin`, { headers: authHeader() });
  }

  getUserBookings() {
    return axios.get(`${process.env.REACT_APP_API_URL}/user/bookings`, { headers: authHeader() });
  }
}

export default new UserService();
