import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import request from "../../components/config";
import { useNotification } from "../../components/ui/Notification";

const AddBrand = ({ isOpen, handleClose, onAddCallback, data }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState({ icon: null, image: null });
  const { openNotification } = useNotification();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("icon", fileList.icon);
    formData.append("name", values.name);
    setIsLoading(true);
    try {
      await request.post("/admin/brand/create/", formData);
      openNotification("success", "Успешно добавлено!");
      onAddCallback();
      handleClose();
      form.resetFields();
      setFileList({ icon: null, image: null });
    } catch (err) {
      openNotification("error", "Произошла ошибка!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={<span className="text-lg font-medium">Добавить бренд</span>}
      style={{ maxWidth: 400 }}
      open={isOpen}
      footer={false}
      onCancel={() => {
        handleClose();
        form.resetFields();
        setFileList({ icon: null, image: null });
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
            label="Икона"
            name="icon"
            rules={[{ required: !data, message: "Введите значок!" }]}
          >
            <Upload
              beforeUpload={(file) => {
                setFileList((prev) => ({ ...prev, icon: file }));
                return false;
              }}
              maxCount={1}
              accept=".png,.jpg,.jpeg,.svg"
            >
              <Button size="large" className="w-full" icon={<UploadOutlined />}>
                Выберите файл
              </Button>
            </Upload>
          </Form.Item>

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

export default AddBrand;
