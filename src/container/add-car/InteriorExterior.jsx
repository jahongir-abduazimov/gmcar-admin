import { Checkbox, Form } from "antd";
import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";

const InteriorExterior = ({ onValuesChange, initialValues }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  // Pass values up when changed
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
          <span className="text-lg font-medium">Экстерьер/Интерьер</span>
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
                label="Боковая подушка безопасности"
                name="side_airbag"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>

              <Form.Item
                label="Шторка безопасности"
                name="curtain_airbag"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>

              <Form.Item
                label="Система антиблокировки тормозов (ABS)"
                name="abs"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>

              <Form.Item
                label="Система контроля тяги (TCS)"
                name="traction_control"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>

              <Form.Item
                label="Система электронной стабилизации (ESC)"
                name="esc"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>

              <Form.Item
                label="Система контроля давления в шинах (TPMS)"
                name="tpms"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>

              <Form.Item
                label="Система предупреждения о выходе из полосы (LDWS)"
                name="ldws"
                valuePropName="checked"
              >
                <Checkbox className="scale-125" />
              </Form.Item>

              <Form.Item
                label="Камера заднего вида"
                name="rear_view_camera"
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

export default InteriorExterior;
