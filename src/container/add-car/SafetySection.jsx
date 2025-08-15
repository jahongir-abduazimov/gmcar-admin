import { Checkbox, Form } from "antd";
import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const SafetySection = ({ onValuesChange, initialValues }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const handleValuesChange = (_, allValues) => {
    if (onValuesChange) {
      onValuesChange(allValues);
    }
  };

  return (
    <div className="mt-5">
      <div className="w-[60%] border rounded-lg overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border rounded-lg flex items-center justify-between p-3"
        >
          <span className="text-lg font-medium">Безопасность и комфорт</span>
          <DownOutlined className="text-lg" />
        </button>
        {isOpen && (
          <div className="px-5 py-3">
            <Form
              form={form}
              autoComplete="off"
              layout="horizontal"
              onValuesChange={handleValuesChange}
            >
              <Form.Item
                label="Электронный стояночный тормоз (EPB)"
                name="epb"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Автоматический кондиционер"
                name="automatic_ac"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Смарт-ключ"
                name="smart_key"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Беспроводная блокировка дверей"
                name="wireless_door_lock"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Датчик дождя"
                name="rain_sensor"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Автоматический свет"
                name="auto_light"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Навигация"
                name="navigation"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Bluetooth"
                name="bluetooth"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="USB порт"
                name="usb_port"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetySection;
