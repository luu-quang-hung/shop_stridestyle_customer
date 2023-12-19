import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/bill-manager/';


class OrderBillService {

    getOrderBill(json) {
        return axios.post(API_URL + 'find-all-by-id-customer', json, { headers: authHeader() });
      }

      findByIdBill(idBill) {
        return axios.get(API_URL + `find-by-id_bill/` + idBill, { headers: authHeader() })
      }

      updateBill(json){
        return axios.post(API_URL + `confirm-bill-manager`,json, { headers: authHeader() })
      }
}

export default new OrderBillService();