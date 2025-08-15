import React, { createContext, useContext } from "react";
import { notification, message } from "antd";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = message.useMessage();

  const openNotification = (type, content) => {
    api[type]({
      content,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
