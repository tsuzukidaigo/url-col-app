import React, { createContext, useState } from 'react';

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <ApiContext.Provider
      value={{
        modalIsOpen,
        setModalIsOpen,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
