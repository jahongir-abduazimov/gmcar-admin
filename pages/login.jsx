import React, { useEffect, useState } from "react";
import Logo from "../src/assets/icons/Logo.png";
import { Button, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import request from "../src/components/config";
import { useNotification } from "../src/components/ui/Notification";
import { useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  const { openNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      const res = await request.post("/admin/user/login/", e);
      localStorage.setItem("auth", res.data.access);
      navigate("/");
    } catch (err) {
      openNotification("error", "Произошла ошибка!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div className="w-[50%] h-full flex items-center justify-center bg-primary">
        <img className="w-[300px]" src={Logo} alt="WTC logo" />
      </div>
      <div className="w-[50%] h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <p className="text-2xl font-medium">Войти</p>
          <Form
            onFinish={handleSubmit}
            style={{ width: 330 }}
            name="basic"
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Введите имя пользователя!",
                },
              ]}
            >
              <Input type="email" size="large" placeholder="Имя пользователя" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Введите пароль!",
                },
              ]}
            >
              <Password size="large" placeholder="Пароль" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="w-full"
              iconPosition="end"
              loading={isLoading}
            >
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default login;
