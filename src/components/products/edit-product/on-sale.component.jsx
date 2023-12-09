import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import authService from "../../../services/auth.service";
import productService from "../../../services/product.service";

function OnSale(props) {
  const { register, handleSubmit } = useForm();
  const { product } = props;

  const onSubmit = (data) => {
    console.log(data);
    productService
      .setProductOnSale(parseFloat(data.salePrice), product.productID)
      .then((res) => {
        alert(JSON.stringify("Product offer updated!"));
        // window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        alert(JSON.stringify(e.data));
      });
  };

  const onClickRemoveProductFromSale = () => {
    productService.removeProductFromSale(product.productID).then(() => {
      alert(JSON.stringify("Product offer removed.")).catch((e) => {
        console.log(e);
        alert(JSON.stringify(e.data));
      });
    });
  };

  return (
    <div className="container">
      <h2>Sales and Discounts</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="border rounded">
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">
            Special Offer Price (£):
          </label>
          <input
            type="salePrice"
            className="form-control"
            id="salePrice"
            defaultValue={product.salePrice}
            placeholder="Sale Price"
            {...register("salePrice", { required: true })}
          />
        </div>
        <input type="submit" value="Submit" className="btn btn-primary m-1" />
      </form>
      <div className="border rounded">
        <p>Clicking this button will remove the offer.</p>
        <input
          type="submit"
          value="Remove offer"
          className="btn btn-danger m-1"
          onClick={() => onClickRemoveProductFromSale()}
        />
      </div>
    </div>
  );
}
export default OnSale;
