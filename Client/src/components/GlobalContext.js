import React, { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const initialState = {
  userName: "",
  userEmail: "",
  userID: "",
  nCount: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER_NAME":
      return {
        ...state,
        userName: action.payload,
      };
    case "UPDATE_USER_EMAIL":
      return {
        ...state,
        userEmail: action.payload,
      };
    case "UPDATE_USER_ID":
      return {
        ...state,
        userID: action.payload,
      };
    case "UPDATE_USER_NOTIFY":
      return {
        ...state,
        nCount: action.payload,
      };
    // Add more cases for other actions as needed
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateUserName = (newValue) => {
    dispatch({
      type: "UPDATE_USER_NAME",
      payload: newValue,
    });
  };

  const updateUserEmail = (newValue) => {
    dispatch({
      type: "UPDATE_USER_EMAIL",
      payload: newValue,
    });
  };
  const updateUserID = (newValue) => {
    dispatch({
      type: "UPDATE_USER_ID",
      payload: newValue,
    });
  };
  const updateUserNOTIFY = (newValue) => {
    dispatch({
      type: "UPDATE_USER_NOTIFY",
      payload: newValue,
    });
  };

  // Context value with multiple dispatch functions directly in value
  const contextValue = {
    state,
    updateUserName,
    updateUserEmail,
    updateUserID,
    updateUserNOTIFY,
    // other dispatch functions...
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
