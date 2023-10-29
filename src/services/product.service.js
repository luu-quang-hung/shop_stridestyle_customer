import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/product/manager/';

class ProductService {
  getProduct() {
    // Dữ liệu cần truyền vào yêu cầu POST
    const requestData = {
      page: 0,
      size: 12
    };

    // Truyền requestData vào phần body của yêu cầu POST
    return axios.post(API_URL + 'find-all', requestData, { headers: authHeader() });
  }
}

export default new ProductService();