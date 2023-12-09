import axios from "axios";

class OrderService {
  submitOrder(formData) {
    const API_URL = "http://localhost:8081/order-service/orders";
    return axios
      .post(API_URL, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        return res.data;
      });
  }

  getAllStoreOrders(storeID) {
    const API_URL = "http://localhost:8081/order-service/orders/store/";
    return axios.get(API_URL + storeID).then((resp) => {
      return resp.data;
    });
  }

  getAllCustomerOrders(customerID) {
    const API_URL = "http://localhost:8081/order-service/orders/customers/";
    return axios.get(API_URL + customerID).then((resp) => {
      return resp.data;
    });
  }

  getOrder(orderID) {
    const API_URL = "http://localhost:8081/order-service/orders/";
    return axios.get(API_URL + orderID).then((resp) => {
      console.log(resp.data);
      return resp.data;
    });
  }
  changeOrderStatus(orderID, status) {
    const API_URL = "http://localhost:8081/order-service/orders/";
    const API_URL2 = "/status";
    return axios
      .patch(API_URL + orderID + API_URL2, status, {
        headers: {
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        if (res.data) {
          return res.data;
        }
        return res.data;
      });
  }
  getStoreOrderStats(storeID) {
    const API_URL = "http://localhost:8081/order-service/orders/store/";
    const API_URL2 = "/stats";
    return axios.get(API_URL + storeID + API_URL2).then((resp) => {
      return resp.data;
    });
  }
}

export default new OrderService();
