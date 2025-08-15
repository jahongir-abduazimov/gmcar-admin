import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import request from "../../components/config";
import { useNotification } from "../../components/ui/Notification";

const EditGeneration = ({ onEditCallback, data }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState({ icon: null, image: null });
  const { openNotification } = useNotification();
  const [isOpen, setIsOpen] = useState();

  const onFinish = async (values) => {
    const formData = new FormData();
    if (fileList.icon) {
      formData.append("icon", fileList.icon);
    }
    formData.append("name", values.name);
    setIsLoading(true);
    try {
      await request.patch(`/admin/generation/${data.id}/update/`, formData);
      openNotification("success", "Отредактировано успешно!");
      onEditCallback();
      setIsOpen(false);
      form.resetFields();
      setFileList({ icon: null, image: null });
    } catch (err) {
      openNotification("error", "Произошла ошибка!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && data) {
      form.setFieldsValue({
        name: data.name || "",
      });
    }
  }, [isOpen, data, form]);

  return (
    <>
      <Button
        type="text"
        size="large"
        icon={<EditOutlined style={{ fontSize: 20 }} />}
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <Modal
        title={
          <span className="text-lg font-medium">Редактировать поколение</span>
        }
        style={{ maxWidth: 400 }}
        open={isOpen}
        footer={false}
        onCancel={() => {
          setIsOpen(false);
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
              label="Имя"
              name="name"
              rules={[{ required: true, message: "Введите имя!" }]}
              initialValue={data.name}
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
    </>
  );
};

export default EditGeneration;
