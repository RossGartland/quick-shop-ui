import React, { useState } from "react";
import authService from "../../../services/auth.service";
import { useForm } from "react-hook-form";

function ResetPassword() {
  const currentUser = authService.getCurrentUser();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const resetPasswordData = {
      email: currentUser.email,
      newPassword: data.newPassword,
    };
    authService
      .resetPassword(resetPasswordData)
      .then(() => {
        alert(JSON.stringify("Password changed."));
      })
      .catch((e) => {
        console.log(e);
        alert(JSON.stringify(e.data));
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h2>Enter your new password:</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              {...register("newPassword", { required: true })}
            />
          </div>

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;
