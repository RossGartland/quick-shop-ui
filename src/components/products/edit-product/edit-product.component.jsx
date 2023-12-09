import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import authService from "../../../services/auth.service";
import productService from "../../../services/product.service";

function EditProduct(props) {
  const currentUser = authService.getCurrentUser();
  const { storeID, product } = props;
  const { register, handleSubmit } = useForm();
  const [userDetails, setUserDetails] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const [favImages, setFavImages] = useState([]);
  useEffect(() => {
    if (currentUser !== null) {
      productService
        .getCategories()
        .then((categoriesList) => setCategoriesList(categoriesList))
        .catch((error) => {});
    }
  }, []);

  const onSubmit = (data) => {
    let str = data.category;
    let catArray = str.split(",");
    const productData = {
      productID: product.productID,
      name: data.name,
      description: data.description,
      categoryID: {
        categoryID: parseInt(catArray[0]),
        categoryType: catArray[1],
      },
      price: parseFloat(data.price),
      volume: data.volume,
      storeID: storeID,
    };
    console.log(productData);
    productService
      .updateProduct(productData)
      .then(() => {
        alert(JSON.stringify("Submitted"));
        // window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        alert(JSON.stringify(e.data));
      });
  };

  return (
    <div className="container ">
      <h2>General Product Information</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Name:</label>
          <input
            type="name"
            className="form-control"
            id="name"
            defaultValue={product.name}
            placeholder="Product Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Description:</label>
          <textarea
            type="description"
            className="form-control"
            id="description"
            defaultValue={product.description}
            placeholder="Description"
            {...register("description", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Category</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            {...register("category", { required: true })}
          >
            {categoriesList.map((item, index) => {
              return (
                <React.Fragment>
                  <option value={[item.categoryID, item.categoryType]}>
                    {item.categoryType}
                  </option>
                </React.Fragment>
              );
            })}
            ;
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Price</label>
          <input
            className="form-control"
            id="price"
            defaultValue={product.price}
            placeholder="Price"
            {...register("price", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Volume:</label>
          <input
            type="number"
            className="form-control"
            id="volume"
            defaultValue={product.volume}
            placeholder="Volume"
            {...register("volume", { valueAsNumber: true }, { required: true })}
          />
        </div>
        <input type="submit" value="Submit" className="btn btn-primary m-1" />
      </form>
    </div>
  );
}
export default EditProduct;
