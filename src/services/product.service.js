import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/product/manager/';
const API_URL_SIZE = 'http://localhost:8080/size-manager/';
const API_URL_PROPERTY = 'http://localhost:8080/property-manager/';

class ProductService {

  getProduct(json) {
    return axios.post(API_URL + 'find-all', json, { headers: authHeader() });
  }
  getProductByID(idProduct) {
    return axios.get(API_URL + 'find-by-id/' + idProduct, { headers: authHeader() });
  }

  findAllSize(json) {
    return axios.post(API_URL_SIZE + 'find-all', json, { headers: authHeader() });
  }

  findAllProperty(json) {
    return axios.post(API_URL_PROPERTY + 'find-all', json, { headers: authHeader() });
  }

  findQuantityByName(json) {
    return axios.post(API_URL + 'find-quantity-product-name', json, { headers: authHeader() });
  }

}

export default new ProductService();