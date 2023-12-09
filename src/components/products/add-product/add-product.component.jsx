import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import authService from "../../../services/auth.service";
import productService from "../../../services/product.service";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import barcodeLookupService from "../../../services/barcodeLookup.service";

function AddProduct(props) {
  const currentUser = authService.getCurrentUser();
  const { register, handleSubmit } = useForm();
  const [viewScanner, setViewScanner] = useState([true]);
  const [categoriesList, setCategoriesList] = useState([]);
  const location = useLocation();
  const { storeID } = location.state;

  const [eanNumber, setEanNumber] = React.useState("Not Found");
  const [barcodeData, setBarcodeData] = React.useState([]);

  useEffect(() => {
    if (currentUser !== null) {
      productService
        .getCategories()
        .then((categoriesList) => setCategoriesList(categoriesList))
        .catch((error) => {});
    }

    barcodeLookupService
      .findProduct(Number.parseFloat(eanNumber))
      .then((barcodeData) => setBarcodeData(barcodeData))
      .catch((error) => {});

    console.log("View scanner:" + viewScanner);
    console.log("Scanner result:" + eanNumber);
  }, [eanNumber]);

  const onSubmit = (data) => {
    const productData = {
      name: data.name,
      description: data.description,
      categoryID: {
        categoryID: data.category,
      },
      price: parseFloat(data.price),
      volume: data.volume,
      storeID: storeID,
      brandName: data.brandName,
      gtin14: data.gtin14,
    };
    console.log(productData);
    productService
      .addProduct(data.fileUpload, productData)
      .then(() => {
        alert(JSON.stringify("Submitted"));
        // window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        alert(JSON.stringify(e.data));
      });
  };

  console.log(barcodeData);
  return (
    <div className="container col-md-4 col-md-offset-4 pt-5">
      <h4 className="text-center">Add a Product</h4>
      <div id="accordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Scan a barcode
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse in"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body">
              {viewScanner && (
                <React.Fragment>
                  <p>
                    You may still be required to enter some product details
                    manually.
                  </p>
                  <BarcodeScannerComponent
                    width={500}
                    height={500}
                    onUpdate={(err, result) => {
                      if (result)
                        setEanNumber(Number.parseFloat(result.text)) &&
                          setViewScanner(false);
                    }}
                  />
                  <p>GTIN14: {eanNumber}</p>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="accordion">
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Search for a product. (GTIN Required)
              </button>
            </h5>
          </div>

          <div
            id="collapseTwo"
            className="collapse in"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            <div className="card-body">
              <div className="search">
                <input
                  type="text"
                  placeholder="GTIN"
                  onChange={(event) => setEanNumber(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="name"
            className="form-control"
            id="name"
            value={barcodeData.name}
            placeholder="Product Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="form-group">
          <input
            type="brandName"
            className="form-control"
            id="brandName"
            value={barcodeData.brand_name}
            placeholder="Brand Name"
            {...register("brandName", { required: true })}
          />
        </div>
        <div className="form-group">
          <input
            type="description"
            className="form-control"
            id="description"
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </div>
        <div className="form-group">
          <input
            type="gtin14"
            className="form-control"
            id="gtin14"
            value={barcodeData.gtin14}
            placeholder="GTIN14 Code"
            {...register("gtin14", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Category</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            {...register(
              "category",
              { valueAsNumber: true },
              { required: true }
            )}
          >
            {categoriesList.map((item, index) => {
              return (
                <React.Fragment>
                  <option value={item.categoryID}>{item.categoryType}</option>
                </React.Fragment>
              );
            })}
            ;
          </select>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            id="price"
            placeholder="Price"
            {...register("price", { required: true })}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="volume"
            placeholder="Volume"
            {...register("volume", { valueAsNumber: true }, { required: true })}
          />
        </div>
        <div className="form-group">
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Select an image to represent the product.
            </label>
            <input
              type="file"
              className="form-control"
              id="formFile"
              {...register("fileUpload", { required: true })}
            />
          </div>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default AddProduct;
