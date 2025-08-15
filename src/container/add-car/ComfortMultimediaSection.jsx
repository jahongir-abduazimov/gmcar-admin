import { Checkbox, Form } from "antd";
import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const ComfortMultimediaSection = ({ onValuesChange, initialValues }) => {
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
          <span className="text-lg font-medium">Удобство / Мультимедиа</span>
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
                label="Круиз-контроль"
                name="cruise_control"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Кожаные сиденья"
                name="leather_seats"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Электрорегулировка передних сидений"
                name="seat_electric_adjustment_front"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Электрорегулировка задних сидений"
                name="seat_electric_adjustment_rear"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Обогрев передних и задних сидений"
                name="seat_heating_front_rear"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Память передних сидений"
                name="seat_memory_front"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Вентиляция передних сидений"
                name="seat_ventilation_front"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Вентиляция задних сидений"
                name="seat_ventilation_rear"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Массаж сидений"
                name="massage_seats"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Система ABS"
                name="abs_system"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="Задний AV монитор"
                name="rear_av_monitor"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>
              <Form.Item
                label="CD-плеер"
                name="cd_player"
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
              <Form.Item
                label="AUX порт"
                name="aux_port"
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

export default ComfortMultimediaSection;
