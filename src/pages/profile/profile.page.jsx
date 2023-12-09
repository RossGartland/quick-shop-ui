import React from "react";
import CustomerOrders from "../../components/customer-orders/my-customer-orders.component";
import UserDetails from "../../components/user/user-details/user-details.component";
import authService from "../../services/auth.service";

function Profile() {
  const currentUser = authService.getCurrentUser();
  return (
    <div className="container">
      <UserDetails currentUser={currentUser} />
      <CustomerOrders currentUser={currentUser} />
    </div>
  );
}
export default Profile;
