import axios from "axios";

class ProductService {
  addProduct(file, formData) {
    const API_URL = "http://localhost:8081/partner-service/products";

    const blob = new Blob([JSON.stringify(formData)], {
      type: "application/json",
    });

    let postData = new FormData();
    postData.append("file", file[0]);
    postData.append("newProduct", blob);
    console.log(postData);

    return axios
      .post(API_URL, postData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }
  getCategories() {
    const API_URL = "http://localhost:8081/partner-service/categories";
    return axios.get(API_URL).then((resp) => {
      return resp.data;
    });
  }
  getStoresProducts(storeID) {
    const API_URL = "http://localhost:8081/partner-service/products/store/";
    return axios.get(API_URL + storeID).then((resp) => {
      return resp.data;
    });
  }
  getProduct(productID) {
    const API_URL = "http://localhost:8081/partner-service/products/";
    return axios.get(API_URL + productID).then((resp) => {
      console.log(resp.data);
      return resp.data;
    });
  }
  updateProduct(formData) {
    const API_URL = "http://localhost:8081/partner-service/products/";
    console.log(formData);
    return axios
      .patch(API_URL, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }

  deleteProduct(productID) {
    const API_URL = "http://localhost:8081/partner-service/products/";

    return axios
      .delete(API_URL + productID)
      .then((resp) => {
        console.log("hey");
        return resp.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
  setProductOnSale(saleValue, productID) {
    const API_URL = "http://localhost:8081/partner-service/products/";
    const API_URL2 = "/sale";
    console.log("HERE" + saleValue);
    return axios
      .put(API_URL + productID + API_URL2, Number(saleValue), {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }

  removeProductFromSale(productID) {
    const API_URL = "http://localhost:8081/partner-service/products/";
    const API_URL2 = "/sale";
    return axios
      .delete(API_URL + productID + API_URL2, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }

  findProductsOnSaleForNearbyStores(storeList) {
    const API_URL = "http://localhost:8081/partner-service/products/sales";
    return axios
      .post(API_URL, storeList, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }
}

export default new ProductService();
