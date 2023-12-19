import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/ass/api/v1/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getProduct() {
    return axios.get(API_URL + 'product/findAll', { headers: authHeader() });
  }

  getCustomerByIdUser(idUser) {
    return axios.get("http://localhost:8080/customer-manager/find-customer-by-user/" + idUser , { headers: authHeader() });
  }

 
}

export default new UserService();
