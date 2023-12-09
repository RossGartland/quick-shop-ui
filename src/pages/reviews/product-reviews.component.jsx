import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AddStoreReview from "../../components/review/add-store-review.component";
import Review from "../../components/review/review.component";
import reviewService from "../../services/review.service";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Rating from "@mui/material/Rating";
import AddProductReview from "../../components/review/add-product-review.component";
function ProductReviews(props) {
  const { productID } = props;
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    reviewService
      .getProductsReviews(productID)
      .then((reviewList) => setReviewList(reviewList));
  }, []);

  console.log(reviewList);

  return (
    <div className="container">
      <div className="panel panel-default widget container">
        <div className="row">
          <div className="panel panel-default widget justify-content-centre">
            <Popup
              contentStyle={{ width: "400px" }}
              trigger={<btn className="btn btn-warning m-1">Add a Review</btn>}
              position="right center"
              modal
              nested
            >
              {(close) => <AddProductReview productID={productID} />}
            </Popup>
            {reviewList.map((review) => (
              <Review review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductReviews;
