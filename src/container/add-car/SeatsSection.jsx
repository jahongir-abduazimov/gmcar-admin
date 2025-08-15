import { Checkbox, Form } from "antd";
import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const SeatsSection = ({ onValuesChange, initialValues }) => {
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
          <span className="text-lg font-medium">Сиденья</span>
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
                label="Кожаные сиденья"
                name="seat_leather"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Электрорегулировка водитель/пассажир"
                name="seat_electric_adjustment_driver_passenger"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Электрорегулировка задних сидений"
                name="seat_electric_adjustment_rear_seats"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Обогрев всех сидений"
                name="seat_heating_all"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Память всех сидений"
                name="seat_memory_all"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Вентиляция водитель/пассажир"
                name="seat_ventilation_driver_passenger"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Вентиляция задних сидений"
                name="seat_ventilation_back"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Массаж сидений"
                name="seat_massage"
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

export default SeatsSection;
