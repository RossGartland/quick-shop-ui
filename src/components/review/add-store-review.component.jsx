import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import reviewService from "../../services/review.service";
import { useForm } from "react-hook-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
function AddStoreReview(props) {
  const currentUser = authService.getCurrentUser();
  const location = useLocation();
  const { storeID } = location.state;
  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(2);

  const onSubmit = (data) => {
    const reviewData = {
      storeID: storeID,
      username: currentUser.username,
      userID: currentUser.id,
      content: data.content,
      rating: rating,
    };
    reviewService
      .createStoreReview(reviewData)
      .then(() => {
        alert(JSON.stringify("Submitted"));
      })
      .catch((e) => {
        console.log(e);
        alert(JSON.stringify(e.data));
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              id="content"
              placeholder="Content"
              {...register("content", { required: true })}
            />
          </div>
          <FormControlLabel
            control={
              <>
                <input
                  name="rating"
                  type="number"
                  value={rating}
                  {...register("rating", { required: true })}
                  hidden
                  readOnly
                />
                <Rating
                  name="rating"
                  value={rating}
                  precision={1}
                  onChange={(_, value) => {
                    setRating(value);
                  }}
                />
              </>
            }
          />
          <br />
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
}
export default AddStoreReview;
