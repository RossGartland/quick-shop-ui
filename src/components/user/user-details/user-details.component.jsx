import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";

function UserDetails(props) {
  const { currentUser } = props;

  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    if (currentUser !== null) {
      AuthService.getUserDetails(currentUser.id)
        .then((userDetails) => setUserDetails(userDetails))
        .catch((error) => {});
    }
  }, []);

  return (
    <div>
      <br />
      {userDetails.map((item, index) => {
        return (
          <div className="user-details">
            <div className="row">
              <div className="col-md-12">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src="https://www.nicepng.com/png/detail/799-7998295_profile-placeholder-woman-720-profile-photo-placeholder-png.png"
                      alt="avatar"
                      className="rounded-circle img-fluid profile-image"
                    />
                    <h5 className="my-3">
                      {item.forename} {item.surname}
                    </h5>
                    <br />
                    <div className="d-flex justify-content-center mb-2">
                      <Link to={"/resetpassword"}>
                        <button type="button" className="btn btn-warning">
                          Reset Password
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Forename</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{item.forename}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Surname</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{item.surname}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{item.email}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Joined</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default UserDetails;
