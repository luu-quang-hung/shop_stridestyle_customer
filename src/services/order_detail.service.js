import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/bill-manager/';
const API_URL_VNPAY = 'http://localhost:8080/vnpay/';
const API_VOUCHER = "http://localhost:8080/voucher-manager/"
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

    createBill(json){
        return axios.post(API_URL + "create-bill", json, { headers: authHeader()});

    }

    pushVnpay(json){
        return axios.post(API_URL_VNPAY + "url-vnpay", json, { headers: authHeader()});

    }

    checkVoucher(json){
        return axios.post(API_VOUCHER + "check-voucher", json, { headers: authHeader()});

    }
}

export default new OrderDetailSerivce();