import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/product/manager/';

class ProductService {
 
  getProduct(json) {
    return axios.post(API_URL + 'find-all',json, { headers: authHeader() });
  }
  getProductByID(idProduct) {
    return axios.get(API_URL + 'find-by-id/'+ idProduct, { headers: authHeader() });
  }

}

export default new ProductService();