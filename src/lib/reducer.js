export const initialState = {
  loggedInUser:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("loggedInUser")) || null
      : false,
  toggleTheme: false,
  toggleMenu: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "DARK_THEME":
      return {
        ...state,
        toggleTheme: !state.toggleTheme,
      };
    case "LOGIN":
      return {
        ...state,
        loggedInUser: action.payload,
      };

    case "TOGGLE_MENU":
      return {
        ...state,
        toggleMenu: !state.toggleMenu,
      };
    default:
      return state;
  }
};

export default reducer;
