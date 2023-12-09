import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import productService from "../../../services/product.service";
import "./product-list.style.css";
import ReactDOM from "react-dom/client";
import ReactPaginate from "react-paginate";
import Rating from "@mui/material/Rating";
import ProductReviews from "../../../pages/reviews/product-reviews.component";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function ProductList(props) {
  const { onAddItem, itemsPerPage } = props;
  const [productList, setProductList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    productService
      .getStoresProducts(props.storeID)
      .then((productList) => setProductList(productList))
      .catch((error) => {});
    productService
      .getCategories()
      .then((categoriesList) => setCategoriesList(categoriesList))
      .catch((error) => {});
  }, []);

  function Products({ currentItems }) {
    function getFilteredList() {
      if (!selectedCategory) {
        return currentItems;
      }
      return currentItems.filter(
        (item) => item.categoryID.categoryType === selectedCategory
      );
    }

    var currentItems = useMemo(getFilteredList, [
      selectedCategory,
      currentItems,
    ]);

    function handleCategoryChange(event) {
      setSelectedCategory(event.target.value);
    }

    console.log(currentItems);
    return (
      <div className="col-md-5">
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Category</label>
          <select
            className="form-control"
            onChange={handleCategoryChange}
            id="exampleFormControlSelect1"
          >
            <option value=""></option>
            <option value="">All</option>
            {categoriesList.map((item, index) => {
              return (
                <React.Fragment>
                  <option value={item.categoryType}>{item.categoryType}</option>
                </React.Fragment>
              );
            })}
            ;
          </select>
        </div>

        {currentItems.map((item, index) => {
          return (
            <div className="card w-100" key={item.productID}>
              <div className="row card-body">
                <div className="col-sm-6">
                  <h5 className="card-title">
                    {item.brandName} {item.name}
                  </h5>
                  <p className="card-text">{item.description}</p>
                  {item.onSale ? (
                    <div style={{ backgroundColor: "yellow", width: "25%" }}>
                      <p className="font-weight-bold">
                        Was £{item.price} <br />
                        Now £{item.salePrice}
                      </p>
                    </div>
                  ) : (
                    <p>£{item.price}</p>
                  )}
                  <Rating
                    name="read-only"
                    value={item.productRating}
                    readOnly
                  />
                  <br />
                  <Popup
                    contentStyle={{ width: "400px" }}
                    trigger={<a className="link-warning"> View Reviews</a>}
                    position="right center"
                    modal
                    nested
                  >
                    <ProductReviews productID={item.productID} />
                  </Popup>
                  <div className="row col-md-1">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => onAddItem(item)}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <img
                  className="col-sm-6 img-thumbnail product-list-image"
                  src={item.productImagePath}
                  alt="Card cap"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function PaginatedItems(itemsPerPage) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = productList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(productList.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % productList.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <React.Fragment>
        <Products currentItems={currentItems} />
        <div className="product-pagination container justify-content-centre">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="pagination float-right"
            subContainerClassName="pages pagination"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </React.Fragment>
    );
  }
  return PaginatedItems(4);
}
export default ProductList;
