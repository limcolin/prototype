import axios from 'axios';
import authHeader from './authHeader';

class UserService {
  getPublicContent() {
    return axios.get(`/api/user/test/all`);
  }

  getUserBoard() {
    return axios.get(`/api/user/test/user`, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(`/api/user/test/mod`, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(`/api/user/test/admin`, { headers: authHeader() });
  }

  getUserBookings() {
    return axios.get(`/api/user/bookings`, { headers: authHeader() });
  }
}

export default new UserService();
