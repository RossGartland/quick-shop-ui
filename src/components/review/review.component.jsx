import React from "react";
import Rating from "@mui/material/Rating";
import Moment from "react-moment";
import "moment-timezone";

function Review(props) {
  const { review } = props;

  console.log(review);
  return (
    <div class="panel-body">
      <ul class="list-group">
        <li class="list-group-item">
          <div class="row">
            <div class="col-xs-2 col-md-1"></div>
            <div class="col-xs-10 col-md-11">
              <div>
                {review.username}
                <div class="mic-info">
                  Posted on:{" "}
                  <Moment format="DD/MM/YYYY">{review.crtdTimeStamp}</Moment>
                </div>
                <Rating name="read-only" value={review.rating} readOnly />
              </div>
              <div class="comment-text">{review.content}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
export default Review;
