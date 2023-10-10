import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/ProductManager/';

class ProductService {
 
  getProduct() {
    return axios.get(API_URL + 'findAllByIsDeleteFalse', { headers: authHeader() });
  }

 
}

export default new ProductService();