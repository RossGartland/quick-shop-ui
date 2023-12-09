import axios from "axios";

class BarcodeLookup {
  findProduct(barcode) {
    const API_URL = "http://localhost:8081/partner-service/products/brocade/";
    return axios.get(API_URL + barcode).then((resp) => {
      console.log(resp.data);
      return resp.data;
    });
  }
}

export default new BarcodeLookup();
