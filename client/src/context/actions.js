import Api from "Api";

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await Api.post(`/auth/login`, loginPayload);
    let data = response.data;

    if (data.token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("auth-token", data.token);
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("auth-token");
}
