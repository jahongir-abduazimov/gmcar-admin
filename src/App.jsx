import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "./components/ui/Notification";
function App() {
  return (
    <NotificationProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#003478",
            fontFamily: "Inter",
          },
        }}
      >
        <Outlet />
      </ConfigProvider>
    </NotificationProvider>
  );
}

export default App;
