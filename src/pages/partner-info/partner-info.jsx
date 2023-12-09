import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PartnerSignUp from "../../components/partner-signup/partner-signup";
import authService from "../../services/auth.service";
import "./partner-info.style.css";
function PartnerInfo() {
  const currentUser = authService.getCurrentUser();
  const [userDetails, setUserDetails] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      authService
        .getUserDetails(currentUser.id)
        .then((userDetails) => setUserDetails(userDetails), setShowSignUp(true))
        .catch((error) => {});
    }
  }, []);

  return (
    <div>
      <div className="row mb-4 align-items-center flex-lg-row-reverse pt-4">
        <div className="col-md-6 col-xl-5 mb-4 mb-lg-0 ">
          <div className="lc-block position-relative">
            <img
              className="img-fluid rounded shadow"
              src="https://images.unsplash.com/photo-1633526544365-a98d534c9201?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="partner image"
              width={"500"}
              height={"500"}
            />
          </div>
        </div>
        <div className="col-md-6 col-xl-5">
          <div className="lc-block mb-3">
            <div editable="rich">
              <h1 className="fw-bolder display-2">Partner With Us</h1>
            </div>
          </div>

          <div className="lc-block mb-4">
            <div editable="rich">
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                velit temporibus impedits maxime repellendus esse tempore odio
                voluptatum iusto consectetur voluptates.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="container text-center about-container">
        <h3>What We Do</h3>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at
          molestie eros, eu malesuada lacus. Phasellus est ante, iaculis eget
          rhoncus eu, placerat eget elit. Maecenas lobortis enim sed leo
          maximus, a commodo justo dictum. Donec eu mattis mauris, sed
          sollicitudin urna. Sed egestas sed felis ut pretium. In eu pharetra
          tortor.{" "}
        </p>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            <img
              src="https://images.unsplash.com/photo-1601489664830-d9c5fd91fb00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              className="img-responsive rounded-circle"
              alt="Image"
              height={200}
              width={200}
            />
            <p>Alex - Store Owner</p>
            <p>Center aligned text on all viewport sizes.</p>
          </div>
          <div className="col-sm-4">
            <img
              src="https://images.unsplash.com/photo-1548449112-96a38a643324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              className="img-responsive rounded-circle"
              alt="Image"
              height={200}
              width={200}
            />
            <p>Barry - Store Manager</p>
            <p>Center aligned text on all viewport sizes.</p>
          </div>
          <div className="col-sm-4">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80"
              className="img-responsive rounded-circle"
              alt="Image"
              height={200}
              width={200}
            />
            <p>Sinéad - Customer</p>
            <p>Center aligned text on all viewport sizes.</p>
          </div>
        </div>
      </div>
      <hr />

      {showSignUp ? (
        <React.Fragment>
          {userDetails.map((item, index) => {
            return (
              <PartnerSignUp
                forename={item.forename}
                surname={item.surname}
                emailAddress={item.email}
              />
            );
          })}
        </React.Fragment>
      ) : (
        <div className="alert alert-danger" role="alert">
          You must create an account before becoming a partner.
        </div>
      )}
    </div>
  );
}
export default PartnerInfo;
