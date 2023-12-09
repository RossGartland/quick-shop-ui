import axios from "axios";

class StoreService {
  addStore(file, formData) {
    const API_URL = "http://localhost:8081/partner-service/stores";

    const blob = new Blob([JSON.stringify(formData)], {
      type: "application/json",
    });

    let postData = new FormData();
    postData.append("file", file[0]);
    postData.append("storeRequest", blob);
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
  addStoreOwner(formData) {
    const API_URL = "http://localhost:8081/partner-service/owners";
    console.log(formData);
    return axios
      .post(API_URL, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }
  deleteStore(storeID) {
    const API_URL = "http://localhost:8081/partner-service/stores/";

    return axios
      .delete(API_URL + storeID)
      .then((resp) => {
        return resp.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getStoresBelongingToOwner(ownerID) {
    const API_URL1 = "http://localhost:8081/partner-service/owners/ref/";
    const API_URL2 = "/stores";

    return axios.get(API_URL1 + ownerID + API_URL2).then((resp) => {
      console.log(resp.data);
      return resp.data;
    });
  }
  getStoreByID(storeID) {
    const API_URL = "http://localhost:8081/partner-service/stores/";
    return axios.get(API_URL + storeID).then((resp) => {
      return resp.data;
    });
  }

  getStoreTradingHours(storeID) {
    const API_URL = "http://localhost:8081/partner-service/stores/";
    const API_URL2 = "/tradinghours";
    return axios.get(API_URL + storeID + API_URL2).then((resp) => {
      return resp.data;
    });
  }

  editStoreDetails(storeID, formData) {
    const API_URL = "http://localhost:8081/partner-service/stores/";
    console.log(formData);
    return axios
      .put(API_URL + storeID, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }

  addStoreTradingHours(storeID, formData) {
    const API_URL = "http://localhost:8081/partner-service/stores/";
    const API_URL2 = "/tradinghours";
    console.log(formData);
    return axios
      .post(API_URL + storeID + API_URL2, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }

  editStoreTradingHours(storeID, formData) {
    const API_URL = "http://localhost:8081/partner-service/stores/";
    const API_URL2 = "/tradinghours";
    console.log(formData);
    return axios
      .put(API_URL + storeID + API_URL2, formData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
        return response.data;
      });
  }

  searchStoresByMap(locationData) {
    const API_URL = "http://localhost:8081/partner-service/stores/searchmap";
    return axios
      .post(API_URL, locationData, {
        "Content-Type": "application/json; charset=UTF-8",
      })
      .then((resp) => {
        return resp.data;
      });
  }

  toggleStoreActiveStatus(storeID) {
    const API_URL = "http://localhost:8081/partner-service/stores/";
    const API_URL2 = "/status";

    return axios
      .put(API_URL + storeID + API_URL2, {
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

export default new StoreService();
