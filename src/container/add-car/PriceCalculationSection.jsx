import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const PriceCalculationSection = ({ onValuesChange, initialValues }) => {
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
          <span className="text-lg font-medium">Расчет цены</span>
          <DownOutlined className="text-lg" />
        </button>
        {isOpen && (
          <div className="px-5 py-3">
            <Form
              form={form}
              autoComplete="off"
              layout="vertical"
              onValuesChange={handleValuesChange}
            >
              <Form.Item label="Услуги агента" name="agent_service">
                <Input size="large" type="number" />
              </Form.Item>
              <Form.Item label="Стоимость авто" name="car_cost">
                <Input size="large" type="number" />
              </Form.Item>
              <Form.Item label="Расходы в Корее" name="expences_in_korea">
                <Input size="large" type="number" />
              </Form.Item>
              <Form.Item label="Таможенная пошлина" name="custom_dutie">
                <Input size="large" type="number" />
              </Form.Item>
              <Form.Item label="Утильсбор" name="utilsbor">
                <Input size="large" type="number" />
              </Form.Item>
              <Form.Item label="Таможенный брокер" name="custom_broker">
                <Input size="large" type="number" />
              </Form.Item>
              <Form.Item label="Автовоз" name="car_transporter">
                <Input size="large" type="number" />
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceCalculationSection;
