export const initialState = {
  user: "",
  token: "",
  loading: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };
    case "REGISTER":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
