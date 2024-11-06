import axios from "axios";
import { Dispatch } from "redux";
import { addNotification } from "../../store/actions/notifications.action";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from "../../store/actions/account.actions";

// Define action creators
export const loginApiCall = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
     const response = await axios.post("https://cms-backend-ftz7.onrender.com/admin/login", {
      // const response = await axios.post("https://cms-backend-ftz7.onrender.com/admin/login", {
        email,
        password,
      });
      if (response.data.status) {
        // Dispatch success action with the data
        dispatch(
          addNotification(
            "Welcome!",
            `${response.data.data.fullName} you ${response.data.message}`
          )
        );

        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: response.data.token,
            fullName: response.data.data.fullName,
            email: response.data.data.email,
            data: response.data.data, // Include data from response
          },
        });
        const dataToStore = response.data.data;

        const dataString = JSON.stringify(dataToStore);

        localStorage.setItem("loginUserData", dataString); // Optionally store token in localStorage or sessionStorage
        localStorage.setItem("loginEmail", response.data.data.email);
        localStorage.setItem("logiFullName", response.data.data.fullName);
        localStorage.setItem("authToken", response.data.token);
      } else {
        // Dispatch failure action with the message
        dispatch(addNotification("Login Failure", `${response.data.message}`));
        dispatch({
          type: LOGIN_FAILURE,
          payload: {
            error: response.data.message,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          error: "An error occurred during login.",
        },
      });
    }
  };
};
