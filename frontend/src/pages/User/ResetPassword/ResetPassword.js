import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import Loader from "../../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../../actions/userAction";
import { LockOpen, Lock } from "@material-ui/icons";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";
import MetaData from "../../../components/MetaData/MetaData";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      newPassword,
      confirmPassword,
    };
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Reset Successfully");
      navigate("/login");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, token, navigate, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Lock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
