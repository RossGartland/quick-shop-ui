import React from "react";
import { useState, useEffect } from "react";
import productService from "../../services/product.service";
import SaleProduct from "./sale-product.component";

function SaleProductsBanner(props) {
  const { storeList } = props;
  const [saleItems, setSaleItems] = useState([]);

  useEffect(() => {
    productService
      .findProductsOnSaleForNearbyStores(storeList)
      .then((saleItems) => setSaleItems(saleItems))
      .catch((error) => {});
  }, [storeList]);
  console.log(storeList);
  console.log(saleItems);
  return (
    <div className="card-deck">
      {Object.keys(saleItems.slice(0, 4)).map((keyName, i) => (
        <SaleProduct
          key={i}
          image={saleItems[i].productImagePath}
          brandName={saleItems[i].brandName}
          name={saleItems[i].name}
          price={saleItems[i].price}
          salePrice={saleItems[i].salePrice}
          storeID={saleItems[i].storeID}
        />
      ))}
    </div>
  );
}
export default SaleProductsBanner;
