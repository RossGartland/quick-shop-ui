import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import productService from "../../../services/product.service";
import "./product-list.style.css";
import ReactPaginate from "react-paginate";

function MyProductList(props) {
  const { itemsPerPage } = props;
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

  const deleteProduct = (productID) => {
    productService.deleteProduct(productID);
    alert(JSON.stringify("Product deleted."));
    window.location.reload();
  };

  console.log(productList);
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

    return (
      <div>
        <div className="container">
          <div className="form-group">
            <div className="row w-50">
              <label htmlFor="exampleFormControlSelect1">
                Filter By Category:
              </label>
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
                      <option value={item.categoryType}>
                        {item.categoryType}
                      </option>
                    </React.Fragment>
                  );
                })}
                ;
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11">
              {currentItems.map((item, index) => {
                return (
                  <div className="card w-100" key={item.productID}>
                    <div className="row card-body">
                      <div className="col-sm-6">
                        <h5 className="card-title">
                          {item.brandName} {item.name}
                        </h5>
                        <p className="card-text">{item.description}</p>
                        <p>
                          Category:{" "}
                          <span className="text-muted">
                            {item.categoryID.categoryType}
                          </span>
                        </p>
                        {item.onSale ? (
                          <div
                            style={{ backgroundColor: "yellow", width: "25%" }}
                          >
                            <p className="font-weight-bold">
                              Was £{item.price} <br />
                              Now £{item.salePrice}
                            </p>
                          </div>
                        ) : (
                          <p>£{item.price}</p>
                        )}
                        <p>
                          Volume:{" "}
                          <span className="text-muted">{item.volume}</span>
                        </p>
                        <div className="row">
                          <Link
                            type="button"
                            className="btn btn-primary m-1"
                            to={
                              "/store/" +
                              props.storeID +
                              "/product/" +
                              item.productID +
                              "/edit"
                            }
                            state={{
                              storeID: props.storeID,
                              product: item,
                            }}
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger m-1"
                            onClick={() => deleteProduct(item.productID)}
                          >
                            Delete
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
          </div>
        </div>
      </div>
    );
  }

  function PaginatedItems(itemsPerPage) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    console.log(itemsPerPage);
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
export default MyProductList;
