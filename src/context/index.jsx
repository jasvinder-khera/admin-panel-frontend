import React from "react";
import PropTypes from "prop-types";

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    // Authentication cases
    case "SET_TOKENS": {
      return { 
        ...state, 
        accessToken: action.value.accessToken,
        refreshToken: action.value.refreshToken,
        isAuthenticated: true
      };
    }
    case "CLEAR_TOKENS": {
      return { 
        ...state, 
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
      };
    }
    case "SET_AUTHENTICATED": {
      return { ...state, isAuthenticated: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "green",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
    // Authentication state
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    isAuthenticated: !!localStorage.getItem("refreshToken"),
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);

  // Initialize tokens from localStorage on component mount
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    
    if (accessToken && refreshToken) {
      dispatch({
        type: "SET_TOKENS",
        value: { accessToken, refreshToken }
      });
    }
  }, []);

  // Sync localStorage with context state
  React.useEffect(() => {
    if (controller.accessToken && controller.refreshToken) {
      localStorage.setItem("accessToken", controller.accessToken);
      localStorage.setItem("refreshToken", controller.refreshToken);
    }
  }, [controller.accessToken, controller.refreshToken]);

  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

// Authentication action creators
export const setTokens = (dispatch, tokens) => {
  const { accessToken, refreshToken } = tokens;
  
  // Save to localStorage
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  
  // Update context
  dispatch({ 
    type: "SET_TOKENS", 
    value: { accessToken, refreshToken } 
  });
};

export const clearTokens = (dispatch) => {
  // Remove from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  
  // Update context
  dispatch({ type: "CLEAR_TOKENS" });
};

export const checkAuthentication = (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  dispatch({ 
    type: "SET_AUTHENTICATED", 
    value: !!refreshToken 
  });
};

// Original action creators
export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
