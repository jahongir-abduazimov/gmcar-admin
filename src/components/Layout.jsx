import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import "../index.css";
import { routes } from "../router/routes";
import LogOutModal from "./ui/LogOutModal";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const App = () => {
  const pathname = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  // const
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <LogOutModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      <Layout style={{ overflow: "hidden" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={270}
          style={{ height: "100vh", overflowY: "auto" }}
          className="scrollbar-none px-3"
        >
          <div className="flex items-center justify-center my-4">
            {/* <Link to={"/"}>
              <img className="w-[120px]" src={Logo} alt="wtc logo" />
            </Link> */}
            <Link to={"/"} className="text-4xl text-white font-bold">GM CAR</Link>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={["none"]}>
            <div className="mb-10 w-full scrollbar-none">
              {routes.map((item, index) =>
                item.children ? (
                  <Menu.SubMenu
                    key={index}
                    title={<span className="text-[17px]">{item.content}</span>}
                    icon={<span className="pl-3">{item.icon}</span>}
                  >
                    {item.children.map((subItem, subIndex) => (
                      <Menu.Item
                        key={`${index}-${subIndex}`}
                        className={
                          subItem.path === pathname.pathname
                            ? "ant-menu-items"
                            : ""
                        }
                      >
                        <NavLink to={subItem.path} key={index}>
                          <span className="text-[17px]">{subItem.content}</span>
                        </NavLink>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item
                    key={index}
                    className={
                      item.path === pathname.pathname ? "ant-menu-items" : ""
                    }
                  >
                    <div className="flex items-center gap-3 px-3">
                      <span>{item.icon}</span>
                      <NavLink to={item.path} key={index}>
                        <span className="text-[17px]">{item.content}</span>
                      </NavLink>
                    </div>
                  </Menu.Item>
                )
              )}
            </div>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div className="flex justify-end items-center h-full">
              <Button
                onClick={() => setIsOpen(true)}
                style={{
                  marginRight: "30px",
                }}
                size="large"
                type="text"
                icon={<LogoutOutlined className="text-[20px]" />}
              >
                <span className="font-medium">Выйти</span>
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
            }}
          >
            <div
              style={{
                padding: 24,
                height: "84vh",
                overflowY: "auto",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default App;
