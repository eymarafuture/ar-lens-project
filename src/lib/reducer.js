export const initialState = {
  loggedInUser:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("loggedInUser")) || null
      : false,
  toggleTheme: false,
  toggleMenu: false,
  lenses: [],
  isLenseModal: false,
  refreshPage: false,

  brands: [],
  isBrandModal: false,
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
    case "SET_LENSES":
      return {
        ...state,
        lenses: action.payload,
      };
    case "LENSE_MODAL":
      return {
        ...state,
        isLenseModal: !state.isLenseModal,
      };

    case "REFRESH_PAGE":
      return {
        ...state,
        refreshPage: !state.refreshPage,
      };

    case "SET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "BRAND_MODAL":
      return {
        ...state,
        isBrandModal: !state.isBrandModal,
      };
    default:
      return state;
  }
};

export default reducer;
