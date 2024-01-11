import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/ass/api/v1/';
const API_URL_CUSTOMER ="http://localhost:8080"
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

  createCustomer(json) {
    return axios.post(API_URL_CUSTOMER + '/account-manager/save-customer',json, { headers: authHeader() });
  }
}

export default new UserService();
