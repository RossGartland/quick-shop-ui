import axios from "axios";

class ReviewService {
  getStoresReviews(storeID) {
    const API_URL = "http://localhost:8081/partner-service/stores/";
    const API_URL2 = "/reviews";
    return axios
      .get(API_URL + storeID + API_URL2, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((resp) => {
        return resp.data;
      });
  }
  editStoreReview(formData) {
    const API_URL = "http://localhost:8081/partner-service/stores/reviews";
    console.log(formData);
    return axios
      .put(API_URL, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }

  createStoreReview(formData) {
    const API_URL = "http://localhost:8081/partner-service/stores/reviews";
    return axios
      .post(API_URL, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((resp) => {
        return resp.data;
      });
  }

  getProductsReviews(productID) {
    const API_URL = "http://localhost:8081/partner-service/products/";
    const API_URL2 = "/reviews";
    return axios
      .get(API_URL + productID + API_URL2, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((resp) => {
        return resp.data;
      });
  }
  editProductReview(formData) {
    const API_URL = "http://localhost:8081/partner-service/products/reviews";
    console.log(formData);
    return axios
      .put(API_URL, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }

  createProductReview(formData) {
    const API_URL = "http://localhost:8081/partner-service/products/reviews";
    return axios
      .post(API_URL, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((resp) => {
        return resp.data;
      });
  }
}

export default new ReviewService();
