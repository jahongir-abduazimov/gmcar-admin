import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import request from "../../components/config";
import { useNotification } from "../../components/ui/Notification";
import { useParams } from "react-router-dom";

const AddModel = ({ isOpen, handleClose, onAddCallback, data }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification } = useNotification();
  const { id } = useParams()

  const onFinish = async (values) => {
    setIsLoading(true);
    const newData = {
      name: values.name,
      brand: id
    }
    try {
      await request.post("/admin/model/create/", newData);
      openNotification("success", "Успешно добавлено!");
      onAddCallback();
      handleClose();
      form.resetFields();
    } catch (err) {
      openNotification("error", "Произошла ошибка!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={<span className="text-lg font-medium">Добавить модель</span>}
      style={{ maxWidth: 400 }}
      open={isOpen}
      footer={false}
      onCancel={() => {
        handleClose();
        form.resetFields();
      }}
      centered
    >
      <div className="mt-5">
        <Form
          form={form}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: "Введите имя!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <div className="flex justify-end">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              iconPosition="end"
            >
              Сохранить
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddModel;
