import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/product/manager/';

class OrderDetailSerivce {

    headersAdd = {
        'Content-Type': 'application/json',
        'token': '1b430556-d481-11ed-9eaf-eac62dba9bd9',
    };
    getProvinces() {
        return axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`, { headers: this.headersAdd });
    }

    getDistrict(json) {
        return axios.post(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`, json, { headers: this.headersAdd });
    }

    getWard(json) {
        return axios.post(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, json, { headers: this.headersAdd });

    }

    getShipping(json){
        return axios.post(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, json, { headers: this.headersAdd });

    }
}

export default new OrderDetailSerivce();