import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/product/manager/';

class ProductService {
 
  getProduct() {
    return axios.get(API_URL + 'find-all', { headers: authHeader() });
  }

 
}

export default new ProductService();